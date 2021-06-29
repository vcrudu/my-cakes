"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.uploadImage = void 0;
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const tempDir = os_1.default.tmpdir();
const tempFolder = tempDir + "/uploads/";
if (!fs_1.default.existsSync(tempFolder)) {
    fs_1.default.mkdirSync(tempFolder);
}
const uploadImage = (req, res) => {
    console.log("Uploading the image");
    fs_1.default.rename(req.file.path, req.file.destination + `/${req.body.name}`, (err) => {
        console.log(err);
        res.status(200).send("File uploaded succesfuly");
    });
};
exports.uploadImage = uploadImage;
const getImage = (req, res) => {
    const fileName = req.params.name;
    console.log(`Getting image ${fileName} from ${tempFolder + fileName}`);
    res.download(tempFolder + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};
exports.getImage = getImage;
