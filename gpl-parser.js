/**
 * OpenFL/HaxeFlixel Posterization Shader Generator
 *
 * Done this way for a few reasons.  GLSL shader specs don't always allow array value assignment at
 * declaration time. HaxeFlixel/OpenFL doesn't allow dynamically creating the shaders.  This is the
 * next best thing.
 *
 * Inspired by: https://twitter.com/NoelFB/status/1315502342628798470
 * Referenced: https://github.com/01010111/zerolib-flixel/blob/master/zero/flixel/shaders/FourColor.hx
 * Thanks to @halfbuzz on the Haxe discord!
 */
const fs = require('fs')

const paletteName = process.argv[2]
const fileOut = process.argv[3]

const totalColor = ([r, g, b]) => parseInt(r) + parseInt(g) + parseInt(b)
const toInt = ([r, g, b]) => parseInt(r) + parseInt(g) * 16 + parseInt(b) * 16 * 16

if (!paletteName || !fileOut) {
	throw new Error('Usage: `node gpl-parser.js [PALETTE_FILE_NAME] [OUTPUT_FILE_NAME]`')
}

const paletteFile = fs.readFileSync(paletteName, 'utf8')
fileLines = paletteFile.split('\n')
if (fileLines[0] !== 'GIMP Palette') {
	throw new Error('Not A Gimp File?')
}

// we use toInt to map in the shader, but the items are sorted by totalColor
colors = fileLines
	.filter((line, i) => i && line && line[0] !== '#')
	.map(str => str.split('\t'))
	.sort((a, b) => totalColor(a) - totalColor(b))
	.map((item, i) => `    colors[${i}] = vec4(${item[0]}. / 255., ${item[1]}. / 255., ${item[2]}. / 255., 1.);`)

const filePrefix =
`#pragma header

vec4 colors[${colors.length}];

float minDist = 3.;
vec4 selected;

void main()
{
`

const filePostFix = `

    vec4 color = flixel_texture2D(bitmap, openfl_TextureCoordv);

    for (int i = 0; i < ${colors.length}; i++) {
        float dist = pow(abs(color.r - colors[i].r), 2.) + pow(abs(color.g - colors[i].g), 2.) + pow(abs(color.b - colors[i].b), 2.);
        if (dist < minDist) {
            minDist = dist;
            selected = colors[i];
        }
    }

    gl_FragColor = selected;
}
`

fs.writeFileSync(process.argv[3], filePrefix + colors.join('\n') + filePostFix)
