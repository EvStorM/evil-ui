import * as React from "react";
import Ico from "../ali/ev-icon";

export class Icon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    className: "",
    type: "",
    size: "medium",
    style: "",
    custom: false,
  };

  render() {
    let props = this.props;
    return (
      <Ico
        className={props.className}
        type={props.type}
        size={props.size}
        style={props.style}
        custom={props.custom}
      />
    );
  }
}
