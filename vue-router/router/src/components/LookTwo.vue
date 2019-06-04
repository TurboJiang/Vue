<template>
    <div class="look">{{message}}
        <p>接收的参数:{{$route.params.id}}</p>
    </div>
</template>

<script>
export default {
    name:'Look',
    data() {
        return {
            message:'那小子真酷'
        }
    },
}
</script>
