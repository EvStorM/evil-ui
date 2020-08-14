
import fmtEvent from "../_util/fmtEvent";
Component({
  props: {
    checked: false, //开关当前的值(针对受控组件)
    disabled: false, //表示开关被禁用
    onChange: function onChange() {},
    size:'medium',//switch的尺寸  可选值: 'medium'(正常大小) 'small'(缩小版大小)
    id: '',
    name: '',
    controlled: false// 是否为受控组件，为 true 时，checked 会完全受 setData 控制
  },
  data: {
    checkedCls: ''
  },
  methods: {
    onChange: function onChange(e) {
      this.setData({
        checked:!this.data.checked
      })
      var event = fmtEvent(this.props, e);
      this.props.onChange(event);
    }
  }
});