function common(){

    // 去除加载动画
    setTimeout(function () {
        $(".js_loading").fadeOut(500,function () {
            $(this).remove();
        });
    },10);

    // 移动端适配
    let rem = {
        // 隐藏浏览器状态栏
        hideBar:function () {
            setTimeout(function() {
                window.scrollTo(0, 1)
            }, 0);
        },
        // 屏幕适配
        response:function () {
            let fontSize;
            fontSize = 100*innerWidth/360 + "px";
            $("html,body").css({ fontSize:fontSize });
        },
        // 执行以上所有方法
        run:function () {
            this.hideBar();
            this.response();
        }
    };

    rem.run();

}