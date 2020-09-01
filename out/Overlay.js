import * as React from 'react'
import Overl from '../ali/ev-overlay'
import fmtEvent from "../ali/_util/fmtEvent";

export class Overlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    static defaultProps = {
        visible: false,
        className: '', // 样式
        offset: [0, 0],
        hasMask: true,
        onTap: null, // 点击按钮的回调
        onClose: null, // 关闭回调
        trigger: null,
        align: 'cc cc'
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({
                visible: this.props.visible
            })
        }
    }

    onTap(e) {
        this.setState({
            visible: true
        })
        this.props.onTap && this.props.onTap(e);
    }

    onClose(e) {
        this.setState({
            visible: false
        })
        this.props.onClose && this.props.onClose(e);
    }

    render() {
        let {visible} = this.state
        let props = this.props
        return (
            <Overl
                visible={visible}
                safeNode={props.safeNode}
                hasMask={props.hasMask}
                disableScroll={props.hasMask}
                needAdjus={props.hasMask}
                offset={props.offset}
                align={props.align}
                onClose={this.onClose.bind(this)}>
                {props.children}
            </Overl>
        )
    }
}
