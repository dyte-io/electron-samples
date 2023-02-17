import fs from 'fs';
import { contextBridge, ipcRenderer, shell as ElectronShell } from 'electron';
import { DyteElectronRenderer } from '@dytesdk/electron-preload';
import { domReady } from './utils';
import { useLoading } from './loading';

const { appendLoading, removeLoading } = useLoading();

(async () => {
  await domReady();

  appendLoading();
})();

contextBridge.exposeInMainWorld('removeLoading', removeLoading);

contextBridge.exposeInMainWorld('openLinkInBrowser', (url: string) =>
  ElectronShell.openExternal(url)
);

DyteElectronRenderer.init(contextBridge, ipcRenderer);
