import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {},
    props: {
        width: '',
        className: '',
        type: 'text',
        value: '',
        checked: false
    },
    didMount(props) {
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        onChange(e) {
            this.setData({
                checked: !this.data.checked
            })
            let event = fmtEvent(this.props, e);
            this.props.onChange && this.props.onChange(event);
        },
        onKeyDown(e) {
            let event = fmtEvent(this.props, e);
            this.props.onKeyDown && this.props.onKeyDown(event);
        },
        onFocus(e) {
            let event = fmtEvent(this.props, e);
            this.props.onFocus && this.props.onFocus(event);
        },
        onBlur(e) {
            let event = fmtEvent(this.props, e);
            this.props.onBlur && this.props.onBlur(event);
        },
        onPressEnter(e) {
            let event = fmtEvent(this.props, e);
            this.props.onPressEnter && this.props.onPressEnter(event);
        }
    },
});
