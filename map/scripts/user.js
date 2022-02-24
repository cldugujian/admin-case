window.onload = function(){
    
    let map = {
        el : $(".js_map"),
        // 地图边缘激活范围
        activeRange : 100,
        // 卷动速度
        scrollSpeed : 10,
        // 定时器速度
        speed:100,
        // 鼠标位置
        page:{ x:null,y:null },
        // 定时器
        timer:function () {
            setInterval(function () {
                // 如果鼠标位于小地图范围内，则不执行
                if( map.page.x < thumb.el.width() && map.page.y < thumb.el.height() ) return;
                // 获取大地图的当前横坐标
                let currentLeft = parseFloat(map.el.css("left"));
                // 获取大地图的当前纵坐标
                let currentTop = parseFloat(map.el.css("top"));
                // 获取小地图的当前横坐标
                let thumbLeft = parseFloat(thumb.border.css("left"));
                // 获取小地图的当前纵坐标
                let thumbTop = parseFloat(thumb.border.css("top"));
                // 触发左侧
                if( map.page.x < map.activeRange && currentLeft < 0 ){
                    map.el.css({ left : currentLeft + map.scrollSpeed });
                    thumb.border.css({ left : thumbLeft - thumb.scrollSpeed });
                }
                // 触发右侧
                if( map.page.x > innerWidth-map.activeRange && -currentLeft < map.el.width()-innerWidth ){
                    map.el.css({ left : currentLeft - map.scrollSpeed });
                    thumb.border.css({ left : thumbLeft + thumb.scrollSpeed });
                }
                // 触发顶部
                if( map.page.y < map.activeRange && currentTop < 0 ){
                    map.el.css({ top : currentTop + map.scrollSpeed });
                    thumb.border.css({ top : thumbTop - thumb.scrollSpeed });
                }
                // 触发底部
                if( map.page.y > innerHeight-map.activeRange && -currentTop < map.el.height()-innerHeight ){
                    map.el.css({ top : currentTop - map.scrollSpeed });
                    thumb.border.css({ top : thumbTop + thumb.scrollSpeed });
                }
            },1000/map.speed);
        }
    };

    let thumb = {
        el : $(".js_thumb"),
        // 小滑块
        border : $(".js_thumb_border"),
        // 小滑块的卷动速度
        scrollSpeed:map.scrollSpeed*innerWidth*0.25/map.el.width(),
        // 基本设置
        setting: function () {
            // 大地图的高宽比
            let mapRate = map.el.height()/map.el.width();
            // 小地图的宽
            let bWidth = innerWidth*0.25;
            // 设置小地图的宽高
            this.el.width( bWidth ).height( bWidth*mapRate );
            // 设置小滑块的宽高
            this.border.width( bWidth*innerWidth/map.el.width() ).height( this.border.width()*9/16 );
        },
        // 去除加载动画
        load:function () {
            setTimeout(function () {
                $(".js_loading").fadeOut(500,function () {
                    $(this).remove();
                });
            },1000);
        },
        // 边缘检测
        check : function () {
            let _this = this;
            // 检测小滑块是否到了左边缘
            if( map.page.x <= _this.border.width()/2 ){
                map.el.css({ left : 0 });
                thumb.border.css({ left : 0 });
            }
            // 检测小滑块是否到了右边缘
            else if( map.page.x >= _this.el.width()-_this.border.width()/2 ){
                map.el.css({ left : -(map.el.width()-innerWidth) });
                thumb.border.css({ left : _this.el.width()-_this.border.width() });
            }
            // 小滑块处于中间区域
            else{
                map.el.css({ left : -( map.page.x/(_this.el.width())*map.el.width()-innerWidth/2 ) });
                thumb.border.css({ left : map.page.x-_this.border.width()/2 });
            }
            // 检测小滑块是否到了上边缘
            if( map.page.y <= _this.border.height()/2 ){
                map.el.css({ top : 0 });
                thumb.border.css({ top : 0 });
            }
            // 检测小滑块是否到了下边缘
            else if( map.page.y >= _this.el.height()-_this.border.height()/2 ){
                map.el.css({ top : -(map.el.height()-innerHeight) });
                thumb.border.css({ top : _this.el.height()-_this.border.height() });
            }
            // 小滑块处于中间区域
            else{
                map.el.css({ top : -( map.page.y/(_this.el.height())*map.el.height()-innerHeight/2 ) });
                thumb.border.css({ top : map.page.y-_this.border.height()/2 });
            }
        },
        // 拖拽事件
        ondrag : function () {
            let _this = this;
            let flag = false;
            $(window).mousemove(function () {
                if( flag ){
                    // 检测x轴，如果碰到边缘则"黏住"
                    map.page.x > _this.el.width() && (map.page.x = _this.el.width());
                    // 检测y轴，如果碰到边缘则"黏住"
                    map.page.y > _this.el.height() && (map.page.y = _this.el.height());
                    // 开启拖动
                    _this.check();
                }
            });
            _this.border.mousedown(function () {
                // 鼠标按下时，开关激活
                flag = true;
            });
            $(window).mouseup(function () {
                // 鼠标松开时，开关失效
                flag = false;
            });
        },
        // 点击事件
        onclick: function () {
            let _this = this;
            _this.el.click(function () {
                _this.check();
            });
        },
        // 入口函数
        init : function () {
            // 去除加载动画
            this.load();
            // 初始化设置
            this.setting();
            // 点击事件
            this.onclick();
            // 拖拽事件
            this.ondrag();
            // 开启定时器
            map.timer();
            // 鼠标移动时获取当前坐标
            $(".main").mousemove(function (event) {
                let e = event || window.event;
                map.page = { x : e.pageX, y : e.pageY };
            });
        }
    };

    // 开始游戏!
    thumb.init();

};