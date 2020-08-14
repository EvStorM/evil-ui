import * as React from 'react'
import Notic from '../ali/ev-notice'

export class Notice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static defaultProps = {
        className: '',
        mode: '',
        // closable,link
        action: '',
        // 文本按钮
        actionLeft: '',
        // 文本按钮
        show: true,
        // 是否显示
        enableMarquee: false,
        // 是否开启marquee
        onClick: null,
        onClickLeft: null,
        marqueeProps: {
            loop: false,
            leading: 500,
            trailing: 800,
            fps: 40
        },
        capsuleItem: [],
        showIcon: true,
        type: 'normal',
        // 通告栏类型： normal/error/active
        capsule: false,
        // 是否为胶囊型通告栏
        transparent: false
    }
    onClick = (e) => {
        this.props.onClick && this.props.onClick(e)
    }
    onClickLeft = (e) => {
        this.props.onClick && this.props.onClick(e)
    }
    render() {
        let {checked} = this.state
        let props = this.props
        return (
            <Notic
                className={props.className}
                mode={props.mode}
                action={props.action}
                actionLeft={props.actionLeft}
                show={props.show}
                enableMarquee={props.enableMarquee}
                onClick={this.onClick.bind(this)}
                onClickLeft={this.onClickLeft.bind(this)}
                marqueeProps={props.marqueeProps}
                capsuleItem={props.capsuleItem}
                showIcon={props.showIcon}
                type={props.type}
                capsule={props.capsule}
                transparent={props.transparent}
            >
                {props.children}
            </Notic>
        )
    }
}
