import * as React from 'react'

export class CheckBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: null
        }
    }

    static defaultProps = {
        className: '',
        checked: null,
        value: '',
        id: '',
        defaultChecked: false,
        disabled: false,
        indeterminate: null,
        defaultIndeterminate: false,
        onChange: null,
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
            <checkbox
                className={props.className}
                checked={checked}
                disabled={props.disabled}
                defaultChecked={props.defaultChecked}
                id={props.id}
                onChange={this.onChange.bind(this)}
            >
                {props.children}
            </checkbox>
        )
    }
}
