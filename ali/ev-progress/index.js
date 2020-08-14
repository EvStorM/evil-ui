/*
 * @Author: xiezhijie
 * @Date: 2020-07-13 10:02:19
 * @LastEditTime: 2020-07-13 14:11:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pc-compare-master-325f270c38af117515c6253f203958957e8ea097pc-compare.git\src\component\ali-progress\QrCode.js
 */
import fmtEvent from "../_util/fmtEvent";

Component({
    mixins: [],
    data: {},
    props: {
        className: '',
        size: "medium", //进度条尺寸  'small', 'medium', 'large'
        shape: "line", //进度条形态   'circle', 'line'
        percent: "50", //所占百分比   	Number
        state: "normal", //进度状态, 显示优先级: color > progressive > state
        progressive: false, // Boolean  是否为色彩阶段变化模式, 显示优先级: color > progressive > state
        hasBorder: false, //Boolean 是否添加 Border（只适用于 Line Progress)
        color: "", //进度条颜色, 显示优先级: color > progressive > state
        backgroundColor: "", //背景色
    },
});
