/**
 * Created by Administrator on 2017/7/31.
 */

    /* 初始化 */
    function $( a ) {
        if( typeof a === "function"){
            window.onload = a;
        }else if( typeof a === "string" ){
            return document.getElementById( a );
        }else if( typeof a === "object" ){
            return a;
        }
    }

    /* 获取属性 */
    function getStyle( obj,attr ) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle( obj )[attr]
    }

    /* 移动 */
    function onTheMove( obj,attr,speed,bound ) {
        /*
         speed:移动速率
         bound:边界线
         */
        var i = 0;    // 初始位置
        clearInterval( obj.timerMove );      // 清除定时器
        obj.timerMove = setInterval(function () {
            i++;
            if( i > bound ){
                i = bound;
            }
            obj.style[attr] = i*speed + "px";
        },20)
    }


