<style scoped>
.ant-carousel >>> .slick-slide {
    text-align: center;
    height: 800px;
    line-height: 160px;
    /*background: #364d79;*/
    overflow: hidden;
}

.ant-carousel >>> .custom-slick-arrow {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    opacity: 0.3;
}

.ant-carousel >>> .custom-slick-arrow:before {
    display: none;
}

.ant-carousel >>> .custom-slick-arrow:hover {
    opacity: 0.5;
}

.ant-carousel >>> .slick-slide h3 {
    color: #fff;
}

.index-wrap {
    background: #333 url("./images/bg.jpg") 100% 100%;
    background-size: cover;
    position: relative;
}

#components-grid-demo-playground{
    width: 1200px;
    margin: 10% auto;
}
#components-grid-demo-playground [class~='ant-col'] {
    background: transparent;
    border: 0;
}

#components-grid-demo-playground [class~='ant-col'] > div {
    background: #00a0e9;
    height: 120px;
    line-height: 120px;
    font-size: 13px;
}

#components-grid-demo-playground pre {
    background: #f9f9f9;
    border-radius: 6px;
    font-size: 13px;
    padding: 8px 16px;
}
</style>
<template>
    <div class="index-wrap" :style="'height:'+indexHeight+'px;width:100%;overflow:auto;'">
        <vue-particles
            color="#b3fff6"
            :particleOpacity="0.2"
            linesColor="#69eada"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="5"
            :linesWidth="2"
            :lineLinked="true"
            :lineOpacity="0.2"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
            style="z-index:0;position: absolute;top: 0;left: 0;width: 100%;"
        >
        </vue-particles>
        <a-carousel arrows>
            <div
                slot="prevArrow"
                slot-scope="props"
                class="custom-slick-arrow"
                style="left: 10px;zIndex: 1"
            >
                <a-icon type="left-circle"/>
            </div>
            <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
                <a-icon type="right-circle"/>
            </div>
            <div v-for="(items, i) in menuGroup" :style="'top:'+menuTop+'px;'" :key="'menu-'+i">
                <div id="components-grid-demo-playground">
                    <div style="margin-bottom:16px">
                        <a-row :gutter="[16, 16]">
                            <a-col v-for="item in items" @click="turnToPage(item)" :key="item.id" :span="24 / 4">
                                <div :style='"line-height:350px;height:225px;cursor: pointer;width: 180px;margin:0 auto;background-size: cover;background-image:url("+menuImageObj["menu-0"]+")"'>
                                    <h3>{{ item.title }}</h3>
                                </div>
                            </a-col>
<!--                            <a-col @click="set" :span="6">
                                <div @click="set" :style='"height:225px;background-image:url(" + menuImageObj["menu-7"] + ")"'>
                                    <h3>首页设置</h3>
                                </div>
                            </a-col>-->
                        </a-row>

                    </div>
                </div>
            </div>
        </a-carousel>
        <a-drawer
            placement="bottom"
            :closable="false"
            :visible="visible"
            @close="onClose"
        >
            <a-row :gutter="[16,16]">
                <a-col :span="6" v-for="(item,index) in menuList1" :key="index">
                    <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
                        {{ item.title }}
                    </a-checkbox>
                    <a-divider/>
                    <div v-for="(sub,ind) in item.children" style="display: inline" :key='"menu"+ind'>
                        <a-checkbox :label="sub.id">
                            {{ sub.title }}
                        </a-checkbox>
                    </div>
                </a-col>
            </a-row>
        </a-drawer>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
  import {DelCookie} from "@/libs/util";
export default {
    name: "index",
    data() {
        return {
            indeterminate: true,
            checkAll: false,
            checkedList: ['Apple', 'Orange'],
            plainOptions: ['Apple', 'Pear', 'Orange'],
            visible: false,
            msgList: ['智交通  慧出行', '情指勤督一体化'],
            menuTop: ((window.innerHeight) / 2) - 400,
            windowH: window.innerHeight - 90,
            indexHeight: window.innerHeight,
            name: "name",
            menuList: [],
            menuList1: [],
            menuGroup: [],
            menuImageObj: {
                "menu-0": require("./images/menu-0.png"),
                "menu-1": require("./images/menu-1.png"),
                "menu-2": require("./images/menu-2.png"),
                "menu-3": require("./images/menu-3.png"),
                "menu-4": require("./images/menu-4.png"),
                "menu-5": require("./images/menu-5.png"),
                "menu-6": require("./images/menu-6.png"),
                "menu-7": require("./images/menu-7.png"),
            },

        }
    },
    mounted() {
        let self = this;
        window.onresize = function () {
            self.windowH = window.innerHeight - 90;
        };
        this.$http({
            url: "/zuul/upm/menu/sidebar"
        }).then(res => {
            if (res.data.success) {
                //console.log(res.data.data.menuList);
                this.menuList1 = res.data.data.menuList
                let menus = []
                this.menuList1.forEach((item, index) => {
                    menus.push(item)
                    if ((index + 1) % 8 === 0) {
                        //console.log("menuGroup index:", index)
                        this.menuGroup.push(menus)
                        menus = []
                    }
                    //console.log("menuGroup menus:", menus)
                });
                this.menuGroup.push(menus)
            }
        })
    },
    methods: {
        ...mapActions(["handleModifyPassword", 'handleLogOut']),
        sortMenu(a, b) {
            return Number(a.sort) - Number(b.sort)
        },
        getMenu() {
            this.$http({
                url: '/zuul/upm/menu/modules'
            }).then(result => {
                if (result.data.success) {
                    // this.menuList = result.data.data.menuList;
                    this.name = result.data.data.name;
                    let multileMenus = result.data.data.menuList;
                    let confirmJson = {};
                    if (Array.isArray(multileMenus)) {
                        let simpleMenu = multileMenus.filter(item => {
                            if (confirmJson[item.id]) {
                                //重复
                            } else {
                                if (item.path != "/index") {
                                    confirmJson[item.id] = item;
                                    return item
                                }
                            }
                        });
                        this.menuList = simpleMenu.sort(this.sortMenu);
                    }
                }
            })
        },
        turnToPage(item) {
            this.$store.commit("closeAllMenuCache");
            DelCookie('menuCache');
            this.$http({
                url: "/zuul/upm/menu/headbar?menuId=" + item.name,
            }).then(res => {
                if (res.data.success) {
                    this.$store.state.user.currentRoute = res.data.data.homeMenuId;
                    this.$router.push({
                        name: res.data.data.homeMenuId
                    });
                    this.$store.state.user.menuData = res.data.data.menuList;
                } else {
                    this.$message.error("headbar接口异常");
                }
            })
        },
        set() {
            this.visible = true;
        },
        onClose() {
            this.visible = false;
        },
        onChange(checkedList) {
            this.indeterminate = !!checkedList.length && checkedList.length < plainOptions.length;
            this.checkAll = checkedList.length === plainOptions.length;
        },
        onCheckAllChange(e) {
            Object.assign(this, {
                checkedList: e.target.checked ? plainOptions : [],
                indeterminate: false,
                checkAll: e.target.checked,
            });
        },
    }
}
</script>


