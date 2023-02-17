declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    readonly VITE_DEV_SERVER_HOST: string
    readonly VITE_DEV_SERVER_PORT: string
  }
}

declare module '@dytesdk/electron-main' {
  export declare class DyteElectron {
      static init(ipcMain: IpcMain, desktopCapturer: DesktopCapturer): void;
  }
}

declare module '@dytesdk/electron-preload' {
  export declare class DyteElectronRenderer {
    static init(contextBridge: ContextBridge, ipcRenderer: IpcRenderer): void;
  }
}
