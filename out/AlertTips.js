import * as React from 'react'
import Alert from '../ali/AlertTips';

export class AlertTips extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        className: '', // 样式
        type: 'primary', // 标示的的类型  'primary', 'secondary', 'normal'
        size: 'medium', // 按钮的尺寸   'small', 'medium', 'large'
        iconSize: '', // 按钮中 Icon 的尺寸，用于替代 Icon 的默认大小  'xxs', 'xs', 'small', 'medium', 'large', 'xl', 'xxl', 'xxxl'
        component: 'button',   // 设置标签类型 'button', 'a'
        loading: false, // 设置按钮的载入状态
        hasClear: false, // 是否显示关闭按钮
        onTap: null, // 点击按钮的回调
        onclose: null, // 点击关闭按钮的回调
    }

    render() {
        const props = this.props
        return (
            <Alert type={props.type} hasClear={props.hasClear}>
                {props.children}
            </Alert>
        )
    }
}
