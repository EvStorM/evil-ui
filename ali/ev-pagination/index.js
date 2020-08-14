import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {},
    props: {
        className: '', // 样式
        size: 'medium',
        type: 'normal',
        shape: 'arrow-prev-only',
        current: null,
        defaultCurrent: 1,
        onChange: null,
        total: 10,
        pageShowCount: 5,
        pageSize: 5,
        pageSizeSelector: false,
        onPageSizeChange: null,
        hideOnlyOnePage: false,
        showJump: true
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
            this.setData({
                current:e.detail.value
            })
            let event = fmtEvent(this.props, e);
            this.props.onChange && this.props.onChange(event);
        },
        // 点击事件
        onPageSizeChange(e) {
            let event = fmtEvent(this.props, e);
            this.props.onPageSizeChange && this.props.onPageSizeChange(event);
        },
        // 点击事件
    },
});
