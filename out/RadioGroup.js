import * as React from 'react'
import RadG from '../ali/ev-radioGroup'

export class RadioGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static defaultProps = {
        className: '',
        size: 'medium',
        shape: '',
        defaultValue: '',
        value: '',
        onChange: null,
        disabled: false,
        dataSource: [],
        itemDirection: 'hoz'
    }
    onChange = (e) => {
        this.props.onChange && this.props.onChange(e)
    }

    render() {
        let props = this.props
        return (
            <RadG
                name={props.name} class={props.className}
                size={props.size} defaultValue={props.defaultValue}
                disabled={props.disabled} dataSource={props.dataSource}
                itemDirection={props.itemDirection}
                shape={props.shape} value={props.value} onChange={this.onChange.bind(this)}
            >{props.children}</RadG>
        )
    }
}
