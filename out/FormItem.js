import * as React from 'react'
import FormI from '../ali/ev-fromItem'

export class FormItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static defaultProps = {
        className: '',
        label: '',
        size: '',
        help: '',
        extra: '',
        validateState: '',
        labelAlign: 'right',
        labelTextAlign: 'right',
        required: '',
        asterisk: false,
        requiredMessage: ''
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
            <FormI
                className={props.className}
                label={props.label} size={props.size}
                help={props.help} extra={props.extra}
                validateState={props.validateState}
                labelAlign={props.labelAlign}
                labelTextAlign={props.labelTextAlign}
                required={props.required} asterisk={props.asterisk}
                requiredMessage={props.requiredMessage}
            >
                {props.children}
            </FormI>
        )
    }
}
