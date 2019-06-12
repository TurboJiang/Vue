- 理论支持
    SPA 单页应用开发 导航（nav）不动
    footer不动 中间的body（main.content）是切换的 页面不需要刷新

传统web开发中
    点击链接之后跳转空白(新的web请求)页(get)
    页面需要加载一下(空白页面先显示再加载)  x
    对应路由 把相应组件切换出来 像app一样
- jquery  on事件api
        $(document).on(event_type,child_nodes,fn);

- 没有前端路由（组件），但是可以通过后端路由（restful，mvc router）   /xxx.html
- 前端路由二种做法
    - hashtag 依赖于# 不会刷新页面
    - history.pushState() api——>url path发生改变 同样不刷新页面

state? 这次跳转url对应的状态数据
title, 
url 一个url一个状态