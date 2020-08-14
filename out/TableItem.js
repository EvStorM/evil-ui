import * as React from 'react'
import TabItem from '../ali/ev-table-item'

export class TableItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static defaultProps = {
        className: '', // 样式
        title: 'id',
        dataIndex: '',
        align: '',
        width: '',
        sortable: '',
        filters: ''
    }

    render() {
        let props = this.props
        return (
            <TabItem
                title={props.title} align={props.align}
                width={props.width} sortable={props.sortable}
                filters={props.filters} dataIndex={props.dataIndex}
            />

        )
    }
}
