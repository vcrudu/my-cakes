"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCake = exports.putCake = exports.postCakes = exports.getCakes = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const tempDir = os_1.default.tmpdir();
const tempFolder = tempDir + "/uploads/";
const dynamodb_1 = __importDefault(require("./dynamodb"));
let cakesData = [
    {
        id: "33a3d4f7-f98b-4ae7-ac44-b88e3c56e6f6",
        name: "Easy carrot cake",
        description: "Top this classic carrot cake with moreish icing and chopped walnuts or pecans. Serve as a sweet treat with a cup of tea any time of the day.",
        author: "John Smith",
        difficulty: "Very easy",
        effort: "One day",
        dateTime: new Date(2021, 1, 10, 8, 53).valueOf()
    },
    {
        id: "851221b8-763a-4e46-80df-ada73af11a5f",
        name: "Classic Victoria sandwich recipe",
        description: "The perfect party cake, a Victoria sponge is a traditional bake everyone will love. Makes an easy wedding cake, too",
        author: "John Smith",
        difficulty: "Very easy",
        effort: "One day",
        dateTime: new Date(2021, 3, 10, 11, 42).valueOf()
    }
];
const getCakes = (req, res) => {
    dynamodb_1.default.getCakes((err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error");
        }
        else {
            res.json(result.Items);
        }
    });
};
exports.getCakes = getCakes;
const postCakes = (req, res) => {
    dynamodb_1.default.addCake(req.body, (result, err) => {
        res.json(req.body);
    });
};
exports.postCakes = postCakes;
const putCake = (req, res) => {
    res.send(`I received your PUT cake. This is what you sent me: ${req.body.put}`);
};
exports.putCake = putCake;
const deleteCake = (req, res) => {
    const id = req.params.id;
    console.log(`Delete ${tempFolder + id}`);
    dynamodb_1.default.deleteCake(id, err => {
        console.log("delete err");
        console.log(err);
        let regex = RegExp(`^${id}`);
        fs_1.default.readdirSync(tempFolder).filter(f => regex.test(f))
            .map(f => {
            console.log(`Delete ${tempFolder + f}`);
            fs_1.default.unlinkSync(tempFolder + f);
        });
        res.status(200).send({
            message: "Deleted succesfully"
        });
    });
};
exports.deleteCake = deleteCake;
