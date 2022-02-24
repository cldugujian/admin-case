window.onload = function () {

    let banner = {
        // 外面ul
        wrapper:$(".js_banner_wrapper"),
        // 列表li
        list:$(".js_banner_wrapper li"),
        // 小圆点
        dot:$(".js_dot"),
        // 索引值
        index:0,
        // 设置flag，防止点击过快
        flag:true,
        // 当前偏移值
        currentLeft:0,
        // 自动播放
        timer:null,
        // 判断是否可以点击
        clickAble:function () {
            let _this = this;
            _this.flag = false;
            _this.countDown = setTimeout(function () {
                _this.flag = true;
            },300+50);
        },
        // 初始化
        init:function () {
            // 加载页面时,去除加载动画
            setTimeout(function () {
                $(".js_loading").fadeOut(500,function () {
                    $(this).remove();
                });
            },1000);
            // 拖动窗口时
            let _this = this;
            $(window).resize(function () {
                // li宽度重置
                _this.list.width(innerWidth);
                // ul宽度重置
                _this.wrapper.width( _this.list.length*innerWidth );
                // 位置重置
                _this.move();
                // _this.moveArrow();
            });
        },
        // 生成
        create:function () {

            // 创建两个li，分别和第一个与最后一个相同
            let last = $(".js_banner_wrapper li:last").clone();
            let first = $(".js_banner_wrapper li:first").clone();

            // 在第一个li前面添加最后一个li，在最后一个li后面添加第一个li
            this.wrapper.prepend(last).append(first);

            // 重新获取元素
            this.wrapper = $(".js_banner_wrapper");
            this.list = $(".js_banner_wrapper li");

            // li的宽度
            this.list.width(innerWidth);
            // 外面ul的宽度
            this.wrapper.width( (this.list.length)*innerWidth ).css({ marginLeft:-innerWidth });

            // 新建临时数组用于存储小圆点
            let dotCache = [];
            // 生成小圆点
            for( let i=0; i<this.list.length-2; i++ ){ dotCache.push( "<span></span>" ); }
            // 添加小圆点的html内容并居中，再给第一个添加选中状态
            this.dot
                .html( dotCache.join("") )
                .css({ marginLeft:-(this.list.length-2)*22/2 })
                .find("span").eq(0)
                .addClass("active");

        },
        // banner移动
        move:function () {
            // 判断有没有点到第一张
            if( this.index == -2 ){
                this.wrapper.css({ marginLeft:-(this.list.length-2)*innerWidth });
                this.index = this.list.length-4;
            }
            // 判断有没有点到最后一张
            else if( this.index == this.list.length-2 ){
                this.wrapper.css({ marginLeft:0 });
                this.index = 0;
            }
            // 移动
            this.wrapper.stop().animate({ marginLeft:-(this.index+1)*innerWidth },300);
            // 小圆点变化
            $(".js_dot span").eq(this.index).addClass("active").siblings().removeClass("active");
            // 偏移值变化
            this.currentLeft = -(this.index+1)*innerWidth;
        },
        // 箭头点击事件
        arrowClick:function () {
            let _this = this;
            $(".js_banner_arrow span").click(function () {
                // 判断是否可以点击
                if( _this.flag ){
                    // 判断是左箭头还是右箭头
                    $(this).index() === 0 ? (_this.index --) : (_this.index ++);
                    // 移动
                    _this.move();
                    // 防止点击过快出现bug
                    _this.clickAble();
                }
            });
        },
        // 小圆点点击事件
        dotClick:function () {
            let _this = this;
            $(".js_dot span").click(function () {
                // 判断是否可以点击
                if( _this.flag ){
                    _this.index = $(this).index();
                    // 移动
                    _this.move();
                    // 防止点击过快出现bug
                    _this.clickAble();
                }
            });
        },
        // banner图鼠标经过事件
        bannnerHover:function () {
            let _this = this;
            $(".js_banner").mouseenter(function () {
                clearInterval(_this.timer);
                _this.timer = null;
            }).mouseleave(function () {
                _this.auto();
            });
        },
        // 按钮鼠标经过事件
        btnHover:function () {
            let _this = this;
            $(".js_banner_arrow span").mouseenter(function () {
                // 判断是左箭头还是右箭头
                _this.wrapper.stop().animate({ marginLeft:_this.currentLeft+($(this).index() === 0 ? 300 : -300) },300);
            }).mouseleave(function () {
                _this.wrapper.stop().animate({ marginLeft:_this.currentLeft },300);
            });
        },
        // 自动播放
        auto:function () {
            let _this = this;
            _this.timer = setInterval(function () {
                _this.index ++;
                _this.move();
            },3000);
        },
        // 所有事件集中调用
        event:function () {
            this.move();
            this.arrowClick();
            this.btnHover();
            this.dotClick();
            this.auto();
            this.bannnerHover();
        },
        // 运行
        run:function () {
            this.init();
            this.create();
            this.event();
        },

    };

    banner.run();

};