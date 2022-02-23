const express = require("express");
const bodyParser = require("body-parser");

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route("/")
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
}).get((req,res,next)=> {
    res.end("Will send all the leaders to you!");
}).post((req,res,next)=> {
    res.end("Will add the leader with name and designation:"+req.body.name+" "+req.body.description);
}).put((req,res,next)=> {
    res.statusCode=403;
    res.end("PUT operation not supported on /leaders")
}).delete((req,res,next)=> {
    res.end("Deleting all leaders");
});

leaderRouter.route("/:leaderId")
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
}).get((req,res,next)=> {
    res.end("Will send the leader details of "+req.params.leaderId+"to you!");
}).post((req,res,next)=> {
    res.statusCode=403;
    res.end("POST operation not supported on /leaders/"+req.params.leaderId);
}).put((req,res,next)=> {
    res.write("Updating the leaderId with id:"+req.params.leaderId+"\n");
    res.end("Will update the leaderId with name and desc:"+req.body.name+" "+req.body.description);
}).delete((req,res,next)=> {
    res.end("Deleting leaderId with id:"+req.params.leaderId);
});

module.exports = leaderRouter;