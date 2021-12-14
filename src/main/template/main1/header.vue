<template>
   <div class="main-header">
     <div class="header-title">
       <img :src="appInfo.avatar" alt="">
       <les-lang filed="title" class="header-text"></les-lang>
       <!-- <div class="header-menu-list">
         组织管控 / 接处警
       </div> -->
     </div>
     <div class="header-icon">
       <a-icon type="skin" style="font-size: 24px;color: #d4f1ff;" />
       <a-dropdown>
         <a class="ant-dropdown-link left" @click="e => e.preventDefault()">
           <img :src="userInfo.avatar" alt="">{{userInfo.userName}}
           <a-icon type="down"/>
         </a>
         <a-menu slot="overlay">
           <a-menu-item>
             <a href="javascript:;"  @click="exitSys">
               <a-icon type="login"/>&nbsp;退出登录</a>
           </a-menu-item>
         </a-menu>
       </a-dropdown>
       <a-dropdown>
      <a class="ant-dropdown-link" @click="e => e.preventDefault()">
        <i class="iconfont icon-theme les-theme-icon" :style="'font-size:30px;color:'+currentTheme.color"></i>
      </a>
      <a-menu slot="overlay">
        <a-menu-item v-for="(t,index) in skinTheme" :key="t.label"  @click.native="changeTheme(t,index)">
          <!--<i class="iconfont icon-theme les-theme-icon les-theme-icon2" :style="'color:'+t.color"></i>-->
          {{t.label}}
        </a-menu-item>
      </a-menu>
    </a-dropdown>
     </div>
   </div>
</template>

<script>
import {ReadCookie,WriteCookie} from "@/libs/util";
export default {
  name: "main-header",
  data(){
    return{
     
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    },
    appInfo() {
      return this.$store.state.app;
    },
    hideHeaderMenu() {
      return this.$store.state.app.hideHeaderMenu;   
    },
    themeIndex(){
       return this.$store.state.app.themeIndex;   
    },
    skinTheme(){
       return this.$store.state.app.theme;   
    },
    currentTheme(){
     return this.$store.state.app.currentTheme;   
    }
  },
  methods:{
    exitSys(){
      this.$router.push({
        path:'/login'
      });
    },
    changeTheme(theme,index){
      if(this.themeIndex != index){
          this.changeThemeHref(theme.href);
          this.$store.commit('changeThemeIndex',index);
        }
      },
    changeThemeHref(href){
         if(!href){
          console.log( this.themeIndex);
          href = this.skinTheme[this.themeIndex]["href"];
        }
        let antLink = document.getElementById('link-antd');
        antLink.setAttribute("href","./"+href);
      }
  },
  mounted(){
     setTimeout(()=>{
        this.changeThemeHref();
      },0);
  }
}
</script>

<style scoped>
 .main-header{
   height: 50px;
   line-height: 50px;
   background-color: #3388ff;
   display: flex;
   padding: 0 10px;
   justify-content: space-between;
 }
 .main-header .header-title{
   display: flex;
   align-items: center;
 }
 .main-header .header-title img{
   height: 76%;
 }
 .main-header .header-text{
   line-height: 50px;
   font-size: 26px;
   height: 100%;
   color: #ffff;
   font-weight: bold;
   padding-left: 10px;
 }
 .header-icon{
   display: flex;
   align-items: center;
 }
 .header-icon a{
   height: 100%;
   color: #d4f1ff;
 }
 .header-icon a img{
   height: 70%;
   border-radius: 50%;
   margin: 0px 12px;
 }
 .header-menu-list{
   font-size: 17px;
   margin-left: 24px;
   color: #d4f1ff;
 }
</style>
