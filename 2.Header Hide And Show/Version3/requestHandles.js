var fs = require("fs");

function airplaneHandle(response){
// 用来异步读取data.json文件中的内容
    fs.readFile("./mock/airplane.json",function(error,file){
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
exports.airplaneHandle=airplaneHandle;
