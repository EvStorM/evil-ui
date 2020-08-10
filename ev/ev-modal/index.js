import * as React from 'react'
import {View} from 'remax/ali'

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        color: '#FFFFFF',
        width: '100%',
        height: 'auto',
        padding: '0.86vw',
        visible:false,
        className: '', // 样式
        type: 'primary', // 按钮的类型  'primary', 'secondary', 'normal'
        size: 'medium', // 按钮的尺寸   'small', 'medium', 'large'
        iconSize:'', // 按钮中 Icon 的尺寸，用于替代 Icon 的默认大小  'xxs', 'xs', 'small', 'medium', 'large', 'xl', 'xxl', 'xxxl'
        component:'button',   // 设置标签类型 'button', 'a'
        loading:false, // 设置按钮的载入状态
        warning:false, // 是否为警告按钮
        disabled:false, // 是否禁用
        onTap:null, // 点击按钮的回调
        trigger:null,
        margin: '',
    }

    render() {
        const props = this.props
        return (
            <View className={style.cardBox}
                  style={`background-color: ${props.color};
                  width: ${props.width}; 
                  height: ${props.height};
                  margin:${props.margin};        
`}>
                <overlay
                    visible={props.visible}
                    target="button-2"
                    safeNode="button-2"
                    hasMask
                    disableScroll
                    onRequestClose="onClose"
                    data-index="2"
                >
                    {props.children}
                </overlay>
            </View>
        )
    }
}