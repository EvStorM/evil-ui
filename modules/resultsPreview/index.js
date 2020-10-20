import * as React from "react";
import { View, Image } from "remax/ali";
import style from "./resultsPreview.less";
import iphone from "./iphone.png";
export class ResultsPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <View className={style.param}>
        <View className={style.previewBox}>
          <View className={style.titleBox}>{this.props.title}</View>
          <View className={style.preview}>{this.props.children}</View>
        </View>
        <View className={style.ImageBox}>
          <Image
            style={"width: 100%;height:100%"}
            mode={"aspectFit"}
            src={iphone}
          />
        </View>
      </View>
    );
  }
}
