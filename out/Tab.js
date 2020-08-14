import * as React from 'react'
import Tabs from '../ali/ev-tab'

export class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static defaultProps = {
        className: '',
        size: "medium",//尺寸   可选值:'small', 'medium'
        shape: "pure",//外观形态'pure',   可选值  'wrapped', 'text','capsule
        defaultActiveKey: "0",//初始化时被激活的选项卡的 key Number/String
        animation: true,  //Boolean 是否开启动效
        excessMode: "slide",//选项卡过多时的滑动模式
        tabPosition: "top",//导航选项卡的位置，只适用于包裹型（wrapped）选项卡
        triggerType: "click",//激活选项卡的触发方式       可选值  'hover', 'click'
        onTap: null,  //点击单个选项卡时触发的回调
        onChange: null,  //选项卡发生切换时的事件回调
        onClose: null,//选项卡被关闭时的事件回调
    }
    onTap = (e) => {
        this.props.onChange && this.props.onChange(e)
    }
    onChange = (e) => {
        this.props.onChange && this.props.onChange(e)
    }
    onClose = (e) => {
        this.props.onChange && this.props.onChange(e)
    }
    render() {
        let props = this.props
        return (
            <Tabs
                className={props.className}
                size={props.size}
                shape={props.shape}
                defaultActiveKey={props.defaultActiveKey}
                animation={props.animation}
                excessMode={props.excessMode}
                tabPosition={props.tabPosition}
                triggerType={props.triggerType}
                onTap={this.onTap.bind(this)}
                onChange={this.onChange.bind(this)}
                onClose={this.onClose.bind(this)}
            >
                {props.children}
            </Tabs>
        )
    }
}
