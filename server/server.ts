import bodyParser from "body-parser";
import express from "express";
import { getCakes, postCakes, putCake, deleteCake } from "./routes/cakes";
import { getImage, uploadImage} from "./routes/images";
import os from "os";
import multer from "multer";
const tempDir = os.tmpdir();
const tempFolder = tempDir + "/uploads/";
const app = express();
const port = 5000;
console.log("tempFolder")
console.log(tempFolder)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, tempFolder);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
  });
let uploadFile = multer({
    storage: storage,
}).single("file");

app.get("/api/cakes", getCakes);
app.post("/api/cakes", postCakes);
app.put("/api/cakes/:id", putCake);
app.delete("/api/cakes/:id", deleteCake);

app.get("/api/images/:name", getImage);
app.post("/api/images", uploadFile, uploadImage);

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));