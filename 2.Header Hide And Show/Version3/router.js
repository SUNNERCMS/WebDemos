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