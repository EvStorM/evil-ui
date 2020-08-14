import * as React from 'react'
import EvFrom from '../ali/ev-from'

export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    static defaultProps = {
        dataName: 'from',
        size: 'medium',
        className: '',
        inline: true,
        labelAlign: 'left',
        labelTextAlign: 'left',
        value: '',
        onChange: null,
        labelCol: {fixedSpan: 4},
        wrapperCol: {span: 20},
    }

    render() {
        let props = this.props
        return (
            <EvFrom
                dataName={props.dataName} size={props.size} labelAlign={props.labelAlign}
                labelTextAlign={props.labelTextAlign} value={props.value}
                onChange="onChange" labelCol={props.labelCol} class={props.className}
                wrapperCol={props.wrapperCol}
            >
                {props.children}
            </EvFrom>
        )
    }
}
