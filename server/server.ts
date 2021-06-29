import bodyParser from "body-parser";
import express from "express";
import { getCakes, postCakes, putCake, deleteCake } from "./routes/cakes";
import { getImage, uploadImage} from "./routes/images";
import os from "os";
import multer from "multer";
import cors from 'cors';

const tempDir = os.tmpdir();
const tempFolder = tempDir + "/uploads/";
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

const app = express();

var corsOptions = {
  "origin": true,
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,TRACE,PATCH",
  "allowedHeaders": "Access-Control-Allow-Origin, Content-Length,Accept,Authorization,Content-Type"
}

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/cakes", getCakes);
app.post("/api/cakes", postCakes);
app.put("/api/cakes/:id", putCake);
app.delete("/api/cakes/:id", deleteCake);

app.get("/api/images/:name", getImage);
app.post("/api/images", uploadFile, uploadImage);

// tslint:disable-next-line:no-console
app.listen(5000, () => console.log(`Listening on port ${5000}`));