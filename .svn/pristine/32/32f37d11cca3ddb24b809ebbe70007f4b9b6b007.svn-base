<template>
    <div class="shiro-disabled" :disabled="isShow">
        <slot ></slot>
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
   .shiro-disabled{
     display: inline-block;
     cursor: not-allowed;
   }
   .shiro-disabled *{
     pointer-events: none;
   }
   .shiro-disabled input[type="text"]:disabled
    {
       background-color: #dddddd;
    }
</style>
