# vuex_counter
初始化vuex：vue init webpack vuex-counter
- render
    render方法的实质就是生成template模板； 在挂载到app节点上
        通过调用一个方法来生成，而这个方法是通过render方法的参数传递给它的； 
        这个方法有三个参数，分别提供标签名，标签相关属性，标签内部的html内容 
        通过这三个参数，可以生成一个完整的木模板

- vue 最难的是数据管理 mvvm
    1.0时代 组件在我们眼里是最大的
        data()私有状态 自给自足的状态
    2.0时代 很多的组件 组建的层次及关系 兄弟组件共享数据的时候 找到共同的父组件管理这个状态(通过props+emit方式)
    3.0时代 vuex 简单项目不要用它 管理应用状态使用2.0太麻烦  跨组件 跨层级 轻松共享应用状态 多个路由(多个组件)需要共享太多的状态时 使用vuex
- vuex安装 npm install vuex -S / npm install vuex


# do_vuex_count
初始化：vue init webpack do_vuex_count
-   vue的大型项目开发，分成两种任务：组件开发工作(业务量的开发)、vuex数据设计
    store 独立于组件之外应用App的中央数据管理中心
    公司:ceo state {count:0} 共享状态
        actions 日常动(工)作 ：修改状态、可异步
        修改: dispatch 派发 actions('name',payload) => action commit('mutationname') mutations =>直接拿到state =>修改数据
        mutations 财务部和老板接触 state 可以维护状态的正确性 只可同步
                  审核对状态的修改是否合公司规矩

    组件对属性做读操作 this.$store.state.count

    写：actions(组件调用动作方法)

- data 是组件自有数据，没有多少，做大型项目要思考有没有数据需要共享应用层进行共享，
        只要多于一个组件要用,且关系不是简单的兄弟，就用vuex
- 共享状态 由vuex state 管理 管理之后构建了mutations（只有他能修改），
                                        actions 被触发动作 提交至mutations  
                                        getters 对state进行包装
- mapActions,mapGetters 引入组件