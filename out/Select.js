import * as React from 'react'
import Eselect from '../ali/ev-select'

export class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
        }
    }

    static defaultProps = {
        className: '',
        title: '',
        custom: false,
        options: [],//
        defaultValue: null, //初始的默认值
        size: 'medium', //选择器尺寸
        placeholder: '请选择',
        state: '',// 可选值: 'error', 'loading'
        value: null,
        disabledValue: null,
        disabled: false,  //Boolean  是否禁用选择器
        followTrigger: true, //Boolean 是否跟随滚动
        mode: 'single', //选择器模式 可选值: 'single', 'multiple', 'tag'
        autoWidth: true, //Boolean 下拉菜单是否与选择器对齐，如果需要下拉区域自动撑开，需要配置为false
        dataSource: '',//传入的数据源，const dataSource = [ {label:'option1', value:'option1'}, {label:'option2', value:'option2'}, {label:'disabled', disabled:true}];
        onChange: null, //Select发生改变时触发的回调  event.detail.value:选中的值
        onFocus: null,
        onRef: null
    }

    componentDidMount() {
        if (this.props.defaultValue != null) {
            this.setState({
                value: this.props.defaultValue,
            })
            return
        }
        this.props.onRef && this.props.onRef(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            if (this.props.disabledValue != null) {
                this.setState({
                    value: this.props.disabledValue,
                    disabled: true
                })
                this.props.onChange && this.props.onChange(this.props.disabledValue);
            }
        }
    }

    onChange = (e) => {
        this.setState({
            value: e
        })
        this.props.onChange && this.props.onChange(e)
    }

    render() {
        let {value} = this.state
        let props = this.props
        return (
            <Eselect
                className={props.className} title={props.title}
                onChange={this.onChange.bind(this)} dataSource={props.dataSource}
                autoWidth={props.autoWidth} mode={props.mode} value={value}
                state={props.state} followTrigger={props.followTrigger} disabled={props.disabled}
                size={props.size} placeholder={props.placeholder} defaultValue={props.defaultValue}
            />

        )
    }
}
