/*
 * @Author: xiezhijie
 * @Date: 2020-07-13 11:14:48
 * @LastEditTime: 2020-07-13 11:41:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \pc-compare-master-325f270c38af117515c6253f203958957e8ea097pc-compare.git\src\component\ev-text\index.js
 */
import fmtEvent from "../_util/fmtEvent";
// 您可以通过 type="tab-extea" 来在子元素上添加tab属性： 详见https://miniapp.open.taobao.com/docV3.htm?docId=118131&docType=1&tag=dev
Component({
    mixins: [],
    data: {},
    props: {
        selectable: false, // Boolean 是否可选
        space: "nbsp", //显示连续空格	   space 有效值 nbsp:根据字体设置的空格大小;ensp:中文字符空格一半大小;emsp:中文字符空格大小
        decode: false, //是否解码。为 true 时表示对文本内容进行解码，可解析的 HTML 实体字符有：&nbsp; &lt; &gt; &amp; &apos; &ensp; &emsp;
        numberOfLines: 1, //number  多行省略，值须大于等于1，表现同 css 的 -webkit-line-clamp 属性一致
    },
});

