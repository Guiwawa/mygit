/**
 * Created by hp on 2016/11/16.
 */
// 往第二个盒子里动态添加li和a
window.onload=function () {
    var data01=["快速升级","贸易指南","三界伙伴","装备介绍","灵兽系统","坐骑系统"];
    var data02=["帮会联赛","贸易指南","帮会联赛","帮会联赛","十字镜","坐骑系统","京城妖奇谈","京师保卫战"];
    var data03=["帮会联赛","贸易指南","帮会联赛","帮会联赛","十字镜","坐骑系统","主角剧情"];
    var ul01=document.getElementById("lis-08");
        addLiAndA(6,ul01,data01);
    var ul02=document.getElementById("lis-09");
        addLiAndA(8,ul02,data02);
    var ul03=document.getElementById("lis-10");
        addLiAndA(7,ul03,data03);

    //封装添加li和a的函数
    function addLiAndA(num,element,arr) {
        for(var i=0;i<num;i++){
            var li=document.createElement("li");
            li.setAttribute("index",i);
            var a=document.createElement("a");
            element.appendChild(li);
            li.appendChild(a);
            a.innerHTML=arr[i];
        }

    }



    // ====================================================
// 中间部分的第三个盒子开始
//     为第三个盒子中的导航栏动态添加li
var data03=["魅者","刀客","甲士","魅者","刀客","甲士","魅者","刀客","甲士","异人"];
    var ul04=document.getElementById("carnav");
    addLiAndA(10,ul04,data03);
    //鼠标移动到li时动态添加类：当前高亮
    var lis=ul04.children;
    lis[0].setAttribute("class","on");
     for(var i=0;i<lis.length;i++){
        var li=lis[i];
         console.log(li.index);
         li.onmouseenter=function () {
             // 排他思想
           for(var j=0;j<lis.length;j++){
               lis[j].removeAttribute("class");
           }
           this.setAttribute("class","on");
             //同时显示相对应的人物
             var carList=document.getElementsByClassName("career-list")[0];
             var divs=carList.children;
             // divs[].style.display="block";
             console.log(this.index);
         };
     }


};
