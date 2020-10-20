import * as React from "react";
import { View } from "remax/ali";
import style from "./RadioView.less";

export class RadioView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {
    className: "",
    textName: null,
    size: "medium",
    shape: "",
    defaultValue: "",
    value: "",
    onChange: null,
    disabled: false,
    propValue: "",
    dataSource: [],
    itemDirection: "hoz",
  };

  componentDidMount() {
    this.setState({
      defaultValue: this.props.defaultValue,
      value: this.props.propValue,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.propValue !== this.props.propValue) {
      console.log(prevProps.propValue, this.props.propValue, "propValue");
      this.setState({
        value: this.props.propValue,
      });
    }
  }

  onChange = (e) => {
    this.setState({
      value: e.value,
    });
    this.props.onChange && this.props.onChange(e.value);
  };

  render() {
    let { value } = this.state;
    let props = this.props;
    return (
      <View
        style={{
          display: "flex",
          flexDirection: props.itemDirection === "hoz" ? "row" : "column",
          justifyContent: "center",
          alignContent: "flex-start",
        }}
      >
        {props.dataSource &&
          props.dataSource?.map((v, i) => {
            return (
              <View
                className={props.className}
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  alignContent: "center",
                  padding: props.className ? "" : "4px",
                }}
                onTap={this.onChange.bind(this, v)}
              >
                <View className={style.choose}>
                  {v.value === value && <View className={style.Oval}></View>}
                </View>
                <View className={props.textName ? props.textName : style.label}>
                  {v.label}
                </View>
              </View>
            );
          })}
      </View>
    );
  }
}
