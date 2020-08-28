/**
 * 判断是否超出范围
 */
import diff from "semver/functions/diff";

const IsOutRange = (x1, y1, x2, y2, x3, y3) => {
    return x1 < 0 || x1 >= y1 || x2 < 0 || x2 >= y2 || x3 < 0 || x3 >= y3
};

/**
 * 版本号比较
 */
const compareVersion = (v1, v2) => {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
        v1.push('0')
    }
    while (v2.length < len) {
        v2.push('0')
    }

    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i])
        const num2 = parseInt(v2[i])

        if (num1 > num2) {
            return 1
        } else if (num1 < num2) {
            return -1
        }
    }

    return 0
}

Component({
    options: {
        multipleSlots: true
    },
    data: {
        /* 未渲染数据 */
        windowHeight: 0,                                        // 视窗高度
        platform: '',                                           // 平台信息
        realTopSize: 0,                                         // 计算后顶部固定高度实际值
        realBottomSize: 0,                                      // 计算后底部固定高度实际值
        rows: 0,                                                // 行数
        itemDom: {width: 0, height: 0, left: 0, top: 0},        // 每一项 item 的 dom 信息, 由于大小一样所以只存储一个
        itemWrapDom: {width: 0, height: 0, left: 0, top: 0},    // 整个拖拽区域的 dom 信息
        startId: 0,                                             // 初始触摸点 identifier
        preStartKey: -1,                                        // 前一次排序时候的起始 sortKey 值

        /* 渲染数据 */
        list: [],                                               // 渲染数据列
        cur: -1,                                                // 当前激活的元素
        curZ: -1,                                               // 当前激活的元素, 用于控制激活元素z轴显示
        tranX: 0,                                               // 当前激活元素的 X轴 偏移量
        tranY: 0,                                               // 当前激活元素的 Y轴 偏移量
        itemWrapHeight: 0,                                      // 动态计算父级元素高度
        dragging: false,                                        // 是否在拖拽中
        itemTransition: false,                                  // item 变换是否需要过渡动画, 首次渲染不需要
        extraNodes: [],                  // 额外节点
        listData: [],                    // 数据源
        columns: 4,                     // 列数
        topSize: 0,                     // 顶部高度
        bottomSize: 0,                  // 底部高度
        scrollTop: 0                    // 页面滚动高度
    },
    props: {
        extraNodes: [],                  // 额外节点
        listData: [],                    // 数据源
        onUpList: null
    },
    didMount(props) {
        this.setData({
            list: this.props.listData
        })
        setTimeout(() => this.init(), 0);
    },
    didUpdate() {
    },
    didUnmount() {
    },
    methods: {
        /**
         * 优化渲染更新
         */
        debounce(fn, delay) {
            let timer = null
            //闭包
            return function () {
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(fn, delay)
            }
        },
        /**
         * 长按触发移动排序
         */
        test(e) {
            console.log(e);
            // my.vibrateShort({});
            return 122
        },
        longPress(e) {
            // 获取触摸点信息
            let startTouch = e.detail;
            if (!startTouch) return;
            // 固定项则返回
            let index = e.currentTarget.dataset.index;
            if (this.isFixed(index)) return;

            // 防止多指触发 drag 动作, 如果已经在 drag 中则返回, touchstart 事件中有效果
            if (this.data.dragging) return;
            this.setData({dragging: true});

            let {platform, itemDom, itemWrapDom} = this.data,
                {pageX: startPageX, pageY: startPageY} = startTouch;

            // 计算X,Y轴初始位移, 使 item 中心移动到点击处
            let tranX = startPageX - itemDom.width / 2 - itemWrapDom.left,
                tranY = startPageY - itemDom.height / 2 - itemWrapDom.top;
            // 单列时候X轴初始不做位移
            if (this.data.columns === 1) tranX = 0;

            // this.data.startId = startId;
            this.setData({cur: index, curZ: index, tranX, tranY});

            if (platform !== "devtools") my.vibrateShort();
        },
        touchMove(e) {
            // 获取触摸点信息
            // console.log(e);
            let currentTouch = e.changedTouches[0];
            if (!currentTouch) return;
            if (!this.data.dragging) return;
            let {windowHeight, realTopSize, realBottomSize, itemDom, itemWrapDom, preStartKey, columns, rows} = this.data,
                {pageX: currentPageX, pageY: currentPageY, identifier: currentId, clientY: currentClientY} = currentTouch;

            // // 如果不是同一个触发点则返回
            // if (this.data.startId !== currentId) return;

            // 通过 当前坐标点, 初始坐标点, 初始偏移量 来计算当前偏移量
            let tranX = currentPageX - itemDom.width / 2 - itemWrapDom.left,
                tranY = currentPageY - itemDom.height / 2 - itemWrapDom.top;
            // 单列时候X轴初始不做位移
            if (columns === 1) tranX = 0;

            // 到顶到底自动滑动
            if (currentClientY > windowHeight - itemDom.height - realBottomSize) {
                // 当前触摸点pageY + item高度 - (屏幕高度 - 底部固定区域高度)

                my.pageScrollTo({
                    scrollTop: currentPageY + itemDom.height - (windowHeight - realBottomSize),
                    duration: 300
                });
            } else if (currentClientY < itemDom.height + realTopSize) {
                // 当前触摸点pageY - item高度 - 顶部固定区域高度

                my.pageScrollTo({
                    scrollTop: currentPageY - itemDom.height - realTopSize,
                    duration: 300
                });
            }
            // 设置当前激活元素偏移量
            this.setData({tranX: tranX, tranY: tranY});
            // 获取 startKey 和 endKey
            let startKey = parseInt(e.currentTarget.dataset.key);
            let curX = Math.round(tranX / itemDom.width), curY = Math.round(tranY / itemDom.height);
            let endKey = curX + columns * curY;
            // 遇到固定项和超出范围则返回
            if (this.isFixed(endKey) || IsOutRange(curX, columns, curY, rows, endKey, this.data.list.length)) return;

            // 防止拖拽过程中发生乱序问题
            if (startKey === endKey || startKey === preStartKey) return;
            this.data.preStartKey = startKey;
            // 触发排序
            this.sort(startKey, endKey);
        },
        touchEnd() {
            if (!this.data.dragging) return;
            this.clearData();
            let UpList = []
            this.data.list.map(v => {
                UpList.push(v.data)
            })
            UpList.sort((a, b) => {
                if (a.sortKey < b.sortKey) {
                    return -1;
                }
                if (a.sortKey > b.sortKey) {
                    return 1;
                }
                return 0;
            })
            this.props.onUpList && this.props.onUpList(UpList)
        },
        /**
         * 根据 startKey 和 endKey 去重新计算每一项 sortKey
         */
        sort(startKey, endKey) {
            console.log(startKey, endKey);
            this.setData({itemTransition: true});
            let list = this.data.list.map((item) => {
                if (item.fixed) return item;
                if (startKey < endKey) { // 正序拖动
                    if (item.sortKey > startKey && item.sortKey <= endKey) {
                        item.sortKey = this.excludeFix(item.sortKey - 1, startKey, 'reduce');
                    } else if (item.sortKey === startKey) {
                        item.sortKey = endKey;
                    }
                    return item;
                } else if (startKey > endKey) { // 倒序拖动
                    if (item.sortKey >= endKey && item.sortKey < startKey) {
                        item.sortKey = this.excludeFix(item.sortKey + 1, startKey, 'add');
                    } else if (item.sortKey === startKey) {
                        item.sortKey = endKey;
                    }
                    return item;
                }
            });
            this.updateList(list);
        },
        /**
         * 排除固定项得到最终 sortKey
         */
        excludeFix(sortKey, startKey, type) {
            if (sortKey === startKey) return startKey;
            if (this.data.list[sortKey].fixed) {
                let _sortKey = type === 'reduce' ? sortKey - 1 : sortKey + 1;
                return this.excludeFix(_sortKey, startKey, type);
            } else {
                return sortKey;
            }
        },
        /**
         * 根据排序后 list 数据进行位移计算
         */
        updateList(data, vibrate = true) {
            let list = data.map((item, index) => {
                item.tranX = `${(item.sortKey % this.data.columns) * 100}%`;
                item.tranY = `${Math.floor(item.sortKey / this.data.columns) * 100}%`;
                item.data.sortKey = item.sortKey
                return item;
            });
            this.setData({list: list});
            if (!vibrate) return;
            // if (platform !== "devtools") my.vibrateShort();

        },
        /**
         * 判断是否是固定的 item
         */
        isFixed(index) {
            let list = this.data.list;
            if (list && list[index] && list[index].fixed) return 1;
            return 0;
        },
        /**
         * 清除参数
         */
        clearData() {
            this.setData({
                preStartKey: -1,
                dragging: false,
                cur: -1,
                tranX: 0,
                tranY: 0
            });
            // 延迟清空
            setTimeout(() => {
                this.setData({
                    curZ: -1,
                })
            }, 300)
        },
        /**
         * 点击每一项后触发事件
         */
        itemClick(e) {
            console.log(e);
            let {index, key} = e.currentTarget.dataset;
            let list = this.data.list;
            let currentItem = list[index];

            if (!currentItem.extraNode) {
                let _list = [];

                list.forEach((item) => {
                    _list[item.sortKey] = item;
                });

                let currentKey = -1;

                for (let i = 0, len = _list.length; i < len; i++) {
                    let item = _list[i];
                    if (!item.extraNode) {
                        currentKey++;
                    }
                    if (item.sortKey === currentItem.sortKey) {
                        break;
                    }
                }
            }
        },
        /**
         *  初始化获取 dom 信息
         */
        initDom() {
            let {windowWidth, windowHeight, platform, SDKVersion} = my.getSystemInfoSync();
            console.log(windowWidth, windowHeight, platform, 'getSystemInfoSync');
            let remScale = (windowWidth || 375) / 375,
                realTopSize = this.data.topSize * remScale / 2,
                realBottomSize = this.data.bottomSize * remScale / 2;

            this.data.windowHeight = windowHeight;
            this.data.platform = platform;
            this.data.realTopSize = realTopSize;
            this.data.realBottomSize = realBottomSize;
            my.createSelectorQuery().select(".item").boundingClientRect().exec((res) => {
                let rows = Math.ceil(this.data.list.length / this.data.columns);
                this.data.rows = rows;
                this.data.itemDom = res[0];
                console.log(res[0], 'boundingClientRect');
                this.setData({
                    itemWrapHeight: rows * res[0].height,
                });
                my.createSelectorQuery().select(".item-wrap").boundingClientRect().exec((res) => {
                    let itemWrapDom = res[0];
                    itemWrapDom.top += this.data.scrollTop
                    this.setData({
                        itemWrapDom
                    });
                });
            });
        },
        /**
         *  初始化函数
         *  {listData, columns, topSize, bottomSize} 参数改变需要重新调用初始化方法
         */
        init() {
            this.clearData();
            this.setData({itemTransition: false});
            let delItem = (item, extraNode) => ({
                id: item.dragId,
                slot: item.slot,
                fixed: item.fixed,
                sortKey: item.sortKey, // 初始化 sortKey 为当前项索引值;
                extraNode: extraNode,
                tranX: "0%",
                tranY: "0%",
                data: item
            });

            let {listData, extraNodes} = this.props;
            let _list = [], _before = [], _after = [], destBefore = [], destAfter = [];
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

                item.tranX = `${(item.sortKey % this.data.columns) * 100}%`;
                item.tranY = `${Math.floor(item.sortKey / this.data.columns) * 100}%`;
                return item;
            });
            if (list.length === 0) {
                this.setData({itemWrapHeight: 0});
                return;
            }
            this.updateList(list, false);
            // 异步加载数据时候, 延迟执行 initDom 方法, 防止基础库 2.7.1 版本及以下无法正确获取 dom 信息
            setTimeout(() => this.initDom(), 0);
        }
    },
});
