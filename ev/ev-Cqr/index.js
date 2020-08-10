import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {
        ctx:null
    },
    props: {
        src: "", //图片地址
        mode: "scaleToFill", //图片模式 具体参见上方函数注释
        className: "", //外部样式
        style: "", //内联样式
        lazyLoad: true, //Boolean  支持图片懒加载，不支持通过 css 来控制 image 展示隐藏的场景。
        onLoad: null,//图片载入完毕时触发，
        onError: null, //当图片加载错误时触发
        onTap: null,//点击图片时触发
        catchTap: null,//点击图片时触发，阻止事件冒泡
    },
    methods: {
        onReady() {
            this.ctx = my.createCanvasContext('canvas');

        },

        log(e) {
            if (e.touches && e.touches[0]) {
                console.log(e.type, e.touches[0].x, e.touches[0].y);
            } else {
                console.log(e.type);
            }
        },
    }
});


