import fs from 'fs';
import os from "os";
const tempDir = os.tmpdir();
const tempFolder = tempDir + "/uploads/";
import dynamodb from './dynamodb';

export const getCakes = (req: any, res: any) => {
  dynamodb.getCakes((err, result) => {
    if(err){
      console.log(err)
      res.status(500).send("Error")
    }else{
      res.json(result.Items)
    }
  })
};

export const postCakes = (req: any, res: any) => {
  dynamodb.addCake(req.body, (result, err)=>{
    res.json(req.body);
  })
};

export const putCake = (req: any, res: any) => {
  res.send(
    `I received your PUT cake. This is what you sent me: ${req.body.put}`
  );
};

export const deleteCake = (req: any, res: any) => {
  const id = req.params.id;
  console.log(`Delete ${tempFolder + id}`)
  dynamodb.deleteCake(id, err => {
    console.log("delete err")
    console.log(err)
    let regex = RegExp(`^${id}`)
    fs.readdirSync(tempFolder).filter(f => regex.test(f))
      .map(f => {
        console.log(`Delete ${tempFolder + f}`)
        fs.unlinkSync(tempFolder + f)
      })

    res.status(200).send({
      message: "Deleted succesfully"
    });
  })
};