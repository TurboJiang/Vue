// 负责三个路由的点击 切换content 显示不同的页面（相应的component）
// router.js 前端 index.js 后端
class Router {
    // 接受配置项（路由）
    constructor(options) {
        this.routes = {};//k=>v  以键值对的形式储存路由
        this.init();
        this.bindEvent();
        // 将路由全部循环一次 构造routes对象 绑定视图更新
        options.forEach(item => {
            // 传参路径、回调函数（交给route运行）:将不同路由的component赋值给content节点
            this.route(item.path, () => {
                document.getElementById('content').innerHTML = item.component;
            })
        })
    }
    bindEvent() {
        // 绑定this作用域
        const _this = this;
        const links = document.getElementsByTagName('a');
        // 将foreach方法给类数组links使用 原则上links没有foreach方法，用call延申
        [].forEach.call(links, link => {
            // 监听点击链接时 跳转
            link.addEventListener('click', function () {
                // 获得当前作用域下data-href的值赋值给url
                const url = this.getAttribute('data-href')
                // push访问记录
                _this.push(url);
            })
        })
    }
    push(url){
        // 进入浏览器history(历史)栈  空对象{}:内容 null:title不改变 要push进历史的url
        window.history.pushState({}, null, url)//改变当前页面的路径，改为url
        this.updateView();
    }
    // 将路由与回调函数关联
    route(path, cb) {
        this.routes[path] = cb;
    }
    init() {
        // 绑定 popstate 事件 load事件，当用户点击前进或者后退的按钮时候，
        // 能够及时更新视图，另外当刚进去页面时也要触发一次视图更新
        // 监听加载load、弹出state
        window.addEventListener('load', this.updateView.bind(this))
        window.addEventListener('popstate', this.updateView.bind(this))
    }
    updateView() {
        // 获取当前路径 若什么都没有则为首页(/)
        const currentUrl = window.location.pathname || '/';
        // 当当前页面路由在定义的路由集合中，就执行当前路由方法，更新视图
        this.routes[currentUrl] && this.routes[currentUrl]();
    }
}