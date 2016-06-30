package vn.edu.hcmus.powerfultrainercard.exercise.videoplayback;


import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.RelativeLayout;

import vn.edu.hcmus.powerfultrainercard.R;
import vn.edu.hcmus.powerfultrainercard.exercise.videoplayback.VideoPlayerHelper.MEDIA_STATE;

public class VideoFailbackOverlay extends RelativeLayout {

    private ImageView mVideoFailback;
    private View mBackground;

    public VideoFailbackOverlay(Context context) {
        this(context, null);
    }

    public VideoFailbackOverlay(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public VideoFailbackOverlay(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        inflateLayout(context);
    }

    private void inflateLayout(Context context) {
        final LayoutInflater inflater = LayoutInflater.from(context);
        View view = inflater.inflate(R.layout.video_failback_layout, this, true);

        mVideoFailback = (ImageView) view.findViewById(R.id.video_failback_button);
        mVideoFailback.setImageResource(R.drawable.busy);
        mBackground = view.findViewById(R.id.video_failback_background);
    }

    public void setVideoState(MEDIA_STATE state) {
        switch (state) {
            case ERROR:
                mVideoFailback.setImageResource(R.drawable.error);
                toggleVisibility(View.VISIBLE, View.VISIBLE);
                break;
            case PLAYING:
                toggleVisibility(View.GONE, View.GONE);
                break;
            case PAUSED:
                mVideoFailback.setImageResource(R.drawable.play);
                toggleVisibility(View.GONE, View.VISIBLE);
                break;
            case NOT_READY:
            default:
                mVideoFailback.setImageResource(R.drawable.busy);
                toggleVisibility(View.VISIBLE, View.VISIBLE);
                break;
        }
    }

    private void toggleVisibility(int background, int button) {
        mVideoFailback.setVisibility(button);
        mBackground.setVisibility(background);
    }
}
