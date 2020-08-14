import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {},
    props: {
        className: '', // 样式
        title: 'id',
        dataIndex: '',
        align: '',
        width: '',
        sortable: '',
        filters: ''
    },
    didMount(props) {
        console.log(this.props);
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
    },
});
