var http=require("http");
var url=require("url");
var cheerio = require('cheerio');

http.createServer(onRequest).listen(8088);

function onRequest(request, Response){
    var search=url.parse(request.url).search;
    var searchParam=search.split('=')[1];
    var urlstring=searchParam;
    var request = require('request');
    request(urlstring, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML 
        dataParse(body,Response);//数据解析抓取
      });
    }
//数据解析抓取,将解析的结果通过Response返回浏览器
  function dataParse(body,Response){
    var $=cheerio.load(body);
  // 获取title内容
    var title=$('title').text();
    console.log("title:",title);
    var bodystring=$('body').text();
    bodystring = bodystring.replace(/\s*/g,"");//去除空白
    //获取中文字数
    var ChineseCount=bodystring.match(/[\u4e00-\u9fa5]/g).length;
    console.log("ChineseCount:",ChineseCount);
    //获取所有标点符号数
    var pointCount=bodystring.match(/[\s|\~|`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g).length;
    console.log("pointCount:",pointCount);
    // 获取英文字数
    var eCount=bodystring.match(/\w/g).length;
    console.log("eCount:",eCount);
    var totalCount=ChineseCount+eCount+pointCount;
    var COUNTS={
      title,
      totalCount,
      ChineseCount,
      eCount,
      pointCount
    };
    console.log("COUNTS:",COUNTS);
    RESPONSE(Response,COUNTS);
  }
//请求响应函数
function RESPONSE(Response,COUNTS){
  Response.writeHead(200,{"Content-Type":'application/json','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});//可以解决跨域的请求
  Response.write(JSON.stringify(COUNTS));
  Response.end();
}