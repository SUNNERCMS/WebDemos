### Version2
#### 优化
1、针对Version1中改变样式属性引起的重排和重绘问题，这里采用了添加和删除类的方式进行了优化.  
2、将获取头尾元素的语句放在了函数外面，免得每一次滚动都去拿一下元素，直接提前拿出来，仅仅进行动态类的操作即可，之前这段script在html之前，会报Cannot read property 'classList' of null错误，在元素加载完成之前进行了引用，所以找不到。
3、对滚动显示和隐藏的处理操作进行了函数封装
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
        let header = document.querySelector(".header"); //将获取头尾元素的语句放在了函数外面，免得每一次滚动都去拿一下元素，直接提前拿出来，仅仅进行动态类的操作即可，之前这段script在html之前，会报Cannot read property 'classList' of null错误，在元素加载完成之前进行了引用，所以找不到。
        let footer = document.querySelector(".footer");
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
        </script>
```
> 有关样式类的设置和读取的知识，见博客https://blog.csdn.net/qq_39207948/article/details/84943450
