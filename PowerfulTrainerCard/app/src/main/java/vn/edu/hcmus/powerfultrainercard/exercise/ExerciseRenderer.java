package vn.edu.hcmus.powerfultrainercard.exercise;

import android.content.res.Configuration;
import android.opengl.GLES11Ext;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.opengl.Matrix;
import android.util.DisplayMetrics;
import android.util.Log;

import com.vuforia.ImageTarget;
import com.vuforia.Matrix34F;
import com.vuforia.Matrix44F;
import com.vuforia.ObjectTracker;
import com.vuforia.Renderer;
import com.vuforia.State;
import com.vuforia.TargetFinder;
import com.vuforia.Tool;
import com.vuforia.TrackableResult;
import com.vuforia.TrackerManager;
import com.vuforia.VIDEO_BACKGROUND_REFLECTION;
import com.vuforia.Vec2F;
import com.vuforia.Vec3F;
import com.vuforia.Vuforia;

import java.nio.Buffer;
import java.util.Vector;
import java.util.concurrent.atomic.AtomicInteger;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import vn.edu.hcmus.powerfultrainercard.ExerciseActivity;
import vn.edu.hcmus.powerfultrainercard.utils.SampleMath;
import vn.edu.hcmus.powerfultrainercard.utils.SampleUtils;
import vn.edu.hcmus.powerfultrainercard.utils.Texture;
import vn.edu.hcmus.powerfultrainercard.exercise.videoplayback.VideoPlaybackShaders;
import vn.edu.hcmus.powerfultrainercard.exercise.videoplayback.VideoPlayerHelper;
import vn.edu.hcmus.powerfultrainercard.exercise.videoplayback.VideoPlayerHelper.MEDIA_STATE;
import vn.edu.hcmus.powerfultrainercard.exercise.videoplayback.VideoPlayerHelper.MEDIA_TYPE;
import vn.edu.hcmus.powerfultrainercard.vuforia.VuforiaAppSession;

public class ExerciseRenderer implements GLSurfaceView.Renderer {

    VuforiaAppSession vuforiaAppSession;

    public static final int RS_NORMAL = 0;
    public static final int RS_TRANSITION_TO_2D = 1;
    public static final int RS_TRANSITION_TO_3D = 2;
    public static final int RS_LOADING = 3;
    public static final int RS_TEXTURE_GENERATED = 4;
    public static final int RS_VIDEO_PLAYBACK = 5;
    public static final int RS_SCANNING = 6;

    public boolean mIsActive = false;
    private boolean mIsVideoPlayback = false;

    public ExerciseActivity mActivity;

    private boolean mScanningMode = false;
    private boolean mShowAnimation3Dto2D = true;
    private boolean mStartAnimation3Dto2D = false;
    private boolean mStartAnimation2Dto3D = false;

    int renderState = RS_SCANNING;

    Transition3Dto2D transition3Dto2D;
    Transition3Dto2D transition2Dto3D;

    TransitionVideo3Dto2D transitionVideo3Dto2D;
    TransitionVideo3Dto2D transitionVideo2Dto3D;

    float transitionDuration = 0.5f;
    boolean mIsShowing2DOverlay = false;

    boolean deleteCurrentProductTexture = false;

    private int mScreenHeight;
    private int mScreenWidth;

    private Texture mProductTexture;
    private float mDPIScaleIndicator;
    private float mScaleFactor;
    private AtomicInteger framesToSkipBeforeRenderingTransition = new AtomicInteger(10);
    private boolean mTrackingStarted = false;
    private float[] modelViewMatrix;
    private Matrix34F pose;

    private Plane mPlane;

    // Video playback

    private int videoPlaybackShaderID = 0;
    private int videoPlaybackVertexHandle = 0;
    private int videoPlaybackNormalHandle = 0;
    private int videoPlaybackTexCoordHandle = 0;
    private int videoPlaybackMVPMatrixHandle = 0;
    private int videoPlaybackTexSamplerOESHandle = 0;

    int videoPlaybackTextureID[] = {-1};

    private int keyframeShaderID = 0;
    private int keyframeVertexHandle = 0;
    private int keyframeNormalHandle = 0;
    private int keyframeTexCoordHandle = 0;
    private int keyframeMVPMatrixHandle = 0;
    private int keyframeTexSampler2DHandle = 0;

    private float videoQuadTextureCoords[] = {0.0f, 0.0f, 1.0f, 0.0f, 1.0f,
            1.0f, 0.0f, 1.0f,};

    private float videoQuadTextureCoordsTransformed[] = {0.0f, 0.0f,
            1.0f, 0.0f, 1.0f, 1.0f, 0.0f, 1.0f,};

    Vec3F targetPositiveDimensions = new Vec3F();

    static int NUM_QUAD_VERTEX = 4;
    static int NUM_QUAD_INDEX = 6;

    double quadVerticesArray[] = {-1.0f, -1.0f, 0.0f, 1.0f, -1.0f, 0.0f, 1.0f,
            1.0f, 0.0f, -1.0f, 1.0f, 0.0f};

    double quadTexCoordsArray[] = {0.0f, 0.0f, 1.0f, 0.0f, 1.0f, 1.0f, 0.0f,
            1.0f};

    double quadNormalsArray[] = {0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,};

    short quadIndicesArray[] = {0, 1, 2, 2, 3, 0};

    Buffer quadVertices, quadTexCoords, quadIndices, quadNormals;

    private float[] mTexCoordTransformationMatrix = new float[16];
    private VideoPlayerHelper mVideoPlayerHelper = new VideoPlayerHelper();
    private String mMovieName = "";
    private String mMovieUrl = "";
    private MEDIA_TYPE mCanRequestType = MEDIA_TYPE.ON_TEXTURE_FULLSCREEN;
    private int mSeekPosition = 0;
    private boolean mShouldPlayImmediately = false;
    private boolean mLoadRequested = false;

    Matrix44F modelVideoViewMatrix = new Matrix44F();

    private Vector<Texture> mVideoTextures;

    MEDIA_STATE currentStatus = MEDIA_STATE.NOT_READY;

    float videoQuadAspectRatio;
    float keyframeQuadAspectRatio = 0.0f;

    int currentTextureIdx = -1;

    public ExerciseRenderer(VuforiaAppSession appSession, ExerciseActivity exerciseActivity) {
        vuforiaAppSession = appSession;
        mActivity = exerciseActivity;

        mVideoPlayerHelper = new VideoPlayerHelper();
        mVideoPlayerHelper.init();
        mVideoPlayerHelper.setActivity(mActivity);
    }

    public void requestLoad(int seekPosition, boolean playImmediately) {
        mSeekPosition = seekPosition;
        mShouldPlayImmediately = playImmediately;
        mLoadRequested = true;
    }

    public void getOrCreateNewTarget(String movieName, String movieUrl) {
        if (movieName.compareTo(mMovieName) != 0) {
            mMovieName = movieName;
            mMovieUrl = movieUrl;
            mVideoPlayerHelper.unload();
            mVideoPlayerHelper.load(mMovieUrl, mCanRequestType,
                    mShouldPlayImmediately, mSeekPosition);
            mSeekPosition = 0;
            mShouldPlayImmediately = false;
            currentStatus = MEDIA_STATE.NOT_READY;
        }
    }

    public VideoPlayerHelper getVideoPlayerHelper() {
        return mVideoPlayerHelper;
    }

    public String getMovieName() {
        return mMovieUrl;
    }

    public void setFramesToSkipBeforeRenderingTransition(int framesToSkip) {
        framesToSkipBeforeRenderingTransition.set(framesToSkip);
    }

    public void initRendering() {

        GLES20.glClearColor(0.0f, 0.0f, 0.0f, Vuforia.requiresAlpha() ? 0.0f : 1.0f);

        keyframeShaderID = SampleUtils.createProgramFromShaderSrc(
                KeyFrameShaders.KEY_FRAME_VERTEX_SHADER, KeyFrameShaders.KEY_FRAME_FRAGMENT_SHADER);

        keyframeVertexHandle = GLES20.glGetAttribLocation(keyframeShaderID,
                "vertexPosition");
        keyframeNormalHandle = GLES20.glGetAttribLocation(keyframeShaderID,
                "vertexNormal");
        keyframeTexCoordHandle = GLES20.glGetAttribLocation(keyframeShaderID,
                "vertexTexCoord");
        keyframeMVPMatrixHandle = GLES20.glGetUniformLocation(keyframeShaderID,
                "modelViewProjectionMatrix");
        keyframeTexSampler2DHandle = GLES20.glGetUniformLocation(
                keyframeShaderID, "texSampler2D");

        mPlane = new Plane();

        initVideoRendering();
    }

    public void initVideoRendering() {

        // Now we create the texture for the video data from the movie
        // IMPORTANT:
        // Notice that the textures are not typical GL_TEXTURE_2D textures
        // but instead are GL_TEXTURE_EXTERNAL_OES extension textures
        // This is required by the Android SurfaceTexture
        GLES20.glGenTextures(1, videoPlaybackTextureID, 0);
        GLES20.glBindTexture(GLES11Ext.GL_TEXTURE_EXTERNAL_OES,
                videoPlaybackTextureID[0]);
        GLES20.glTexParameterf(GLES11Ext.GL_TEXTURE_EXTERNAL_OES,
                GLES20.GL_TEXTURE_MIN_FILTER, GLES20.GL_LINEAR);
        GLES20.glTexParameterf(GLES11Ext.GL_TEXTURE_EXTERNAL_OES,
                GLES20.GL_TEXTURE_MAG_FILTER, GLES20.GL_LINEAR);
        GLES20.glBindTexture(GLES11Ext.GL_TEXTURE_EXTERNAL_OES, 0);

        // The first shader is the one that will display the video data of the
        // movie
        // (it is aware of the GL_TEXTURE_EXTERNAL_OES extension)
        videoPlaybackShaderID = SampleUtils.createProgramFromShaderSrc(
                VideoPlaybackShaders.VIDEO_PLAYBACK_VERTEX_SHADER,
                VideoPlaybackShaders.VIDEO_PLAYBACK_FRAGMENT_SHADER);
        videoPlaybackVertexHandle = GLES20.glGetAttribLocation(
                videoPlaybackShaderID, "vertexPosition");
        videoPlaybackNormalHandle = GLES20.glGetAttribLocation(
                videoPlaybackShaderID, "vertexNormal");
        videoPlaybackTexCoordHandle = GLES20.glGetAttribLocation(
                videoPlaybackShaderID, "vertexTexCoord");
        videoPlaybackMVPMatrixHandle = GLES20.glGetUniformLocation(
                videoPlaybackShaderID, "modelViewProjectionMatrix");
        videoPlaybackTexSamplerOESHandle = GLES20.glGetUniformLocation(
                videoPlaybackShaderID, "texSamplerOES");

        keyframeQuadAspectRatio = (float) mVideoTextures.get(0).mHeight / (float) mVideoTextures.get(0).mWidth;

        quadVertices = SampleUtils.fillBuffer(quadVerticesArray);
        quadTexCoords = SampleUtils.fillBuffer(quadTexCoordsArray);
        quadIndices = SampleUtils.fillBuffer(quadIndicesArray);
        quadNormals = SampleUtils.fillBuffer(quadNormalsArray);
    }

    public void updateRendering(int width, int height) {

        mScreenWidth = width;
        mScreenHeight = height;

        Configuration config = mActivity.getResources().getConfiguration();

        boolean isActivityInPortraitMode;
        if (config.orientation == Configuration.ORIENTATION_LANDSCAPE)
            isActivityInPortraitMode = false;
        else
            isActivityInPortraitMode = true;

        transition3Dto2D = new Transition3Dto2D(mScreenWidth, mScreenHeight,
                isActivityInPortraitMode, mDPIScaleIndicator, mScaleFactor, mPlane);
        transition3Dto2D.initializeGL(keyframeShaderID);

        transition2Dto3D = new Transition3Dto2D(mScreenWidth, mScreenHeight,
                isActivityInPortraitMode, mDPIScaleIndicator, mScaleFactor, mPlane);
        transition2Dto3D.initializeGL(keyframeShaderID);

        transitionVideo3Dto2D = new TransitionVideo3Dto2D(mScreenWidth, mScreenHeight,
                isActivityInPortraitMode, mDPIScaleIndicator, mScaleFactor, videoQuadAspectRatio,
                mPlane, mVideoPlayerHelper);
        transitionVideo3Dto2D.initializeGL(videoPlaybackShaderID);

        transitionVideo2Dto3D = new TransitionVideo3Dto2D(mScreenWidth, mScreenHeight,
                isActivityInPortraitMode, mDPIScaleIndicator, mScaleFactor, videoQuadAspectRatio,
                mPlane, mVideoPlayerHelper);
        transitionVideo2Dto3D.initializeGL(videoPlaybackShaderID);
    }

    public void onSurfaceCreated(GL10 gl, EGLConfig config) {
        initRendering();
        Vuforia.onSurfaceCreated();

        if (!mVideoPlayerHelper.setupSurfaceTexture(videoPlaybackTextureID[0]))
            mCanRequestType = MEDIA_TYPE.FULLSCREEN;
        else
            mCanRequestType = MEDIA_TYPE.ON_TEXTURE_FULLSCREEN;

        if (mLoadRequested) {
            mVideoPlayerHelper.load(mMovieUrl, mCanRequestType,
                    mShouldPlayImmediately, mSeekPosition);
            mLoadRequested = false;
        }
    }

    public void onSurfaceChanged(GL10 gl, int width, int height) {
        mScreenHeight = height;
        mScreenWidth = width;

        updateRendering(width, height);
        Vuforia.onSurfaceChanged(width, height);

        if (mLoadRequested && mVideoPlayerHelper != null) {
            mVideoPlayerHelper.load(mMovieName, mCanRequestType,
                    mShouldPlayImmediately, mSeekPosition);
            mLoadRequested = false;
        }
    }

    public void renderFrame() {
        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);

        State state = Renderer.getInstance().begin();

        Renderer.getInstance().drawVideoBackground();

        GLES20.glEnable(GLES20.GL_DEPTH_TEST);

        int[] viewport = vuforiaAppSession.getViewport();
        GLES20.glViewport(viewport[0], viewport[1], viewport[2], viewport[3]);

        GLES20.glEnable(GLES20.GL_CULL_FACE);
        GLES20.glCullFace(GLES20.GL_BACK);
        if (Renderer.getInstance().getVideoBackgroundConfig().getReflection() == VIDEO_BACKGROUND_REFLECTION.VIDEO_BACKGROUND_REFLECTION_ON)
            GLES20.glFrontFace(GLES20.GL_CW); // Front camera
        else
            GLES20.glFrontFace(GLES20.GL_CCW); // Back camera

        float temp[] = {0.0f, 0.0f, 0.0f};
        targetPositiveDimensions.setData(temp);

        if (deleteCurrentProductTexture) {
            if (mProductTexture != null) {
                GLES20.glDeleteTextures(1, mProductTexture.mTextureID, 0);
                mProductTexture = null;
            }
            deleteCurrentProductTexture = false;
        }

        if (renderState == RS_SCANNING) {
            mIsVideoPlayback = false;
            mVideoPlayerHelper.pause();
        }

        if (renderState == RS_TEXTURE_GENERATED) {
            Texture textureObject = mActivity.getProductTexture();
            generateProductTextureInOpenGL(textureObject);
        }

        if (renderState == RS_VIDEO_PLAYBACK) {
            mIsVideoPlayback = true;
            currentTextureIdx = -1;
            mVideoPlayerHelper.seekTo(0);
            renderState = RS_NORMAL;
        }

        if (state.getNumTrackableResults() > 0) {
            mTrackingStarted = true;

            framesToSkipBeforeRenderingTransition.set(0);

            TrackableResult trackableResult = state.getTrackableResult(0);

            if (trackableResult == null) {
                return;
            }

            modelViewMatrix = Tool.convertPose2GLMatrix(
                    trackableResult.getPose()).getData();
            pose = trackableResult.getPose();

            if (mIsVideoPlayback) {
                ImageTarget imageTarget = (ImageTarget) trackableResult.getTrackable();
                targetPositiveDimensions = imageTarget.getSize();

                //mActivity.playVideo();
                updateVideoRendering();
            }

            renderAugmentation();

        } else {

            if (!mScanningMode && mShowAnimation3Dto2D
                    && renderState == RS_NORMAL
                    && framesToSkipBeforeRenderingTransition.get() == 0) {
                startTransitionTo2D();
            }

            if (framesToSkipBeforeRenderingTransition.get() > 0
                    && renderState == RS_NORMAL) {
                framesToSkipBeforeRenderingTransition.decrementAndGet();
            }
        }

        if (mIsVideoPlayback && mIsShowing2DOverlay) {
            int idx = getIndexByStatus();

            if (idx != currentTextureIdx) {
                currentTextureIdx = idx;
                generateProductTextureInOpenGL(mVideoTextures.get(currentTextureIdx));
            }
        }

        if (renderState == RS_TRANSITION_TO_2D && mShowAnimation3Dto2D) {
            renderTransitionTo2D();
        }

        if (renderState == RS_TRANSITION_TO_3D) {
            renderTransitionTo3D();
        }

        TrackerManager trackerManager = TrackerManager.getInstance();

        ObjectTracker objectTracker = (ObjectTracker) trackerManager
                .getTracker(ObjectTracker.getClassType());

        TargetFinder finder = objectTracker.getTargetFinder();

        if (finder.isRequesting()) {
            mActivity.setStatusBarText("Requesting");
            mActivity.showStatusBar();
        } else {
            mActivity.hideStatusBar();
        }

        GLES20.glDisable(GLES20.GL_DEPTH_TEST);

        Renderer.getInstance().end();
    }

    private void updateVideoRendering() {
        modelVideoViewMatrix = Tool
                .convertPose2GLMatrix(pose);

        float temp[] = {0.0f, 0.0f, 0.0f};
        temp[0] = targetPositiveDimensions.getData()[0] / 2.0f;
        temp[1] = targetPositiveDimensions.getData()[1] / 2.0f;
        targetPositiveDimensions.setData(temp);

        if ((currentStatus == MEDIA_STATE.PLAYING)
                || (currentStatus == MEDIA_STATE.PAUSED)
                || (currentStatus == MEDIA_STATE.READY)) {

            float[] modelViewMatrixVideo = Tool.convertPose2GLMatrix(pose).getData();
            float[] modelViewProjectionVideo = new float[16];

            Matrix.scaleM(modelViewMatrixVideo, 0,
                    targetPositiveDimensions.getData()[0],
                    targetPositiveDimensions.getData()[0]
                            * videoQuadAspectRatio,
                    targetPositiveDimensions.getData()[0]);
            Matrix.multiplyMM(modelViewProjectionVideo, 0,
                    vuforiaAppSession.getProjectionMatrix().getData(), 0,
                    modelViewMatrixVideo, 0);

            GLES20.glUseProgram(videoPlaybackShaderID);

            GLES20.glVertexAttribPointer(videoPlaybackVertexHandle, 3,
                    GLES20.GL_FLOAT, false, 0, quadVertices);
            GLES20.glVertexAttribPointer(videoPlaybackNormalHandle, 3,
                    GLES20.GL_FLOAT, false, 0, quadNormals);
            GLES20.glVertexAttribPointer(videoPlaybackTexCoordHandle,
                    2, GLES20.GL_FLOAT, false, 0,
                    SampleUtils.fillBuffer(videoQuadTextureCoordsTransformed));

            GLES20.glEnableVertexAttribArray(videoPlaybackVertexHandle);
            GLES20.glEnableVertexAttribArray(videoPlaybackNormalHandle);
            GLES20.glEnableVertexAttribArray(videoPlaybackTexCoordHandle);

            GLES20.glActiveTexture(GLES20.GL_TEXTURE0);

            GLES20.glBindTexture(GLES11Ext.GL_TEXTURE_EXTERNAL_OES,
                    videoPlaybackTextureID[0]);
            GLES20.glUniformMatrix4fv(videoPlaybackMVPMatrixHandle, 1,
                    false, modelViewProjectionVideo, 0);
            GLES20.glUniform1i(videoPlaybackTexSamplerOESHandle, 0);

            // Render
            GLES20.glDrawElements(GLES20.GL_TRIANGLES, NUM_QUAD_INDEX,
                    GLES20.GL_UNSIGNED_SHORT, quadIndices);

            GLES20.glDisableVertexAttribArray(videoPlaybackVertexHandle);
            GLES20.glDisableVertexAttribArray(videoPlaybackNormalHandle);
            GLES20.glDisableVertexAttribArray(videoPlaybackTexCoordHandle);

            GLES20.glUseProgram(0);

        }

        int idx = getIndexByStatus();

        if (idx != currentTextureIdx) {
            currentTextureIdx = idx;
            generateProductTextureInOpenGL(mVideoTextures.get(currentTextureIdx));
        }

        SampleUtils.checkGLError("VideoPlayback renderFrame");
    }

    private int getIndexByStatus() {
        switch (currentStatus) {
            case READY:
                return 2;
            case REACHED_END:
                return 2;
            case PAUSED:
                return 2;
            case NOT_READY:
                return 0;
            case ERROR:
                return 1;
            default:
                return 3;
        }
    }

    private void renderTransitionTo3D() {
        if (mStartAnimation2Dto3D) {
            transitionDuration = 0.1f;
            transition2Dto3D.startTransition(transitionDuration, true, true);
            mStartAnimation2Dto3D = false;

        } else {
            if (pose == null) {
                pose = transition2Dto3D.getFinalPositionMatrix34F();
            }

            boolean transitionFinished1 = true;
            boolean transitionFinished2 = true;

            if (mIsVideoPlayback) {
                transitionFinished1 = false;

                transitionVideo2Dto3D.render(vuforiaAppSession.getProjectionMatrix()
                        .getData(), pose, videoPlaybackTextureID[0]);

                if (transitionVideo2Dto3D.transitionFinished()) {
                    transitionFinished1 = true;
                }
            }

            if (mProductTexture != null && currentStatus != MEDIA_STATE.PLAYING) {
                transitionFinished2 = false;

                transition2Dto3D.render(vuforiaAppSession.getProjectionMatrix()
                        .getData(), pose, mProductTexture.mTextureID[0]);

                if (transition2Dto3D.transitionFinished()) {
                    transitionFinished2 = true;
                }
            }

            if (transitionFinished1 && transitionFinished2) {
                mIsShowing2DOverlay = false;
                mShowAnimation3Dto2D = true;

                renderState = RS_NORMAL;
            }
        }
    }

    private void renderTransitionTo2D() {
        if (mStartAnimation3Dto2D) {
            transition3Dto2D.startTransition(transitionDuration, false, true);

            mStartAnimation3Dto2D = false;

        } else {
            if (pose == null) {
                pose = transition2Dto3D.getFinalPositionMatrix34F();
            }

            boolean transitionFinished1 = true;
            boolean transitionFinished2 = true;

            if (mIsVideoPlayback) {
                transitionFinished1 = false;

                transitionVideo3Dto2D.render(vuforiaAppSession.getProjectionMatrix()
                        .getData(), pose, videoPlaybackTextureID[0]);

                if (transitionVideo3Dto2D.transitionFinished()) {
                    transitionFinished1 = true;
                }
            }

            if (mProductTexture != null && currentStatus != MEDIA_STATE.PLAYING) {
                transitionFinished2 = false;

                transition3Dto2D.render(vuforiaAppSession.getProjectionMatrix()
                        .getData(), pose, mProductTexture.mTextureID[0]);

                if (transition3Dto2D.transitionFinished()) {
                    transitionFinished2 = true;
                }
            }

            if (transitionFinished1 && transitionFinished2) {
                mIsShowing2DOverlay = true;
            }
        }
    }

    private void startTransitionTo2D() {
        if (renderState == RS_NORMAL && mTrackingStarted) {
            transitionDuration = 0.1f;

            renderState = RS_TRANSITION_TO_2D;
            mStartAnimation3Dto2D = true;

        } else if (renderState == RS_NORMAL && !mTrackingStarted
                && mProductTexture != null) {
            transitionDuration = 0.0f;

            renderState = RS_TRANSITION_TO_2D;
            mStartAnimation3Dto2D = true;
        }
    }

    private void renderAugmentation() {
        float[] modelViewProjection = new float[16];

        Matrix.scaleM(modelViewMatrix, 0, 430.f * mScaleFactor,
                430.f * mScaleFactor, 1.0f);

        Matrix.multiplyMM(modelViewProjection, 0,
                vuforiaAppSession.getProjectionMatrix().getData(), 0,
                modelViewMatrix, 0);

        GLES20.glUseProgram(keyframeShaderID);

        if (renderState == RS_NORMAL) {

            GLES20.glDepthFunc(GLES20.GL_LEQUAL);

            GLES20.glEnable(GLES20.GL_BLEND);
            GLES20.glBlendFunc(GLES20.GL_SRC_ALPHA,
                    GLES20.GL_ONE_MINUS_SRC_ALPHA);

            GLES20.glVertexAttribPointer(keyframeVertexHandle, 3, GLES20.GL_FLOAT,
                    false, 0, mPlane.getVertices());
            GLES20.glVertexAttribPointer(keyframeNormalHandle, 3, GLES20.GL_FLOAT,
                    false, 0, mPlane.getNormals());
            GLES20.glVertexAttribPointer(keyframeTexCoordHandle, 2, GLES20.GL_FLOAT,
                    false, 0, mPlane.getTexCoords());

            GLES20.glEnableVertexAttribArray(keyframeVertexHandle);
            GLES20.glEnableVertexAttribArray(keyframeNormalHandle);
            GLES20.glEnableVertexAttribArray(keyframeTexCoordHandle);

            GLES20.glActiveTexture(GLES20.GL_TEXTURE0);

            GLES20.glBindTexture(GLES20.GL_TEXTURE_2D,
                    mProductTexture.mTextureID[0]);

            GLES20.glUniformMatrix4fv(keyframeMVPMatrixHandle, 1, false,
                    modelViewProjection, 0);
            GLES20.glUniform1i(keyframeTexSampler2DHandle, 0);

            GLES20.glDrawElements(GLES20.GL_TRIANGLES, NUM_QUAD_INDEX,
                    GLES20.GL_UNSIGNED_SHORT, mPlane.getIndices());

            GLES20.glDisableVertexAttribArray(keyframeVertexHandle);
            GLES20.glDisableVertexAttribArray(keyframeNormalHandle);
            GLES20.glDisableVertexAttribArray(keyframeTexCoordHandle);

            GLES20.glUseProgram(0);

            GLES20.glDepthFunc(GLES20.GL_LESS);
            GLES20.glDisable(GLES20.GL_BLEND);

        } else if (mIsShowing2DOverlay) {
            mStartAnimation2Dto3D = true;
            mIsShowing2DOverlay = false;

            renderState = RS_TRANSITION_TO_3D;

        }

        SampleUtils.checkGLError("ExerciseActivity renderFrame");
    }

    private void generateProductTextureInOpenGL(Texture texture) {
        if (texture != null) {
            mProductTexture = texture;
        }

        GLES20.glGenTextures(1, mProductTexture.mTextureID, 0);
        GLES20.glBindTexture(GLES20.GL_TEXTURE_2D,
                mProductTexture.mTextureID[0]);

        GLES20.glTexParameterf(GLES20.GL_TEXTURE_2D,
                GLES20.GL_TEXTURE_MIN_FILTER, GLES20.GL_LINEAR);
        GLES20.glTexParameterf(GLES20.GL_TEXTURE_2D,
                GLES20.GL_TEXTURE_MAG_FILTER, GLES20.GL_LINEAR);

        GLES20.glTexParameterf(GLES20.GL_TEXTURE_2D,
                GLES20.GL_TEXTURE_WRAP_S, GLES20.GL_CLAMP_TO_EDGE);
        GLES20.glTexParameterf(GLES20.GL_TEXTURE_2D,
                GLES20.GL_TEXTURE_WRAP_T, GLES20.GL_CLAMP_TO_EDGE);

        GLES20.glTexImage2D(GLES20.GL_TEXTURE_2D, 0, GLES20.GL_RGBA, 1024,
                1024, 0, GLES20.GL_RGBA, GLES20.GL_UNSIGNED_BYTE, null);

        GLES20.glTexSubImage2D(GLES20.GL_TEXTURE_2D, 0, 0, 0,
                mProductTexture.mWidth, mProductTexture.mHeight, GLES20.GL_RGBA,
                GLES20.GL_UNSIGNED_BYTE, mProductTexture.mData);

        renderState = RS_NORMAL;
    }

    public void onDrawFrame(GL10 gl) {
        if (!mIsActive) {
            return;
        }

        if (mVideoPlayerHelper.isPlayableOnTexture()) {
            if (mVideoPlayerHelper.getStatus() == MEDIA_STATE.PLAYING
                    || mVideoPlayerHelper.getStatus() == MEDIA_STATE.READY) {
                mVideoPlayerHelper.updateVideoData();
            }

            mVideoPlayerHelper.getSurfaceTextureTransformMatrix(mTexCoordTransformationMatrix);
            setVideoDimensions(mVideoPlayerHelper.getVideoWidth(),
                    mVideoPlayerHelper.getVideoHeight(),
                    mTexCoordTransformationMatrix);
        }

        setStatus(mVideoPlayerHelper.getStatus().getNumericType());

        renderFrame();
    }

    public boolean isTapOnScreenInsideTarget(float x, float y) {
        if (mIsVideoPlayback && mIsShowing2DOverlay)
            return true;

        Vec3F intersection;

        DisplayMetrics metrics = new DisplayMetrics();
        mActivity.getWindowManager().getDefaultDisplay().getMetrics(metrics);
        intersection = SampleMath.getPointToPlaneIntersection(SampleMath
                        .Matrix44FInverse(vuforiaAppSession.getProjectionMatrix()),
                modelVideoViewMatrix, metrics.widthPixels, metrics.heightPixels,
                new Vec2F(x, y), new Vec3F(0, 0, 0), new Vec3F(0, 0, 1));

        if ((intersection.getData()[0] >= -(targetPositiveDimensions.getData()[0]))
                && (intersection.getData()[0] <= (targetPositiveDimensions.getData()[0]))
                && (intersection.getData()[1] >= -(targetPositiveDimensions.getData()[1]))
                && (intersection.getData()[1] <= (targetPositiveDimensions.getData()[1])))
            return true;
        else
            return false;
    }

    void setVideoDimensions(float videoWidth, float videoHeight,
                            float[] textureCoordMatrix) {
        videoQuadAspectRatio = videoHeight / videoWidth;
        transitionVideo2Dto3D.setVideoQuadAspectRatio(videoQuadAspectRatio);
        transitionVideo3Dto2D.setVideoQuadAspectRatio(videoQuadAspectRatio);

        float mtx[] = textureCoordMatrix;
        float tempUVMultRes[] = new float[2];

        tempUVMultRes = SampleMath.uvMultMat4f(
                videoQuadTextureCoordsTransformed[0],
                videoQuadTextureCoordsTransformed[1],
                videoQuadTextureCoords[0], videoQuadTextureCoords[1], mtx);
        videoQuadTextureCoordsTransformed[0] = tempUVMultRes[0];
        videoQuadTextureCoordsTransformed[1] = tempUVMultRes[1];
        tempUVMultRes = SampleMath.uvMultMat4f(
                videoQuadTextureCoordsTransformed[2],
                videoQuadTextureCoordsTransformed[3],
                videoQuadTextureCoords[2], videoQuadTextureCoords[3], mtx);
        videoQuadTextureCoordsTransformed[2] = tempUVMultRes[0];
        videoQuadTextureCoordsTransformed[3] = tempUVMultRes[1];
        tempUVMultRes = SampleMath.uvMultMat4f(
                videoQuadTextureCoordsTransformed[4],
                videoQuadTextureCoordsTransformed[5],
                videoQuadTextureCoords[4], videoQuadTextureCoords[5], mtx);
        videoQuadTextureCoordsTransformed[4] = tempUVMultRes[0];
        videoQuadTextureCoordsTransformed[5] = tempUVMultRes[1];
        tempUVMultRes = SampleMath.uvMultMat4f(
                videoQuadTextureCoordsTransformed[6],
                videoQuadTextureCoordsTransformed[7],
                videoQuadTextureCoords[6], videoQuadTextureCoords[7], mtx);
        videoQuadTextureCoordsTransformed[6] = tempUVMultRes[0];
        videoQuadTextureCoordsTransformed[7] = tempUVMultRes[1];

        // textureCoordMatrix = mtx;
    }


    void setStatus(int value) {
        switch (value) {
            case 0:
                currentStatus = VideoPlayerHelper.MEDIA_STATE.REACHED_END;
                break;
            case 1:
                currentStatus = VideoPlayerHelper.MEDIA_STATE.PAUSED;
                break;
            case 2:
                currentStatus = VideoPlayerHelper.MEDIA_STATE.STOPPED;
                break;
            case 3:
                currentStatus = VideoPlayerHelper.MEDIA_STATE.PLAYING;
                break;
            case 4:
                currentStatus = VideoPlayerHelper.MEDIA_STATE.READY;
                break;
            case 5:
                currentStatus = VideoPlayerHelper.MEDIA_STATE.NOT_READY;
                break;
            case 6:
                currentStatus = VideoPlayerHelper.MEDIA_STATE.ERROR;
                break;
            default:
                currentStatus = VideoPlayerHelper.MEDIA_STATE.NOT_READY;
                break;
        }
    }

    public void setVideoTextures(Vector<Texture> textures) {
        mVideoTextures = textures;
    }

    public void setScanningMode(boolean scanningMode) {
        mScanningMode = scanningMode;
    }

    public void showAnimation3Dto2D(boolean b) {
        mShowAnimation3Dto2D = b;
    }

    public void isShowing2DOverlay(boolean b) {
        mIsShowing2DOverlay = b;
    }

    public void setRenderState(int state) {
        renderState = state;
    }

    public int getRenderState() {
        return renderState;
    }

    public void startTransition2Dto3D() {
        mStartAnimation2Dto3D = true;
    }

    public void startTransition3Dto2D() {
        mStartAnimation3Dto2D = true;
    }

    public void stopTransition2Dto3D() {
        mStartAnimation2Dto3D = true;
    }

    public void stopTransition3Dto2D() {
        mStartAnimation3Dto2D = true;
    }

    public void deleteCurrentProductTexture() {
        deleteCurrentProductTexture = true;
    }

    public void setProductTexture(Texture texture) {
        mProductTexture = texture;
    }

    public boolean getScanningMode() {
        return mScanningMode;
    }

    public void setDPIScaleIndicator(float dpiSIndicator) {
        mDPIScaleIndicator = dpiSIndicator;
    }

    public void setScaleFactor(float f) {
        mScaleFactor = f;
    }

    public void resetTrackingStarted() {
        mTrackingStarted = false;
    }
}
