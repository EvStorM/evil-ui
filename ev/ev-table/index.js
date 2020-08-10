import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {},
    props: {
        className: '', // 样式
        // dataSource
        dataSource: null,
        cols:null,
        hasBorder: true,
        hasHeader: true,
        isZebra: false,
        loading: false,
        fixedHeader: null,
        maxBodyHeight: null,
        stickyHeader: null,
        offsetTop: null,
        onChange: null,
        onSelect: null,
        onSelectAll: null,
        mode: 'multiple',
        selectedRowKeys:null,
        onResizeChange: null,
        onSort: null,
        onFilter: null,
        onBodyScroll: null,
    },
    didMount(props) {
    },
    didUpdate() {


        // mode="{{mode}}"
        // onChange="onChange" selectedRowKeys="{{selectedRowKeys}}"
        // onSelect="onSelect" onSelectAll="onSelectAll"
    },
    didUnmount() {
    },
    methods: {
        // 点击事件
        onChange(e) {
            let event = fmtEvent(this.props, e);
            this.props.onChange && this.props.onChange(event);
        },
        // 点击事件
        onSelect(e) {
            let event = fmtEvent(this.props, e);
            this.props.onSelect && this.props.onSelect(event);
        },
        // 点击事件
        onSelectAll(e) {
            var event = fmtEvent(this.props, e);
            this.props.onSelectAll && this.props.onSelectAll(event);
        },
        // 点击事件
        onResizeChange(e) {
            var event = fmtEvent(this.props, e);
            this.props.onResizeChange && this.props.onResizeChange(event);
        },
        // 点击事件
        onSort(e) {
            var event = fmtEvent(this.props, e);
            this.props.onSort && this.props.onSort(event);
        },
        // 点击事件
        onFilter(e) {
            var event = fmtEvent(this.props, e);
            this.props.onFilter && this.props.onFilter(event);
        },
        // 点击事件
        onBodyScroll(e) {
            var event = fmtEvent(this.props, e);
            this.props.onBodyScroll && this.props.onBodyScroll(event);
        },
    },
});
