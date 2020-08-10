/*
 * @Author: xiezhijie
 * @Date: 2020-07-13 10:32:45
 * @LastEditTime: 2020-07-13 14:37:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pc-compare-master-325f270c38af117515c6253f203958957e8ea097pc-compare.git\src\component\ev-tab\index.js
 */
import fmtEvent from "../_util/fmtEvent";
Component({
  mixins: [],
  data: {},
  props: {
    size:"medium",//尺寸   可选值:'small', 'medium'
    shape:"pure",//外观形态'pure',                  可选值  'wrapped', 'text','capsule
    defaultActiveKey:"0",//初始化时被激活的选项卡的 key Number/String
    animation:true,  //Boolean 是否开启动效
    excessMode:"slide",//选项卡过多时的滑动模式
    tabPosition:"top",//导航选项卡的位置，只适用于包裹型（wrapped）选项卡
    triggerType:"click",//激活选项卡的触发方式       可选值  'hover', 'click'
    onTap:null,  //点击单个选项卡时触发的回调
    onChange:null,  //选项卡发生切换时的事件回调
    onClose:null,//选项卡被关闭时的事件回调
  },
  didMount(props) {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    // 点击事件
    onTap(e) {
        let event = fmtEvent(this.props, e);
        this.props.onTap && this.props.onTap(event);
    },
    onChange(e) {
        let event = fmtEvent(this.props, e);
        this.props.onChange && this.props.onChange(event);
    },
    onClose(e) {
        let event = fmtEvent(this.props, e);
        this.props.onClose && this.props.onClose(event);
    },
  },
});
