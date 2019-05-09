var http = require("http");
var url=require("url");

function start(route,pathMathObj){
    function onRequest(request, response){
        console.log("Request received.");
        var pathname=url.parse(request.url).pathname;
        route(pathname,response,pathMathObj);
      }
      http.createServer(onRequest).listen(8888);
      console.log("Server has started.port on 8888\n");
}
exports.start=start;