import express from "express";
import { readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pathRouter = `${__dirname}`;

const removeExtension = (fileName) => {
    return fileName.split('.').shift()
}

console.log("Endpoints:");
readdirSync(pathRouter).filter((file) => {
    const skip = ["index.js"].includes(file);
    if (!skip) {
        const routePath = join(pathRouter, file);
        import(`./${file}`).then((module) => {
                if (module && module.default) {
                    router.use(`/${removeExtension(file)}`, module.default);
                    console.log("/", removeExtension(file));
                }
            }).catch((error) => {
                console.error(`Error importing module from ${routePath}:`, error);
            });
    }
});

export default router;