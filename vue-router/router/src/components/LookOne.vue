<template>
    <div class="look">{{message}}
        <p>接收的参数:{{$route.params.name}}</p>
    </div>
</template>

<script>
export default {
    name:'Look',
    data() {
        return {
            message:'那小子真丑'
        }
    },
}
</script>
