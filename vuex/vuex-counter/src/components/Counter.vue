<template>
  <div>
      {{$store.state.count }}times
    <!-- {{count}} times -->
    <button @click="increment()">+</button>
  </div>
</template>

<script>
export default {
//   props: ['count'],
  methods: {
    increment: function() {
    //   this.$emit('increment')
    //  启用vuex之后 开始由他管理状态 不需要从父级组件拿数据
    }
  }
};
</script>

<style>
</style>
