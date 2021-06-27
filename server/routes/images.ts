import os from "os";
import multer from "multer";
import fs from 'fs';
const tempDir = os.tmpdir();
const tempFolder = tempDir + "/uploads/";
const hardCodedIds =["33a3d4f7-f98b-4ae7-ac44-b88e3c56e6f6", "851221b8-763a-4e46-80df-ada73af11a5f"]; 

if(!fs.existsSync(tempFolder)){
    fs.mkdirSync(tempFolder);
    for(let i = 0; i<hardCodedIds.length; i++ ){
        fs.copyFileSync(process.cwd()+"/assets/"+hardCodedIds[i]+".png", tempFolder+hardCodedIds[i]+".png")
    }  
} 

export const uploadImage = (req: any, res: any) => {
    fs.rename(req.file.path, req.file.destination+`/${req.body.name}`,()=>{
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