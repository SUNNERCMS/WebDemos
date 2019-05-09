### Version01
#### 服务器端代码server.js
```JS
var http = require("http");
var fs = require("fs");
//服务器监听函数，只要8888端口接收到请求就会触发这个回调函数
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
```
1、`Content-Type":'application/json'`：用来设置返回的文件内容类型，并告知浏览器，这里设置为了JSON格式，这样index.html中用来处理数据时，就不用进行反序列化处理了，可以直接用返回的数据。如果设置为text/plan形式，则返回的数据时字符串格式，ajax拿到返回的数据后还需要通过JSON.parse()进行反序列化处理，即将字符串转换为对象。  
2、`http.createServer(onRequest).listen(8888);`由require中nodejs中的http模块中的createServer来创建本地服务器，并设置监听端口号；
#### 浏览器端代码 index.html
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
    <title>nodejs</title>

    <script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js">
    </script>

</head>
<body>

    <div id="feeds"></div>
    <div id="id"></div>
    <div id="name"></div>
    <div id="arg"></div>
    
    <div>上文显示回调内容</div>
    <button onclick="handle()">点击触发ajax</button>
    <script>
        function handle(){
            $.ajax({
            url     : "http://localhost:8888/", //这里直接用的端口
            type    : "GET",
            dataType: "json",  //预期服务器返回的数据类型
            success : function(data){
                $("#id").html("编号："+data.id);
                $("#name").html("姓名："+data.name);
                $("#arg").html("年龄："+data.arg);
                $("#feeds").html(data.remark);
            },
            error   : function(err){
                alert(err);
            }
        }); 
    }
    </script>
</body>
</html>
```

