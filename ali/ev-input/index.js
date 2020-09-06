import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {
        value: ''
    },
    props: {
        width: '',
        className: '',
        type: 'text',
        value: '',
        size: 'small', //尺寸  可选值: 'small'(小) 'medium'(中) 'large'(大)
        defaultValue: '', //初始化值
        placeholder: '', //输入提示
        title: '',
        onChange: null, //发生改变的时候触发的回调
        onKeyDown: null, //键盘按下的时候触发的回调
        onFocus: null,  //获取焦点时候触发的回调
        onBlur: null,  //失去焦点时候触发的回调	
        onPressEnter: null,  //按下回车的回调
        state: null,//   //状态      可选值: 'error'(错误) 'loading'(校验中) 'success'(成功)
        addonTextBefore: '',//输入框前附加文字
        addonTextAfter: '',//输入框后附加文字
        hasClear: true, //Boolean 是否出现clear按钮
        hasBorder: true,//Boolean 是否有边框
        disabledValue: null,
        disabled: false, //Boolean  禁用状态
        maxLength: null, //Number   最大长度
        autoFocus: false, // 自动聚焦
        hasLimitHint: false, // 最大长度样式
        readOnly: false, //  Boolean 只读
        // cutString: false,
        hint: null, // 水印 (Icon的type类型，和hasClear占用一个地方)
        onRef: null,
        rep: false
    },
    didMount() {
        if (this.props.defaultValue != '') {
            this.setData({
                value: this.props.defaultValue
            })
        }
        this.props.onRef && this.props.onRef(this)
    },
    didUpdate() {
        if (this.props.disabledValue != null) {
            this.setData({
                value: this.props.disabledValue,
                disabled: true
            })
            this.props.onChange && this.props.onChange(this.props.disabledValue);
        }
        if (this.props.propValue != null){
            this.setData({
                value: this.props.propValue,
            })
        }
    },
    didUnmount() {
    },
    methods: {
        onChange(e) {
            let value = e.detail.value
            if (this.props.rep) {
                value = value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/g, '')
            }
            this.setData({
                value,
            })
            this.props.onChange && this.props.onChange(e.detail.value);
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
            this.props.onBlur && this.props.onBlur(this.data.value);
        },
        onClear() {
            this.setData({
                value: ''
            })
        },
        onPressEnter(e) {
            let event = fmtEvent(this.props, e);
            this.props.onPressEnter && this.props.onPressEnter(event);
        }
    },
});
