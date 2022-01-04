import { app } from "electron";
import fs from "fs";
import { resolve } from "path";
import { mkDirByPathSync } from "src/Main/utils";

export const WRITING_DIRECTORY = resolve(app.getPath("documents"), "Intention");
export const APP_DIRECTORY = resolve(
  app.getPath("appData"),
  "Intention",
  "Data"
);

mkDirByPathSync(APP_DIRECTORY);

export const getDocPath = (subdir?: string): string => {
  let docRoot = WRITING_DIRECTORY;

  if (subdir) {
    docRoot = resolve(docRoot, subdir);
  }

  try {
    if (!fs.existsSync(docRoot)) {
      console.log(`making: ${docRoot}`);
      mkDirByPathSync(docRoot);
      console.log("success");
    }
  } catch (error) {
    console.error(error);
  }

  return docRoot;
};
