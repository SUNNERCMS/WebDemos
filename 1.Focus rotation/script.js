window.onload=function() {
    var list = document.getElementById("list").getElementsByTagName("li");
    var pic = document.getElementById("pic").getElementsByTagName("li");
    if(list.length!==pic.length)
        return;
    var timer=null;
    var listindex=0;
    list[listindex].className="js-on";
    pic[listindex].style.display="block";
    //自动轮播事件利用setInterval(）函数；
    timer=setInterval(function(){
        listindex++;
        if(listindex===list.length){
            listindex=0;
        }
        for (var j = 0; j < list.length; j++) {
            list[j].className = "";
            pic[j].style.display = "none";
        }
        list[listindex].className="js-on";
        pic[listindex].style.display="block";
    },1500);
    //为每个页签添加了一个鼠标滑过事件；
    for (var i = 0; i < list.length; i++) {
        list[i].index = i;
        list[i].onmouseover = function () {
            clearInterval(timer);
            for (var j = 0; j < list.length; j++) {
                list[j].className = "";
                pic[j].style.display = "none";
            }
            list[this.index].className = "js-on";
            pic[this.index].style.display = "block";
        };
        list[i].onmouseout=function(){
            listindex=this.index;
            timer=setInterval(function(){
                listindex++;
                if(listindex===list.length){
                    listindex=0;
                }
                for (var j = 0; j < list.length; j++) {
                    list[j].className = "";
                    pic[j].style.display = "none";
                }
                list[listindex].className="js-on";
                pic[listindex].style.display="block";
            },1500);
        }
    }
}