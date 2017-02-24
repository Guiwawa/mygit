/**
 * Created by hp on 2017/2/23.
 */
window.onload=function(){
    // 顶部通栏滚动效果
    headerScroll();
    // 倒计时效果
    cutDownTime();
    // 轮播图效果
    banner03();
}
// 顶部通栏滚动效果函数
function headerScroll(argument){
    // 分析：当滚动条滚动至导航栏底部时，顶部通栏的透明度从0到1渐变
    // 1.获取导航栏的高度
    var nav=document.querySelector(".jd_nav");
    var navHeight=nav.offsetHeight;
    var navTop=nav.offsetTop;

    // 2.计算滚动条滚动至导航栏底部的距离
    var maxHeight=navHeight+navTop;
    // 3.注册鼠标滚动事件，计算渐变百分比=滚动条滚动的距离/导航栏底部到顶部的距离
    // 获取通栏
    var header=document.querySelector(".jd_header");
    header.style.backgroundColor='rgba(201,21,35,0)';
    window.onscroll=function(){
        var scrollDistance=window.document.body.scrollTop;
        var pre=scrollDistance/maxHeight;
        if(pre>1){
            pre=1;
        }
        // 4.设置通栏渐变
        header.style.backgroundColor='rgba(201,21,35,'+pre+')';
    };


}
// 倒计时效果函数
function cutDownTime(argument){
    // 首先获取需要的元素span
    var spans=document.querySelectorAll(".jd_sk>.sk_time>span");
    // 假设倒计时三个小时
    var time=3;
    var timeSec=time*60*60;
    var timeId=setInterval(function () {
        // 计算时，分，秒的值
        var hour=Math.floor(timeSec/3600);
        var mit=Math.floor(timeSec%3600/60);
        var sec=timeSec%60;
        if(timeSec<=0){
            clearInterval(timeId);
        }
        timeSec--;
        // 计算转换后的时分秒的值
        // 给span元素赋值
        spans[0].innerHTML=Math.floor(hour/10);
        spans[1].innerHTML=hour%10;
        spans[3].innerHTML=Math.floor(mit/10);
        spans[4].innerHTML=mit%10;
        spans[6].innerHTML=Math.floor(sec/10);
        spans[7].innerHTML=sec%10;
    },1000);



}
// 轮播图效果函数
function banner01(argument){
    // 首先获取所需的元素
    // 获取屏幕的宽度
    // var width=document.body.offsetWidth;//每次移动一个屏幕的宽度
    var width=document.querySelector(".jd_banner").offsetWidth;
    console.log(width);
    var ul=document.querySelector(".jd_banner>ul:first-child");
    var ulWidth=ul.offsetWidth;
    // 设置过渡效果,


    ul.style.transition="all .3s";
    // 获取索引的li
    var lis=document.querySelectorAll(".jd_banner>ul:last-child>li");
    console.log(lis);
    // 定义index,记录当前的位置
    var index=1;
    var timeId=setInterval(function () {
        index++;
        if(index>=9){
            index=1;
            // 当切换到最后一张时要瞬间切换到第一张
            // 关闭过渡，瞬间切换到第一张
            ul.style.transition="";

        }
        // 设置ul的位置
        ul.style.transform='translateX('+index*width*-1+'px)';

        // 为当前的li 添加current样式
        for(var i=0;i<lis.length;i++){
            lis[i].className='';
        }
        lis[index-1].className='current';


    },1000);
}




function banner02(argument){
    // 首先获取所需的元素
    // 获取屏幕的宽度
    // var width=document.body.offsetWidth;//每次移动一个屏幕的宽度
    var width=document.querySelector(".jd_banner").offsetWidth;
    console.log(width);
    var ul=document.querySelector(".jd_banner>ul:first-child");
    var ulWidth=ul.offsetWidth;
    // 设置过渡效果,
    ul.style.transition="all .3s";
    // 获取索引的li
    var lis=document.querySelectorAll(".jd_banner>ul:last-child>li");
    console.log(lis);
    // 定义index,记录当前的位置
    var index=1;
    var timeId=setInterval(function () {
        index++;
        // 再次开启过渡
        ul.style.transition="all .3s";
        ul.style.transform='translateX('+index*width*-1+'px)';
    },1000);
    // 对代码进行重构，添加过渡结束事件
    ul.addEventListener("webkitTransitionEnd",function () {
        console.log("过渡结束");
        if(index>=9){
            index=1;
            // 关闭过渡
            ul.style.transition="";
            // 直接跳转到第一张
            ul.style.transform='translateX('+index*width*-1+'px)';
        }else if(index<1){
            index=8;
            ul.style.transform="";
            ul.style.transform='translateX('+index*width*-1+'px)';
        }
        // 添加current样式
        for(var i=0;i<lis.length;i++){
            lis[i].className="";
        }
        lis[index-1].className='current';
    });



    // 使用touch事件实现手指触摸屏幕，ul滑动效果
/*    touchstart事件中：1.关闭计时器  2.关闭过渡事件 3.获取开始时候的startX；
    touchmove事件中：1.获取移动的距离  2.设置ul移动
    touchend事件中：1.开启定时器  2.开启过渡事件  3.计算出下次移动的距离*/
    // 为ul注册这三个事件
    var startX=0;
    var moveX=0;
    var distanceX=0;
    // touchstart事件
    ul.addEventListener("touchstart",function (event) {
       clearInterval(timeId);
        ul.style.transition="";
        startX=event.touches[0].clientX;
    });
    // touchmove事件
    ul.addEventListener("touchmove",function (event) {
       moveX=event.touches[0].clientX-startX;
        ul.style.transform="translateX("+(moveX+index*-1*width)+"px)"
    });
    // touchend事件
    ul.addEventListener("touchend",function (event) {
        // ul.style.transition="all .3s";
       /* 当手指离开时，需要判断是否超过了移动的最大值，如果超过了就显示下一张，如果没有超过就要吸附回去原来的哪一张。*/
        var maxdistance=width/3;
        if(Math.abs(moveX)>maxdistance){
            if(moveX>0){
                index--;
            }else{
                index++;
            }
            ul.style.transition="all .3s";
            // 吸附回去
            ul.style.transform="translateX("+(index*-1*width)+"px)";
        }else{
            // 开启过渡
            ul.style.transition="all .3s";
            // 吸附回去
            ul.style.transform="translateX("+(index*-1*width)+"px)";
        }
        // 开启定时器
        timeId=setInterval(function () {
            index++;
            // 再次开启过渡
            ul.style.transition="all .3s";
            ul.style.transform='translateX('+index*width*-1+'px)';
        },1000);
    });
}




function banner03(argument){
// 一、无缝轮播部分
   /* 1.获取所需的元素
    2.获取窗口的宽度
    3.定义索引，方便获取图片的索引
    4.设置定时器
    5.设置ul过渡
    6.改变ul的位置
    7.设置过渡结束时间
    8.设置li的current样式*/


    var width=document.querySelector(".jd_banner").offsetWidth;
    var ul=document.querySelector(".jd_banner>ul:first-child");
    var lis=document.querySelectorAll(".jd_banner>ul:last-child>li");
    var index=1;


    // 定时器

    var timeId=setInterval(function () {
        index++;
        ul.style.transition="all .3s";
        ul.style.transform="translate("+index*-1*width+"px)";
    },1000);


    // 过渡结束事件


    ul.addEventListener("webkitTransitionEnd",function () {
       if(index>8){
           index=1;
           ul.style.transition="";
           ul.style.transform="translate("+index*-1*width+"px)";
       }
        for(var i=0;i<lis.length;i++){
            lis[i].className="";
        }
        lis[index-1].className="current";
    });



    // 二、手动轮播部分
/*  1.touchstart事件：清除计时器；清除过渡；获得手指按下时的starX
    2.touchmove事件：计算移动的距离moveX；设置ul移动
    3.touchend事件：设置移动的最大距离；判断移动的距离的绝对值是否大于设置的距离；
    4.如果大于；判断moveX是否大于0;如果大于0，index--,设置ul；如果小于0，index++,设置ul;
    5.如果小于0；开启过渡，ul的位置不变；
    6.在touchend事件的最后开启定时器*/

    var startX=0;
    var moveX=0;
    var distanceX=0;

    // touchstart事件
    ul.addEventListener("touchstart",function (event) {
        clearInterval(timeId);
        ul.style.transition="";
        startX=event.touches[0].clientX;
    });
    // touchmove事件
    ul.addEventListener("touchmove",function (event) {
        moveX=event.touches[0].clientX-startX;
        ul.style.transform="translateX("+(moveX+index*-1*width)+"px)";
    });


    // touchend事件
    ul.addEventListener("touchend",function () {
       var maxDistance=width/3;
        if(Math.abs(moveX)>maxDistance){
            if(moveX>0){
                index--;
                ul.style.transition="all .3s";
                ul.style.transform="translateX("+index*-1*width+"px)";
            }else if(moveX<0){
                index++;
                ul.style.transition="all .3s";
                ul.style.transform="translateX("+index*-1*width+"px)";
            }
        }else{
            ul.style.transition="all .3s";
            ul.style.transform="translateX("+index*-1*width+"px)";
        }
        timeId=setInterval(function () {
            index++;
            ul.style.transition="all .3s";
            ul.style.transform="translate("+index*-1*width+"px)";
        },1000);
    });


}