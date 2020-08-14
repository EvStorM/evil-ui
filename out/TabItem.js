import * as React from 'react'
import TItem from '../ali/ev-tabItem'

export class TabItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static defaultProps = {
        className: '',
        title: "",
        disabled: false,
        closeable: null
    }

    render() {
        let props = this.props
        return (
            <TItem
                className={props.className}
                title={props.title}
                disabled={props.disabled}
                closeable={props.closeable}
            >
                {props.children}
            </TItem>
        )
    }
}
