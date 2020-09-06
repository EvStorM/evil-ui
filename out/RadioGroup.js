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
        propValue: '',
        dataSource: [],
        itemDirection: 'hoz'
    }

    componentDidMount() {
        this.setState({
            defaultValue: this.props.defaultValue
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.propValue !== this.props.propValue) {
            console.log(prevProps.propValue, this.props.propValue, 'propValue');
            this.setState({
                value: this.props.propValue
            })
        }
    }

    onChange = (e) => {
        this.props.onChange && this.props.onChange(e)
    }

    render() {
        let props = this.props
        return (
            <RadG
                name={props.name} class={props.className}
                size={props.size} defaultValue={this.state.defaultValue}
                disabled={props.disabled} dataSource={props.dataSource}
                itemDirection={props.itemDirection}
                shape={props.shape} value={this.state.value} onChange={this.onChange.bind(this)}
            >{props.children}</RadG>
        )
    }
}
