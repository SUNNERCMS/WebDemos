
let PreviousWSY=0;
let header = document.querySelector(".header"); //将获取头尾元素的语句放在了函数外面，免得每一次滚动都去拿一下元素，直接提前拿出来，仅仅进行动态类的操作即可，之前这段script在html之前，会报Cannot read property 'classList' of null错误，在元素加载完成之前进行了引用，所以找不到。
let footer = document.querySelector(".footer");

let content=document.querySelector("#content");

document.addEventListener("scroll",handle); 

// 滚动显示和隐藏的处理函数
function handle() {
    let NowWSY=window.scrollY;
    if(NowWSY>PreviousWSY){
        header.classList.add("header-actived");
        footer.classList.add("footer-actived");
    }else{
        header.classList.remove("header-actived");
        footer.classList.remove("footer-actived");
    }
    PreviousWSY=NowWSY;
};

function handlebutton(){  
        $.ajax({
        url     : "http://localhost:8888/airplane",
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