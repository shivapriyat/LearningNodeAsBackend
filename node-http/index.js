const http = require("http");
const path = require("path");
const fs = require("fs");
const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {

    console.log("Request for url: " + req.url + " method: " + req.method);
    if (req.method === "GET") {
        let fileUrl;
        if (req.url === "/") {
            fileUrl = "/index.html";
        }
        else {
            fileUrl = req.url;
        }
        let filePath = path.resolve("public" + fileUrl);
        const fileExt = path.extname(filePath);
        if (fileExt == ".html") {
            let exists = fs.existsSync(filePath);
            if (exists) {
                res.setHeader("Content-Type", "text/html");
                res.statusCode = 200;
                fs.createReadStream(filePath).pipe(res);
            }
            else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end('<html><body><h1>Error 404: ' + fileUrl +
                    ' not found</h1></body></html>');
                return;
            }
        }
        else {
            //invalid file ext
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl +
                ' not a HTML file</h1></body></html>');
        }

    }
    else {
        //invalid http method
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Error 404: ' + req.method +
            ' not supported</h1></body></html>');
    }

});
server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`);
})