### Version2
#### 优化
1、针对Version1中改变样式属性引起的重排和重绘问题，这里采用了添加和删除类的方式进行了优化
#### 代码分析
```css
        .header,.footer{
            position: fixed;
            display: block;
            width: 100%;
            height: 50px;
            background-color: darkkhaki;
            z-index: 9;
        }
        .header {
            top:0px;
            transition:top 45ms linear;
        }
        .header-actived{
            top:-50px;
        }
        .footer{
            bottom:0px;
            transition:bottom 45ms linear;
        }
        .footer-actived{
            bottom:-50px;
        }
```
```js
        <script>
        let PreviousWSY=0;
        document.addEventListener("scroll", function() {

            var header = document.querySelector(".header");
            var footer = document.querySelector(".footer");

            let NowWSY=window.scrollY;
            if(NowWSY>PreviousWSY){
                // header.style.top="-50px";  
                // header.setAttribute("class","header-actived");不能这样用，否则将会吧原来的类值给覆盖掉。
                // footer.style.bottom="-50px";  
                header.classList.add("header-actived");
                footer.classList.add("footer-actived");
            }else{
                // header.style.top="0px";
                // footer.style.bottom="0px";
                header.classList.remove("header-actived");
                footer.classList.remove("footer-actived");
            }
            PreviousWSY=NowWSY;
        });
        </script>
```
> 有关样式类的设置和读取的知识，见博客https://blog.csdn.net/qq_39207948/article/details/84943450
