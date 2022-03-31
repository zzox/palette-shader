# GPL Palette Posterization Shader Generator
Made for HaxeFlixel, which in turn uses OpenFL and OpenGL, and can be adapted for other engines that use OpenGL. This repo includes a generator script, a few palettes with their respective fragment shaders, and the example `PaletteShader.hx` file used in my game [isle](https://zzox.itch.io/isle). The generated [posterization](https://en.wikipedia.org/wiki/Posterization) shader "snaps" each pixel's color to the nearest color in an included palette.  When applied to the main camera it ensures no colors besides the colors in the included palette are displayed.

## Usage
1. Make sure [node](https://nodejs.org/) is installed.
2. Run with `node gpl-parser.js [PALETTE_FILE_NAME] [OUTPUT_FILE_NAME]` to generate a shader from a gpl palette.

__NOTE:__ This script makes shaders specifically for [`HaxeFlixel`](https://haxeflixel.com). It obtains the current pixel color with `vec4 color = flixel_texture2D(bitmap, openfl_TextureCoordv);`; this line (and potentially others) may need to be changed to work with other engines.
