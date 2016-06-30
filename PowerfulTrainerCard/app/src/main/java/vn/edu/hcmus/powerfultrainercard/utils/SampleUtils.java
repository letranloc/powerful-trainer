package vn.edu.hcmus.powerfultrainercard.utils;

import android.opengl.GLES20;
import android.util.Log;

import java.nio.Buffer;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;


public class SampleUtils {

    private static final String LOGTAG = "SampleUtils";

    static int initShader(int shaderType, String source) {
        int shader = GLES20.glCreateShader(shaderType);
        if (shader != 0) {
            GLES20.glShaderSource(shader, source);
            GLES20.glCompileShader(shader);

            int[] glStatusVar = {GLES20.GL_FALSE};
            GLES20.glGetShaderiv(shader, GLES20.GL_COMPILE_STATUS, glStatusVar,
                    0);
            if (glStatusVar[0] == GLES20.GL_FALSE) {
                Log.e(LOGTAG, "Could NOT compile shader " + shaderType + " : "
                        + GLES20.glGetShaderInfoLog(shader));
                GLES20.glDeleteShader(shader);
                shader = 0;
            }
        }
        return shader;
    }

    public static int createProgramFromShaderSrc(String vertexShaderSrc,
                                                 String fragmentShaderSrc) {
        int vertShader = initShader(GLES20.GL_VERTEX_SHADER, vertexShaderSrc);
        int fragShader = initShader(GLES20.GL_FRAGMENT_SHADER,
                fragmentShaderSrc);

        if (vertShader == 0 || fragShader == 0)
            return 0;

        int program = GLES20.glCreateProgram();
        if (program != 0) {
            GLES20.glAttachShader(program, vertShader);
            checkGLError("glAttchShader(vert)");

            GLES20.glAttachShader(program, fragShader);
            checkGLError("glAttchShader(frag)");

            GLES20.glLinkProgram(program);
            int[] glStatusVar = {GLES20.GL_FALSE};
            GLES20.glGetProgramiv(program, GLES20.GL_LINK_STATUS, glStatusVar,
                    0);
            if (glStatusVar[0] == GLES20.GL_FALSE) {
                Log.e(
                        LOGTAG,
                        "Could NOT link program : "
                                + GLES20.glGetProgramInfoLog(program));
                GLES20.glDeleteProgram(program);
                program = 0;
            }
        }

        return program;
    }

    public static void checkGLError(String op) {
        for (int error = GLES20.glGetError(); error != 0; error = GLES20
                .glGetError())
            Log.e(
                    LOGTAG,
                    "After operation " + op + " got glError 0x"
                            + Integer.toHexString(error));
    }

    public static void screenCoordToCameraCoord(int screenX, int screenY,
                                                int screenDX, int screenDY, int screenWidth, int screenHeight,
                                                int cameraWidth, int cameraHeight, int[] cameraX, int[] cameraY,
                                                int[] cameraDX, int[] cameraDY) {
        boolean isPortraitMode = (screenWidth < screenHeight);
        float videoWidth, videoHeight;
        videoWidth = (float) cameraWidth;
        videoHeight = (float) cameraHeight;

        if (isPortraitMode) {
            int tmp = screenX;
            screenX = screenY;
            screenY = screenWidth - tmp;

            tmp = screenDX;
            screenDX = screenDY;
            screenDY = tmp;

            tmp = screenWidth;
            screenWidth = screenHeight;
            screenHeight = tmp;
        } else {
            videoWidth = (float) cameraWidth;
            videoHeight = (float) cameraHeight;
        }

        float videoAspectRatio = videoHeight / videoWidth;
        float screenAspectRatio = (float) screenHeight / (float) screenWidth;

        float scaledUpX;
        float scaledUpY;
        float scaledUpVideoWidth;
        float scaledUpVideoHeight;

        if (videoAspectRatio < screenAspectRatio) {
            scaledUpVideoWidth = (float) screenHeight / videoAspectRatio;
            scaledUpVideoHeight = screenHeight;
            scaledUpX = (float) screenX
                    + ((scaledUpVideoWidth - (float) screenWidth) / 2.0f);
            scaledUpY = (float) screenY;
        } else {
            // the video width will fit in the screen width
            scaledUpVideoHeight = (float) screenWidth * videoAspectRatio;
            scaledUpVideoWidth = screenWidth;
            scaledUpY = (float) screenY
                    + ((scaledUpVideoHeight - (float) screenHeight) / 2.0f);
            scaledUpX = (float) screenX;
        }

        if (cameraX != null && cameraX.length > 0) {
            cameraX[0] = (int) ((scaledUpX / (float) scaledUpVideoWidth) * videoWidth);
        }

        if (cameraY != null && cameraY.length > 0) {
            cameraY[0] = (int) ((scaledUpY / (float) scaledUpVideoHeight) * videoHeight);
        }

        if (cameraDX != null && cameraDX.length > 0) {
            cameraDX[0] = (int) (((float) screenDX / (float) scaledUpVideoWidth) * videoWidth);
        }

        if (cameraDY != null && cameraDY.length > 0) {
            cameraDY[0] = (int) (((float) screenDY / (float) scaledUpVideoHeight) * videoHeight);
        }
    }


    public static float[] getOrthoMatrix(float nLeft, float nRight,
                                         float nBottom, float nTop, float nNear, float nFar) {
        float[] nProjMatrix = new float[16];

        int i;
        for (i = 0; i < 16; i++)
            nProjMatrix[i] = 0.0f;

        nProjMatrix[0] = 2.0f / (nRight - nLeft);
        nProjMatrix[5] = 2.0f / (nTop - nBottom);
        nProjMatrix[10] = 2.0f / (nNear - nFar);
        nProjMatrix[12] = -(nRight + nLeft) / (nRight - nLeft);
        nProjMatrix[13] = -(nTop + nBottom) / (nTop - nBottom);
        nProjMatrix[14] = (nFar + nNear) / (nFar - nNear);
        nProjMatrix[15] = 1.0f;

        return nProjMatrix;
    }

    public static Buffer fillBuffer(double[] array) {
        // Convert to floats because OpenGL doesnt work on doubles, and manually
        // casting each input value would take too much time.
        ByteBuffer bb = ByteBuffer.allocateDirect(4 * array.length); // each
        // float
        // takes 4
        // bytes
        bb.order(ByteOrder.LITTLE_ENDIAN);
        for (double d : array)
            bb.putFloat((float) d);
        bb.rewind();

        return bb;
    }

    public static Buffer fillBuffer(short[] array) {
        ByteBuffer bb = ByteBuffer.allocateDirect(2 * array.length); // each
        // short
        // takes 2
        // bytes
        bb.order(ByteOrder.LITTLE_ENDIAN);
        for (short s : array)
            bb.putShort(s);
        bb.rewind();

        return bb;
    }

    public static Buffer fillBuffer(float[] array) {
        // Convert to floats because OpenGL doesnt work on doubles, and manually
        // casting each input value would take too much time.
        ByteBuffer bb = ByteBuffer.allocateDirect(4 * array.length); // each
        // float
        // takes 4
        // bytes
        bb.order(ByteOrder.LITTLE_ENDIAN);
        for (float d : array)
            bb.putFloat(d);
        bb.rewind();

        return bb;

    }
}
