import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {},
    props: {
        className: '', // 样式
        type: 'date', // 时间选择器的类型  'date', 'range', 'month' 'year'
        size: 'medium', // 按钮的尺寸   'small', 'medium', 'large'
        state:'',   // 输入框状态  'success', 'loading', 'error'
        placeholder:'', // 输入提示
        defaultValue:'', // 初始日期值，moment 对象 {{['2019-01-01', '2019-02-02']}}
        format:'YYYY-MM-DD',   // 日期值的格式（用于限定用户输入和展示）
        showTime:false, // 是否使用时间控件，format: 'HH:mm' 传入 TimePicker 的属性 { defaultValue, format, ... }
        resetTime:false, // 每次选择日期时是否重置时间（仅在 showTime 开启时有效）
        disabled:false, // 是否禁用
        hasClear:false, // 是否显示清空按钮
        visible:null, // 弹层显示状态
        defaultVisible:false, // 弹层默认是否显示
        onChange:null, // 日期值改变时的回调
        onVisibleChange:null, //
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
        onVisibleChange(e){
            let event = fmtEvent(this.props, e);
            this.props.onVisibleChange && this.props.onVisibleChange(event);
        }
    },
});
