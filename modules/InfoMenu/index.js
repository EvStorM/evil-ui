import * as React from "react";
import { View, Image, Text, Button } from "remax/ali";
import { Overlay } from "../../index";
import "./infomenu.less";
import { qnSubscribeDeadLineQuery } from "../../../hooks/cloudFunc";
export class Infomenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemSelect: 0,
      visible: false,
      visible2: false,
      visibleFlexd: false,
    };
  }

  static defaultProps = {
    crumbs: false,
    appName: "庚辛小程序",
    location: "",
    titleName: "首页",
    onSelect: null,
    routes: null,
    dueTo: false,
    serviceUrl: null,
    DeadLineQueryFunc: null,
    dueToTime: "2020.12.12 12:12",
  };

  componentDidMount() {
    const { location, routes, DeadLine } = this.props;
    this.setState({
      routes,
      DeadLine,
    });
    this.locationSet(location, routes);
    if (DeadLine?.dueTo) {
      this.setState({
        visible2: true,
      });
    }
  }
  isDecimal(strValue) {
    var objRegExp = /(\S+)\/(\S+)/;
    return objRegExp.exec(strValue);
  }
  locationSet(location) {
    let routes = this.props.routes;
    let crumbs = this.isDecimal(location);
    if (crumbs) {
      let _location = crumbs[1];
      let children = crumbs[2];
      let finds = routes.findIndex((item) => item.component == _location);
      let child = routes[finds].children;
      let childFinds = child.findIndex((item) => item.component == children);
      console.log(routes[finds], "routes[finds]");
      this.setState({
        location: _location,
        children,
        itemSelect: finds,
        titleName: routes[finds].name,
        childrenName: child[childFinds].name,
      });
    } else {
      let finds = routes.findIndex((item) => item.component == location);
      this.setState({
        location,
        children: null,
        itemSelect: finds,
        childrenName: null,
        titleName: routes[finds].name,
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.location !== this.props.location) {
      this.locationSet(this.props.location, this.props.routes);
    }
    if (prevProps.DeadLine !== this.props.DeadLine) {
      const { DeadLine } = this.props;
      this.setState({
        dueTo: DeadLine.dueTo,
        dueToTime: DeadLine.dueToTime,
        dueToStr: DeadLine.dueToStr,
      });
      if (DeadLine?.dueTo) {
        this.setState({
          visible2: true,
        });
      }
    }
  }

  setitemSelectData(index, component) {
    this.props.onSelect && this.props.onSelect(component);
    this.locationSet(component);
    this.setState({
      itemSelect: index,
    });
  }
  breadCrumbs() {
    this.props.onSelect && this.props.onSelect(this.state.location);
    this.locationSet(this.state.location);
  }

  itemSelect(i, component) {
    this.setitemSelectData(i, component);
  }
  contactUs(e) {
    this.setState({
      visible: true,
    });
  }
  useGuide() {
    let useGuideUrl = this.props.useGuideUrl;
    my.qn.navigateToWebPage({
      url: useGuideUrl,
      success: (res) => {},
      fail: (res) => {},
    });
  }
  clearAuth() {
    my.qn.cleanToken({
      success: (res) => {},
      fail: (res) => {},
    });
  }
  dueToTime() {
    my.qn.navigateToWebPage({
      url: this.props.serviceUrl,
      success: (res) => {},
      fail: (res) => {},
    });
  }
  onClose(e) {
    this.setState({
      visible: false,
    });
  }

  onClose2() {
    this.setState({
      visible2: false,
      visibleFlexd: true,
    });
  }
  openIM() {
    my.qn.openChat({
      nick: "cntaobaotb4777191548",
      text: "你好",
      success: (res) => {},
      fail: (res) => {},
    });
  }
  render() {
    const {
      itemSelect,
      dueToStr,
      dueTo,
      titleName,
      childrenName,
      visible,
      visible2,
      visibleFlexd,
      crumbs,
    } = this.state;
    const { routes, appName } = this.props;
    return (
      <View id={"InfoMenu"} className="ev-infoFr">
        <View className="ev-sideToTakeUp">
          <View className="ev-fc">
            <View className="ev-info ev-fc">
              <Image className="image" src="../../images/logo.png" />
              <Text className="ev-h1 ev-p-t-10">{appName}</Text>
              <Text className="ev-c6 ev-p-t-10">成都魁首科技</Text>
            </View>
            <View className="ev-menu ev-view-hover">
              {routes &&
                routes.map((v, i) => {
                  return (
                    <View
                      onTap={this.itemSelect.bind(this, i, v.component)}
                      className={
                        itemSelect == i
                          ? "ev-menu-item ev-item-selected"
                          : "ev-menu-item"
                      }
                      key={v.component}
                    >
                      {v.name}
                    </View>
                  );
                })}
            </View>
          </View>
          <View className="ev-otherInfo ev-fc">
            <View className="ev-fc" onTap={this.dueToTime.bind(this)}>
              <Text className={dueTo ? "ev-m-l-6 colorRed" : "ev-m-l-6"}>
                系统到期时间：
              </Text>
              <View class="ev-fc ev-m-t-6">
                <View class={dueTo ? "ev-fr  colorRed" : "ev-fr "}>
                  {dueToStr?.day}
                </View>
                <View class={dueTo ? "ev-fr  colorRed" : "ev-fr "}>
                  {dueToStr?.time}
                </View>
              </View>
            </View>
            <View className="ev-bottomJump">
              <View className="ev-view-hover" onTap={this.contactUs.bind(this)}>
                <Text>联系我们</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="ev-infoFc">
          <View className="ev-topLabel ev-fr">
            <View className="labelBox ev-fr-start">
              <View
                onTap={this.breadCrumbs.bind(this)}
                className={childrenName ? "ev-h1 youCanClickOn" : "ev-h1"}
              >
                {titleName}
              </View>
              {childrenName && <View className="ev-h1 ev-m-lr-6">/</View>}
              {childrenName && <View className="ev-h1 ">{childrenName}</View>}
            </View>
          </View>
          <View id="infoBox" className="ev-infoBody">
            <View className="ev-infoBox">{this.props.children}</View>
          </View>
        </View>
        <Overlay
          visible={visible}
          hasMask={true}
          align="cc cc"
          disableScroll={true}
          onClose={this.onClose.bind(this)}
        >
          <View className="ev-contactUs ev-iFc">
            <Image
              onTap={this.onClose.bind(this)}
              className="ev-icon-circle"
              src="../../images/x-circle.png"
            ></Image>
            <View className="fontcolor">扫描二维码或者点击按钮联系我们</View>
            <View className="ev-iFr">
              <View className="ev-iFc">
                <Image
                  className="ev-imageBox ev-m-l-24"
                  src="../../images/wangwangQR.png"
                />
                <Text>旺旺</Text>
              </View>
              <View className="ev-iFc">
                <Image
                  className="ev-imageBox ev-m-l-24"
                  src="../../images/dingdingQR.png"
                />
                <Text>钉钉</Text>
              </View>
            </View>
            <View className="ev-iFr ptis">
              <Button onTap={this.openIM.bind(this)} type="primary">
                旺旺联系
              </Button>
            </View>
          </View>
        </Overlay>
        <Overlay
          visible={visible2}
          hasMask={true}
          align="cc cc"
          disableScroll={true}
          onClose={this.onClose2.bind(this)}
        >
          <View className="ev-dueToTime ev-iFc">
            <Image
              onTap={this.onClose2.bind(this)}
              className="ev-icon-circle"
              src="../../images/x-circle.png"
            ></Image>
            <View className="fontcolor"></View>
            <View className="ev-iFr">小程序即将到期</View>
            <View className="ev-iFr ptis">
              <Button onTap={this.dueToTime.bind(this)} type="primary">
                点击续费
              </Button>
            </View>
          </View>
        </Overlay>
        {visibleFlexd && (
          <View className="renewal" onTap={this.dueToTime.bind(this)}>
            续费
          </View>
        )}
      </View>
    );
  }
}
