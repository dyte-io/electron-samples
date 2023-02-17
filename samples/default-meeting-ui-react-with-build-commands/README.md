# Dyte Electron Sample App With Build Commands

This repository showcases how you can create an Electron app with Dyte's Electron SDK, UI Kit and other packages to get the best live audio/video experience in your Electron app!.

## Quick start

Script to run the electron app:
```sh
npm i
npm run dev
```

Script to create the shareable builds:
```sh
npm run build:mac
npm run build:linux
npm run build:windows
npm run build:windowsUniversal
```

## Directory structure

Once `npm run dev` or `npm run build` npm-script is executed, the `dist` folder will be generated. It has the same structure as the `packages` folder, the purpose of this design is the ease of use & quick navigation.

```tree
├── resources                 Resources for the production build
|   ├── icon.icns             Icon for the application on macOS
|   ├── icon.ico              Icon for the application
|   ├── installerIcon.ico     Icon for the application installer
|   └── uninstallerIcon.ico   Icon for the application uninstaller
|
├── dist                      Generated after build according to the "packages" directory builds
|   ├── main
|   ├── preload
|   └── renderer
|
|   electron-builder.json5    JSON referenced for 
|
├── release                   Generated after production build, contains executables
|   └──{version}
|       ├── win-unpacked      Contains unpacked application executable
|       └── Setup.exe         Installer for the application
|
├── packages
|   ├── main                  Main-process source code
|   |   └── vite.config.ts
|   ├── preload               Preload-script source code
|   |   └── vite.config.ts
|   └── renderer              Renderer-process source code
|       └── vite.config.ts
```

# Screenshots

Initial screen:

![Initial screen](/screenshots/initial-screen.png "Initial screen").

Setup screen:
![Setup screen](/screenshots/setup-screen.png "Setup screen").

Meeting stage:
![Meeting stage](/screenshots/stage.png "Meeting stage").
