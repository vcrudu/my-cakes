"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamodb_1 = __importDefault(require("dynamodb"));
const joi_1 = __importDefault(require("joi"));
const path_1 = __importDefault(require("path"));
dynamodb_1.default.AWS.config.loadFromPath(path_1.default.resolve(__dirname, '../../credentials.json'));
var Cake = dynamodb_1.default.define('Cake', {
    hashKey: "id",
    schema: {
        id: joi_1.default.string().guid(),
        name: joi_1.default.string(),
        description: joi_1.default.string(),
        author: joi_1.default.string(),
        difficulty: joi_1.default.string(),
        effort: joi_1.default.string(),
        dateTime: joi_1.default.number()
    }
});
dynamodb_1.default.createTables(function (err) {
    if (err) {
        console.log('Error creating tables: ', err);
    }
    else {
        console.log('Tables has been created');
    }
});
exports.default = {
    addCake: (cake, cb) => {
        var cakeRecord = new Cake(cake);
        cakeRecord.save(err => {
            cb(err);
        });
    },
    deleteCake: (id, cb) => {
        console.log("deleting");
        Cake.destroy(id, function (err) {
            cb(err);
        });
    },
    getCakes: (cb) => {
        Cake
            .scan()
            .loadAll()
            .exec(cb);
    },
    getCake: (id, cb) => {
        Cake.get(id, cb);
    }
};
