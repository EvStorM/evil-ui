import * as React from "react";
import { View, Image } from "remax/ali";
import { Overlay, Button, Radio, Input } from "../../index";
import style from "./selection.less";
export class SelectionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      inputData: null,
      createType: "",
      createId: 0,
    };
  }

  static defaultProps = {
    visible: false, // 开关状态
    title: "提示", // 顶部提示栏
    hisInput: false, // 输入框开关
    placeholder: "请输入新增参数项目的名称，例：CPU参数", // 输入框默认值
    dataSource: [], // 选项数据 [‘选项1’,‘选项2’]
    propsValue: "", // 传入的选项栏
    closeText: "取消", // 取消的文本
    confirmText: "确认", // 确认的文本
    tips: false, // 是否显示tips
    onTap: null, // 确认回调
    onClose: null, // 取消回调
  };
  componentDidMount() {
    this.setState({
      visible: this.props.visible,
      createType: this.props.propsValue,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}
  /**
   * 确认选择
   */
  confirm = () => {
    console.log(this.state.createType, "sortMethod");
    if (this.state.inputData) {
      this.props.onTap &&
        this.props.onTap(this.state.createId, this.state.inputData);
      this.addCloseFunc();
    } else {
      my.showToast({
        type: "fail",
        content: "请输入参数名",
        duration: 3000,
      });
    }
  };
  /**
   * 取消选择
   */
  addCloseFunc = () => {
    this.setState({
      createType: this.props.propsValue,
      createId: 0,
      inputData: null,
    });
    this.props.onClose && this.props.onClose();
  };
  /**
   * 选择选项
   */
  sortMethod = (i, e) => {
    console.log(e, "sortMethod");
    this.setState({
      createType: e,
      createId: i,
    });
  };
  /**
   * 输入内容回调
   */
  onItemInput = (e) => {
    this.setState({
      inputData: e,
    });
  };
  render() {
    let { createType } = this.state;
    let props = this.props;
    return (
      <Overlay
        visible={props.visible}
        disableScroll={true}
        onClose={this.addCloseFunc.bind(this)}
      >
        <View className={style.OverlayBox} style={props.style}>
          <View className={style.titleBox}>
            <View className={"ev-fr"}>
              <Image
                style={"width: 16px;height:16px"}
                mode={"aspectFit"}
                src={"/images/tips.png"}
              />
              {props.title}
            </View>
            <View onTap={this.addCloseFunc.bind(this)} className={"ev-fr"}>
              <Image
                style={"width: 16px;height:16px"}
                mode={"aspectFit"}
                src={"/images/clone.png"}
              />
            </View>
          </View>
          {props.hisInput && (
            <View className={style.inputBox}>
              <Input
                className={style.inputW}
                placeholder={props.placeholder}
                onPressEnter={this.onItemInput.bind(this)}
                onBlur={this.onItemInput.bind(this)}
                size={"medium"}
              />
            </View>
          )}
          {props.dataSource && (
            <View className={style.RadioBox}>
              {props.dataSource &&
                props.dataSource.map((v, i) => {
                  return (
                    <View key={v} className="ev-fr-start ev-p-tb-6">
                      <Radio
                        checked={createType === v}
                        onChange={this.sortMethod.bind(this, i)}
                      >
                        {v}
                      </Radio>
                      {props.tips && (
                        <Image
                          onTap={this.showBoot.bind(this, i + 1)}
                          style={"width: 16px;height:16px;margin-left: 4px;"}
                          mode={"aspectFit"}
                          src={"/images/question.png"}
                        />
                      )}
                    </View>
                  );
                })}
            </View>
          )}
          <View className={style.trailerBox}>
            <Button onTap={this.confirm.bind(this)}>{props.confirmText}</Button>
            <Button
              type={"normal"}
              onTap={this.addCloseFunc.bind(this)}
              className={"ev-m-l-12"}
            >
              {props.closeText}
            </Button>
          </View>
        </View>
      </Overlay>
    );
  }
}
