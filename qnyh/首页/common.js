/**
 * Created by hp on 2016/9/15.
 */
/**
 * 封装      找第一个子元素
 * @param element
 * @returns {*}
 */
function   getFirstELement(element){
    if(element.firstElementChild){
        return element.firstElementChild;
    }else{
        var el=element.firstChild;
        while(el&&1!==el.nodeType){
            el=el.nextSibling;
        }
        return el;
    }
}
/**
 * 封装          获取最后一个子元素的方法
 * @param element
 * @returns {*}
 */
 function    getLastElement(element){
    if(element.lastElementChild){
        return element.lastElementChild;
    }else{
        var pro=element.lastChild;
        while(pro&&1!==pro.nodeType){
            pro=pro.previousSibling;
        }
        return pro;
    }
}
/**
 * 定义一个函数，返回指定的日期格式
 * @param date
 * @returns {string}
 */
function getDate(date){
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var h=date.getHours();
    var min=date.getMinutes();
    var sec=date.getSeconds();
    month=month<10?"0"+month:month;
    day=day<10?"0"+day:day;
    h=h<10?"0"+h:h;
    min=min<10?"0"+min:min;
    sec=sec<10?"0"+sec:sec;
    return year+"-"+month+"-"+day+" "+h+":"+min+":"+sec;
}
/**
 * 动画函数的封装
 * @param element
 * @param target
 */
function animate(element,target){
    var timeId=setInterval(function(){
        //层每次移动的位置=当前位置+每次移动的步数
        //首先获取层当前的位置
        var  current=element.offsetLeft;
        var step=5;
        step=current<target?step:-step;
        current=current+step;
        //如果当前位置距离目标位置小于每次移动的步数，就清楚计时器然后设置当前位置等于目标位置，
        // 如果大于每次移动的步数，就把当前位置设置为再加上每次移动距离的值
        if(Math.abs(target-current)<Math.abs(step)){
            clearInterval(timeId);
            element.style.left=target+"px";
        }else{
            element.style.left=current+"px";
        }
    },20);
}
/**
 * 封装元素计算后的属性值
 * @param element
 * @param attr
 * @returns {*}
 */
function getAttrValue(element,attr) {
    return element.currentStyle?element.currentStyle[attr] : window.getComputedStyle(element,null)[attr]||0;
}