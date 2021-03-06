import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {},
    props: {
        current: 0, // Number 当前页面的 index，可以增加左右箭头来控制轮播滚动
        className: '', // 样式
        style: '',
        duration: 500, //滑动动画时长（ms）
        interval: 5000, // 自动切换时间间隔（ms）
        circular: true,//是否启用无限滑动
        autoplay: true,//是否自动切换
        indicatorDots: true, //是否显示指示点
        indicatorColor: 'rgba(0, 0, 0, .3)',//指示点颜色
        indicatorActiveColor: '#000',//当前选中的指示点颜色
        previousMargin: '',//前边距，单位px，1.9.0暂时只支持水平方向
        nextMargin: '',//后边距，单位px，1.9.0暂时只支持水平方向
        activeClass: '',//swiper-item 可见时的 class
        changingClass: '',//acceleration 设置为 {{true}} 时且处于滑动过程中，中间若干屏处于可见时的class
        acceleration: '', //当开启时，会根据滑动速度，连续滑动多屏
        onChange: null,//当连续滑动多屏时，中间若干屏触发
        onTransition: null,//swiper 中 swiper-item 的位置发生改变时会触发 transition 事件。
        onAnimationEnd: null,//动画结束时会触发 animationEnd 事件，event.detail = {current, source}，其中 source 的值有 autoplay 和 touch

    },
    didMount() {
        console.log(this)
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        // 点击事件
        onChange(e) {
            let event = fmtEvent(this.props, e);
            this.props.onChange && this.props.onChange(event);
        },
        onTransition(e) {
            let event = fmtEvent(this.props, e);
            this.props.onTransition && this.props.onTransition(event);
        },
        onAnimationEnd(e) {
            let event = fmtEvent(this.props, e);
            this.props.onAnimationEnd && this.props.onAnimationEnd(event);
        },
    },
});
