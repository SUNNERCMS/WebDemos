### Version3
#### 功能
（1）使用NodeJs建立了httpserver服务器，并建立mock文件夹用来保存模拟的后台数据，针对不同的路径设置了路由选择。  
（2）使用Ajax进了后台访问数据，并将模拟的后台数据以JSON的格式返回。  
（3）使用了Handlebars模板引擎，对返回的后台数据进行了处理。
#### 代码分析
##### 使用NodeJS建立服务器
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
##### 使用handlebars处理返回的数据
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <title>JS Hide/Show Header&Footer On Scroll</title>
        <link rel="stylesheet" href="style.css">
        <script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"> </script>
        <!-- 通过CDN引用的handlebars模板库 -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.1.2/handlebars.min.js"></script>
    </head>
    <body>
        <div id="global">
            <div class="header" >
                <p id="header-text">My Header</p>
            </div>
            <div id="content">
                handlebars模板
            </div>
            <div class="footer">
                <p id="footer-text">My footer</p>
            </div>
            <button onclick="handlebutton()">点击触发ajax</button>
        </div>
        <!-- 建立的handlebars模板 -->
        <script type="text/x-handlebars-template" id="content-template">
            {{#each this}}
                <div class="city-info">
                    <div class="form-line">
                        <span class="label">{{spell}}</span>
                        <span class="text">{{name}}</span>
                    </div>
                </div>
            {{/each}}
        </script>
        <script src="script.js"></script>
    </body>
</html>
```
```js
function handlebutton(){  
        $.ajax({
        url     : "http://localhost:8888/airplane", //在服务器中创建了mock文件夹，在里面创建了airplane的模拟数据文件
        type    : "GET",
        dataType: "json", 
        success : function(data){
            var JsonData=data.cities.A;//提取返回JSON中的指定内容
            console.log(data.cities.A);
            var tpl=$("#content-template").html();//获取模板
            var template=Handlebars.compile(tpl);//预编译模板
            var html=template(JsonData);//将数据渲染到模板中
            // $("#content").html(html);
            content.innerHTML=html; //将渲染后的模板数据插入到html中
        },
        error   : function(err){
            alert(err);
        }
    }); 
}
```
