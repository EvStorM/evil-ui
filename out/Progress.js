import * as React from 'react'
import Progre from '../ali/ev-progress'

export class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static defaultProps = {
        className: '',
        size: "medium", //进度条尺寸  'small', 'medium', 'large'
        shape: "line", //进度条形态   'circle', 'line'
        percent: "50", //所占百分比   	Number
        state: "normal", //进度状态, 显示优先级: color > progressive > state
        progressive: false, // Boolean  是否为色彩阶段变化模式, 显示优先级: color > progressive > state
        hasBorder: false, //Boolean 是否添加 Border（只适用于 Line Progress)
        color: "", //进度条颜色, 显示优先级: color > progressive > state
        backgroundColor: "", //背景色
    }
    render() {
        let {checked} = this.state
        let props = this.props
        return (
            <Progre
                className={props.className}
                size={props.size}
                shape={props.shape}
                percent={props.percent}
                state={props.state}
                progressive={props.progressive}
                hasBorder={props.hasBorder}
                color={props.color}
                backgroundColor={props.backgroundColor}
            />
        )
    }
}
