import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {
        checked: false
    },
    props: {
        className: '',
        checked: null,
        value: '',
        id: '',
        defaultChecked: false,
        disabled: false,
        indeterminate: null,
        defaultIndeterminate: false,
        onChange: null,
    },
    didMount() {
    },
    didUpdate() {
        this.setData({
            checked: this.props.defaultChecked
        })
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
    },
});
