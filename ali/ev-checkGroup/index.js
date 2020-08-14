import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {},
    props: {
        className: '',
        title: null,
        size: 'medium',
        shape: '',
        defaultValue: null,
        value: '',
        onChange: null,
        disabled: false,
        dataSource: [],
        itemDirection: 'hoz'
    },
    didMount() {
        if (this.props.defaultValue) {
            this.setData({
                value: this.props.defaultValue
            })
        }
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        onChange(e) {
            let value = e.detail.value.filter(v => v !== '')
            this.setData({
                value: value
            })
            let event = fmtEvent(this.props, e);
            this.props.onChange && this.props.onChange(value);
        },
    },
});
