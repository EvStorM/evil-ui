import * as React from 'react'
import EvBalloon from '../ali/ev-balloon'
import {View} from 'remax/ali'

export class Balloon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {visible: false}
    }

    static defaultProps = {
        type: "normal", // 可选值:'normal', 'primary'
        visible: false, // 弹层当前显示的状态
        defaultVisible: false, // 弹层默认显示的状态
        onVisibleChange: null, // 弹层在显示和隐藏触发的事件
        onClose: null,
        alignEdge: false, // 弹出层对齐方式
        closable: false, //是否显示关闭按钮
        align: 'l', // 弹出层位置可选值:'t'(上)'r'(右)'b'(下)'l'(左)'tl'(上左)'tr'(上右)'bl'(下左)'br'(下右)'lt'(左上)'lb'(左下)'rt'(右上)'rb'(右下 及其 两两组合)
        offset: [0, 0], // 	弹层相对于trigger的定位的微调, 接收数组[hoz, ver], 表示弹层在 left / top 上的增量
        needAdjust: true, // 是否进行自动位置调整
        followTrigger: true,
        delay: '', // 弹层在触发以后的延时显示, 单位毫秒 ms
        onAfterClose: null, // 浮层关闭后触发的事件, 如果有动画，则在动画结束后触发
        triggerType: 'click'  // 鼠标悬浮, 鼠标点击('hover','click')或者它们组成的数组，如['hover', 'click'],
    }

    onClose() {
        this.setState({visible: false})
    }

    changeVisible() {
        this.setState({visible: true});
    }

    onVisibleChange() {
    }

    onAfterClose() {
    }

    render() {
        let {visible} = this.state
        let props = this.props
        return (
            <EvBalloon
                type={props.type}
                visible={visible}
                defaultVisible={props.defaultVisible}
                onVisibleChange={this.onVisibleChange.bind(this)}
                onClose={this.onClose.bind(this)}
                alignEdge={props.alignEdge}
                closable={props.closable}
                align={props.align}
                offset={props.offset}
                needAdjust={props.needAdjust}
                delay={props.delay}
                onAfterClose={this.onAfterClose.bind(this)}
                triggerType={props.triggerType}
            >
                {props.children}
                <View slot={"balloon"} onTap={this.changeVisible.bind(this)}>
                    {props.trigger}
                </View>
            </EvBalloon>
        )
    }
}
