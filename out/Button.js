import * as React from 'react'
import Ebutton from '../ali/ev-button'

export class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static defaultProps = {
        className: '', // 样式
        type: 'primary', // 按钮的类型  'primary', 'secondary', 'normal'
        size: 'medium', // 按钮的尺寸   'small', 'medium', 'large'
        iconSize: '', // 按钮中 Icon 的尺寸，用于替代 Icon 的默认大小  'xxs', 'xs', 'small', 'medium', 'large', 'xl', 'xxl', 'xxxl'
        component: 'button',   // 设置标签类型 'button', 'a'
        loading: false, // 设置按钮的载入状态
        warning: false, // 是否为警告按钮
        disabled: false, // 是否禁用
        onTap: null, // 点击按钮的回调
    }
    render() {
        let props = this.props
        return (
            <Ebutton
                className={props.className}
                disabled={props.disabled}
                loading={props.loading}
                iconSize={props.iconSize}
                type={props.type}
                onTap={props.onTap}
            >
                {props.children}
            </Ebutton>
        )
    }
}
