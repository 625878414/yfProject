<template>
  <div class="main-menu" id="main-menu" :style="'width:'+menuWidth+'px;'">
    <a-menu
      mode="inline"
      theme="dark"
      style="height: 100%;"
      :inline-collapsed="collapsed"
      @click="changeMenu"
    >
      <a-menu-item disabled>
        <span v-if="!collapsed"  @click="toggleCollapsed"><a-icon type="menu-fold" /><span>功能列表</span></span>
        <span v-else @click="toggleCollapsed"><a-icon type="menu-unfold" /><span>功能列表</span></span>
      </a-menu-item>
      <template v-for="item in menuData">
        <template v-if="item.show">
          <a-menu-item v-if="item.children.length==0" :key="item.name" >
           <a-icon :type="item.icon" /> <span>{{ item.title }}</span>
          </a-menu-item>
          <a-sub-menu v-else-if="item.children.length>0 && item.show" :key="item.name">
              <span slot="title"><a-icon :type="item.icon" /><span>{{item.title}}</span></span>
            <template v-for="child in item.children" v-if="child.show">
              <a-menu-item v-if="child.children.length==0" :key="child.name" >
                {{child.title}}
              </a-menu-item>
              <a-sub-menu v-else-if="child.children.length>0 && child.show" :key="child.name">
                <span slot="title"><a-icon :type="child.icon" /><span>{{child.title}}</span></span>
                <a-menu-item v-for="child1 in child.children" v-if="child1.show" :key="child1.name" >
                  {{child1.title}}
                </a-menu-item>
              </a-sub-menu>
            </template>
          </a-sub-menu>
        </template>
      </template>
    </a-menu>
  </div>
</template>
<script>
import TemplateMain from "@/main/template/main/main";
export default {
  name: "main-menu",
  components: {TemplateMain},
  data() {
    return {
      collapsed: true
    };
  },
  computed:{
    menuData(){
      return this.$store.state.user.menuData;
    },
    menuWidth(){
      return this.collapsed?60:200
    }
  },
  watch: {

  },
  methods: {
    toggleCollapsed(){
      this.collapsed = !this.collapsed;
      this.$emit('on-collapsed',this.collapsed);
    },
    changeMenu(a){
      this.$router.push({
        name: a.key
      });
    }
  }
};
</script>
<style scoped>
#main-menu >>> .ant-menu-inline-collapsed{
  width: 60px;
}
.ant-menu-inline-collapsed > .ant-menu-item-disabled{
  padding: 0 20px !important;
}
#main-menu >>> .ant-menu-inline-collapsed .ant-menu-submenu-title{
  padding: 0 20px !important;
}
  #main-menu >>> .ant-menu-item-disabled{
     background-color: var(--main-bg-dark) !important;
     color: var(--main-main-text-color) !important;
     height: 40px;
     line-height: 40px;
     font-size: 16px;
     width: 100%;
     transition: all 0.3s;
     cursor: pointer;
  }
  .main-menu-toggle i{
    font-size: 17px;
    padding: 0px 6px;
    font-weight: bold;
    letter-spacing: 2px;
  }
  .main-menu-toggle-small i{
    font-size: 20px;
    cursor: pointer;
  }
  .main-menu >>>.ant-menu-dark,.main-menu >>> .ant-menu-dark .ant-menu-sub{
    background-color: var(--main-bg-dark);
    color: var(--main-main-text-color);
  }
</style>
