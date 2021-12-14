<template>
  <div :style="'width:'+windowW+'px;height:'+windowH+'px;'">
    <keep-alive>
      <router-view  />
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: "fullScreen-index",
    computed:{
      windowW(){
        return this.$store.state.app.innerWidth
      },
      windowH(){
        return this.$store.state.app.innerHeight
      }
    },
    mounted(){
      console.log(this.$route);
    }
  }
</script>

<style scoped>

</style>
