import fmtEvent from "../_util/fmtEvent";

Component({
  mixins: [],
  data: {},
  props: {
    selectable: false, // Boolean 是否可选
    className: "",
    placeholder: "请输入...",
    maxLength: 140,
    value: null,
    defaultValue: null,
    onChange: null,
    onKeyDown: null,
    disabled: false,
    rows: 4,
    autoFocus: false,
    autoHeight: false,
    cutString: true,
    readOnly: false,
    hasLimitHint: true,
    onBlur: null,
  },
  didMount() {
    if (this.props.propValue != "") {
      this.setData({
        value: this.props.propValue,
        propValue: this.props.propValue,
      });
    }
    this.props.onRef && this.props.onRef(this);
  },
  didUpdate() {
    if (this.props.disabledValue != null) {
      this.setData({
        value: this.props.disabledValue,
        disabled: true,
      });
      this.props.onChange && this.props.onChange(this.props.disabledValue);
    }
    if (this.data.propValue !== this.props.propValue) {
      this.setData({
        value: this.props.propValue,
        propValue: this.props.propValue,
      });
    }
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    onChange(e) {
      this.setData({
        value: e.detail.value,
      });
      let event = fmtEvent(this.props, e);
      this.props.onChange && this.props.onChange(e.detail.value);
    },
    onClear() {
      this.setData({
        value: "",
      });
    },
    onBlur(e) {
      console.log(this.data.value);
      this.props.onBlur && this.props.onBlur(this.data.value);
    },
  },
});
