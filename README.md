# 数据可视化 - 移动报表

> 本项目为数据可视化之移动报表，技术栈使用 Vue2.0 + Echarts，具体详见：[课程官网](http://www.youbaobao.xyz/datav-docs/) + [个人笔记](https://github.com/MrEnvision/data-vision-mobile)。
>
> TIP：更多内容详见[数据可视化专题](https://github.com/MrEnvision/data-vision)！！！



## 1. rem适配

在移动端项目中主要基于rem来进行适配，在`public/index.html` 中 `html` 标签下设置 `font-size` 即可，然后当前项目的开发都可以基于rem单位来开发。

```html
<html lang='en' style='font-size: 16px;'></html>
```

```js
// 基准大小
const baseSize = 16
// 设置 font-size
const setRem = () => {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改
  const scale = document.documentElement.clientWidth / 750
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = () => {
  setRem()
}
```

在开发中，我们仍旧可以写 `px` 单位的，可以借助[postcss-px2rem](https://www.npmjs.com/package/postcss-px2rem)工具将px单位自动转化为em单位的，在`vue.config.js`文件中引入：

```js
const px2rem = require('postcss-px2rem')

const postcss = px2rem({
  remUnit: 16
})

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  }
}
```



------

如果发现本项目有错误，欢迎提交 issues 指正，也可联系邮箱[EnvisionShen@gmail.com](mailto:EnvisionShen@gmail.com)。

