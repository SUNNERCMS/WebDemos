var http = require("http");
var fs = require("fs");

function onRequest(request, response){
  console.log("Request received.");
  // 用来异步读取data.json文件中的内容
  fs.readFile("data.json",function(error,file){
    if(error){
        response.writeHead(500,{"Content-Type":'application/json','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});//可以解决跨域的请求
        response.write(error+'\n');
        response.end();
    }else{
        response.writeHead(200,{"Content-Type":'application/json','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});//可以解决跨域的请求
        response.write(file);
        response.end();
        console.log("fanhui:"+file);
        console.log(typeof file);
    }
});
}

http.createServer(onRequest).listen(8888);
console.log("Server has started.port on 8888\n");