import * as React from 'react'
import Pagin from '../ali/ev-pagination'

export class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: null
        }
    }

    static defaultProps = {
        className: '', // 样式
        size: 'medium',
        type: 'normal',
        shape: 'arrow-prev-only',
        current: null,
        defaultCurrent: 1,
        onChange: null,
        total: 10,
        pageShowCount: 5,
        pageSize: 5,
        pageSizeSelector: false,
        onPageSizeChange: null,
        hideOnlyOnePage: true,
        showJump: true
    }

    onChange(e) {
        this.setState({
            current: e
        })
        this.props.onChange && this.props.onChange(e);
    }

    // 点击事件
    onPageSizeChange(e) {
        this.props.onPageSizeChange && this.props.onPageSizeChange(e);
    }

    render() {
        let {current} = this.state
        let props = this.props
        return (
            <Pagin
                shape={props.shape} className={props.className}
                size={props.size} type={props.type} current={current}
                defaultCurrent={props.defaultCurrent} total={props.total}
                onPageSizeChange={this.onPageSizeChange.bind(this)}
                onChange={this.onChange.bind(this)} pageShowCount={props.pageShowCount}
                pageSize={props.pageSize} pageSizeSelector={props.pageSizeSelector}
                hideOnlyOnePage={props.hideOnlyOnePage} showJump={props.showJump}
            />
        )
    }
}
