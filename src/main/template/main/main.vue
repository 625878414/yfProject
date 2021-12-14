<template>
  <div class="pro-layout">
    <a-layout>
      <header-z></header-z>
      <content-z ref="main"></content-z>
    </a-layout>
  </div>
</template>
<script>
  import headerZ from "./header";
  import contentZ from "./content";
  import fotterZ from "./fotter";
  export default {
    name:"template-main",
    data(){
      return {
        
      }
    },
    components:{
      headerZ,
      contentZ,
      fotterZ
    },
     beforeMount(){
      this.$store.state.app.headerHeight = 96;
      this.$store.commit('resize');
     },
  }
</script>
<style scoped>
  .pro-layout-header-space{
    height: 64px;
    padding: 0 50px;
    line-height: 64px;
    background: #001529;
  }
  .pro-layout-header{
    position: fixed;
    top: 0;
    height: 64px;
    line-height: 64px;
    background: #001529;
  }
  .pro-layout-process{
    position: fixed;
    top: -8px;
    left: 0;
    z-index: 999;
  }
</style>
