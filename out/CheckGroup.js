import * as React from 'react'
import EvCheckGroup from '../ali/ev-checkGroup'

export class CheckGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        }
    }

    static defaultProps = {
        className: '',
        title: null,
        size: 'medium',
        shape: '',
        defaultValue: null,
        value: '',
        onChange: null,
        disabled: false,
        dataSource: [],
        itemDirection: 'hoz'
    }

    componentDidMount() {
        if (this.props.defaultValue) {
            this.setState({
                value: this.props.defaultValue
            })
        }
    }

    onChange(e) {
        let value = e.detail.value.filter(v => v !== '')
        this.setState({
            value: value
        })
        this.props.onChange && this.props.onChange(value);
    }

    render() {
        let {value} = this.state
        let props = this.props
        return (
            <EvCheckGroup
                title={props.title}
                name={props.name} class="checkbox"
                size={props.size} defaultValue={props.defaultValue}
                disabled={props.disabled} dataSource={props.dataSource}
                itemDirection={props.itemDirection}
                shape={props.shape} value={value} onChange={this.onChange.bind(this)}
            >
            </EvCheckGroup>
        )
    }
}
