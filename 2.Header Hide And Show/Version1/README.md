### Version1版本
#### 解决思路
1、通过window.scrollY判断是向上滚动还是向下滚动  
2、header和footer的显示和隐藏主要通过fixed固定定位和改变top、bottom的值将其移除浏览器窗口
#### 主要代码分析
```CSS
        #header,#footer{
            position: fixed; //相对于浏览器窗口定位，不包括工具栏
            display: block;
            width: 100%;
            height: 50px;
            background-color: darkkhaki;
            z-index: 9;
        }
        #header {
            top:0px;
            transition:top 45ms linear;
        }
        #footer{
            bottom:0px;
            transition:bottom 45ms linear;
        }
```
```JS
        <script>
        let PreviousWSY=0;  //用来记录上一的滚动值
        document.addEventListener("scroll", function() {

            var header = document.getElementById("header");
            var bottom = document.getElementById("footer");

            let NowWSY=window.scrollY;  //旧版本的Internet Explorer（<9）不支持任何属性
            //上下滚动判断以及处理
            if(NowWSY>PreviousWSY){  
                header.style.top="-50px";   //向下滚定，header的高度为50px，top值为负值的话，将该header向上提升50px，刚好从浏览器窗口中出去，即为隐藏。
                footer.style.bottom="-50px";  
            }else{
                header.style.top="0px"; //向上滚动，将header的top设置为0PX，由于采用的是fixed相对浏览器固定定位，所以此时会显示在浏览器窗口顶部，即为显示。
                footer.style.bottom="0px";
            }
            PreviousWSY=NowWSY;
        });
        </script>
```  

>`header.style.top="-50px";` :向下滚定，header的高度为50px，top值为负值的话，将该header向上提升50px，刚好从浏览器窗口中出去，即为隐藏。
  `header.style.top="0px";` :向上滚动，将header的top设置为0PX，由于采用的是fixed相对浏览器固定定位，所以此时会显示在浏览器窗口顶部，即为显示。

#### 存在问题
1、采用的滚动监听，如果页面通过ajax获取数据，那么较为频繁的滚动会不断触发读取后台数据。  
2、每滚动一下，都要通过`let NowWSY=window.scrollY`,` header.style.top="-50px"`读取、设置元素的样式属性值，会不断引起reflow重排和重绘，影响性能。

