const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");

const url = "mongodb://localhost:27017";
const dbname="conFusion";
MongoClient.connect(url,(err,client)=> {
    assert.equal(err,null);
    console.log("Mongo server connected");

    const db = client.db(dbname);
    dboper.insertDocument(db,{"name":"vadonut","description":"test desc"},"dishes",result=> {
        console.log("Insert Document:\n", result.ops);
        dboper.findDocuments(db,"dishes",docs=>{
            console.log("Found Documents:\n", docs);
            dboper.updateDocument(db,{"name":"vadonut"},{"description":"updated test desc"},"dishes",result=> {
                console.log("Updated Document:\n", result.result);
                dboper.findDocuments(db,"dishes",docs=> {
                    console.log("Found Updated Documents:\n", docs);
                    dboper.removeDocument(db,{"name":"vadonut"},"dishes",result=> {
                        console.log("Delete Document:\n", result.result);
                        db.dropCollection("dishes",(err,result)=> {
                            console.log("dropped dishes collection"+result);
                            client.close();
                        })
                    })
                })
            });
        })
    });
});