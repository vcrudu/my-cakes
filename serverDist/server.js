"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const cakes_1 = require("./routes/cakes");
const images_1 = require("./routes/images");
const os_1 = __importDefault(require("os"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const tempDir = os_1.default.tmpdir();
const tempFolder = tempDir + "/uploads/";
let storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempFolder);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
let uploadFile = multer_1.default({
    storage: storage,
}).single("file");
const app = express_1.default();
var corsOptions = {
    "origin": "http://mycakes-dev.s3-website-eu-west-1.amazonaws.com",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,TRACE,PATCH",
    "allowedHeaders": "Access-Control-Allow-Origin, Content-Length,Accept,Authorization,Content-Type"
};
app.use(cors_1.default(corsOptions));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/api/cakes", cakes_1.getCakes);
app.post("/api/cakes", cakes_1.postCakes);
app.put("/api/cakes/:id", cakes_1.putCake);
app.delete("/api/cakes/:id", cakes_1.deleteCake);
app.get("/api/images/:name", images_1.getImage);
app.post("/api/images", uploadFile, images_1.uploadImage);
// tslint:disable-next-line:no-console
app.listen(8080, () => console.log(`Listening on port ${8080}`));
