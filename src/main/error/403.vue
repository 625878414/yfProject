<template>
  <div class="main-error-403 error-page">
    <img src="./noPage.png" alt="">
    <p>您没有访问的权限!</p>
  </div>
</template>

<script>
  export default {
    name:"main-error-403"
  }
</script>

<style scoped>
  .error-page{
    text-align: center;
    position:absolute;
    width: 100%;
    text-align: center;
  }
  .error-page p{
    font-size: 20px;
    padding-top: 20px;
  }
</style>
