import * as React from 'react'
import Swit from '../ali/ev-switch'

export class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }

    static defaultProps = {
        checked: false, //开关当前的值(针对受控组件)
        disabled: false, //表示开关被禁用
        onChange: null,
        size: 'medium',//switch的尺寸  可选值: 'medium'(正常大小) 'small'(缩小版大小)
        id: '',
        name: '',
        controlled: false// 是否为受控组件，为 true 时，checked 会完全受 setData 控制
    }
    onChange = (e) => {
        this.setState({
            checked: e.detail.value
        })
        this.props.onChange && this.props.onChange(e.detail.value)
    }

    render() {
        let {checked} = this.state
        let props = this.props
        return (
            <Swit
                size={props.size}
                name={props.name} checked={checked} disabled={props.disabled}
                color={props.color}
                onChange={this.onChange.bind(this)} controlled={props.controlled}
            />

        )
    }
}
