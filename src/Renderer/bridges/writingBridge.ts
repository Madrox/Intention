import { ipcRenderer } from "electron";
import { ipcEvents } from "src/Common/events";
import { Journal, Writing } from "src/Common/models/writing";

interface WritingBridge {
  list: (journal: Journal) => Promise<Writing[]>;
  get: (journal: Journal, id: string) => Promise<Writing>;
  save: (journal: Journal, writing: Writing) => Promise<void>;
  delete: (journal: Journal, id: string) => Promise<void>;
}

export const writingBridge: WritingBridge = {
  delete: async (journal: Journal, id: string) => {
    ipcRenderer.send(ipcEvents.DELETE, { id, journal });
  },
  get: async (journal: Journal, id: string) => {
    return ipcRenderer.invoke(ipcEvents.GET, { id, journal });
  },
  list: async (journal: Journal) => {
    return ipcRenderer.invoke(ipcEvents.LIST, journal);
  },
  save: async (journal: Journal, writing: Writing) => {
    ipcRenderer.send(ipcEvents.SAVE, { journal, writing });
  },
};

declare global {
  interface Window {
    writing: WritingBridge;
  }
}
