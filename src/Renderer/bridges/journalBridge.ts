import { ipcRenderer } from "electron";
import { ipcEvents } from "src/Common/events";
import { Journal } from "src/Common/models/writing";

interface JournalBridge {
  list: () => Promise<Journal[]>;
  create: (name: string, color?: string) => Promise<void>;
  delete: (journal: Journal) => Promise<void>;
}

export const journalBridge: JournalBridge = {
  create: async (name: string, color: string) => {
    return ipcRenderer.invoke(ipcEvents.CREATE_JOURNAL, { color, name });
  },
  delete: async (journal: Journal) => {
    return ipcRenderer.send(ipcEvents.DELETE_JOURNAL, { journal });
  },
  list: async () => {
    return ipcRenderer.invoke(ipcEvents.JOURNALS);
  },
};

declare global {
  interface Window {
    journals: JournalBridge;
  }
}
