package vn.edu.hcmus.powerfultrainercard.vuforia;

import com.vuforia.State;

public interface VuforiaAppControl {
    boolean doInitTrackers();
    boolean doLoadTrackersData();
    boolean doStartTrackers();
    boolean doStopTrackers();
    boolean doUnloadTrackersData();
    boolean doDeinitTrackers();
    void onInitARDone(VuforiaAppException e);
    void onVuforiaUpdate(State state);

}
