/**
 * Created by hp on 2016/11/13.
 */

$(function () {
    /*header部分*/
// 鼠标移动到mid-01该图片隐藏，同时mid-02显示
    $("header .mid-01").mouseenter(function () {
        $(this).css({"visibility":"hidden"});
        $(this).siblings("a").css("display","block");
    });
    $("header .mid-02").mouseleave(function () {
              $(this).siblings("a").css("visibility","visible");
              $(this).css("display","none");
    });
    // 导航栏部分
    //鼠标移动到a标签，span的背景改变
    $("#navbar a").mouseenter(function () {
        var index=$(this).attr("data-index");
        $(this).parent().siblings("li").children("a").removeClass("spanbgi0"+index+"");
        $(this).addClass("spanbgi0"+index+"");
        $(this).children("span").css("display","none");
    }).mouseleave(function () {
        var index=$(this).attr("data-index");
        $(this).children("span").css("display","block");
        $(this).removeClass("spanbgi0"+index+"");
    });
    // 鼠标移动到每个li显示对应的隐藏部分
    $(".header-second li").mouseenter(function () {
       $(this).children(".subnav").slideDown();
    }).mouseleave(function () {
        $(this).children(".subnav").slideUp();
    });
// ===============================================================================================
//     中间部分开始
//     中间第一个盒子轮播图
    var screen=$("#content-bar");
    var lis=$(".lis06 li");

    var widthImg=screen.width();

    $("#focus-li li").mouseenter(function () {
        $(this).addClass("current");
        var index=$(this).attr("data-index");
        var target=-index*widthImg;
        console.log(target);
        $("#content-bar .lis06").animate({left:""+target+"px"});
    }).mouseleave(function () {
        $(this).removeClass("current");
    });
    $("#focus-li li:nth-child(1)").addClass("current");
    // 设置定时器每1秒换一个图片，同时focus-li加样式
    // 无缝轮播：需要把第一张追加到最后，
    var clonli=$(".lis06 li:nth-child(1)").clone(true);
    $(".lis06").append(clonli);
    var pic=0;
    var timeId=setInterval(f1,2000);
    // 无缝轮播封装
    function f1(){
        if(pic==lis.length){
            pic=0;
            $(".lis06").offset({"left":0});
        }
        pic++;
        $(".lis06").animate({left:-pic*widthImg});
        if(pic==lis.length){
            $("#focus-li li:nth-child(1)").addClass("current");
            $("#focus-li li:last-child").removeClass("current");
        }else{
            $("#focus-li li").removeClass("current");
            pic++;
            $("#focus-li li:nth-child("+pic+")").addClass("current");
            pic--;
        }

    }
// 鼠标移动到大盒子，定时器消失，鼠标离开定时器启动
    $("#content-bar").mouseenter(function () {
        clearInterval(timeId);
        $("#focus-li li:nth-child(1)").removeClass("current");
    }).mouseleave(function () {
        timeId=setInterval(f1,2000);
    });
    // 中间第一个盒子结束
// ======================================================================
// 中间第二个盒子开始
//  中间部分第三个盒子开始
//     鼠标移动到性别头像时人物变换
    $(".person-sex .active").mouseenter(function () {
        $(".person-img").css({"display": "none"});
        $(".hide-img").css({"display":"block"});
        // 同时两个a的内容改变
        $(this).removeClass("active");
        $(".person-sex .sex-img").siblings("a").css("display","none");
        $(".person-sex .sex-img").siblings("a").addClass("active");
    });
    // ==========================================================================
// 中间部分第四个盒子开始
//     鼠标移动到a添加类
//     封装改变颜色和背景的函数
    function changeColorAndBg(element) {
      element.mouseover(function () {
            $(this).children("em").addClass("changeColor");             $(this).children("i").addClass("changeBg");
        }).mouseout(function () {
            $(this).children("em").removeClass("changeColor");
            $(this).children("i").removeClass("changeBg");
        });
    }
    changeColorAndBg( $("#center-04 .play-box"));
    // 为li清除浮动
    $("#center-04 .lis09 li").addClass("clearfix");
    console.log($("#center-04 .lis09 li"));
    // 添加颜色改变的样式
    $("#center-04 .lis09 li").mouseover(function () {
       $(this).children("a").addClass("on");
       $(this).children("span").addClass("on");
    }).mouseout(function () {
        $(this).children("a").removeClass("on");
        $(this).children("span").removeClass("on");
    });
    // ===========================================================================
// 内容部分的右侧开始
// 右侧第二个盒子轮播
//     鼠标移动到newbox-tab中的li上时动态添加.on类，并且显示相应的ul
//     获取元素
    var ulWidth=$("#right-02 .bd ul").width();

    $(".newbox-tab li:nth-child(1)").children("a").addClass("on");
    $(".newbox-tab li").mouseover(function () {
        $(this).siblings("li").children("a").removeClass("on");
        $(this).children("a").addClass("on");
        var index=$(this).index();
        var target=-index*ulWidth;
        $("#right-02 .bd").animate({left:""+target+"px"});
    });
    // 右侧第三个盒子开始
    changeColorAndBg( $("#right-03 .more-link"));
    // 视频下的部分添加样式
    $("#right-03 .videobox-list li:nth-child(1)").addClass("on");
    $("#right-03 .videobox-list li").mouseover(function () {
        $(this).addClass("on");
        $(this).siblings("li").removeClass("on");
    }).mousedown(function () {
        var html=$(this).html();
        // span设置对应的html
        $("#right-03 .videobox .t2").html(html);
    });
    // 右侧第三个盒子结束
    // =================================================
    // 右侧第四个盒子开始
    // 侧边栏部分
    // 如果"收起"，点击侧边栏向右移动至消失
    // 如果“展开”，点击，侧边栏向左移动至全部出现
   var text=$("#sidebar .sid-a em").html();
    console.log(text)
    $("#sidebar .sid-a").mouseenter(function () {
        if(text=="收起"){
            $(this).parent().animate({right:"-150px"},"3s");
            $("#sidebar .sid-a em").html("展开");
            $("#sidebar .sid-a i").html("&lt;");
        }else{
            $(this).parent().animate({right:"0px"},"3s","linear");
            $("#sidebar .sid-a em").html("收起");
            $("#sidebar .sid-a i").html("&gt;");
        }
    });

});
