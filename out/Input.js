import * as React from 'react'
import Inp from '../ali/ev-input'
import fmtEvent from "../ali/_util/fmtEvent";

export class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    static defaultProps = {
        width: '',
        className: '',
        type: 'text',
        value: '',
        size: 'medium', //尺寸  可选值: 'small'(小) 'medium'(中) 'large'(大)
        defaultValue: '', //初始化值
        placeholder: '', //输入提示
        title: '',
        autoFocus:false,
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
        hasLimitHint: false,
        readOnly: false, //  Boolean 只读
        // cutString: false,
        hint: null, // 水印 (Icon的type类型，和hasClear占用一个地方)
        onRef: null,
        rep: false
    }

    componentDidMount() {
        if (this.props.defaultValue !== '') {
            this.setState({
                value: this.props.defaultValue
            })
            // this.props.onChange && this.props.onChange(this.props.defaultValue);
        }
        this.props.onRef && this.props.onRef(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.disabledValue != null) {
            this.setState({
                value: this.props.disabledValue,
                disabled: true
            })
            this.props.onChange && this.props.onChange(this.props.disabledValue);
        }
    }

    onChange(e) {
        let value = e
        if (this.props.rep) {
            value = value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\@\.]/g, '')
        }
        this.setState({
            value: value,
        })
        this.props.onChange && this.props.onChange(e);
    }

    onKeyDown(e) {
        this.props.onKeyDown && this.props.onKeyDown(e);
    }

    onFocus(e) {
        this.props.onFocus && this.props.onFocus(e);
    }

    onBlur(e) {
        this.props.onBlur && this.props.onBlur(this.state.value);
    }

    onClear() {
        this.setState({
            value: ''
        })
    }

    onPressEnter(e) {
        this.props.onPressEnter && this.props.onPressEnter(this.state.value);
    }

    render() {
        let {value} = this.state
        let props = this.props
        return (
            <Inp
                title={props.title}
                className={props.className}
                value={value}
                size={props.size}
                defaultValue={props.defaultValue}
                placeholder={props.placeholder}
                onChange={this.onChange.bind(this)}
                onKeyDown={this.onKeyDown.bind(this)}
                onFocus={this.onFocus.bind(this)}
                onBlur={this.onBlur.bind(this)}
                onClear={this.onClear.bind(this)}
                onPressEnter={this.onPressEnter.bind(this)}
                state={props.state}
                autoFocus={props.autoFocus}
                addonTextBefore={props.addonTextBefore}
                addonTextAfter={props.addonTextAfter}
                hasClear={props.hasClear}
                hasBorder={props.hasBorder}
                disabled={props.disabled}
                maxLength={props.maxLength}
                hasLimitHint={props.hasLimitHint}
                readOnly={props.readOnly}
                htmlType={props.type}
                hint={props.hint}
            />
        )
    }
}
