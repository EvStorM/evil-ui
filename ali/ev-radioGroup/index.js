import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {},
    props: {
        className: '',
        size: 'medium',
        shape: '',
        defaultValue: '',
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
        // if (this.props.defaultValue != this.data.defaultValue) {
        //     this.setData({
        //         value: this.props.defaultValue
        //     })
        // }
    },
    didUnmount() {
    },
    methods: {
        onChange(e) {
            this.setData({
                value: e.detail.value
            })
            let event = fmtEvent(this.props, e);
            this.props.onChange && this.props.onChange(event);
        },
    },
});
