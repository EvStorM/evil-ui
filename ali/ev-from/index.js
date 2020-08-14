import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {},
    props: {
        size: 'medium',
        className: '',
        inline: true,
        labelAlign: 'left',
        labelTextAlign: 'left',
        value: '',
        onChange: null,
        labelCol: {fixedSpan: 4},
        wrapperCol: {span: 20},
    },
    didMount() {
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        onChange(e) {
            let {
                detail: {value},
                currentTarget: {dataset}
            } = e;
            let {name} = dataset;
            console.log(name + ' onChange:', value);
            this.setData({[name]: value});

            this.props.onChange && this.props.onChange(e)
        },
        handleSubmit() {
            console.log('[form submit]:', this.data);
            my.showToast({content: JSON.stringify(this.data)});
        }
    }
});
