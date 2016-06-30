package vn.edu.hcmus.powerfultrainercard.exercise;

import android.graphics.Bitmap;

public class Exercise {

    private String name;
    private String difficultyLevel;
    private String focus;
    private String equipment;
    private String bodyParts;
    private String videoId;
    private Bitmap thumbnail;

    public Exercise() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(String difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public String getFocus() {
        return focus;
    }

    public void setFocus(String focus) {
        this.focus = focus;
    }

    public String getEquipment() {
        return equipment;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }

    public String getBodyParts() {
        return bodyParts;
    }

    public void setBodyParts(String bodyParts) {
        this.bodyParts = bodyParts;
    }

    public String getVideoId() {
        return videoId;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }

    public Bitmap getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(Bitmap thumbnail) {
        this.thumbnail = thumbnail;
    }

    public void recycle() {
        // Cleans the Thumb bitmap variable
        thumbnail.recycle();
        thumbnail = null;
    }
}
