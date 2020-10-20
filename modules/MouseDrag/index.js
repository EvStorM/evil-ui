import * as React from "react";
import { View, Image } from "remax/ali";
import MouseView from "../../ali/ev-mouseView";
import style from "./drag.less";

export class MouseDrag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aliName: null,
      lastTapTime: null,
      Modified: false,
      startDrag: false,
      windowHeight: 0, // 视窗高度
      platform: "", // 平台信息
      realTopSize: 0, // 计算后顶部固定高度实际值
      realBottomSize: 0, // 计算后底部固定高度实际值
      rows: 0, // 行数
      itemDom: { width: 0, height: 0, left: 0, top: 0 }, // 每一项 item 的 dom 信息, 由于大小一样所以只存储一个
      itemWrapDom: { width: 0, height: 0, left: 0, top: 0 }, // 整个拖拽区域的 dom 信息
      startId: 0, // 初始触摸点 identifier
      preStartKey: -1, // 前一次排序时候的起始 sortKey 值
      /* 渲染数据 */
      list: [], // 渲染数据列
      cur: -1, // 当前激活的元素
      curZ: -1, // 当前激活的元素, 用于控制激活元素z轴显示
      tranX: 0, // 当前激活元素的 X轴 偏移量
      tranY: 0, // 当前激活元素的 Y轴 偏移量
      itemWrapHeight: 0, // 动态计算父级元素高度
      dragging: false, // 是否在拖拽中
      itemTransition: false, // item 变换是否需要过渡动画, 首次渲染不需要
      extraNodes: [], // 额外节点
      listData: [], // 数据源
      columns: 4, // 列数
      topSize: 0, // 顶部高度
      bottomSize: 0, // 底部高度
      scrollTop: 0, // 页面滚动高度
    };
  }

  static defaultProps = {};

  componentDidMount() {
    console.warn(this.props.children);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
  }

  // 拖动排序
  touchStart(e) {
    // 获取触摸点信息
    // 防止多指触发 drag 动作, 如果已经在 drag 中则返回, touchstart 事件中有效果
    if (this.state.dragging) {
      let index = e.currentTarget.dataset.index;
      let { platform, itemDom, itemWrapDom } = this.state;
      let { x: startPageX, y: startPageY } = e.detail;
      // 计算X,Y轴初始位移, 使 item 中心移动到点击处
      let tranX = startPageX - itemDom.width / 2 - itemWrapDom.left,
        tranY = startPageY - itemDom.height / 2 - itemWrapDom.top;
      // 单列时候X轴初始不做位移
      if (this.state.columns === 1) tranX = 0;
      // this.state.startId = startId;
      this.setState({ startDrag: true, cur: index, curZ: index, tranX, tranY });
      if (platform !== "devtools") my.vibrateShort();
    }
  }
  // 拖动中
  touchMove(e) {
    // 获取触摸点信息
    this.setState({
      testData: JSON.stringify(e),
    });
    // let currentTouch = e.changedTouches[0];
    // if (!currentTouch) return;
    if (!this.state.dragging || !this.state.startDrag) return;

    let {
      windowHeight,
      realTopSize,
      realBottomSize,
      itemDom,
      itemWrapDom,
      preStartKey,
      columns,
      rows,
    } = this.state;
    // let {pageX: currentPageX, pageY: currentPageY, identifier: currentId, clientY: currentClientY} = currentTouch;
    const { x: currentPageX, y: currentPageY } = e.detail;
    let currentClientY = currentPageY;
    console.log(currentPageX, currentClientY, currentPageY);

    // 通过 当前坐标点, 初始坐标点, 初始偏移量 来计算当前偏移量
    let tranX = currentPageX - itemDom.width / 2 - itemWrapDom.left,
      tranY = currentPageY - itemDom.height / 2 - itemWrapDom.top;
    // 单列时候X轴初始不做位移
    if (columns === 1) tranX = 0;

    // 到顶到底自动滑动
    if (currentClientY > windowHeight - itemDom.height - realBottomSize) {
      // 当前触摸点pageY + item高度 - (屏幕高度 - 底部固定区域高度)

      my.pageScrollTo({
        scrollTop:
          currentPageY + itemDom.height - (windowHeight - realBottomSize),
        duration: 300,
      });
    } else if (currentClientY < itemDom.height + realTopSize) {
      // 当前触摸点pageY - item高度 - 顶部固定区域高度

      my.pageScrollTo({
        scrollTop: currentPageY - itemDom.height - realTopSize,
        duration: 300,
      });
    }
    // 设置当前激活元素偏移量
    this.setState({ tranX: tranX, tranY: tranY });
    // 获取 startKey 和 endKey
    let startKey = parseInt(e.currentTarget.dataset.key);
    let curX = Math.round(tranX / itemDom.width),
      curY = Math.round(tranY / itemDom.height);
    let endKey = curX + columns * curY;
    // 遇到固定项和超出范围则返回
    if (
      this.isFixed(endKey) ||
      IsOutRange(curX, columns, curY, rows, endKey, this.state.list.length)
    )
      return;

    // 防止拖拽过程中发生乱序问题
    if (startKey === endKey || startKey === preStartKey) return;
    this.state.preStartKey = startKey;
    // 触发排序
    this.sort(startKey, endKey);
  }
  // 拖动结束
  touchEnd(e) {
    if (this.state.catchStatus) {
      return;
    }
    if (this.state.dragging) {
      this.clearData();
      let UpList = [];
      this.state.list.map((v) => {
        UpList.push(v.data);
      });
      UpList.sort((a, b) => {
        if (a.sortKey < b.sortKey) {
          return -1;
        }
        if (a.sortKey > b.sortKey) {
          return 1;
        }
        return 0;
      });
    } else {
      // 双击修改名称
      let lastTapTime = this.state.lastTapTime;
      if (e.timeStamp - lastTapTime < 350) {
        clearTimeout(timer);
        let { index, key } = e.currentTarget.dataset;
        let list = this.state.list;
        let currentItem = list[index];
        console.log("ondblclick", currentItem);
        currentItem.Modified = true;
        list[index] = currentItem;
        this.setState({
          list,
        });
      } else {
        clearTimeout(timer);
        timer = setTimeout(() => {
          console.log("onclick");
          this.props.onTap && this.props.onTap(e);
        }, 400);
      }
      this.setState({
        lastTapTime: e.timeStamp,
      });
    }
  }
  /**
   * 根据 startKey 和 endKey 去重新计算每一项 sortKey
   */
  sort(startKey, endKey) {
    this.setState({ itemTransition: true });
    let list = this.state.list.map((item) => {
      if (item.fixed) return item;
      if (startKey < endKey) {
        // 正序拖动
        if (item.sortKey > startKey && item.sortKey <= endKey) {
          item.sortKey = this.excludeFix(item.sortKey - 1, startKey, "reduce");
        } else if (item.sortKey === startKey) {
          item.sortKey = endKey;
        }
        return item;
      } else if (startKey > endKey) {
        // 倒序拖动
        if (item.sortKey >= endKey && item.sortKey < startKey) {
          item.sortKey = this.excludeFix(item.sortKey + 1, startKey, "add");
        } else if (item.sortKey === startKey) {
          item.sortKey = endKey;
        }
        return item;
      }
    });
    this.updateList(list);
  }
  /**
   * 排除固定项得到最终 sortKey
   */
  excludeFix(sortKey, startKey, type) {
    if (sortKey === startKey) return startKey;
    if (this.state.list[sortKey].fixed) {
      let _sortKey = type === "reduce" ? sortKey - 1 : sortKey + 1;
      return this.excludeFix(_sortKey, startKey, type);
    } else {
      return sortKey;
    }
  }
  /**
   * 根据排序后 list 数据进行位移计算
   */
  updateList(data, vibrate = true) {
    let list = data.map((item, index) => {
      item.tranX = `${(item.sortKey % this.state.columns) * 100}%`;
      item.tranY = `${Math.floor(item.sortKey / this.state.columns) * 100}%`;
      item.data.sortKey = item.sortKey;
      return item;
    });
    this.setState({ list: list });
    if (!vibrate) return;
    // if (platform !== "devtools") my.vibrateShort();
  }
  /**
   * 判断是否是固定的 item
   */
  isFixed(index) {
    let list = this.state.list;
    if (list && list[index] && list[index].fixed) return 1;
    return 0;
  }
  /**
   * 清除参数
   */
  clearData() {
    this.setState({
      preStartKey: -1,
      startDrag: false,
      cur: -1,
      tranX: 0,
      tranY: 0,
    });
    // 延迟清空
    setTimeout(() => {
      this.setState({
        curZ: -1,
      });
    }, 300);
  }

  /**
   *  初始化获取 dom 信息
   */
  initDom() {
    let {
      windowWidth,
      windowHeight,
      platform,
      SDKVersion,
    } = my.getSystemInfoSync();
    let remScale = (windowWidth || 375) / 375,
      realTopSize = (this.state.topSize * remScale) / 2,
      realBottomSize = (this.state.bottomSize * remScale) / 2;
    this.state.windowHeight = windowHeight;
    this.state.platform = platform;
    this.state.realTopSize = realTopSize;
    this.state.realBottomSize = realBottomSize;
    my.createSelectorQuery()
      .select(".item")
      .boundingClientRect()
      .exec((res) => {
        let rows = Math.ceil(this.state.list.length / this.state.columns);
        this.state.rows = rows;
        this.state.itemDom = res[0];
        this.setState({
          itemWrapHeight: rows * res[0].height,
        });
        my.createSelectorQuery()
          .select(".item-wrap")
          .boundingClientRect()
          .exec((res) => {
            let itemWrapDom = res[0];
            itemWrapDom.top += this.state.scrollTop;
            this.setState({
              itemWrapDom,
            });
          });
      });
  }
  /**
   *  初始化函数
   *  {listData, columns, topSize, bottomSize} 参数改变需要重新调用初始化方法
   */
  init() {
    this.clearData();
    this.setState({ itemTransition: false });
    let delItem = (item, extraNode) => ({
      id: item.dragId,
      slot: item.slot,
      fixed: item.fixed,
      sortKey: item.sortKey, // 初始化 sortKey 为当前项索引值;
      extraNode: extraNode,
      tranX: "0%",
      tranY: "0%",
      Modified: false,
      data: item,
    });

    let { allData, extraNodes } = this.props;

    let _list = [],
      _before = [],
      _after = [],
      destBefore = [],
      destAfter = [];
    extraNodes.forEach((item, index) => {
      if (item.type === "before") {
        _before.push(delItem(item, true));
      } else if (item.type === "after") {
        _after.push(delItem(item, true));
      } else if (item.type === "destBefore") {
        destBefore.push(delItem(item, true));
      } else if (item.type === "destAfter") {
        destAfter.push(delItem(item, true));
      }
    });
    let listData = [];
    this.props.Unfold ? (listData = allData) : (listData = allData.slice(0, 8));
    // 遍历数据源增加扩展项, 以用作排序使用
    listData.forEach((item, index) => {
      destBefore.forEach((i) => {
        if (i.data.destKey === index) _list.push(i);
      });
      _list.push(delItem(item, false));
      destAfter.forEach((i) => {
        if (i.data.destKey === index) _list.push(i);
      });
    });

    let list = _before.concat(_list, _after).map((item, index) => {
      item.tranX = `${(item.sortKey % this.state.columns) * 100}%`;
      item.tranY = `${Math.floor(item.sortKey / this.state.columns) * 100}%`;
      return item;
    });
    if (list.length === 0) {
      this.setState({ itemWrapHeight: 0 });
      return;
    }
    this.updateList(list, false);
    // 异步加载数据时候, 延迟执行 initDom 方法, 防止基础库 2.7.1 版本及以下无法正确获取 dom 信息
    setTimeout(() => this.initDom(), 0);
  }
  render() {
    const { itemWrapHeight } = this.state;
    let { aliName } = this.props;
    return (
      <View
        id={aliName}
        style={`position: relative;height: ${itemWrapHeight}px;`}
      >
        {this.props.children}
      </View>
    );
  }
}
