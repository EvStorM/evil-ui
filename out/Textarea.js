import * as React from "react";
import ETextarea from "../ali/ev-textarea";

export class Textarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  static defaultProps = {
    selectable: false, // Boolean 是否可选
    className: "",
    placeholder: "请输入...",
    maxLength: 140,
    value: null,
    defaultValue: null,
    onChange: null,
    onKeyDown: null,
    disabled: false,
    autoFocus: false,
    rows: 4,
    autoHeight: false,
    cutString: true,
    readOnly: false,
    hasLimitHint: true,
    onBlur: null,
  };
  componentDidMount() {
    if (this.props.propValue !== "") {
      this.setState({
        propValue: this.props.propValue,
      });
    }
    this.props.onRef && this.props.onRef(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.disabledValue != null) {
      this.setState({
        value: this.props.disabledValue,
        disabled: true,
      });
      this.props.onChange && this.props.onChange(this.props.disabledValue);
    }
    if (prevProps.propValue !== this.state.propValue) {
      this.setState({
        propValue: this.props.propValue,
      });
    }
  }
  onChange(e) {
    this.setState({
      value: e,
    });
    this.props.onChange && this.props.onChange(e);
  }

  onClear() {
    this.setState({
      value: "",
    });
  }

  onBlur(e) {
    this.props.onBlur && this.props.onBlur(e);
  }

  componentDidMount() {
    if (this.props.defaultValue) {
      this.setState({
        value: this.props.defaultValue,
      });
      this.props.onChange && this.props.onChange(this.props.defaultValue);
    }
  }

  render() {
    let { value } = this.state;
    let props = this.props;
    return (
      <ETextarea
        class={props.className}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        propValue={this.state?.propValue}
        value={value}
        autoFocus={props.autoFocus}
        defaultValue={props.defaultValue}
        onChange={this.onChange.bind(this)}
        onBlur={this.onBlur.bind(this)}
        onClear={this.onClear.bind(this)}
        disabled={props.disabled}
        rows={props.rows}
        autoHeight={props.autoHeight}
        cutString={props.cutString}
        readOnly={props.readOnly}
        hasLimitHint={props.hasLimitHint}
      />
    );
  }
}
