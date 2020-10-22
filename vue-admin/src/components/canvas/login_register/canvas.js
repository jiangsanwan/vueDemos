let Dots = function (speed, alpha) {
    // 画布相关
    this.canvas;
    this.ctx;
    // 绘制点相关
    this.x;
    this.y;
    this.r;
    this.a = alpha && alpha > 0 && alpha <= 0.6 ? alpha : .6;
    // 移动相关
    this.speed = speed && speed > 0 ? speed : 2;
    this.sx;
    this.sy;
    this.isMouseDot = 0;
}
Dots.prototype = {
    // 初始化点的方法 x/y为可选参数 为生成点的位置 不传则随机生成
    init: function (canvas, x, y, isMouseDot) {
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d')
        // 随机生成点的位置
        this.x = x * 2 || Math.random() * this.canvas.width
        this.y = y * 2 || Math.random() * this.canvas.height
        this.r = Math.random() * 4 // 随机生成 <4 的半径值

        if (isMouseDot) this.isMouseDot = 1// 标识是不是鼠标位置所在的点

        // 随机确定点的移动速度与方向 速度值在 [-this.speed, this.speed) 之间 提高数值可加快速度
        this.sx = isMouseDot ? 0 : Math.random() * this.speed * 2 - this.speed
        this.sy = isMouseDot ? 0 : Math.random() * this.speed * 2 - this.speed

        // this.ctx.save()
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        this.ctx.fillStyle = 'rgba(255,255,255,' + this.a + ')'
        this.ctx.fill()
        this.ctx.closePath()
    },
    update: function () {
        if (this.isMouseDot) return
        this.x = this.x + this.sx
        this.y = this.y + this.sy
        // 点超出canvas范围时另其"重生"
        if (this.x < 0 || this.x > this.canvas.width) {
            this.init(this.canvas);
        }
        if (this.y < 0 || this.y > this.canvas.height) {
            this.init(this.canvas);
        }
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2 * Math.PI)
        this.ctx.fillStyle = 'rgba(255,255,255,' + this.a + ')'
        this.ctx.fill()
        this.ctx.closePath()
    },
    // 跟踪鼠标的点的位置更新 x/y为鼠标位置
    mouseDot: function (x, y) {
        this.x = x
        this.y = y
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, this.r + 0.5, 0, 2 * Math.PI)
        this.ctx.fillStyle = 'rgba(255,255,255,' + this.a + ')'
        this.ctx.fill()
        this.ctx.closePath()
    }
}
/**
 * opts中的参数
 * el {String} 元素id或class
 * dotsNumber {Int} 初始化时页面上点的数量，如不传将根据绘制面积控制点的数量
 * lineMaxLength {Int} 两点之间最大的连接线长度，默认：250
 * dotsAlpha {Float} 点的透明度，取值范围 (0,1]，默认：0.8
 * speed {Float} 点的移动速度，取值范围：大于0，默认：2
 * clickWithDotsNumber {Int} 每次点击产生的点的数量，默认：5
 */
export function mineCanvas(opts) {
    // console.log(opts)
    let part = opts.el,// 获取父级元素
        canvas = document.createElement('canvas'),// 生成canvas DOM节点
        ctx = canvas.getContext('2d'),// 获取画布
        partStyle = window.getComputedStyle(part, null),// 获取父级元素的内联样式
        width = parseInt(partStyle.width),// 获取父级元素的内联样式--宽度值
        height = parseInt(partStyle.height),// 获取父级元素的内联样式--高度值
        area = width * height, // canvas区域面积
        cssText = 'width: ' + width + 'px; height: ' + height + 'px;';

    canvas.setAttribute('style', cssText)// 设置canvas样式
    canvas.width = (width).toString()// 设置canvas的宽
    canvas.height = (height).toString()// 设置canvas的高

    // 当页面改变大小的时候，删除父级元素中原有的canvas
    if (part.childNodes.length > 0) {
        part.childNodes.forEach(v => {
            part.removeChild(v)
        })
    }
    part.appendChild(canvas)// 将canvas DOM节点放入父级元素
    let dotsArr = [],
        dotsNum = opts.dotsNumber || parseInt(area / 14000),
        maxDotsNum = dotsNum * 2,
        overNum = 0, // 超出最大数量的点的数量
        dotsDistance = opts.lineMaxLength || 250; // 点之间产生连线的最大距离
    
    // 生成点
    for (let i = 0; i < dotsNum; i++) {
        var dot = new Dots(opts.speed, opts.dotsAlpha)
        if (i < dotsNum - 1) {
            dot.init(canvas)
        } else {
            dot.init(canvas, 0, 0, 1)
        }
        dotsArr.push(dot)
    }


    // 鼠标事件
    let clickWithNew = opts.clickWithDotsNumber || 5
    document.addEventListener('click', createDot)
    function createDot (e) {
        let tx = e.pageX / 2,
            ty = e.pageY / 2;
        if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {
            for (let i = 0; i < clickWithNew; i++) {
                var dot = new Dots(opts.speed, opts.dotsAlpha)
                dotsArr.push(dot)
                dotsNum += 1
                dot.init(canvas, tx, ty)
            }
        }
    }
    canvas.addEventListener('mouseenter', mouseDotEnter)
    canvas.addEventListener('mousemove', mouseDotMove)
    canvas.addEventListener('mouseleave', mouseDotLeave)

    function mouseDotEnter (e) {
        let tx = e.pageX,
            ty = e.pageY;
        dot.init(canvas, tx, ty, 1)
    }
    function mouseDotMove (e) {
        let tx = e.pageX,
            ty = e.pageY;
        if ((tx > 0 && tx < width) && (ty > 0 && ty < height)) {
            dot.mouseDot(tx, ty)
        }
    }
    function mouseDotLeave () {
        dot.init(canvas)
    }
    
    // eslint-disable-next-line
    let requestAnimFrame = requestAnimationFrame || webkitRequestAnimationFrame || oRequestAnimationFrame || msRequestAnimationFrame
    requestAnimFrame(animateUpdate); // 兼容不同浏览器的requestAnimationFrame
    function animateUpdate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空canvas中原有的内容
        // 更新点的位置 数量超出最大值时舍弃旧的点
        if (dotsNum > maxDotsNum) {
            overNum = dotsNum - maxDotsNum
        }
        for (let i = overNum; i < dotsNum; i++) {
            if (dotsArr[i]) dotsArr[i].update()
        }
        for (let i = overNum; i < dotsNum; i++) {
            for (let j = i + 1; j < dotsNum; j++) {
                var tx = dotsArr[i].x - dotsArr[j].x,
                    ty = dotsArr[i].y - dotsArr[j].y,
                    s = Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2));
                if (s < dotsDistance) {
                    ctx.beginPath()
                    ctx.moveTo(dotsArr[i].x, dotsArr[i].y)
                    ctx.lineTo(dotsArr[j].x, dotsArr[j].y)
                    ctx.strokeStyle = 'rgba(255,255,255,' + (dotsDistance - s) / dotsDistance + ')'
                    ctx.strokeWidth = 1
                    ctx.stroke()
                    ctx.closePath()
                }
            }
        }
        requestAnimFrame(animateUpdate)
    }
}