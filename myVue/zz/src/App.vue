<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
export default {
  data(){
    return {
      isRouterAlive:true,
    }
  },
  provide(){
    return {
      reload:this.reload
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      //在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM
      this.$nextTick(()=>{
        this.isRouterAlive = true
      })
    }
  },
};
</script>
