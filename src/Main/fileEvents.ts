import { ipcMain } from "electron";
import { ipcEvents } from "src/Common/events";
import { Journal, Writing } from "src/Common/models/writing";
import { getDocPath } from "src/Main/directories";
import { FileManager } from "src/Main/fileManager";

export function registerFileEvents(): void {
  ipcMain.handle(ipcEvents.LIST, async (_event, journal: Journal) => {
    try {
      const path = getDocPath(journal.subdir);

      const manager = new FileManager<Writing>(path);
      return await manager.list();
    } catch (error) {
      console.error({ error, status: "LIST" });
      return [];
    }
  });

  ipcMain.handle(
    ipcEvents.GET,
    async (_event, data: { journal: Journal; id: string }) => {
      const { journal, id } = data;
      try {
        const manager = new FileManager<Writing>(getDocPath(journal.subdir));
        return await manager.get(id);
      } catch (error) {
        console.error({ error, status: "GET" });
        return null;
      }
    }
  );

  ipcMain.on(
    ipcEvents.SAVE,
    (
      _event: Electron.IpcMainEvent,
      data: { journal: Journal; writing: Writing }
    ) => {
      const { journal, writing } = data;
      try {
        const manager = new FileManager<Writing>(getDocPath(journal.subdir));
        manager.save(writing.id, writing);
      } catch (error) {
        console.error({ error, log: "SAVE" });
      }
    }
  );

  ipcMain.on(
    ipcEvents.DELETE,
    (_event: Electron.IpcMainEvent, data: { journal: Journal; id: string }) => {
      const { journal, id } = data;
      const manager = new FileManager<Writing>(getDocPath(journal.subdir));
      manager.delete(id);
    }
  );
}
