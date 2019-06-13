前端路由实现方式：原理都是修改 url 的同时不刷新页面，不向服务器发送请求，通过监听特殊的事件来更新页面。
    ——history history.pushState(data,title,url)改变url path部分 
    ——hash  hashChange改变的url部位不一样(#home)
前端就可以处理路由了，像后端路由 支持前后切换
浏览历史 history onpopstate 
push pop数组只在尾部操作，栈