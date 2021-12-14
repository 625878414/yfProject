<template>
  <div>
    <div class="drawer-menu-list">
      <a-input placeholder="请输入关键字" id="drawer-menu-search" v-model="searchKey">
        <a-icon slot="prefix" type="search"/>
      </a-input>
      <div class="drawer-menu-content">
        <div v-for="menu in menuList" v-show="menu.show">
          <h3># {{menu.title}}</h3>
          <div v-for="child in menu.children" v-show="child.show">
            <p v-show="isShowMenu(child.title)" :class="child.name==currentRoute?'drawer-menu-child active':'drawer-menu-child'" @click="goto(child)">{{child.title}}
              <a-icon type="star" :theme="favoriteData[child.name]?'filled':'outlined'"
                      :class="favoriteData[child.name]?'draw-menu-star':'draw-menu-star none'"
                      @click.stop="setCollection(child)"/>
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="drawer-menu-nav">
      <a-list :data-source="menuList">
        <a-list-item slot="renderItem" slot-scope="item, index">
          {{item.title}}
          <a-icon type="cloud" class="right"/>
        </a-list-item>
        <div slot="header">
          <h3>导航</h3>
        </div>
      </a-list>
    </div>
  </div>
</template>

<script>
  export default {
    name: "menu-list",
    data() {
      return {
        searchKey: ""
      }
    },
    computed: {
      currentRoute(){
        return this.$store.state.user.currentRoute;
      },
      menuList() {
        return this.$store.state.user.menuLastList;
      },
      favoriteData() {
        let f = this.$store.state.user.favoriteData;
        let res = {};
        for (let i in f) {
          res[f[i]["menuId"]] = {
            index: i
          };
        }
        return res;
      },
    },
    methods: {
      goto(r){
        this.$emit('on-close');
        this.$router.push({
          name: r.name
        });
      },
      isShowMenu(title){
        if(!!title){
          return title.indexOf(this.searchKey)>-1;
        }
        return false;
      },
      setCollection(sub) {
        let isCancel = !!this.favoriteData[sub.name];
        this.$http({
          url: "/zuul/upm/user/favorite/" + (!!isCancel ? "delete" : "add"),
          method: "post",
          data: {
            menuId: sub.name,
            menuName: sub.title,
            menuIcon: sub.icon
          }
        }).then(res => {
          if (res.data.success) {
            if (!isCancel) {
              this.$store.commit("addFavorite", {
                menuId: sub.name,
                menuName: sub.title,
                menuIcon: sub.icon
              });
            } else {
              this.$store.commit(
                "cancelFavorite",
                this.favoriteData[sub.name]["index"]
              );
            }
          }
        });
      },
    },
    mounted(){
    }
  }
</script>

<style scoped>
  .drawer-menu-list {
    float: left;
    min-width: 200px;
    margin-top: 16px;
  }

  .drawer-menu-nav {
    float: right;
    width: 184px;
  }

  .drawer-menu-content {
    margin-top: 20px;
    -moz-columns: 200px 3;
    -webkit-columns: 200px 3;
    columns: 200px 3;
  }

  .drawer-menu-list h3 {
    font-weight: bold;
    font-size: 15px;
  }

  .drawer-menu-child {
    font-weight: bold;
    height: 34px;
    line-height: 34px;
    font-size: 14px;
    cursor: pointer;
    padding: 0 8px;
    margin: 0;
  }

  .drawer-menu-child:hover,.drawer-menu-child.active{
    background-color: #1890ff;
    color: #fff;
  }

  .drawer-menu-child:hover .draw-menu-star {
    display: block;
  }

  .draw-menu-star.none {
    display: none;
  }

  .draw-menu-star {
    float: right;
    height: 34px;
    line-height: 34px;
    color: #ff6a00;
  }
</style>
<style>
  .drawer-menu-list #drawer-menu-search {
    border: none;
    width: 600px;
    margin: 0 auto;
    border-bottom: 1px solid #989898;
    border-radius: 0;
    height: 40px;
  }

  .drawer-menu-list #drawer-menu-search:focus {
    box-shadow: none;
    border-color: #0a83ff;
  }

  .drawer-menu-nav .ant-list-item {
    padding: 8px 10px;
    color: #000;
    cursor: pointer;
  }

  .drawer-menu-nav .ant-list-item:hover {
    background-color: #e4e4e4;
  }
</style>
