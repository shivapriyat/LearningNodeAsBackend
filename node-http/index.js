const http=require("http");
const hostname="localhost";
const port=3000;

const server = http.createServer((req,res) => {

    console.log(req.headers);
    res.setHeader("Content-Type","text/html");
    res.statusCode=200;
    res.write("<html><body>Hello world from nodejs </body></html");
    res.end();
});
server.listen(port, hostname, ()=> {
    console.log(`server running at http://${hostname}:${port}/`);
})