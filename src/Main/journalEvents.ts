import { ipcMain } from "electron";
import { ipcEvents } from "src/Common/events";
import { Journal, Writing } from "src/Common/models/writing";
import { APP_DIRECTORY } from "src/Main/directories";
import { FileManager } from "src/Main/fileManager";

export function registerJournalEvents(): void {
  ipcMain.handle(ipcEvents.JOURNALS, async () => {
    try {
      const manager = new FileManager<Journal>(APP_DIRECTORY);
      return await manager.list();
    } catch (error) {
      console.error({ error, status: "LIST" });
      return [];
    }
  });

  ipcMain.handle(
    ipcEvents.CREATE_JOURNAL,
    (_event: Electron.IpcMainEvent, data: { color?: string; name: string }) => {
      const { color, name } = data;
      try {
        const manager = new FileManager<Journal>(APP_DIRECTORY);
        const journal: Journal = {
          color,
          name,
          subdir: name.replace(/[^a-z0-9]/gi, "_"),
        };

        manager.save(journal.subdir, journal);
        return journal;
      } catch (error) {
        console.error({ error, log: "SAVE" });
      }
    }
  );

  ipcMain.on(
    ipcEvents.DELETE_JOURNAL,
    (_event: Electron.IpcMainEvent, data: { journal: Journal }) => {
      const { journal } = data;
      const manager = new FileManager<Writing>(APP_DIRECTORY);
      manager.delete(journal.subdir);
    }
  );
}
