#pragma header

vec4 colors[16];

float minDist = 3.;
vec4 selected;

void main()
{
    colors[0] = vec4(25. / 255., 61. / 255., 63. / 255., 1.);
    colors[1] = vec4(63. / 255., 40. / 255., 50. / 255., 1.);
    colors[2] = vec4(50. / 255., 115. / 255., 69. / 255., 1.);
    colors[3] = vec4(116. / 255., 63. / 255., 57. / 255., 1.);
    colors[4] = vec4(158. / 255., 40. / 255., 53. / 255., 1.);
    colors[5] = vec4(79. / 255., 103. / 255., 129. / 255., 1.);
    colors[6] = vec4(4. / 255., 132. / 255., 209. / 255., 1.);
    colors[7] = vec4(229. / 255., 59. / 255., 68. / 255., 1.);
    colors[8] = vec4(99. / 255., 198. / 255., 77. / 255., 1.);
    colors[9] = vec4(184. / 255., 111. / 255., 80. / 255., 1.);
    colors[10] = vec4(251. / 255., 146. / 255., 43. / 255., 1.);
    colors[11] = vec4(228. / 255., 166. / 255., 114. / 255., 1.);
    colors[12] = vec4(44. / 255., 232. / 255., 244. / 255., 1.);
    colors[13] = vec4(175. / 255., 191. / 255., 210. / 255., 1.);
    colors[14] = vec4(255. / 255., 231. / 255., 98. / 255., 1.);
    colors[15] = vec4(255. / 255., 255. / 255., 255. / 255., 1.);

    vec4 color = flixel_texture2D(bitmap, openfl_TextureCoordv);

    for (int i = 0; i < 16; i++) {
        float dist = pow(abs(color.r - colors[i].r), 2.) + pow(abs(color.g - colors[i].g), 2.) + pow(abs(color.b - colors[i].b), 2.);
        if (dist < minDist) {
            minDist = dist;
            selected = colors[i];
        }
    }

    gl_FragColor = selected;
}
