<template>
  <div id="app">
    <a-config-provider :locale="locale">
      <keep-alive v-if="!isDebug">
        <router-view />
      </keep-alive>
      <router-view v-else />
    </a-config-provider>
  </div>
</template>
<script>
import enUS from 'ant-design-vue/lib/locale-provider/en_US';
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  name: 'App',
  data(){
    return{
        locale: zhCN
    }
  },
  computed: {
    lang: function () {
      return this.$store.state.app.lang;
    },
    title: function(){
      return this.$store.state.app.title;
    },
    isDebug(){
      return this.$config.debug;
    }
  },
  watch:{
    'lang':{
       handler(n,o){
         this.$store.commit("setTitleByLang", n);
         this.locale = n=='en'?enUS:zhCN
       },
    　  immediate: true
    },
    'title':{
      handler(n,o){
        document.title = n;
      },
      immediate: true
    }
  },
  methods:{

  },
  mounted(){
  }
};
</script>
<style lang="less">
  #app{
    height: 100%;
  }
</style>
<style>

</style>
