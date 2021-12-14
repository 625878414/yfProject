<template>
  <div class="app-collect">
    <a-list  :data-source="favoriteData">
      <a-list-item slot="renderItem" slot-scope="item, index" @click="goto(item)" :class="item.menuId == currentRoute?'active':''">
        <a-icon :type="item.menuIcon" />
        {{item.menuName}}
        <a-icon type="close-circle" class="right-icon none" @click.stop="cancelFavorite(item,index)"/>
      </a-list-item>
      <div slot="header" @click="toggleMenu">
        <a-icon type="calendar" />
        功能菜单
        <a-icon type="double-right" class="right-icon" />
      </div>
    </a-list>
  </div>
</template>

<script>
  export default {
    name: "collection",
    data() {
      return {}
    },
    computed: {
      currentRoute() {
        return this.$store.state.user.currentRoute;
      },
      favoriteData() {
        return this.$store.state.user.favoriteData;
      },
    },
    methods: {
      goto(r){
        this.$emit('on-close');
        this.$router.push({
          name: r.menuId
        });
      },
      toggleMenu() {
        this.$emit('on-menu');
      },
      cancelFavorite(c, index) {
        this.$http({
          url: "/zuul/upm/user/favorite/delete",
          method: "post",
          data: c
        }).then(res => {
          if (res.data.success) {
            this.$store.commit("cancelFavorite", index);
            this.$notification.success({
              message: '操作提示',
              description:"取消成功",
              duration: 1.5
            });
          } else {
            this.$notification.error({
              message: '操作提示',
              description:"取消失败",
              duration: 1.5
            });
          }
        });
      }
    }
  }
</script>

<style scoped>
  .app-collect i {
    font-size: 14px;
    margin-right: 6px;
    font-weight: bold;
  }

  .app-collect .right-icon {
    float: right;
    margin-top: 3px;
  }
</style>
<style>
  .app-collect .ant-list-header {
    padding: 8px 24px;
  }

  .app-collect .ant-list {
    font-size: 14px;
    font-weight: bold;
  }

  .app-collect .ant-list-item {
    cursor: pointer;
    padding: 12px 15px 12px 24px;
  }

  .app-collect .ant-list-header {
    cursor: pointer;
    padding-right: 10px !important;
    font-size: 15px;
  }

  .app-collect .none {
    display: none;
  }

  .app-collect .ant-list-item:hover,.app-collect .ant-list-item.active {
    background-color: #1890ff;
    color: #fff;
  }

  .app-collect .ant-list-item:hover .none {
    display: block;
  }
</style>
