import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {},
    props: {
        className: '', // 样式
    },
    didMount(props) {
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
    },
});
