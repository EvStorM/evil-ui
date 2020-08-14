import * as React from 'react'
import Tabl from '../ali/ev-table'
import fmtEvent from "../ali/_util/fmtEvent";

export class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static defaultProps = {
        className: '', // 样式
        // dataSource
        dataSource: null,
        cols: null,
        hasBorder: true,
        hasHeader: true,
        isZebra: false,
        loading: false,
        fixedHeader: null,
        maxBodyHeight: null,
        stickyHeader: null,
        offsetTop: null,
        onChange: null,
        onSelect: null,
        onSelectAll: null,
        mode: 'multiple',
        selectedRowKeys: null,
        onResizeChange: null,
        onSort: null,
        onFilter: null,
        onBodyScroll: null,
    }

    // 点击事件
    onSort(e) {
        this.props.onSort && this.props.onSort(e);
    }

    // 点击事件
    onFilter(e) {
        this.props.onFilter && this.props.onFilter(e);
    }

    // 点击事件
    onBodyScroll(e) {
        this.props.onBodyScroll && this.props.onBodyScroll(e);
    }

    render() {
        let props = this.props
        return (
            <Tabl
                className={props.className} dataSource={props.dataSource} hasBorder={props.hasBorder}
                hasHeader={props.hasHeader} isZebra={props.isZebra}
                loading={props.loading} fixedHeader={props.fixedHeader}
                maxBodyHeight={props.maxBodyHeight} stickyHeader={props.stickyHeader}
                offsetTop={props.offsetTop}
                onBodyScroll="onBodyScroll"
                onSort="onSort" onFilter="onFilter"
            >
                {props.children}
            </Tabl>
        )
    }
}
