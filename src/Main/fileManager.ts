import fs from "fs";
import path from "path";

export class FileManager<T> {
  folder: string;

  constructor(directory: string) {
    this.folder = directory;
  }

  public list(): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      fs.readdir(this.folder, (err, files) => {
        if (err) {
          reject(err);
          return;
        }
        const hydratedObjects = files
          .map((file) => {
            const filepath = path.resolve(this.folder, file);
            const stats = fs.lstatSync(filepath);

            if (stats.isDirectory()) {
              return null;
            }
            return { filepath, stats };
          })
          .filter((val) => val !== null && val !== undefined)
          .sort((a, b) => b.stats.ctime.getTime() - a.stats.ctime.getTime())
          .map((file) => {
            const dataStr = fs.readFileSync(file.filepath, {
              encoding: "utf8",
            });

            return JSON.parse(dataStr) as T;
          });

        resolve(hydratedObjects);
      });
    });
  }

  public delete(id: string): void {
    const filename = `${id}.json`;
    const filepath = path.resolve(this.folder, filename);

    fs.rm(filepath, {}, () => {
      return;
    });
  }

  public get(id: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const filename = `${id}.json`;
      const filepath = path.resolve(this.folder, filename);
      fs.readFile(filepath, { encoding: "utf8" }, (err, dataStr) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(dataStr) as T);
        }
      });
    });
  }

  public save(id: string, data: T): void {
    const filename = `${id}.json`;
    const filepath = path.resolve(this.folder, filename);

    fs.writeFile(filepath, JSON.stringify(data), { encoding: "utf8" }, () => {
      return;
    });
  }
}
