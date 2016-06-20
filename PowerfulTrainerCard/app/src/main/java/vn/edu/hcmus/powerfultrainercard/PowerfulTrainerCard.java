package vn.edu.hcmus.powerfultrainercard;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.GestureDetector;
import android.view.GestureDetector.OnDoubleTapListener;
import android.view.GestureDetector.SimpleOnGestureListener;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup.LayoutParams;
import android.widget.RelativeLayout;

import com.vuforia.CameraDevice;
import com.vuforia.DataSet;
import com.vuforia.HINT;
import com.vuforia.ObjectTracker;
import com.vuforia.STORAGE_TYPE;
import com.vuforia.State;
import com.vuforia.TargetFinder;
import com.vuforia.TargetSearchResult;
import com.vuforia.Trackable;
import com.vuforia.Tracker;
import com.vuforia.TrackerManager;
import com.vuforia.Vuforia;

import java.util.List;
import java.util.Vector;

import vn.edu.hcmus.powerfultrainercard.manager.VuforiaControl;
import vn.edu.hcmus.powerfultrainercard.manager.VuforiaException;
import vn.edu.hcmus.powerfultrainercard.manager.VuforiaSession;
import vn.edu.hcmus.powerfultrainercard.manager.utils.LoadingDialogHandler;
import vn.edu.hcmus.powerfultrainercard.manager.utils.SampleVuforiaGLView;
import vn.edu.hcmus.powerfultrainercard.manager.utils.Texture;
import vn.edu.hcmus.powerfultrainercard.videoplayback.VideoPlaybackRenderer;
import vn.edu.hcmus.powerfultrainercard.videoplayback.VideoPlayerHelper;
import vn.edu.hcmus.powerfultrainercard.videoplayback.appmenu.AppMenu;
import vn.edu.hcmus.powerfultrainercard.videoplayback.appmenu.AppMenuGroup;
import vn.edu.hcmus.powerfultrainercard.videoplayback.appmenu.AppMenuInterface;


// The AR activity for the PowerfulTrainerCard sample.
public class PowerfulTrainerCard extends Activity implements
        VuforiaControl, AppMenuInterface {

    private static final String LOGTAG = "PowerfulTrainerCard";

    public static int MAX_TARGETS = 1;

    // These codes match the ones defined in TargetFinder in Vuforia.jar
    static final int INIT_SUCCESS = 2;
    static final int INIT_ERROR_NO_NETWORK_CONNECTION = -1;
    static final int INIT_ERROR_SERVICE_NOT_AVAILABLE = -2;
    static final int UPDATE_ERROR_AUTHORIZATION_FAILED = -1;
    static final int UPDATE_ERROR_PROJECT_SUSPENDED = -2;
    static final int UPDATE_ERROR_NO_NETWORK_CONNECTION = -3;
    static final int UPDATE_ERROR_SERVICE_NOT_AVAILABLE = -4;
    static final int UPDATE_ERROR_BAD_FRAME_QUALITY = -5;
    static final int UPDATE_ERROR_UPDATE_SDK = -6;
    static final int UPDATE_ERROR_TIMESTAMP_OUT_OF_RANGE = -7;
    static final int UPDATE_ERROR_REQUEST_TIMEOUT = -8;

    static final int HIDE_LOADING_DIALOG = 0;
    static final int SHOW_LOADING_DIALOG = 1;

    final private static int CMD_BACK = -1;
    final private static int CMD_FULLSCREEN_VIDEO = 1;

    VuforiaSession vuforiaAppSession;
    Activity mActivity;

    DataSet datasetDevice = null;
    boolean mIsDroidDevice = false;
    boolean mIsInitialized = false;
    boolean mFinderStarted = false;

    // Helpers to detect events such as double tapping:
    private GestureDetector mGestureDetector = null;
    private SimpleOnGestureListener mSimpleListener = null;

    private List<VideoPlayerHelper> mVideoPlayerHelper = null;
    private List<Integer> mSeekPosition = null;
    private List<Boolean> mWasPlaying = null;

    // A boolean to indicate whether we come from full screen:
    private boolean mReturningFromFullScreen = false;

    // Our OpenGL view:
    private SampleVuforiaGLView mGlView;

    // Our renderer:
    private VideoPlaybackRenderer mRenderer;

    // The textures we will use for rendering:
    private Vector<Texture> mTextures;

    private RelativeLayout mUILayout;
    private boolean mPlayFullscreenVideo = false;
    private AppMenu mAppMenu;
    private LoadingDialogHandler loadingDialogHandler = new LoadingDialogHandler(this);

    // Alert Dialog used to display SDK errors
    private AlertDialog mErrorDialog;

    // Error message handling:
    private int mlastErrorCode = 0;
    private int mInitErrorCode = 0;
    private boolean mFinishActivityOnError;
    private double mLastErrorTime;

    private boolean mUseCloudDataSet = true;
    private boolean mExtendedTracking = false;

    // Called when the activity first starts or the user navigates back
    // to an activity.
    protected void onCreate(Bundle savedInstanceState) {
        Log.d(LOGTAG, "onCreate");
        super.onCreate(savedInstanceState);

        vuforiaAppSession = new VuforiaSession(this);

        mActivity = this;

        startLoadingAnimation();

        vuforiaAppSession
                .initAR(this, ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);

        // Load any sample specific textures:
        mTextures = new Vector<>();
        loadTextures();

        // Create the gesture detector that will handle the single and
        // double taps:
        mSimpleListener = new SimpleOnGestureListener();
        mGestureDetector = new GestureDetector(getApplicationContext(),
                mSimpleListener);

        mIsDroidDevice = android.os.Build.MODEL.toLowerCase().startsWith(
                "droid");

        // Set the double tap listener:
        mGestureDetector.setOnDoubleTapListener(new OnDoubleTapListener() {
            public boolean onDoubleTap(MotionEvent e) {
                // We do not react to this event
                return false;
            }

            public boolean onDoubleTapEvent(MotionEvent e) {
                // We do not react to this event
                return false;
            }

            // Handle the single tap
            public boolean onSingleTapConfirmed(MotionEvent e) {
                boolean isSingleTapHandled = false;
                // Do not react if the StartupScreen is being displayed
                for (int i = 0; i < mVideoPlayerHelper.size(); ++i) {
                    // Verify that the tap happened inside the target
                    if (mRenderer != null && mRenderer.isTapOnScreenInsideTarget(i, e.getX(), e.getY())) {
                        // Check if it is playable on texture
                        VideoPlayerHelper videoPlayerHelper = mVideoPlayerHelper.get(i);
                        if (videoPlayerHelper.isPlayableOnTexture()) {
                            // We can play only if the movie was paused, ready
                            // or stopped
                            if ((videoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.PAUSED)
                                    || (videoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.READY)
                                    || (videoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.STOPPED)
                                    || (videoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.REACHED_END)) {

                                // Pause all other media
                                pauseAll(i);

                                // If it has reached the end then rewind
                                if ((videoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.REACHED_END))
                                    mSeekPosition.set(i, 0);

                                videoPlayerHelper.play(mPlayFullscreenVideo,
                                        mSeekPosition.get(i));
                                mSeekPosition.set(i, VideoPlayerHelper.CURRENT_POSITION);
                            } else if (videoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.PLAYING) {
                                // If it is playing then we pause it
                                videoPlayerHelper.pause();
                            }
                        } else if (videoPlayerHelper.isPlayableFullscreen()) {
                            // If it isn't playable on texture
                            // Either because it wasn't requested or because it
                            // isn't supported then request playback fullscreen.
                            videoPlayerHelper.play(true, VideoPlayerHelper.CURRENT_POSITION);
                        }

                        isSingleTapHandled = true;

                        // Even though multiple videos can be loaded only one
                        // can be playing at any point in time. This break
                        // prevents that, say, overlapping videos trigger
                        // simultaneously playback.
                    }
                }
                return isSingleTapHandled;
            }
        });
    }

    // We want to load specific textures from the APK, which we will later
    // use for rendering.
    private void loadTextures() {
        mTextures.add(Texture.loadTextureFromApk("keyframe.png",
                getAssets()));
        mTextures.add(Texture.loadTextureFromApk("play.png",
                getAssets()));
        mTextures.add(Texture.loadTextureFromApk("busy.png",
                getAssets()));
        mTextures.add(Texture.loadTextureFromApk("error.png",
                getAssets()));
    }

    // Called when the activity will start interacting with the user.
    protected void onResume() {
        Log.d(LOGTAG, "onResume");
        super.onResume();

        // This is needed for some Droid devices to force portrait
        if (mIsDroidDevice) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }

        try {
            vuforiaAppSession.resumeAR();
        } catch (VuforiaException e) {
            Log.e(LOGTAG, e.getString());
        }

        // Resume the GL view:
        if (mGlView != null) {
            mGlView.setVisibility(View.VISIBLE);
            mGlView.onResume();
        }

        // Reload all the movies
        if (mRenderer != null) {
            for (int i = 0; i < mVideoPlayerHelper.size(); ++i) {
                if (!mReturningFromFullScreen) {
                    mRenderer.requestLoad(i, mSeekPosition.get(i), false);
                } else {
                    mRenderer.requestLoad(i, mSeekPosition.get(i), mWasPlaying.get(i));
                }
            }
        }

        mReturningFromFullScreen = false;
    }

    // Called when returning from the full screen player
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == 1) {

            mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);

            if (resultCode == RESULT_OK) {
                // The following values are used to indicate the position in
                // which the video was being played and whether it was being
                // played or not:
                String movieBeingPlayed = data.getStringExtra("movieName");
                mReturningFromFullScreen = true;

                // Find the movie that was being played full screen
                for (int i = 0; i < mVideoPlayerHelper.size(); ++i) {
                    if (movieBeingPlayed.compareTo(mRenderer.getMovieName(i)) == 0) {
                        mSeekPosition.set(i, data.getIntExtra("currentSeekPosition", 0));
                        mWasPlaying.set(i, false);
                    }
                }
            }
        }
    }

    public void onConfigurationChanged(Configuration config) {
        Log.d(LOGTAG, "onConfigurationChanged");
        super.onConfigurationChanged(config);

        vuforiaAppSession.onConfigurationChanged();
    }

    // Called when the system is about to start resuming a previous activity.
    protected void onPause() {
        Log.d(LOGTAG, "onPause");
        super.onPause();

        if (mGlView != null) {
            mGlView.setVisibility(View.INVISIBLE);
            mGlView.onPause();
        }

        // Store the playback state of the movies and unload them:
        if (mVideoPlayerHelper != null) {
            for (int i = 0; i < mVideoPlayerHelper.size(); ++i) {
                // If the activity is paused we need to store the position in which
                // this was currently playing:
                VideoPlayerHelper videoPlayerHelper = mVideoPlayerHelper.get(i);
                if (videoPlayerHelper != null) {
                    if (videoPlayerHelper.isPlayableOnTexture()) {
                        mSeekPosition.set(i, videoPlayerHelper.getCurrentPosition());
                        mWasPlaying.set(i, videoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.PLAYING);
                    }

                    // We also need to release the resources used by the helper, though
                    // we don't need to destroy it:
                    videoPlayerHelper.unload();
                }
            }
        }
        mReturningFromFullScreen = false;

        try {
            vuforiaAppSession.pauseAR();
        } catch (VuforiaException e) {
            Log.e(LOGTAG, e.getString());
        }
    }

    // The final call you receive before your activity is destroyed.
    protected void onDestroy() {
        Log.d(LOGTAG, "onDestroy");
        super.onDestroy();

        for (int i = 0; i < mVideoPlayerHelper.size(); ++i) {
            // If the activity is destroyed we need to release all resources:
            VideoPlayerHelper videoPlayerHelper = mVideoPlayerHelper.get(i);
            if (videoPlayerHelper != null)
                videoPlayerHelper.deinit();
            mVideoPlayerHelper.set(i, null);
        }

        try {
            vuforiaAppSession.stopAR();
        } catch (VuforiaException e) {
            Log.e(LOGTAG, e.getString());
        }

        // Unload texture:
        mTextures.clear();
        mTextures = null;

        System.gc();
    }

    // Pause all movies except one
    // if the value of 'except' is -1 then
    // do a blanket pause
    private void pauseAll(int except) {
        // And pause all the playing videos:
        for (VideoPlayerHelper videoPlayerHelper : mVideoPlayerHelper) {
            // We can make one exception to the pause all calls:
            if (mVideoPlayerHelper.indexOf(videoPlayerHelper) != except) {
                // Check if the video is playable on texture
                if (videoPlayerHelper.isPlayableOnTexture()) {
                    // If it is playing then we pause it
                    videoPlayerHelper.pause();
                }
            }
        }
    }

    // Do not exit immediately and instead show the startup screen
    public void onBackPressed() {
        pauseAll(-1);
        super.onBackPressed();
    }

    private void startLoadingAnimation() {
        mUILayout = (RelativeLayout) View.inflate(this, R.layout.camera_overlay,
                null);

        mUILayout.setVisibility(View.VISIBLE);
        mUILayout.setBackgroundColor(Color.BLACK);

        // Gets a reference to the loading dialog
        loadingDialogHandler.mLoadingDialogContainer = mUILayout
                .findViewById(R.id.loading_indicator);

        // Shows the loading indicator at start
        loadingDialogHandler
                .sendEmptyMessage(LoadingDialogHandler.SHOW_LOADING_DIALOG);

        // Adds the inflated layout to the view
        addContentView(mUILayout, new LayoutParams(LayoutParams.MATCH_PARENT,
                LayoutParams.MATCH_PARENT));
    }

    // Initializes AR application components.
    private void initApplicationAR() {
        // Create OpenGL ES view:
        int depthSize = 16;
        int stencilSize = 0;
        boolean translucent = Vuforia.requiresAlpha();

        mGlView = new SampleVuforiaGLView(this);
        mGlView.init(translucent, depthSize, stencilSize);

        mRenderer = new VideoPlaybackRenderer(this, vuforiaAppSession);
        mRenderer.setTextures(mTextures);

        for (int i = 0; i < MAX_TARGETS; ++i)
            mRenderer.getOrCreateNewTarget(null);

        mVideoPlayerHelper = mRenderer.getVideoPlayerHelper();
        mSeekPosition = mRenderer.getSeekPosition();
        mWasPlaying = mRenderer.getWasPlaying();

        mGlView.setRenderer(mRenderer);

    }

    // We do not handle the touch event here, we just forward it to the
    // gesture detector
    public boolean onTouchEvent(MotionEvent event) {
        boolean result = false;
        if (mAppMenu != null)
            result = mAppMenu.processEvent(event);

        // Process the Gestures
        if (!result)
            mGestureDetector.onTouchEvent(event);

        return result;
    }

    public void startFinderIfStopped() {
        if (!mFinderStarted) {
            mFinderStarted = true;

            // Get the object tracker:
            TrackerManager trackerManager = TrackerManager.getInstance();
            ObjectTracker objectTracker = (ObjectTracker) trackerManager
                    .getTracker(ObjectTracker.getClassType());

            // Initialize target finder:
            TargetFinder targetFinder = objectTracker.getTargetFinder();

            targetFinder.clearTrackables();
            targetFinder.startRecognition();
        }
    }

    public void stopFinderIfStarted() {
        if (mFinderStarted) {
            mFinderStarted = false;

            // Get the object tracker:
            TrackerManager trackerManager = TrackerManager.getInstance();
            ObjectTracker objectTracker = (ObjectTracker) trackerManager
                    .getTracker(ObjectTracker.getClassType());

            // Initialize target finder:
            TargetFinder targetFinder = objectTracker.getTargetFinder();

            targetFinder.stop();
        }
    }

    @Override
    public boolean doInitTrackers() {
        // Indicate if the trackers were initialized correctly
        boolean result = true;

        // Initialize the image tracker:
        TrackerManager trackerManager = TrackerManager.getInstance();
        Tracker tracker = trackerManager.initTracker(ObjectTracker
                .getClassType());
        if (tracker == null) {
            Log.d(LOGTAG, "Failed to initialize ObjectTracker.");
            result = false;
        }

        return result;
    }

    @Override
    public boolean doLoadTrackersData() {
        if (mUseCloudDataSet)
            return doLoadCloudTrackersData();
        else return doLoadDeviceTrackersData();
    }

    public boolean doLoadDeviceTrackersData() {
        // Get the image tracker:
        TrackerManager trackerManager = TrackerManager.getInstance();
        ObjectTracker objectTracker = (ObjectTracker) trackerManager
                .getTracker(ObjectTracker.getClassType());
        if (objectTracker == null) {
            Log.d(
                    LOGTAG,
                    "Failed to load tracking data set because the ObjectTracker has not been initialized.");
            return false;
        }

        // Create the data sets:
        datasetDevice = objectTracker.createDataSet();
        if (datasetDevice == null) {
            Log.d(LOGTAG, "Failed to create a new tracking data.");
            return false;
        }

        // Load the data sets:
        if (!datasetDevice.load("dataset/StonesAndChips.xml",
                STORAGE_TYPE.STORAGE_APPRESOURCE)) {
            Log.d(LOGTAG, "Failed to load data set.");
            return false;
        }

        // Activate the data set:
        if (!objectTracker.activateDataSet(datasetDevice)) {
            Log.d(LOGTAG, "Failed to activate data set.");
            return false;
        }

        Log.d(LOGTAG, "Successfully loaded and activated data set.");
        return true;
    }

    private boolean doLoadCloudTrackersData() {
        Log.d(LOGTAG, "initCloudReco");

        // Get the object tracker:
        TrackerManager trackerManager = TrackerManager.getInstance();
        ObjectTracker objectTracker = (ObjectTracker) trackerManager
                .getTracker(ObjectTracker.getClassType());

        // Initialize target finder:
        TargetFinder targetFinder = objectTracker.getTargetFinder();

        // Start initialization:
        if (targetFinder.startInit(PowerfulTrainerContants.CLOUD_ACCESS_KEY,
                PowerfulTrainerContants.CLOUD_SECRET_KEY)) {
            targetFinder.waitUntilInitFinished();
        }

        int resultCode = targetFinder.getInitState();
        if (resultCode != TargetFinder.INIT_SUCCESS) {
            if (resultCode == TargetFinder.INIT_ERROR_NO_NETWORK_CONNECTION) {
                mInitErrorCode = UPDATE_ERROR_NO_NETWORK_CONNECTION;
            } else {
                mInitErrorCode = UPDATE_ERROR_SERVICE_NOT_AVAILABLE;
            }

            Log.e(LOGTAG, "Failed to initialize target finder.");
            return false;
        }

        // Use the following calls if you would like to customize the color of
        // the UI
        // targetFinder->setUIScanlineColor(1.0, 0.0, 0.0);
        // targetFinder->setUIPointColor(0.0, 0.0, 1.0);

        return true;
    }

    @Override
    public boolean doStartTrackers() {
        // Indicate if the trackers were started correctly
        boolean result = true;

        ObjectTracker objectTracker = (ObjectTracker) TrackerManager.getInstance().getTracker(
                ObjectTracker.getClassType());
        if (objectTracker != null) {
            objectTracker.start();
            Vuforia.setHint(HINT.HINT_MAX_SIMULTANEOUS_IMAGE_TARGETS, 2);

            if (mUseCloudDataSet) {
                // Start cloud based recognition if we are in scanning mode:
                TargetFinder targetFinder = objectTracker.getTargetFinder();
                targetFinder.startRecognition();
                mFinderStarted = true;
            }
        } else
            result = false;

        return result;
    }

    @Override
    public boolean doStopTrackers() {
        // Indicate if the trackers were stopped correctly
        boolean result = true;

        ObjectTracker objectTracker = (ObjectTracker) TrackerManager.getInstance().getTracker(
                ObjectTracker.getClassType());
        if (objectTracker != null) {
            objectTracker.stop();

            if (mUseCloudDataSet) {
                // Stop cloud based recognition:
                TargetFinder targetFinder = objectTracker.getTargetFinder();
                targetFinder.stop();
                mFinderStarted = false;

                // Clears the trackables
                targetFinder.clearTrackables();
            }
        } else
            result = false;

        return result;
    }

    @Override
    public boolean doUnloadTrackersData() {
        // Indicate if the trackers were unloaded correctly
        boolean result = true;

        if (!mUseCloudDataSet) {
            // Get the image tracker:
            TrackerManager trackerManager = TrackerManager.getInstance();
            ObjectTracker objectTracker = (ObjectTracker) trackerManager
                    .getTracker(ObjectTracker.getClassType());
            if (objectTracker == null) {
                Log.d(
                        LOGTAG,
                        "Failed to destroy the tracking data set because the ObjectTracker has not been initialized.");
                return false;
            }

            if (datasetDevice != null) {
                if (objectTracker.getActiveDataSet() == datasetDevice
                        && !objectTracker.deactivateDataSet(datasetDevice)) {
                    Log.d(
                            LOGTAG,
                            "Failed to destroy the tracking data set StonesAndChips because the data set could not be deactivated.");
                    result = false;
                } else if (!objectTracker.destroyDataSet(datasetDevice)) {
                    Log.d(LOGTAG,
                            "Failed to destroy the tracking data set StonesAndChips.");
                    result = false;
                }

                datasetDevice = null;
            }
        }
        return result;
    }

    @Override
    public boolean doDeinitTrackers() {
        // Indicate if the trackers were deinitialized correctly
        boolean result = true;

        // Deinit the image tracker:
        TrackerManager trackerManager = TrackerManager.getInstance();
        trackerManager.deinitTracker(ObjectTracker.getClassType());

        if (mUseCloudDataSet)
            deinitCloudReco();

        return result;
    }

    public void deinitCloudReco() {
        // Get the object tracker:
        TrackerManager trackerManager = TrackerManager.getInstance();
        ObjectTracker objectTracker = (ObjectTracker) trackerManager
                .getTracker(ObjectTracker.getClassType());
        if (objectTracker == null) {
            Log.e(LOGTAG,
                    "Failed to destroy the tracking data set because the ObjectTracker has not"
                            + " been initialized.");
            return;
        }

        // Deinitialize target finder:
        TargetFinder finder = objectTracker.getTargetFinder();
        finder.deinit();
    }

    @Override
    public void onInitARDone(VuforiaException exception) {

        if (exception == null) {
            initApplicationAR();

            mRenderer.mIsActive = true;

            // Now add the GL surface view. It is important
            // that the OpenGL ES surface view gets added
            // BEFORE the camera is started and video
            // background is configured.
            addContentView(mGlView, new LayoutParams(LayoutParams.MATCH_PARENT,
                    LayoutParams.MATCH_PARENT));

            // Sets the UILayout to be drawn in front of the camera
            mUILayout.bringToFront();

            // Hides the Loading Dialog
            loadingDialogHandler
                    .sendEmptyMessage(LoadingDialogHandler.HIDE_LOADING_DIALOG);

            // Sets the layout background to transparent
            mUILayout.setBackgroundColor(Color.TRANSPARENT);

            try {
                vuforiaAppSession.startAR(CameraDevice.CAMERA_DIRECTION.CAMERA_DIRECTION_DEFAULT);
            } catch (VuforiaException e) {
                Log.e(LOGTAG, e.getString());
            }

            boolean result = CameraDevice.getInstance().setFocusMode(
                    CameraDevice.FOCUS_MODE.FOCUS_MODE_CONTINUOUSAUTO);

            if (!result)
                Log.e(LOGTAG, "Unable to enable continuous autofocus");

            mAppMenu = new AppMenu(this, this, getString(R.string.app_name),
                    mGlView, mUILayout, null);
            setSampleAppMenuSettings();

            mIsInitialized = true;

        } else {
            Log.e(LOGTAG, exception.getString());
            showInitializationErrorMessage(exception.getString());
        }

    }

    @Override
    public void onVuforiaUpdate(State state) {
        // Get the tracker manager:
        TrackerManager trackerManager = TrackerManager.getInstance();

        // Get the object tracker:
        ObjectTracker objectTracker = (ObjectTracker) trackerManager
                .getTracker(ObjectTracker.getClassType());

        // Get the target finder:
        TargetFinder finder = objectTracker.getTargetFinder();

        // Check if there are new results available:
        final int statusCode = finder.updateSearchResults();

        // Show a message if we encountered an error:
        if (statusCode < 0) {

            boolean closeAppAfterError = (
                    statusCode == UPDATE_ERROR_NO_NETWORK_CONNECTION ||
                            statusCode == UPDATE_ERROR_SERVICE_NOT_AVAILABLE);

            showErrorMessage(statusCode, state.getFrame().getTimeStamp(), closeAppAfterError);

        } else if (statusCode == TargetFinder.UPDATE_RESULTS_AVAILABLE) {
            // Process new search results
            if (finder.getResultCount() > 0) {
                TargetSearchResult result = finder.getResult(0);

                // Check if this target is suitable for tracking:
                if (result.getTrackingRating() > 0) {
                    Trackable trackable = finder.enableTracking(result);

                    if (mExtendedTracking)
                        trackable.startExtendedTracking();
                }
            }
        }
    }

    // Shows error messages as System dialogs
    public void showErrorMessage(int errorCode, double errorTime, boolean finishActivityOnError) {
        if (errorTime < (mLastErrorTime + 5.0) || errorCode == mlastErrorCode)
            return;

        mlastErrorCode = errorCode;
        mFinishActivityOnError = finishActivityOnError;

        runOnUiThread(new Runnable() {
            public void run() {
                if (mErrorDialog != null) {
                    mErrorDialog.dismiss();
                }

                // Generates an Alert Dialog to show the error message
                AlertDialog.Builder builder = new AlertDialog.Builder(
                        PowerfulTrainerCard.this);
                builder
                        .setMessage(
                                getStatusDescString(PowerfulTrainerCard.this.mlastErrorCode))
                        .setTitle(
                                getStatusTitleString(PowerfulTrainerCard.this.mlastErrorCode))
                        .setCancelable(false)
                        .setIcon(0)
                        .setPositiveButton(getString(R.string.button_OK),
                                new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int id) {
                                        if (mFinishActivityOnError) {
                                            finish();
                                        } else {
                                            dialog.dismiss();
                                        }
                                    }
                                });

                mErrorDialog = builder.create();
                mErrorDialog.show();
            }
        });
    }

    // Returns the error message for each error code
    private String getStatusDescString(int code) {
        if (code == UPDATE_ERROR_AUTHORIZATION_FAILED)
            return getString(R.string.UPDATE_ERROR_AUTHORIZATION_FAILED_DESC);
        if (code == UPDATE_ERROR_PROJECT_SUSPENDED)
            return getString(R.string.UPDATE_ERROR_PROJECT_SUSPENDED_DESC);
        if (code == UPDATE_ERROR_NO_NETWORK_CONNECTION)
            return getString(R.string.UPDATE_ERROR_NO_NETWORK_CONNECTION_DESC);
        if (code == UPDATE_ERROR_SERVICE_NOT_AVAILABLE)
            return getString(R.string.UPDATE_ERROR_SERVICE_NOT_AVAILABLE_DESC);
        if (code == UPDATE_ERROR_UPDATE_SDK)
            return getString(R.string.UPDATE_ERROR_UPDATE_SDK_DESC);
        if (code == UPDATE_ERROR_TIMESTAMP_OUT_OF_RANGE)
            return getString(R.string.UPDATE_ERROR_TIMESTAMP_OUT_OF_RANGE_DESC);
        if (code == UPDATE_ERROR_REQUEST_TIMEOUT)
            return getString(R.string.UPDATE_ERROR_REQUEST_TIMEOUT_DESC);
        if (code == UPDATE_ERROR_BAD_FRAME_QUALITY)
            return getString(R.string.UPDATE_ERROR_BAD_FRAME_QUALITY_DESC);
        else {
            return getString(R.string.UPDATE_ERROR_UNKNOWN_DESC);
        }
    }

    // Returns the error message for each error code
    private String getStatusTitleString(int code) {
        if (code == UPDATE_ERROR_AUTHORIZATION_FAILED)
            return getString(R.string.UPDATE_ERROR_AUTHORIZATION_FAILED_TITLE);
        if (code == UPDATE_ERROR_PROJECT_SUSPENDED)
            return getString(R.string.UPDATE_ERROR_PROJECT_SUSPENDED_TITLE);
        if (code == UPDATE_ERROR_NO_NETWORK_CONNECTION)
            return getString(R.string.UPDATE_ERROR_NO_NETWORK_CONNECTION_TITLE);
        if (code == UPDATE_ERROR_SERVICE_NOT_AVAILABLE)
            return getString(R.string.UPDATE_ERROR_SERVICE_NOT_AVAILABLE_TITLE);
        if (code == UPDATE_ERROR_UPDATE_SDK)
            return getString(R.string.UPDATE_ERROR_UPDATE_SDK_TITLE);
        if (code == UPDATE_ERROR_TIMESTAMP_OUT_OF_RANGE)
            return getString(R.string.UPDATE_ERROR_TIMESTAMP_OUT_OF_RANGE_TITLE);
        if (code == UPDATE_ERROR_REQUEST_TIMEOUT)
            return getString(R.string.UPDATE_ERROR_REQUEST_TIMEOUT_TITLE);
        if (code == UPDATE_ERROR_BAD_FRAME_QUALITY)
            return getString(R.string.UPDATE_ERROR_BAD_FRAME_QUALITY_TITLE);
        else {
            return getString(R.string.UPDATE_ERROR_UNKNOWN_TITLE);
        }
    }

    // Shows initialization error messages as System dialogs
    public void showInitializationErrorMessage(String message) {
        final String errorMessage = message;
        runOnUiThread(new Runnable() {
            public void run() {
                if (mErrorDialog != null) {
                    mErrorDialog.dismiss();
                }

                // Generates an Alert Dialog to show the error message
                AlertDialog.Builder builder = new AlertDialog.Builder(
                        PowerfulTrainerCard.this);
                builder
                        .setMessage(errorMessage)
                        .setTitle(getString(R.string.INIT_ERROR))
                        .setCancelable(false)
                        .setIcon(0)
                        .setPositiveButton("OK",
                                new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int id) {
                                        finish();
                                    }
                                });

                mErrorDialog = builder.create();
                mErrorDialog.show();
            }
        });
    }

    // This method sets the menu's settings
    private void setSampleAppMenuSettings() {
        AppMenuGroup group;

        group = mAppMenu.addGroup("", false);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.ICE_CREAM_SANDWICH) {
            group.addSelectionItem(getString(R.string.menu_playFullscreenVideo),
                    CMD_FULLSCREEN_VIDEO, mPlayFullscreenVideo);
        }
        group.addTextItem(getString(R.string.menu_back), -1);
        mAppMenu.attachMenu();
    }


    @Override
    public boolean menuProcess(int command) {

        boolean result = true;

        switch (command) {
            case CMD_BACK:
                finish();
                break;

            case CMD_FULLSCREEN_VIDEO:
                mPlayFullscreenVideo = !mPlayFullscreenVideo;

                for (VideoPlayerHelper videoPlayerHelper : mVideoPlayerHelper) {
                    if (videoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.PLAYING) {
                        // If it is playing then we pause it
                        videoPlayerHelper.pause();

                        videoPlayerHelper.play(true, mSeekPosition.get(mVideoPlayerHelper.indexOf(videoPlayerHelper)));
                    }
                }
                break;

        }

        return result;
    }

}
