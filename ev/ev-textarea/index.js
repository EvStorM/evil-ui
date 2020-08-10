import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {},
    props: {
        selectable: false, // Boolean 是否可选
        className: '',
        placeholder: "请输入...",
        maxLength: 140,
        value: null,
        defaultValue: null,
        onChange: null,
        onKeyDown: null,
        disabled: false,
        rows: 4,
        autoHeight: false,
        cutString: true,
        readOnly: false,
        hasLimitHint: true,
        onBlur: null
    },
    didMount(props) {
        if (this.props.defaultValue) {
            this.setData({
                value: this.props.defaultValue
            })
            this.props.onChange && this.props.onChange(this.props.defaultValue);
        }
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        onChange(e) {
            this.setData({
                value: e.detail.value
            })
            let event = fmtEvent(this.props, e);
            this.props.onChange && this.props.onChange(e.detail.value);
        },
        onClear() {
            this.setData({
                value: ''
            })
        },
        onBlur(e) {
            let event = fmtEvent(this.props, e);
            this.props.onBlur && this.props.onBlur(this.data.value);
        },
    },
});

