package vn.edu.hcmus.powerfultrainercard;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.util.Base64;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.GestureDetector;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.MeasureSpec;
import android.view.View.OnClickListener;
import android.view.ViewGroup.LayoutParams;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.RelativeLayout;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import com.vuforia.CameraDevice;
import com.vuforia.ObjectTracker;
import com.vuforia.State;
import com.vuforia.TargetFinder;
import com.vuforia.TargetSearchResult;
import com.vuforia.Trackable;
import com.vuforia.Tracker;
import com.vuforia.TrackerManager;
import com.vuforia.Vuforia;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.lang.ref.WeakReference;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Vector;

import vn.edu.hcmus.powerfultrainercard.appmenu.AppMenu;
import vn.edu.hcmus.powerfultrainercard.appmenu.AppMenuGroup;
import vn.edu.hcmus.powerfultrainercard.appmenu.AppMenuInterface;
import vn.edu.hcmus.powerfultrainercard.exercise.Exercise;
import vn.edu.hcmus.powerfultrainercard.exercise.ExerciseOverlayView;
import vn.edu.hcmus.powerfultrainercard.exercise.ExerciseRenderer;
import vn.edu.hcmus.powerfultrainercard.exercise.videoplayback.VideoFailbackOverlay;
import vn.edu.hcmus.powerfultrainercard.exercise.videoplayback.VideoPlayerHelper;
import vn.edu.hcmus.powerfultrainercard.utils.LoadingDialogHandler;
import vn.edu.hcmus.powerfultrainercard.utils.Texture;
import vn.edu.hcmus.powerfultrainercard.vuforia.VuforiaAppControl;
import vn.edu.hcmus.powerfultrainercard.vuforia.VuforiaAppException;
import vn.edu.hcmus.powerfultrainercard.vuforia.VuforiaAppGLView;
import vn.edu.hcmus.powerfultrainercard.vuforia.VuforiaAppSession;

public class ExerciseActivity extends Activity implements VuforiaAppControl, AppMenuInterface {

    private static final String LOGTAG = "ExerciseActivity";

    final private static int CMD_BACK = -1;
    final private static int CMD_FULLSCREEN_VIDEO = 1;
    final public static int CMD_EXTENDED_TRACKING = 2;
    final public static int CMD_AUTOFOCUS = 3;
    final public static int CMD_FLASH = 4;
    final public static int CMD_CAMERA_FRONT = 5;
    final public static int CMD_CAMERA_REAR = 6;

    VuforiaAppSession vuforiaAppSession;

    private static final String mServerURL = "http://aloraha.com/api/exercise/video/";

    private static final int BOOKINFO_NOT_DISPLAYED = 0;
    private static final int BOOKINFO_IS_DISPLAYED = 1;

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

    static final int HIDE_STATUS_BAR = 0;
    static final int SHOW_STATUS_BAR = 1;

    static final int HIDE_2D_OVERLAY = 0;
    static final int SHOW_2D_OVERLAY = 1;

    static final int HIDE_LOADING_DIALOG = 0;
    static final int SHOW_LOADING_DIALOG = 1;

    private int mBookInfoStatus = BOOKINFO_NOT_DISPLAYED;

    private String mStatusBarText;

    private Exercise mExerciseData;
    private String mBookJSONUrl;
    private Texture mBookDataTexture;

    private boolean mIsLoadingBookData = false;
    private boolean mIsVideoPreviewPlaying = false;

    private GetBookDataTask mGetBookDataTask;

    private VuforiaAppGLView mGlView;

    private ExerciseRenderer mRenderer;

    private RelativeLayout mUILayout;
    private TextView mStatusBar;
    private Button mCloseButton;

    private int mlastErrorCode = 0;
    private int mInitErrorCode = 0;
    private boolean mFinishActivityOnError;

    private AlertDialog mErrorDialog;

    private GestureDetector mGestureDetector;

    private String lastTargetId = "";

    private static int mTextureSize = 768;

    private Vector<Texture> mVideoTextures;

    private VideoPlayerHelper mVideoPlayerHelper;
    private int mSeekPosition = 0;
    private boolean mWasPlaying = false;

    private boolean mReturningFromFullScreen = false;

    private boolean mPlayFullscreenVideo = false;
    private boolean mFlash = false;
    private boolean mContAutofocus = false;
    private boolean mExtendedTracking = false;

    private View mFlashOptionView;

    private AppMenu mAppMenu;

    public void deinitBooks() {
        TrackerManager trackerManager = TrackerManager.getInstance();
        ObjectTracker objectTracker = (ObjectTracker) trackerManager
                .getTracker(ObjectTracker.getClassType());
        if (objectTracker == null) {
            Log.e(LOGTAG,
                    "Failed to destroy the tracking data set because the ObjectTracker has not"
                            + " been initialized.");
            return;
        }

        TargetFinder finder = objectTracker.getTargetFinder();
        finder.deinit();
    }


    private void initStateVariables() {
        mRenderer.setRenderState(ExerciseRenderer.RS_SCANNING);
        mRenderer.setProductTexture(null);

        mRenderer.setScanningMode(true);
        mRenderer.isShowing2DOverlay(false);
        mRenderer.showAnimation3Dto2D(false);
        mRenderer.stopTransition3Dto2D();
        mRenderer.stopTransition2Dto3D();

        cleanTargetTrackedId();
    }

    public void productTextureIsCreated() {
        mRenderer.setRenderState(ExerciseRenderer.RS_TEXTURE_GENERATED);
    }

    public void setDeviceDPIScaleFactor(float dpiSIndicator) {
        mRenderer.setDPIScaleIndicator(dpiSIndicator);

        if (dpiSIndicator <= 1.0f) {
            mRenderer.setScaleFactor(3.2f);
        } else if (dpiSIndicator <= 1.5f) {
            mRenderer.setScaleFactor(2.6f);
        } else if (dpiSIndicator <= 2.0f) {
            mRenderer.setScaleFactor(2.0f);
        } else {
            mRenderer.setScaleFactor(1.2f);
        }
    }

    public void cleanTargetTrackedId() {
        synchronized (lastTargetId) {
            lastTargetId = "";
        }
    }

    static class StatusBarHandler extends Handler {
        private final WeakReference<ExerciseActivity> mExercise;

        StatusBarHandler(ExerciseActivity exerciseActivity) {
            mExercise = new WeakReference<>(exerciseActivity);
        }

        public void handleMessage(Message msg) {
            ExerciseActivity exerciseActivity = mExercise.get();
            if (exerciseActivity == null) {
                return;
            }

            if (msg.what == SHOW_STATUS_BAR) {
                exerciseActivity.mStatusBar.setText(exerciseActivity.mStatusBarText);
                exerciseActivity.mStatusBar.setVisibility(View.VISIBLE);
            } else {
                exerciseActivity.mStatusBar.setVisibility(View.GONE);
            }
        }
    }

    private Handler statusBarHandler = new StatusBarHandler(this);

    static class Overlay2dHandler extends Handler {
        private final WeakReference<ExerciseActivity> mExercise;

        Overlay2dHandler(ExerciseActivity exerciseActivity) {
            mExercise = new WeakReference<>(exerciseActivity);
        }

        public void handleMessage(Message msg) {
            ExerciseActivity exerciseActivity = mExercise.get();
            if (exerciseActivity == null) {
                return;
            }

            if (exerciseActivity.mCloseButton != null) {
                if (msg.what == SHOW_2D_OVERLAY) {
                    exerciseActivity.mCloseButton.setVisibility(View.VISIBLE);
                } else {
                    exerciseActivity.mCloseButton.setVisibility(View.GONE);
                }
            }
        }
    }

    private Handler overlay2DHandler = new Overlay2dHandler(this);

    private LoadingDialogHandler loadingDialogHandler = new LoadingDialogHandler(
            this);

    private double mLastErrorTime;

    private float mdpiScaleIndicator;

    boolean mIsDroidDevice = false;

    private Activity mActivity = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Log.d(LOGTAG, "onCreate");
        super.onCreate(savedInstanceState);

        mActivity = this;

        vuforiaAppSession = new VuforiaAppSession(this);

        startLoadingAnimation();

        vuforiaAppSession
                .initAR(this, ActivityInfo.SCREEN_ORIENTATION_FULL_SENSOR);

        mVideoTextures = new Vector<>();
        loadVideoTextures();

        mGestureDetector = new GestureDetector(this, new GestureListener());

        mdpiScaleIndicator = getApplicationContext().getResources()
                .getDisplayMetrics().density;

        mIsDroidDevice = android.os.Build.MODEL.toLowerCase().startsWith(
                "droid");
    }

    private void loadVideoTextures() {
        VideoFailbackOverlay videoFailbackOverlay = new VideoFailbackOverlay(this);

        videoFailbackOverlay.setVideoState(VideoPlayerHelper.MEDIA_STATE.NOT_READY);
        mVideoTextures.add(convertViewToTexture(videoFailbackOverlay));

        videoFailbackOverlay.setVideoState(VideoPlayerHelper.MEDIA_STATE.ERROR);
        mVideoTextures.add(convertViewToTexture(videoFailbackOverlay));

        videoFailbackOverlay.setVideoState(VideoPlayerHelper.MEDIA_STATE.PAUSED);
        mVideoTextures.add(convertViewToTexture(videoFailbackOverlay));

        videoFailbackOverlay.setVideoState(VideoPlayerHelper.MEDIA_STATE.PLAYING);
        mVideoTextures.add(convertViewToTexture(videoFailbackOverlay));

        videoFailbackOverlay = null;
        System.gc();
    }

    @Override
    protected void onResume() {
        Log.d(LOGTAG, "onResume");
        super.onResume();

        if (mIsDroidDevice) {
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
            setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
        }

        try {
            vuforiaAppSession.resumeAR();
        } catch (VuforiaAppException e) {
            Log.e(LOGTAG, e.getString());
        }

        if (mGlView != null) {
            mGlView.setVisibility(View.VISIBLE);
            mGlView.onResume();
        }

        mBookInfoStatus = BOOKINFO_NOT_DISPLAYED;

        if (mRenderer != null) {
            if (!mReturningFromFullScreen) {
                mRenderer.requestLoad(mSeekPosition, false);
            } else {
                mRenderer.requestLoad(mSeekPosition, mWasPlaying);
            }
        }

        mReturningFromFullScreen = false;

        hide2DOverlay();
    }

    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == 1) {

            mActivity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);

            if (resultCode == RESULT_OK) {
                String movieBeingPlayed = data.getStringExtra("movieName");
                mReturningFromFullScreen = true;

                if (movieBeingPlayed.compareTo(mRenderer.getMovieName()) == 0) {
                    mSeekPosition = data.getIntExtra("currentSeekPosition", 0);
                    mWasPlaying = false;
                }
            }
        }
    }

    @Override
    public void onConfigurationChanged(Configuration config) {
        Log.d(LOGTAG, "onConfigurationChanged");
        super.onConfigurationChanged(config);

        vuforiaAppSession.onConfigurationChanged();
    }

    @Override
    protected void onPause() {
        Log.d(LOGTAG, "onPause");
        super.onPause();

        try {
            vuforiaAppSession.pauseAR();
        } catch (VuforiaAppException e) {
            Log.e(LOGTAG, e.getString());
        }

        if (mRenderer != null) {
            mRenderer.deleteCurrentProductTexture();

            initStateVariables();
        }

        if (mGlView != null) {
            mGlView.setVisibility(View.INVISIBLE);
            mGlView.onPause();
        }

        if (mFlashOptionView != null && mFlash) {

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
                ((Switch) mFlashOptionView).setChecked(false);
            } else {
                ((CheckBox) mFlashOptionView).setChecked(false);
            }
        }

        if (mVideoPlayerHelper != null) {
            if (mVideoPlayerHelper.isPlayableOnTexture()) {
                mSeekPosition = mVideoPlayerHelper.getCurrentPosition();
                mWasPlaying = mVideoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.PLAYING;
            }

            mVideoPlayerHelper.unload();
        }
        mReturningFromFullScreen = false;
    }

    @Override
    protected void onDestroy() {
        Log.d(LOGTAG, "onDestroy");
        super.onDestroy();

        try {
            vuforiaAppSession.stopAR();
        } catch (VuforiaAppException e) {
            Log.e(LOGTAG, e.getString());
        }

        mVideoTextures.clear();
        mVideoTextures = null;

        System.gc();
    }


    private void startLoadingAnimation() {
        LayoutInflater inflater = LayoutInflater.from(this);
        mUILayout = (RelativeLayout) inflater.inflate(
                R.layout.camera_overlay_books, null, false);

        mUILayout.setVisibility(View.VISIBLE);
        mUILayout.setBackgroundColor(Color.BLACK);

        loadingDialogHandler.mLoadingDialogContainer = mUILayout
                .findViewById(R.id.loading_layout);
        loadingDialogHandler.mLoadingDialogContainer
                .setVisibility(View.VISIBLE);

        addContentView(mUILayout, new LayoutParams(LayoutParams.MATCH_PARENT,
                LayoutParams.MATCH_PARENT));

        mStatusBar = (TextView) mUILayout.findViewById(R.id.overlay_status);

        loadingDialogHandler
                .sendEmptyMessage(LoadingDialogHandler.SHOW_LOADING_DIALOG);

        mCloseButton = (Button) mUILayout
                .findViewById(R.id.overlay_close_button);

        mCloseButton.setOnClickListener(new OnClickListener() {
            public void onClick(View v) {
                mBookInfoStatus = BOOKINFO_NOT_DISPLAYED;

                loadingDialogHandler.sendEmptyMessage(HIDE_LOADING_DIALOG);

                if (mIsLoadingBookData) {
                    mGetBookDataTask.cancel(true);
                    mIsLoadingBookData = false;

                    cleanTargetTrackedId();
                }

                enterScanningMode();
            }
        });

        hide2DOverlay();
        hideStatusBar();
    }

    private void initApplicationAR() {
        int depthSize = 16;
        int stencilSize = 0;
        boolean translucent = Vuforia.requiresAlpha();

        mGlView = new VuforiaAppGLView(this);
        mGlView.init(translucent, depthSize, stencilSize);

        mRenderer = new ExerciseRenderer(vuforiaAppSession, this);
        mGlView.setRenderer(mRenderer);
        mRenderer.setVideoTextures(mVideoTextures);
        mVideoPlayerHelper = mRenderer.getVideoPlayerHelper();

        setDeviceDPIScaleFactor(mdpiScaleIndicator);

        initStateVariables();
    }

    public void setStatusBarText(String statusText) {
        mStatusBarText = statusText;
        statusBarHandler.sendEmptyMessage(SHOW_STATUS_BAR);
    }

    public void hideStatusBar() {
        if (mStatusBar.getVisibility() == View.VISIBLE) {
            statusBarHandler.sendEmptyMessage(HIDE_STATUS_BAR);
        }
    }

    public void showStatusBar() {
        if (mStatusBar.getVisibility() == View.GONE) {
            statusBarHandler.sendEmptyMessage(SHOW_STATUS_BAR);
        }
    }

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
                        ExerciseActivity.this);
                builder.setMessage(getStatusDescString(ExerciseActivity.this.mlastErrorCode))
                        .setTitle(getStatusTitleString(ExerciseActivity.this.mlastErrorCode))
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

    public void createProductTexture(String bookJSONUrl) {
        mBookJSONUrl = bookJSONUrl;

        if (mBookDataTexture != null) {
            mBookDataTexture = null;

            System.gc();
        }

        mGetBookDataTask = new GetBookDataTask();
        mGetBookDataTask.execute();
    }

    public void createProductTexture() {
        if (mExerciseData != null) {
            ExerciseOverlayView exView = new ExerciseOverlayView(
                    ExerciseActivity.this);

            updateProductView(exView, mExerciseData);

            mBookDataTexture = convertViewToTexture(exView);

            exView = null;
            System.gc();

            loadingDialogHandler.sendEmptyMessage(HIDE_LOADING_DIALOG);

            mIsLoadingBookData = false;

            productTextureIsCreated();
        }
    }

    private class GetBookDataTask extends AsyncTask<Void, Void, Void> {
        private String mBookDataJSONFullUrl;
        private static final String CHARSET = "UTF-8";


        protected void onPreExecute() {
            mIsLoadingBookData = true;

            StringBuilder builder = new StringBuilder();
            builder.append(mServerURL);
            builder.append(mBookJSONUrl);

            mBookDataJSONFullUrl = builder.toString();

            loadingDialogHandler.sendEmptyMessage(SHOW_LOADING_DIALOG);
        }

        protected Void doInBackground(Void... params) {
            HttpURLConnection connection = null;

            try {
                URL url = new URL(mBookDataJSONFullUrl);
                connection = (HttpURLConnection) url.openConnection();
                connection.setRequestProperty("Accept-Charset", CHARSET);
                connection.connect();

                int status = connection.getResponseCode();

                if (status != HttpURLConnection.HTTP_OK) {
                    mExerciseData = null;
                    mBookInfoStatus = BOOKINFO_NOT_DISPLAYED;

                    loadingDialogHandler.sendEmptyMessage(HIDE_LOADING_DIALOG);

                    cleanTargetTrackedId();

                    enterScanningMode();
                }

                BufferedReader reader = new BufferedReader(
                        new InputStreamReader(connection.getInputStream()));
                StringBuilder builder = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    builder.append(line);
                }

                if (mExerciseData != null) {
                    mExerciseData = null;

                }

                JSONObject jsonObject = new JSONObject(builder.toString()).getJSONObject("Data");

                mExerciseData = new Exercise();

                mExerciseData.setName(jsonObject.getString("Name"));
                mExerciseData.setDifficultyLevel(jsonObject.getString("DifficultyLevel"));
                mExerciseData.setFocus(jsonObject.getString("Focus"));
                mExerciseData.setEquipment(jsonObject.getString("Equipment"));
                mExerciseData.setBodyParts(jsonObject.getString("BodyParts"));
                mExerciseData.setVideoId(jsonObject.getString("VideoId"));

                String encodedImage = jsonObject.getString("Image");

                byte[] decodedString = Base64.decode(encodedImage, Base64.DEFAULT);
                Bitmap bitmap = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
                mExerciseData.setThumbnail(bitmap);

            } catch (Exception e) {
                Log.d(LOGTAG, "Couldn't get books. e: " + e);
            } finally {
                connection.disconnect();
            }

            return null;
        }

        protected void onProgressUpdate(Void... values) {
        }

        protected void onPostExecute(Void result) {
            createProductTexture();
        }
    }

    public Texture getProductTexture() {
        return mBookDataTexture;
    }

    private void updateProductView(ExerciseOverlayView productView, Exercise exercise) {
        productView.setTitle(exercise.getName());
        productView.setDifficultyLevel(exercise.getDifficultyLevel());
        productView.setFocus(exercise.getFocus());
        productView.setEquipment(exercise.getEquipment());
        productView.setBodyParts(exercise.getBodyParts());
        productView.setVideo(exercise.getVideoId());
        productView.setThumbnail(exercise.getThumbnail());
    }


    private Texture convertViewToTexture(View exView) {
        // Sets the layout params
        exView.setLayoutParams(new LayoutParams(
                RelativeLayout.LayoutParams.WRAP_CONTENT,
                RelativeLayout.LayoutParams.WRAP_CONTENT));

        exView.measure(MeasureSpec.makeMeasureSpec(mTextureSize,
                MeasureSpec.EXACTLY), MeasureSpec.makeMeasureSpec(
                mTextureSize, MeasureSpec.EXACTLY));

        exView.layout(0, 0, exView.getMeasuredWidth(),
                exView.getMeasuredHeight());

        Bitmap bitmap = Bitmap.createBitmap(mTextureSize, mTextureSize,
                Bitmap.Config.ARGB_8888);

        Canvas c = new Canvas(bitmap);
        exView.draw(c);

        System.gc();

        int width = bitmap.getWidth();
        int height = bitmap.getHeight();

        int[] data = new int[bitmap.getWidth() * bitmap.getHeight()];
        bitmap.getPixels(data, 0, bitmap.getWidth(), 0, 0,
                bitmap.getWidth(), bitmap.getHeight());

        bitmap.recycle();
        bitmap = null;
        c = null;
        System.gc();

        Texture texture = Texture.loadTextureFromIntBuffer(data, width, height);

        data = null;
        System.gc();

        return texture;
    }

    public void enterContentMode() {
        mBookInfoStatus = BOOKINFO_IS_DISPLAYED;

        show2DOverlay();

        TrackerManager trackerManager = TrackerManager.getInstance();
        ObjectTracker objectTracker = (ObjectTracker) trackerManager
                .getTracker(ObjectTracker.getClassType());
        TargetFinder targetFinder = objectTracker.getTargetFinder();

        targetFinder.stop();

        mRenderer.setScanningMode(false);
    }

    private void enterScanningMode() {

        hide2DOverlay();

        TrackerManager trackerManager = TrackerManager.getInstance();
        ObjectTracker objectTracker = (ObjectTracker) trackerManager
                .getTracker(ObjectTracker.getClassType());
        TargetFinder targetFinder = objectTracker.getTargetFinder();

        targetFinder.startRecognition();

        targetFinder.clearTrackables();

        mRenderer.setScanningMode(true);

        mRenderer.showAnimation3Dto2D(false);
        mRenderer.isShowing2DOverlay(false);
        mRenderer.setRenderState(ExerciseRenderer.RS_SCANNING);
    }

    public void show2DOverlay() {
        overlay2DHandler.sendEmptyMessage(SHOW_2D_OVERLAY);
    }

    public void hide2DOverlay() {
        overlay2DHandler.sendEmptyMessage(HIDE_2D_OVERLAY);
    }


    public boolean onTouchEvent(MotionEvent event) {
        boolean result = false;
        if (mAppMenu != null)
            result = mAppMenu.processEvent(event);

        if (!result)
            mGestureDetector.onTouchEvent(event);

        return result;
    }

    private class GestureListener extends
            GestureDetector.SimpleOnGestureListener {
        public boolean onDown(MotionEvent e) {
            return true;
        }


        public boolean onSingleTapUp(MotionEvent event) {
            boolean isSingleTapHandled = true;

            if (mBookInfoStatus == BOOKINFO_NOT_DISPLAYED) {

                boolean result = CameraDevice.getInstance().setFocusMode(
                        CameraDevice.FOCUS_MODE.FOCUS_MODE_TRIGGERAUTO);

                if (!result)
                    Log.e("SingleTapUp", "Unable to trigger focus");

                // If the book info is displayed it shows the book data web view
            } else if (mBookInfoStatus == BOOKINFO_IS_DISPLAYED) {

                if (mIsVideoPreviewPlaying) {
                    isSingleTapHandled = false;

                    if (mRenderer != null && mRenderer.isTapOnScreenInsideTarget(event.getX(), event.getY())) {

                        if (mVideoPlayerHelper.isPlayableOnTexture()) {

                            if ((mVideoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.PAUSED)
                                    || (mVideoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.READY)
                                    || (mVideoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.STOPPED)
                                    || (mVideoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.REACHED_END)) {

                                if ((mVideoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.REACHED_END))
                                    mSeekPosition = 0;

                                mVideoPlayerHelper.play(mPlayFullscreenVideo, mSeekPosition);
                                mSeekPosition = VideoPlayerHelper.CURRENT_POSITION;
                            } else if (mVideoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.PLAYING) {
                                mVideoPlayerHelper.pause();
                            }
                        } else if (mVideoPlayerHelper.isPlayableFullscreen()) {
                            mVideoPlayerHelper.play(true, VideoPlayerHelper.CURRENT_POSITION);
                        }

                        isSingleTapHandled = true;
                    }
                } else {
                    float x = event.getX(0);
                    float y = event.getY(0);

                    DisplayMetrics metrics = new DisplayMetrics();
                    getWindowManager().getDefaultDisplay().getMetrics(metrics);

                    float screenLeft = metrics.widthPixels / 8.0f;
                    float screenRight = metrics.widthPixels * 0.8f;
                    float screenUp = metrics.heightPixels / 7.0f;
                    float screenDown = metrics.heightPixels * 0.7f;

                    if (x < screenRight && x > screenLeft && y < screenDown
                            && y > screenUp) {
                        mIsVideoPreviewPlaying = true;
                        mRenderer.setRenderState(ExerciseRenderer.RS_VIDEO_PLAYBACK);
                    }
                }
            }

            return isSingleTapHandled;
        }
    }

    public void playVideo() {
        if (mVideoPlayerHelper.isPlayableOnTexture()) {
            if (mVideoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.READY) {

                if ((mVideoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.REACHED_END))
                    mSeekPosition = 0;

                mVideoPlayerHelper.play(mPlayFullscreenVideo, mSeekPosition);
                mSeekPosition = VideoPlayerHelper.CURRENT_POSITION;
            }
        } else if (mVideoPlayerHelper.isPlayableFullscreen()) {
            mVideoPlayerHelper.play(true, VideoPlayerHelper.CURRENT_POSITION);
        }
    }

    @Override
    public boolean doLoadTrackersData() {
        Log.d(LOGTAG, "initBooks");

        // Get the object tracker:
        TrackerManager trackerManager = TrackerManager.getInstance();
        ObjectTracker objectTracker = (ObjectTracker) trackerManager
                .getTracker(ObjectTracker.getClassType());

        // Initialize target finder:
        TargetFinder targetFinder = objectTracker.getTargetFinder();

        // Start initialization:
        if (targetFinder.startInit(PowerfulTrainerContants.CLOUD_ACCESS_KEY, PowerfulTrainerContants.CLOUD_SECRET_KEY)) {
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

        //targetFinder.setUIPointColor(21, 101, 191);

        return true;
    }

    @Override
    public boolean doUnloadTrackersData() {
        return true;
    }

    @Override
    public void onInitARDone(VuforiaAppException exception) {

        if (exception == null) {
            initApplicationAR();

            addContentView(mGlView, new LayoutParams(LayoutParams.MATCH_PARENT,
                    LayoutParams.MATCH_PARENT));

            try {
                vuforiaAppSession.startAR(CameraDevice.CAMERA_DIRECTION.CAMERA_DIRECTION_DEFAULT);
            } catch (VuforiaAppException e) {
                Log.e(LOGTAG, e.getString());
            }

            mRenderer.mIsActive = true;

            boolean result = CameraDevice.getInstance().setFocusMode(
                    CameraDevice.FOCUS_MODE.FOCUS_MODE_CONTINUOUSAUTO);

            if (!result)
                Log.e(LOGTAG, "Unable to enable continuous autofocus");

            mUILayout.bringToFront();

            loadingDialogHandler.sendEmptyMessage(HIDE_LOADING_DIALOG);

            mUILayout.setBackgroundColor(Color.TRANSPARENT);

            mAppMenu = new AppMenu(this, this, getString(R.string.app_name),
                    mGlView, mUILayout, null);
            setSampleAppMenuSettings();

        } else {
            Log.e(LOGTAG, exception.getString());
            if (mInitErrorCode != 0) {
                showErrorMessage(mInitErrorCode, 10, true);
            } else {
                showInitializationErrorMessage(exception.getString());
            }
        }
    }

    public void showInitializationErrorMessage(String message) {
        final String errorMessage = message;
        runOnUiThread(new Runnable() {
            public void run() {
                if (mErrorDialog != null) {
                    mErrorDialog.dismiss();
                }

                AlertDialog.Builder builder = new AlertDialog.Builder(ExerciseActivity.this);
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

    @Override
    public void onVuforiaUpdate(State state) {
        TrackerManager trackerManager = TrackerManager.getInstance();

        ObjectTracker objectTracker = (ObjectTracker) trackerManager
                .getTracker(ObjectTracker.getClassType());

        TargetFinder finder = objectTracker.getTargetFinder();

        final int statusCode = finder.updateSearchResults();

        if (statusCode < 0) {

            boolean closeAppAfterError = (
                    statusCode == UPDATE_ERROR_NO_NETWORK_CONNECTION ||
                            statusCode == UPDATE_ERROR_SERVICE_NOT_AVAILABLE);

            showErrorMessage(statusCode, state.getFrame().getTimeStamp(), closeAppAfterError);

        } else if (statusCode == TargetFinder.UPDATE_RESULTS_AVAILABLE) {
            if (finder.getResultCount() > 0) {
                TargetSearchResult result = finder.getResult(0);

                if (result.getTrackingRating() > 0) {
                    Trackable newTrackable = finder.enableTracking(result);
                    if (newTrackable != null) {
                        Log.d(LOGTAG, "Successfully created new trackable '"
                                + newTrackable.getName() + "' with rating '"
                                + result.getTrackingRating() + "'.");

                        Log.d(LOGTAG, "Comparing Strings. currentTargetId: "
                                + result.getUniqueTargetId() + "  lastTargetId: "
                                + lastTargetId);

                        if (mExtendedTracking)
                            newTrackable.startExtendedTracking();

                        if (!result.getUniqueTargetId().equals(lastTargetId)) {
                            mRenderer.deleteCurrentProductTexture();

                            mRenderer.setRenderState(ExerciseRenderer.RS_LOADING);

                            mRenderer.getOrCreateNewTarget(result.getTargetName());

                            createProductTexture(result.getTargetName());

                        } else
                            mRenderer.setRenderState(ExerciseRenderer.RS_TEXTURE_GENERATED);

                        mIsVideoPreviewPlaying = false;

                        mRenderer.setFramesToSkipBeforeRenderingTransition(10);

                        mRenderer.showAnimation3Dto2D(true);
                        mRenderer.resetTrackingStarted();

                        synchronized (lastTargetId) {
                            lastTargetId = result.getUniqueTargetId();
                        }

                        enterContentMode();
                    } else
                        Log.e(LOGTAG, "Failed to create new trackable.");
                }
            }
        }
    }


    @Override
    public boolean doInitTrackers() {
        TrackerManager tManager = TrackerManager.getInstance();
        Tracker tracker;

        boolean result = true;

        tracker = tManager.initTracker(ObjectTracker.getClassType());
        if (tracker == null) {
            Log.e(
                    LOGTAG,
                    "Tracker not initialized. Tracker already initialized or the camera is already started");
            result = false;
        } else {
            Log.i(LOGTAG, "Tracker successfully initialized");
        }

        return result;
    }


    @Override
    public boolean doStartTrackers() {
        boolean result = true;

        // Start the tracker:
        TrackerManager trackerManager = TrackerManager.getInstance();
        ObjectTracker objectTracker = (ObjectTracker) trackerManager
                .getTracker(ObjectTracker.getClassType());
        objectTracker.start();

        if (mRenderer.getScanningMode()) {
            TargetFinder targetFinder = objectTracker.getTargetFinder();
            targetFinder.startRecognition();
        }

        return result;
    }


    @Override
    public boolean doStopTrackers() {
        boolean result = true;

        TrackerManager trackerManager = TrackerManager.getInstance();
        ObjectTracker objectTracker = (ObjectTracker) trackerManager
                .getTracker(ObjectTracker.getClassType());

        if (objectTracker != null) {
            objectTracker.stop();

            TargetFinder targetFinder = objectTracker.getTargetFinder();
            targetFinder.stop();

            targetFinder.clearTrackables();
        } else {
            result = false;
        }

        return result;
    }


    @Override
    public boolean doDeinitTrackers() {
        boolean result = true;

        TrackerManager tManager = TrackerManager.getInstance();
        tManager.deinitTracker(ObjectTracker.getClassType());

        return result;
    }

    private void setSampleAppMenuSettings() {
        AppMenuGroup group;

        group = mAppMenu.addGroup("", false);
        mFlashOptionView = group.addSelectionItem(
                getString(R.string.menu_flash), CMD_FLASH, false);
        group.addSelectionItem(getString(R.string.menu_contAutofocus),
                CMD_AUTOFOCUS, mContAutofocus);
        group.addSelectionItem(getString(R.string.menu_extended_tracking),
                CMD_EXTENDED_TRACKING, false);
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

                if (mVideoPlayerHelper.getStatus() == VideoPlayerHelper.MEDIA_STATE.PLAYING) {
                    mVideoPlayerHelper.pause();

                    mVideoPlayerHelper.play(true, mSeekPosition);
                }
                break;

            case CMD_FLASH:
                result = CameraDevice.getInstance().setFlashTorchMode(!mFlash);

                if (result) {
                    mFlash = !mFlash;
                } else {
                    showToast(getString(mFlash ? R.string.menu_flash_error_off
                            : R.string.menu_flash_error_on));
                    Log.e(LOGTAG,
                            getString(mFlash ? R.string.menu_flash_error_off
                                    : R.string.menu_flash_error_on));
                }
                break;

            case CMD_AUTOFOCUS:

                if (mContAutofocus) {
                    result = CameraDevice.getInstance().setFocusMode(
                            CameraDevice.FOCUS_MODE.FOCUS_MODE_NORMAL);

                    if (result) {
                        mContAutofocus = false;
                    } else {
                        showToast(getString(R.string.menu_contAutofocus_error_off));
                        Log.e(LOGTAG, getString(R.string.menu_contAutofocus_error_off));
                    }
                } else {
                    result = CameraDevice.getInstance().setFocusMode(
                            CameraDevice.FOCUS_MODE.FOCUS_MODE_CONTINUOUSAUTO);

                    if (result) {
                        mContAutofocus = true;
                    } else {
                        showToast(getString(R.string.menu_contAutofocus_error_on));
                        Log.e(LOGTAG, getString(R.string.menu_contAutofocus_error_on));
                    }
                }
                break;

            case CMD_EXTENDED_TRACKING:
                TrackerManager trackerManager = TrackerManager.getInstance();
                ObjectTracker objectTracker = (ObjectTracker) trackerManager
                        .getTracker(ObjectTracker.getClassType());

                TargetFinder targetFinder = objectTracker.getTargetFinder();

                if (targetFinder.getNumImageTargets() == 0) {
                    result = true;
                }

                for (int tIdx = 0; tIdx < targetFinder.getNumImageTargets(); tIdx++) {
                    Trackable trackable = targetFinder.getImageTarget(tIdx);

                    if (!mExtendedTracking) {
                        if (!trackable.startExtendedTracking()) {
                            Log.e(LOGTAG, "Failed to start extended tracking target");
                            result = false;
                        } else {
                            Log.d(LOGTAG, "Successfully started extended tracking target");
                        }
                    } else {
                        if (!trackable.stopExtendedTracking()) {
                            Log.e(LOGTAG, "Failed to stop extended tracking target");
                            result = false;
                        } else {
                            Log.d(LOGTAG, "Successfully started extended tracking target");
                        }
                    }
                }

                if (result)
                    mExtendedTracking = !mExtendedTracking;

                break;
        }

        return result;
    }

    private void showToast(String text) {
        Toast.makeText(this, text, Toast.LENGTH_SHORT).show();
    }
}
