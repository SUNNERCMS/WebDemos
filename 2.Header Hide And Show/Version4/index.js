var server=require("./server");
var router=require("./router");
var requestHandles=require("./requestHandles");

var pathMathObj={};
pathMathObj["/airplane"]=requestHandles.airplaneHandle;

server.start(router.route,pathMathObj);