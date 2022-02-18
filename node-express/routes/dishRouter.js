const express = require("express");
const bodyParser = require("body-parser");

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route("/")
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
}).get((req,res,next)=> {
    res.end("Will send all the dishes to you!");
}).post((req,res,next)=> {
    res.end("Will add the dish with name and desc:"+req.body.name+" "+req.body.description);
}).put((req,res,next)=> {
    res.statusCode=403;
    res.end("PUT operation not supported on /dishes")
}).delete((req,res,next)=> {
    res.end("Deleting all dishes");
});

dishRouter.route("/:dishId")
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
}).get((req,res,next)=> {
    res.end("Will send the dishes details of "+req.params.dishId+"to you!");
}).post((req,res,next)=> {
    res.statusCode=403;
    res.end("POST operation not supported on /dishes/"+req.params.dishId);
}).put((req,res,next)=> {
    res.write("Updating the dish with id:"+req.params.dishId+"\n");
    res.end("Will update the dish with name and desc:"+req.body.name+" "+req.body.description);
}).delete((req,res,next)=> {
    res.end("Deleting dish with id:"+req.params.dishId);
});

module.exports = dishRouter;