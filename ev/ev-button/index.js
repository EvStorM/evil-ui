import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {},
    props: {
        className: '', // 样式
        type: 'primary', // 按钮的类型  'primary', 'secondary', 'normal'
        size: 'medium', // 按钮的尺寸   'small', 'medium', 'large'
        iconSize:'', // 按钮中 Icon 的尺寸，用于替代 Icon 的默认大小  'xxs', 'xs', 'small', 'medium', 'large', 'xl', 'xxl', 'xxxl'
        component:'button',   // 设置标签类型 'button', 'a'
        loading:false, // 设置按钮的载入状态
        warning:false, // 是否为警告按钮
        disabled:false, // 是否禁用
        onTap:null, // 点击按钮的回调
    },
    didMount(props) {
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        // 点击事件
        onTap(e) {
            let event = fmtEvent(this.props, e);
            this.props.onTap && this.props.onTap(event);
        },
    },
});
