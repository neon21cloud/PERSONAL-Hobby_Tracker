# assets/

Place your app icons here before building.

| File | Platform | Required size |
|---|---|---|
| `icon.ico` | Windows | 256×256 multi-size ICO |
| `icon.icns` | macOS | Standard ICNS bundle |
| `icon.png` | Linux + taskbar fallback | 512×512 PNG |

The included placeholder icons are functional but minimal.
Replace them with your own artwork before releasing.

**Free tools:**
- [icoconvert.com](https://icoconvert.com) — PNG → ICO
- [CloudConvert](https://cloudconvert.com) — PNG → ICNS  
- `npm install -g electron-icon-builder` then `electron-icon-builder --input=icon.png` 
  generates all formats from a single 1024×1024 PNG
