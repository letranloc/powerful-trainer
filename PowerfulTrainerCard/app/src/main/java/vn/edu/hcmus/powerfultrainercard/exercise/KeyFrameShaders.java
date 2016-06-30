package vn.edu.hcmus.powerfultrainercard.exercise;

public class KeyFrameShaders {

    public static final String KEY_FRAME_VERTEX_SHADER =
            "attribute vec4 vertexPosition; " +
                    "attribute vec4 vertexNormal; " +
                    "attribute vec2 vertexTexCoord; " +
                    " " +
                    "varying vec2 texCoord; " +
                    "varying vec4 normal; " +
                    " " +
                    "uniform mat4 modelViewProjectionMatrix; " +
                    " " +
                    "void main() " +
                    "{ " +
                    "   gl_Position = modelViewProjectionMatrix * vertexPosition; " +
                    "   normal = vertexNormal; " +
                    "   texCoord = vertexTexCoord; " +
                    "} ";

    public static final String KEY_FRAME_FRAGMENT_SHADER =
            "precision mediump float; " +
                    " " +
                    "varying vec2 texCoord; " +
                    "varying vec4 normal; " +
                    " " +
                    "uniform sampler2D texSampler2D; " +
                    " " +
                    "void main() " +
                    "{ " +
                    "   gl_FragColor = texture2D(texSampler2D, texCoord); " +
                    "} ";
}
