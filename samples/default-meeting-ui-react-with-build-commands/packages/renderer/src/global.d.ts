import type { IpcRenderer } from 'electron';
import type fs from 'fs';
export {};

declare global {
  interface Window {
    removeLoading: () => void;
    DyteClient: DyteClient;
    meeting: DyteClient | undefined;
  }
}
