const express = require("express");
const bodyParser = require("body-parser");

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route("/")
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
}).get((req,res,next)=> {
    res.end("Will send all the promotions to you!");
}).post((req,res,next)=> {
    res.end("Will add the promotion with name and desc:"+req.body.name+" "+req.body.description);
}).put((req,res,next)=> {
    res.statusCode=403;
    res.end("PUT operation not supported on /promotions")
}).delete((req,res,next)=> {
    res.end("Deleting all promotions");
});

promoRouter.route("/:promoId")
.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
}).get((req,res,next)=> {
    res.end("Will send the promotion details of "+req.params.promoId+"to you!");
}).post((req,res,next)=> {
    res.statusCode=403;
    res.end("POST operation not supported on /promotions/"+req.params.promoId);
}).put((req,res,next)=> {
    res.write("Updating the promotion with id:"+req.params.promotionId+"\n");
    res.end("Will update the promotion with name and desc:"+req.body.name+" "+req.body.description);
}).delete((req,res,next)=> {
    res.end("Deleting promotion with id:"+req.params.promoId);
});

module.exports = promoRouter;