package vn.edu.hcmus.powerfultrainercard.exercise;

import android.content.Context;
import android.graphics.Bitmap;
import android.media.MediaPlayer;
import android.os.Bundle;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.MediaController;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.VideoView;

import vn.edu.hcmus.powerfultrainercard.R;

public class ExerciseOverlayView extends RelativeLayout {

    private static final String VIDEO_BASE_URL = "https://az803746.vo.msecnd.net/tenant/amp/entityid/";

    private TextView mTitle;
    private TextView mDifficultyLevel;
    private TextView mFocus;
    private TextView mEquipment;
    private TextView mBodyParts;
    private ImageView mThumbnail;

    private VideoView mVideoPreview;

    private View mExInformation;
    private View mExPreview;

    private MediaController mMediaController;

    public ExerciseOverlayView(Context context) {
        this(context, null);
    }

    public ExerciseOverlayView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public ExerciseOverlayView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        inflateLayout(context);
        //setupVideoPreview();
    }

    private void inflateLayout(Context context) {

        final LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.bitmap_layout, this, true);

        mTitle = (TextView) view.findViewById(R.id.custom_view_title);
        mDifficultyLevel = (TextView) view.findViewById(R.id.custom_view_difficulty_level);
        mFocus = (TextView) view.findViewById(R.id.custom_view_focus);
        mEquipment = (TextView) view.findViewById(R.id.custom_view_equipment);
        mBodyParts = (TextView) view.findViewById(R.id.custom_view_body_parts);
        mThumbnail = (ImageView) view.findViewById(R.id.custom_view_thumbnail);

        mVideoPreview = (VideoView) view.findViewById(R.id.custom_view_video_preview);

        mExInformation = view.findViewById(R.id.custom_view_exercise_information);
        mExPreview = view.findViewById(R.id.custom_view_exercise_video_preview);
    }

    private void setupVideoPreview() {
        if (mMediaController == null) {
            mMediaController = new MediaController(getContext());
            mMediaController.setAnchorView(mVideoPreview);
            mVideoPreview.setMediaController(mMediaController);
        }

        mVideoPreview.requestFocus();

        mVideoPreview.setOnPreparedListener(new MediaPlayer.OnPreparedListener() {

            public void onPrepared(MediaPlayer mediaPlayer) {
                mediaPlayer.setOnVideoSizeChangedListener(new MediaPlayer.OnVideoSizeChangedListener() {
                    @Override
                    public void onVideoSizeChanged(MediaPlayer mp, int width, int height) {
                        mMediaController.setAnchorView(mVideoPreview);
                    }
                });
            }
        });
    }

    public void onSaveInstanceState(Bundle savedInstanceState) {
        savedInstanceState.putInt("CurrentPosition", mVideoPreview.getCurrentPosition());
        mVideoPreview.pause();
    }

    public void onRestoreInstanceState(Bundle savedInstanceState) {
        int position = savedInstanceState.getInt("CurrentPosition");
        mVideoPreview.seekTo(position);
    }

    public void setTitle(String title) {
        mTitle.setText(title);
    }

    public void setDifficultyLevel(String difficultyLevel) {
        mDifficultyLevel.setText(difficultyLevel);
    }

    public void setFocus(String focus) {
        mFocus.setText(focus);
    }

    public void setEquipment(String equipment) {
        mEquipment.setText(equipment);
    }

    public void setBodyParts(String bodyParts) {
        mBodyParts.setText(bodyParts);
    }

    public void setThumbnail(Bitmap thumbnail) {
        mThumbnail.setImageBitmap(thumbnail);
    }

    public void setVideo(String videoId) {
        mVideoPreview.setVideoPath(VIDEO_BASE_URL + videoId);
        setupVideoPreview();
    }

    public void showVideoPreview() {
        mExInformation.setVisibility(View.GONE);
        mExPreview.setVisibility(View.VISIBLE);

        mVideoPreview.start();
    }
}
