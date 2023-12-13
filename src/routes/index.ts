import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

/**
 * ßClean file name from extension for router
 * @param fileName
 */
const cleanFileName = (fileName: string) => {
  return fileName.split(".").shift();
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName);
  if (cleanName !== "index") {
    import(`./${cleanName}`).then((module) => {
      router.use(`/${cleanName}`, module.router);
    });
  }
});

export default router;
