import * as React from "react";
import { View } from "remax/ali";
import {
  Select,
  Input,
  RadioGroup,
  CheckGroup,
  Radio,
  CheckBox,
  FormItem,
  Textarea,
} from "../../index";

export class DataEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      inputValue: false,
      customValue: false,
      empty: null,
      propValue: null,
    };
  }

  static defaultProps = {
    disableData: null,
    className: null,
    width: "100%",
    height: "auto",
    padding: "0",
    disabledValue: null,
    disabled: false,
    onChange: null,
    dataSource: null,
    defaultValue: null,
    type: null,
    emptyData: false,
    propValue: null,
  };
  componentDidMount() {
    if (this.props.propValue != null) {
      this.setState({
        propValue: this.props.propValue,
      });
    }
  }
  componentDidUpdate() {}
  debounce(fn, delay) {
    let timer = null;
    //闭包
    return function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(fn, delay);
    };
  }

  onRef(ref) {
    this.setState({
      empty: ref,
    });
  }

  onChange(e) {
    console.log("e.detail.value", e);
    this.setState({
      value: e,
      propValue: e,
    });
    this.props.onChange && this.props.onChange(e);
  }

  onChangeCheck(e) {
    console.log("e.detail.value", e);
    this.setState({
      value: e,
    });
    this.props.onChange && this.props.onChange(e);
  }

  onChangeInput(e) {
    console.log("e.detail.value", e);
    this.setState({
      inputValue: e,
    });
    this.props.onChange && this.props.onChange(e);
  }

  onCustomValue(e) {
    console.log("e.detail.value", e);
    this.setState({
      customValue: e,
    });
    this.debounceCustomValue();
  }

  debounceCustomValue = this.debounce(() => {
    let value = this.state.value;
    value[value.indexOf("自定义")] = this.state.customValue;
    this.props.onChange && this.props.onChange(value);
  }, 300);
  debounceInputChange = this.debounce(() => {
    let value = this.state.inputValue;
    this.props.onChange && this.props.onChange(value);
  }, 300);

  render() {
    let {
      className,
      max,
      disableData,
      placeholder,
      defaultValue,
      disabled,
      disabledValue,
      height,
      width,
      padding,
      dataSource,
      type,
    } = this.props;
    let { propValue } = this.state;
    return (
      <View
        style={`width: ${width}; height:${height};padding:${padding};display: inline-block;
      `}
      >
        {type && type == "select" && (
          <View className={"ali-fc-start"}>
            <Select
              dataSource={dataSource && dataSource}
              disabledValue={disabledValue}
              defaultValue={defaultValue}
              propValue={propValue}
              disabled={disabled}
              onRef={this.onRef.bind(this)}
              custom={this.state.value == "自定义"}
              onChange={this.onChange.bind(this)}
            ></Select>
            {this.state.value && this.state.value == "自定义" && (
              <Input
                className={"ali-m-t-6"}
                defaultValue={defaultValue}
                size={"medium"}
                disabledValue={disabledValue}
                propValue={propValue}
                placeholder={placeholder}
                onBlur={this.onChangeInput.bind(this)}
              ></Input>
            )}
          </View>
        )}
        {type && type == "cascade" && <View className={"ali-fr-start"}></View>}
        {type && type == "checkGroup" && (
          <View>
            <Select
              dataSource={dataSource && dataSource}
              disabled={disabled}
              propValue={propValue}
              defaultValue={defaultValue}
              onRef={this.onRef.bind(this)}
              mode={"multiple"}
              onChange={this.onChange.bind(this)}
            ></Select>
          </View>
        )}
        {type && type == "input" && (
          <Input
            size={"medium"}
            disabled={disabled}
            defaultValue={defaultValue}
            propValue={propValue}
            disabledValue={disabledValue}
            placeholder={placeholder}
            maxLength={max}
            onBlur={this.onChangeInput.bind(this)}
          ></Input>
        )}
        {type && type == "radioGroup" && (
          <RadioGroup
            disabled={disabled}
            onChange={this.onChange.bind(this)}
            defaultValue={defaultValue}
            propValue={propValue}
            dataSource={dataSource && dataSource}
          ></RadioGroup>
        )}
        {type && type == "multiple" && (
          <View className={"ali-fc-start"}>
            <CheckGroup
              disabled={disabled}
              onChange={this.onChangeCheck.bind(this)}
              defaultValue={defaultValue}
              propValue={propValue}
              dataSource={dataSource && dataSource}
            ></CheckGroup>
            {this.state.value &&
              (this.state.value[this.state.value.length - 1] == "自定义" ||
                this.state.customValue) && (
                <Input
                  className={"ali-m-t-6 ali-dis-b"}
                  size={"medium"}
                  defaultValue={defaultValue}
                  propValue={propValue}
                  placeholder={placeholder}
                  onBlur={this.onCustomValue.bind(this)}
                ></Input>
              )}
          </View>
        )}
        {type && type == "radio" && (
          <Radio>
            <Input
              disabled={disabled}
              size={"medium"}
              onChange={this.onChange.bind(this)}
            ></Input>
          </Radio>
        )}
        {type && type == "check" && (
          <CheckGroup>
            {dataSource &&
              dataSource.map((item) => {
                return (
                  <CheckBox
                    disabled={disabled}
                    defaultValue={defaultValue}
                    onChange={this.onChange.bind(this)}
                  >
                    {item.label}
                  </CheckBox>
                );
              })}
          </CheckGroup>
        )}
        {type && type == "textarea" && (
          <Textarea
            placeholder={placeholder}
            propValue={propValue}
            defaultValue={defaultValue}
            maxLength={max}
            onBlur={this.onChangeInput.bind(this)}
          />
        )}
      </View>
    );
  }
}
