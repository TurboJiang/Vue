 用vue初始化一个mpvue的模板 文件名为todolist
 vue init mpvue/mpvue-quickstart todolist
     cd todolist
     npm install/cnpm i/yarn add
     npm run dev

# miniprogramRoot 指定了小程序的源码目录 整份目录是 mpvue 定制化的 拿着dist/wx下面的源码去解析 
    /dist目录下的文件是小程序的
    /src 目录 是vue的风格

- mpvue:以vue写小程序 小程序的语法组件、vue语法均可使用
mpvue 1.x 支持微信小程序
      2.x 支持主流小程序
模版<template>:vue组件、小程序组件
js: vue.js + wx.js
 结合时 主页还是以vue语法为主