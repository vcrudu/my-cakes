import dynamo from 'dynamodb';
import Joi from 'joi'
import path from 'path'
dynamo.AWS.config.loadFromPath(path.resolve(__dirname, '../../credentials.json'));

var Cake = dynamo.define('Cake', {
    hashKey: "id",
    schema: {
        id: Joi.string().guid(),
        name: Joi.string(),
        description: Joi.string(),
        author: Joi.string(),
        difficulty: Joi.string(),
        effort: Joi.string(),
        dateTime: Joi.number()
    }
});

dynamo.createTables(function(err) {
    if (err) {
      console.log('Error creating tables: ', err);
    } else {
      console.log('Tables has been created');
    }
});

export default {
    addCake: (cake: any, cb: Function)=>{
        var cakeRecord = new Cake(cake);
        cakeRecord.save(err=>{
            cb(err)
        })
    },
    deleteCake: (id: string, cb: Function)=>{
        console.log("deleting")
        Cake.destroy(id, function (err) {
            cb(err)
          });
    },
    getCakes: (cb: Function)=>{
        Cake
        .scan()
        .loadAll()
        .exec(cb);
    },
    getCake: (id, cb: Function)=>{
        Cake.get(id, cb)
    }
}