

# Evil UI

[![npm package](https://img.shields.io/npm/v/evil-ui)](https://www.npmjs.com/package/evil-ui)
[![GitHub stars](https://img.shields.io/github/stars/EvStorM/evil-ui)](https://github.com/EvStorM/evil-ui/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/EvStorM/evil-ui)](https://github.com/EvStorM/evil-ui/network/members)
[![NPM downloads](https://img.shields.io/npm/dm/evil-ui)](https://www.npmjs.com/package/evil-ui)
[![GitHub issues](https://img.shields.io/github/issues/EvStorM/evil-ui)](https://github.com/EvStorM/evil-ui/issues)
[![GitHub license](https://img.shields.io/github/license/EvStorM/evil-ui)](https://github.com/EvStorM/evil-ui/blob/master/LICENSE)

## 特性

- 基于 **Alipay Design** 设计规范；
- 支持多端小程序（支付宝，淘宝，钉钉等）；
- 支持主题配置切换；
<!-- - 支持 `px` 与 `rpx`； -->

## 安装

```bash
$ npm install evil-ui --save
```

同时，我们提供了 **rpx** 版本的 evil-ui，如需要使用 **rpx** 作为单位的组件，可以通过下述方式进行安装：

```bash
$ npm install evil-ui --save
```

## 使用

在页面 json 中文件中进行注册，如 title 组件的注册如下所示：

```json
{
  "usingComponents": {
    "title": "evil-ui/ev/title/index"
  }
}
```


组件注册成功之后，具体的使用方式无差别。

在 axml 文件中进行调用：
```xml
<title
  hasLine="true"
  iconURL="https://t.alipayobjects.com/images/T1HHFgXXVeXXXXXXXX.png"
  type="close"
  onActionTap="titleClose"
>内部标题可关闭</title>
```
<!-- 
详细使用说明请参照官方文档[使用自定义组件](https://docs.alipay.com/mini/framework/use-custom-component)

## 贡献

如果你有好的意见或建议，欢迎给我们提 [issue](https://github.com/Alibaba-mp/mini-ali-ui/issues)。 -->
