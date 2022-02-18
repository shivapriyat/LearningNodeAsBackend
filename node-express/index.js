const express = require("express");
const http = require("http");
const morgan = require("morgan");
const path=require("path");
const bodyParser=require("body-parser");
const dishRouter = require("./routes/dishRouter");
const promoRouter = require("./routes/promoRouter");
const leaderRouter = require("./routes/leaderRouter");

const hostname="localhost";
const port="3000";

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use("/dishes",dishRouter);
app.use("/promotions",promoRouter);
app.use("/leaders",leaderRouter);
//dish id
/*app.get("/dishes/:dishId",(req,res,next)=> {
    res.end("Will send the dishes details of "+req.params.dishId+"to you!");
});
app.post("/dishes/:dishId",(req,res,next)=> {
    res.statusCode=403;
    res.end("POST operation not supported on /dishes/"+req.params.dishId);
   
});
app.put("/dishes/:dishId",(req,res,next)=> {
    res.write("Updating the dish with id:"+req.params.dishId+"\n");
    res.end("Will update the dish with name and desc:"+req.body.name+" "+req.body.description);
});
app.delete("/dishes/:dishId",(req,res,next)=> {
    res.end("Deleting dish with id:"+req.params.dishId);
});
*/
//app.use(express.static(__dirname+"public/"));
app.use('/',express.static(path.join(__dirname, 'public/')));
app.use((req,res,next)=> {
    //console.log(req.headers);
     res.statusCode=200;
     res.setHeader('Content-Type', 'text/html');
     res.write("<html><body><h1>Hello world from express</h1></body></html>");
     res.end();
});
const server = http.createServer(app);
server.listen(port,hostname,()=> {
    console.log(`server running at http://${hostname}:${port}/`);
})