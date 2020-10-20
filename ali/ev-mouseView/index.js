Component({
  mixins: [],
  data: {},
  props: {
    className: "",
    style: "",
    id: "",
    onMouseover: null, // 鼠标移入目标元素上方。鼠标移到其后代元素上时会触发。
    onMouseout: null, // 鼠标移出目标元素上方。
    onMouseenter: null, // 鼠标移入元素范围内触发，该事件不冒泡，即鼠标移到其后代元素上时不会触发。
    onMouseleave: null, // 鼠标移出元素范围时触发，该事件不冒泡，即鼠标移到其后代元素时不会触发。
    onMouseup: null, // 鼠标按钮被释放弹起时触发。
    onMousedown: null, // 鼠标按钮被按下时触发。
    onMousemove: null, // 鼠标在元素内部移动时不断触发。
  },
  didMount(props) {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    // 鼠标移入目标元素上方
    onMouseover(e) {
      this.props.onMouseover && this.props.onMouseover(e);
    },
    // 鼠标移出目标元素上方。
    onMouseout(e) {
      this.props.onMouseout && this.props.onMouseout(e);
    },
    // 鼠标移入元素范围内触发，
    onMouseenter(e) {
      this.props.onMouseenter && this.props.onMouseenter(e);
    },
    // 鼠标移出元素范围时触发
    onMouseleave(e) {
      this.props.onMouseleave && this.props.onMouseleave(e);
    },
    // 鼠标按钮被释放弹起时触发。
    onMouseup(e) {
      this.props.onMouseup && this.props.onMouseup(e);
    },
    // 鼠标按钮被按下时触发。
    onMousedown(e) {
      this.props.onMousedown && this.props.onMousedown(e);
    },
    // 鼠标在元素内部移动时不断触发。
    onMousemove(e) {
      this.props.onMousemove && this.props.onMousemove(e);
    },
  },
});
