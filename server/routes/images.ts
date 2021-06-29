import os from "os";
import fs from 'fs';
const tempDir = os.tmpdir();
const tempFolder = tempDir + "/uploads/";

if(!fs.existsSync(tempFolder)){
    fs.mkdirSync(tempFolder);
} 

export const uploadImage = (req: any, res: any) => {
    console.log("Uploading the image")
    fs.rename(req.file.path, req.file.destination+`/${req.body.name}`,(err)=>{
        console.log(err)
        res.status(200).send("File uploaded succesfuly" );
    })
};

export const getImage = (req: any, res: any) => {
    const fileName = req.params.name;
    console.log(`Getting image ${fileName} from ${tempFolder + fileName}`) 

    res.download(tempFolder + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};