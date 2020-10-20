import * as React from "react";
import Radi from "../ali/ev-radio";

export class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  static defaultProps = {
    className: "",
    value: "",
    checked: false,
    disabled: false,
    defaultChecked: false,
    id: "",
    onChange: null,
  };

  componentDidUpdate() {
    if (this.state.checked !== this.props.checked) {
      this.setState({
        checked: this.props.checked,
      });
    }
  }
  onChange = (e) => {
    this.props.onChange && this.props.onChange(this.props.children);
  };

  render() {
    let { checked } = this.state;
    let props = this.props;
    return (
      <Radi
        className={props.className}
        value={props.value}
        checked={checked}
        disabled={props.disabled}
        defaultChecked={props.defaultChecked}
        id={props.id}
        onChange={this.onChange.bind(this)}
      >
        {props.children}
      </Radi>
    );
  }
}
