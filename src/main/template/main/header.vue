<template>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%','padding-left':0,height:'64px',overflow: 'hidden' }">
    <div class="logo">
      <a-icon type="unordered-list" class="header-menu-icon" v-if="appInfo.isCollect" @click="toggleCollect" />
      <img :src="appInfo.avatar" alt="">
      <les-lang filed="title" class="header-title main-color"></les-lang>
    </div>
    <icon-z class="header-icon"></icon-z>
    <menu-z class="header-menu"></menu-z>
    <a-drawer
    placement="left"
    :width="260"
    :closable="false"
    :visible="collectDrawer"
    :get-container="false"
    :zIndex="10"
    :mask="false"
    getContainer="#app-content"
    :wrapStyle="{'margin-top': '64px'}"
    :bodyStyle="{'padding': 0}"
  >
    <collect-z ref="collect" @on-menu="toggleMenu" @on-close="closeDrawer"></collect-z>
  </a-drawer>
    <a-drawer
      placement="left"
      :width="900"
      v-show="menuDrawer"
      :visible="menuDrawer"
      :get-container="false"
      :zIndex="9"
      :maskClosable="true"
      getContainer="#app-content"
      :wrapStyle="{'margin-top': '64px','padding-left':'260px'}"
      @close="closeDrawer"
    >
      <menu-list-z ref="menuList" @on-close="closeDrawer"></menu-list-z>
    </a-drawer>
  </a-layout-header>
</template>

<script>
  import menuZ from "./header-menu";
  import iconZ from "./header-icon";
  import collectZ from "./collection";
  import menuListZ from "./menu-list";
  export default {
    name: "pro-main-header",
    data(){
      return {
        collectDrawer: false,
        menuDrawer: false
      }
    },
    components:{
      menuZ,
      iconZ,
      collectZ,
      menuListZ
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
      menuLastList(){
        return this.$store.state.user.menuLastList;
      }
    },
    methods:{
      toggleCollect(){
        this.collectDrawer =  !this.collectDrawer;
        if(this.collectDrawer && this.menuLastList.length==0){
          //请求菜单二级数据和收藏菜单
          this.$http({
            url:"/zuul/upm/menu/sidebar"
          }).then(res=>{
            if(res.data.success){
              this.$store.state.user.favoriteData = res.data.data.favoriteList;
              this.$store.state.user.menuLastList = res.data.data.menuList;
              if(!this.collectDrawer){
                this.menuDrawer = false;
              }
            }else{
              this.$message.error("收藏数据获取异常");
            }
          })
        }else{
          if(!this.collectDrawer){
            this.menuDrawer = false;
          }
        }
      },
      toggleMenu(){
        this.menuDrawer =!this.menuDrawer;
      },
      closeDrawer(){
        this.menuDrawer = false;
        this.collectDrawer = false;
      }
    },
    mounted(){
      let appContent = document.getElementById("app-content-a");
      let self = this;
      try{
        appContent.onclick = function(){
          self.closeDrawer();
        }
      }catch (e) {

      }
    }
  }
</script>

<style scoped>
  header {
    color: #fff;
  }
  .logo{
    position: relative;
    height: 64px;
    overflow: hidden;
    line-height: 64px;
    -webkit-transition: all .3s;
    transition: all .3s;
    float: left;
    color: #fff;
  }
  .logo .header-title{
    color: #fff;
    font-size: 20px;
  }
  .logo img{
    width: 40px;
    float: left;
    margin: 12px 16px 0 16px;
  }
  .header-menu-icon{
    float: left;
    font-size: 30px;
    background: #1890ff;
    height: 64px;
    line-height: 68px;
    width: 64px;
    text-align: center;
    cursor: pointer;
  }
  .header-menu-icon:hover{
    background-color: #6093FB;
  }
  .header-menu{
    float: right;
  }
  .header-icon{
    float: right;
  }
</style>
