<template>
    <div class="look">{{message}}{{$route.params.id}}
        <!-- Root中要有router-view组件去承载子路由，才能实现子路由切换展示 -->
        <!-- 要给一个页面配置子页面，要让他有权利掌管子路由，在父路由写入<router-view /> -->
    <router-view/>
    </div>
    
</template>

<script>
export default {
    name:'Look',
    data() {
        return {
            message:'那小子真帅'
        }
    },
}
</script>
