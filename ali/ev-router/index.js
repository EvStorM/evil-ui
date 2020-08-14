import * as React from 'react'
import {View} from 'remax/ali'

class Router extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        location: null,
    }

    render() {
        const props = this.props
        return (
            <View>
                {this.props.children}
            </View>
        )
    }
}

class Route extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        location: null,
        exact: false,
        path: '',
        component: null,
        className: null,
    }

    render() {
        const {exact, path, component, className, location, children} = this.props
        return (
            <View>
                {location === path &&
                children
                }
            </View>
        )
    }
}

class Link extends React.Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        location: null,
        exact: false,
        path: '',
        component: null,
        className: null,
    }

    render() {
        const props = this.props
        return (
            <View class={props.className}>
                {this.props.children}
            </View>
        )
    }
}

export {
    Router,
    Route,
    Link
}