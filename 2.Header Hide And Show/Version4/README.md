### Version2
#### 优化
1、增加了路由的处理，针对不同的访问路径可以调用不同的请求处理函数    
2、设置了主文件index.js、服务器文件server.js、路由文件router.js、请求处理函数文件request.handles.js  
3、使用了模块化的思想和函数传递的方法，以便后期添加新的路径访问  
#### 各模块功能及代码分析
1、index.js：作为主文件用于启动。主要是设置路径的配对规则，并用对象形式保存，然后将该规则和路由函数一起发给服务器函数。
```JS
        var server=require("./server"); //这里调用其他模块时，注意是相对引用路径
        var router=require("./router");
        var requestHandles=require("./requestHandles");

        var pathMathObj={};
        pathMathObj["/airplane"]=requestHandles.airplaneHandle; //将不同的路径pathname对应到请求函数中不同的处理方法中，构成匹配规则。

        server.start(router.route,pathMathObj);
```

2、server.js:主要是创建服务器，以及监听函数，并设置监听端口
```JS
        var http = require("http");
        var url=require("url");
        
        function start(route,pathMathObj){
            function onRequest(request, response){  //每当8888端口号监听到请求时，就会触发这个函数，
                console.log("Request received.");
                var pathname=url.parse(request.url).pathname; //将请求中url进行解析，然后取出路径，供路由函数使用。
                route(pathname,response,pathMathObj);  //这里将路径名和响应对象以及路径匹配规则对象，都让路径函数处理。
              }
              http.createServer(onRequest).listen(8888);  //利用node中的http模块的createServer方法创建本地服务器，并设置监听端口号为8888
              console.log("Server has started.port on 8888\n");
        }
        exports.start=start;
```
3、router.js:主要在这里调用请求处理函数，在调用之前先判断该路径规则是否合法存在。
```JS
        function route(pathname,response,pathMathObj){
            console.log("About to route a request for"+pathname);
            // 判断传入的pathname中有没有响应的请求处理函数
            if(typeof pathMathObj[pathname]==='function'){
                pathMathObj[pathname](response);//在路由函数里面真正调用了请求处理函数，由路由负责把请求响应内容传给服务器处理函数
            }else{
                console.log("No request handler found for"+pathname);
                response.writeHead(404,{"Content-Type":"text/plain"});
                response.write("404 Not Found");
                response.end();
            }
        }
        exports.route=route;
```
4、requesHandles.js:真正对路径做处理的地方
```JS
        var fs = require("fs");  //调用了fs模块，对文件进行读写操作。

        function airplaneHandle(response){
        // 用来异步读取data.json文件中的内容，所以第二个参数是回调函数
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

```
> "Content-Type":'application/json'直接将文本内容作为JSON格式输出。

