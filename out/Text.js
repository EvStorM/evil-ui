import * as React from 'react'
import Tex from '../ali/ev-text'

export class Text extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static defaultProps = {
        selectable: false, // Boolean 是否可选
        space: "nbsp", //显示连续空格	   space 有效值 nbsp:根据字体设置的空格大小;ensp:中文字符空格一半大小;emsp:中文字符空格大小
        decode: false, //是否解码。为 true 时表示对文本内容进行解码，可解析的 HTML 实体字符有：&nbsp; &lt; &gt; &amp; &apos; &ensp; &emsp;
        numberOfLines: 1, //number  多行省略，值须大于等于1，表现同 css 的 -webkit-line-clamp 属性一致
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
            <Tex
                className={props.className}
                selectable={props.selectable}
                space={props.space}
                decode={props.decode}
                numberOfLines={props.numberOfLines}
            >
                {props.children}
            </Tex>
        )
    }
}
