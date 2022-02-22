const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";
const dbname="conFusion";
MongoClient.connect(url,(err,client)=> {
    assert.equal(err,null);
    console.log("Mongo server connected");

    const db = client.db(dbname);
    const collection = db.collection("dishes");

    collection.insertOne({"name":"Uttappizza","description":"test"}, (err,result) => {
        assert.equal(err,null);
        console.log("insertion success");
        console.log(result.ops);
        collection.find({}).toArray((err,dishes) => {
            assert.equal(err,null);
            console.log("found success");
            console.log(dishes);
            db.dropCollection("dishes", (err, result) => {
                assert.equal(err,null);
                client.close();
            });
        })
    })
})