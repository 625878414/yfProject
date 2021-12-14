<template>
    <div class="lang-template">
        {{content}}
        <slot></slot>
    </div>
</template>

<script>
import langConfig from "@/libs/lang/index";
export default {
    props: ['filed'],
    data(){
        return {
           langConfig: langConfig['zh'],
           content:''
        }
    },
     computed: {
        lang() {
           return this.$store.state.app.lang;
        }
    },
    watch:{
        lang: {
        　　handler(val, oldName) {
              this.langConfig = langConfig[val];
              this.content = this.langConfig[this.filed];
        　　},
        　　immediate: true
        }
    },
   mounted(){
    //   this.content = this.langConfig[this.filed];
   }
}
</script>

<style scoped>
   .lang-template{
     display: inline-block;
   }
</style>
