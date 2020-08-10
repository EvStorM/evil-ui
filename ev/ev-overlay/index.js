/*
 * @Author: your name
 * @Date: 2020-07-13 09:29:26
 * @LastEditTime: 2020-07-13 15:11:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \pc-compare-master-325f270c38af117515c6253f203958957e8ea097pc-compare.git\src\component\ev-overlay\index.js
 */
import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {},
    props: {
        visible: false,
        className: '', // 样式
        offset: [0, 0],
        hasMask: true,
        onTap: null, // 点击按钮的回调
        onClose: null, // 关闭回调
        trigger: null,
        align:'cc cc'
    },
    didMount(props) {
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        // 点击事件
        onTap(e) {
            !this.props.onTap && this.setData({
                visible: true
            })
            let event = fmtEvent(this.props, e);
            this.props.onTap && this.props.onTap(event);
        },
        onClose(e) {
            !this.props.onClose && this.setData({
                visible: false
            })
            let event = fmtEvent(this.props, e);
            this.props.onClose && this.props.onClose(event);
        }
    },
});
