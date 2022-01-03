import { contextBridge } from "electron";
import { journalBridge } from "src/Renderer/bridges/journalBridge";
import { writingBridge } from "src/Renderer/bridges/writingBridge";

contextBridge.exposeInMainWorld("writing", writingBridge);
contextBridge.exposeInMainWorld("journals", journalBridge);
