let tableShowArray=[];
let flagCURRENTPAGE=1;
let totalPages;
//添加文章链接后的处理事件
let addButtonHandle=()=>{
    let inputText=document.querySelector(".inputText").value;
    $.ajax({
            url     : "http://localhost:8088"+"?"+"TempUrl="+inputText,
            type    : "GET",
            success : function(data){
                console.log(data);
                showTable(data);
            },
            error   : function(err){
                console.log(err);
            }
        }); 
    document.querySelector(".inputText").value='';
}
function showTable(data){
    tableShowArray.push(data);
    pageFilter(flagCURRENTPAGE);
    totalPages=tableShowArray.length/3>parseInt(tableShowArray.length/3)?parseInt(tableShowArray.length/3)+1:parseInt(tableShowArray.length/3);
}

var previousPage=document.querySelector(".previousPage");
var nextPage=document.querySelector(".nextPage");
previousPage.addEventListener('click',()=>{previousPageHandle(flagCURRENTPAGE);});
nextPage.addEventListener('click',()=>{nextPageHandle(flagCURRENTPAGE);});

//前进后退页码处理
function nextPageHandle(CURRENTPAGE){
    CURRENTPAGE=(CURRENTPAGE>=totalPages)?totalPages:CURRENTPAGE+1;
    commonPageHandle(CURRENTPAGE);
}
function previousPageHandle(CURRENTPAGE){
    CURRENTPAGE=(CURRENTPAGE<=1)?1:CURRENTPAGE-1;
    commonPageHandle(CURRENTPAGE);
}
// 前进后退页共同处理函数
function commonPageHandle(CURRENTPAGE){
    pageFilter(CURRENTPAGE);
    document.querySelector(".currentPage").innerHTML=CURRENTPAGE;
    flagCURRENTPAGE=CURRENTPAGE;
}
//根据当前页数展示内容
function pageFilter(currentPage=1){
    console.log("dd");
    console.log("tableShowArray:",tableShowArray);
    let TR=document.querySelector("table");
    let pageStart=3*(currentPage-1);
    let pageEnd=3*currentPage;
    let filterArray=tableShowArray.slice(pageStart,pageEnd);
    TR.innerHTML=filterArray.map(item=>{
            return `
            <tr>
                <td title="${item.title}">${item.title}</td>
                <td>${item.totalCount}</td>
                <td>${item.ChineseCount}</td>
                <td>${item.eCount}</td>
                <td>${item.pointCount}</td>
            </tr>`
        }).join('');
}