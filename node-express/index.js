const express = require("express");
const http = require("http");
const morgan = require("morgan");
const path=require("path");
const hostname="localhost";
const port="3000";

const app = express();
app.use(morgan('dev'));

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