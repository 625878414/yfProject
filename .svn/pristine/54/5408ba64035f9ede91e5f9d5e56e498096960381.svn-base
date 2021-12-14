<template>
    <div class="shiro-template" v-show="isShow">
        <slot></slot>
    </div>
</template>

<script>
export default {
    data(){
        return {
            isShow: false
        }
    },
   props:{
     name: {
         type: String
     }
   },
   mounted(){
       if(this.$store.state.user.permission.indexOf(this.name)>-1){
            this.isShow = true;
        } else {
            this.isShow = false;
        }
   }
}
</script>

<style scoped>
   .shiro-template{
     display: inline-block;
   }
</style>
