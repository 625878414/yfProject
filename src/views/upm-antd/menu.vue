<style  lang="less">
.upm-menu {
    .editable-cell {
        position: relative;
    }

    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
        padding-right: 24px;
    }

    .editable-cell-text-wrapper {
        padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
        position: absolute;
        right: 0;
        width: 20px;
        cursor: pointer;
    }

    .editable-cell-icon {
        line-height: 18px;
        display: none;
    }

    .editable-cell-icon-check {
        line-height: 28px;
    }

    .editable-cell:hover .editable-cell-icon {
        display: inline-block;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
        color: #108ee9;
    }

    .editable-add-btn {
        margin-bottom: 8px;
    }
}

</style>
<template>
    <div id="menu" class="upm-menu">
        <div class="page-content-body">
            <div class="toolbar">
                <a-button type="primary" @click="add">
                    <a-icon type="plus"/>
                    新增
                </a-button>
    <!--            <a-button type="primary" @click="test">
                    <a-icon type="plus"/>
                    测试
                </a-button>-->
                <div class="right">
                    <a-space>
                        <!--<Cascader :data="company" @on-change="changeOffice" placeholder="请选择所属部门" change-on-select style="width: 300px;display: inline-block"></Cascader>-->
                        <a-input icon="search" placeholder="请输入名称查询" style="width: 150px;" allowClear></a-input>
                        <a-input icon="search" placeholder="请输入代码查询" style="width: 160px;" allowClear></a-input>
    <!--                    <a-switch default-checked @change="onChange"/>-->
                    </a-space>
                </div>
                <div class="clear"></div>
            </div>

            <a-table :columns="columns"
                     :rowKey="record => record.id"
                     :data-source="data"
                     :loading="loading"
                     size="middle"
                     style="background-color: white"
                     :pagination="false"
            >
                <template slot-scope="text, record" slot="operation">
                    <a-button-group>
                        <a-button type="primary" size="small" @click="edit(record.id)">修改</a-button>
                        <a-button type="warning" size="small" @click="addChild(record)">下级</a-button>
                        <a-button type="danger" size="small" @click="del(record.id)">删除</a-button>
                    </a-button-group>
                </template>
                <template slot-scope="text, record" slot="icon">
                    <a-icon :type="record.icon" />
                </template>
                <template slot-scope="text, record" slot="type">
                    <a-tag color="blue" v-if="record.menu">
                        菜单
                    </a-tag>
                    <a-tag color="blue" v-else>
                        按钮
                    </a-tag>
                </template>
                <template slot="sort" slot-scope="text, record">
                    <editable-cell :text="record.sort" />
                </template>
            </a-table>
        </div>
        <a-drawer
            :title="titleDrawer"
            :width="400"
            :visible="formDrawer"
            :body-style="{ paddingBottom: '80px' }"
            @close="onClose"
            :destroyOnClose="true"
            class="les-drawer-from"
        >
            <a-form-model ref="formData" :model="formData" :rules="ruleValidate" layout="vertical" hide-required-mark>
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-model-item label="菜单名称">
                            <a-input v-model="formData.title" :maxLength="10" allowClear placeholder="最多输入10个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="上级菜单">
                            <a-cascader
                                v-model:value="formData.parentIdsList"
                                :options="parent"
                                changeOnSelect
                                allowClear
                                placeholder="请选择上级区域"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="16">
                        <a-form-model-item label="菜单类型">
                            <a-radio-group :default-value="1" button-style="solid" v-model="formData.type">
                                <a-radio-button :value="1">
                                    菜单
                                </a-radio-button>
                                <a-radio-button :value="0">
                                    按钮
                                </a-radio-button>
                                <a-radio-button :value="2">
                                    分组
                                </a-radio-button>
                            </a-radio-group>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="8" v-if="formData.type === 1 || formData.type === 2">
                        <a-form-model-item label="是否显示" prop="show">
                            <a-switch size="large" v-model="formData.show">
                                <a-icon type="check" slot="open"></a-icon>
                                <a-icon type="close" slot="close"></a-icon>
                            </a-switch>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24" v-if="formData.menu">
                        <a-form-model-item label="路径" prop="path">
                            <a-input v-model="formData.path" :maxLength="50" allowClear placeholder="最多输入10个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24" v-if="formData.menu">
                        <a-form-model-item label="链接" prop="href">
                            <a-input v-model="formData.href" :maxLength="100" allowClear placeholder="最多输入100个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="图标" prop="icon">
                            <a-input-search v-model="formData.icon" :maxLength="10" allowClear placeholder="点击按钮选择图标" enter-button @search="showChildrenDrawer">
                                <a-icon slot="addonBefore" :type="formData.icon" />
                                <a-button slot="enterButton">
                                    Custom
                                </a-button>
                            </a-input-search>
                            <a-drawer
                                width="320"
                                :closable="false"
                                :visible="childrenDrawer"
                                @close="onChildrenDrawerClose"
                            >
                                <div>
                                    <icon :icon="formData.icon" @setIcon="setIcon"></icon>
                                </div>
                            </a-drawer>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="排序" prop="sort">
                            <a-input-number v-model="formData.sort" :min="1" :max="999" />
<!--                            <a-row :gutter="16">
                                <a-col :span="16">
                                    <a-slider v-model="formData.sort" :min="1" :max="999" />
                                </a-col>
                                <a-col :span="8">
                                    <a-input-number v-model="formData.sort" :min="1" :max="999" style="marginLeft: 16px" />
                                </a-col>
                            </a-row>-->
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24" v-if="formData.menu">
                        <a-form-model-item label="目标" prop="target">
                            <a-select v-model="formData.target" allowClear placeholder="请选择">
                                <a-select-option v-for="item in targetList" :key="item.value">
                                    {{ item.label }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24" v-if="formData.menu">
                        <a-form-model-item label="模板" prop="template">
                            <a-select v-model="formData.template" allowClear placeholder="请选择">
                                <a-select-option v-for="item in templateList" :key="item.value">
                                    {{ item.label }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="权限标识" prop="permission">
                            <a-input v-model="formData.permission" :maxLength="100" allowClear placeholder="最多输入6个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12" v-if="formData.menu">
                        <a-form-model-item label="是否首页" prop="home">
                            <a-switch size="large" v-model="formData.home">
                                <a-icon type="check" slot="open"></a-icon>
                                <a-icon type="close" slot="close"></a-icon>
                            </a-switch>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12" v-if="formData.menu">
                        <a-form-model-item label="是否缓存" prop="cache">
                            <a-switch size="large" v-model="formData.cache">
                                <a-icon type="check" slot="open"></a-icon>
                                <a-icon type="close" slot="close"></a-icon>
                            </a-switch>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="24">
                        <a-form-model-item label="备注" prop="remarks">
                            <a-textarea v-model="formData.remarks" :rows="4" :maxLength="100" placeholder="最多输入100个字符"/>
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>
            <div class="page-drawer-footer">
                <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
                <a-button type="primary" @click="handleSubmit">保存</a-button>
            </div>
        </a-drawer>
    </div>
</template>

<script>
import {GetDictLabelByValue} from "@/api/dict";
import {validateAreaCode, validateSpecialFont} from "@/libs/validate";
import icon from "./icon.vue"
const EditableCell = {
    template: `
      <div class="editable-cell">
        <div v-if="editable" class="editable-cell-input-wrapper">
          <a-input :value="value" @change="handleChange" @pressEnter="check" /><a-icon
            type="check"
            class="editable-cell-icon-check"
            @click="check"
          />
        </div>
        <div v-else class="editable-cell-text-wrapper">
          {{ value || ' ' }}
          <a-icon type="edit" class="editable-cell-icon" @click="edit" />
        </div>
      </div>
    `,
    props: ["text"],
    data() {
        return {
            value: this.text,
            editable: false,
        };
    },
    methods: {
        handleChange(e) {
            console.log("sort:", e.target.value)
            const value = e.target.value;
            this.value = value;
        },
        check() {
            this.editable = false;
            this.$emit('change', this.value);
        },
        edit() {
            this.editable = true;
        },
    },
};
export default {
    name: "antdv-menu",
    components: {
        icon,
        EditableCell,
    },
    data() {
        //验证是否上级菜单等于本菜单
        const parentCheck = (rule, value, callback) => {
            //获取parentId
            var parentId = '';
            if (this.formData.parentIdsList.length > 0) {
                parentId = this.formData.parentIdsList[this.formData.parentIdsList.length - 1];
            }
            //修改时本菜单id等于上级菜单id时报错
            if (!!this.formData.id && this.formData.id === parentId) {
                callback(new Error("上级菜单不能修改为当前菜单!"));
            } else {
                callback();
            }
        };
        return {
            titleDrawer: '新增',
            formDrawer: false,
            childrenDrawer: false,
            loading: false,
            data: [],
            visible: false,
            columns: [{
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '路径',
                dataIndex: 'path',
                key: 'path',
            }, {
                title: '链接',
                dataIndex: 'href',
                key: 'href',
            }, {
                title: '图标',
                dataIndex: 'icon',
                key: 'icon',
                width: 150,
                scopedSlots: {customRender: 'icon'}
            }, {
                title: '类型',
                dataIndex: 'menu',
                key: 'menu',
                width: 80,
                scopedSlots: {customRender: 'type'}
            /*}, {
                title: '首页',
                dataIndex: 'isHome',
                key: 'isHome',
                width: 150,*/
            }, {
                title: '排序',
                dataIndex: 'sort',
                key: 'sort',
                width: 100,
                /*scopedSlots: {customRender: 'sort'}*/
            }, {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: 250,
                scopedSlots: {customRender: 'operation'}
            }],
            formData: {
                title: '',
                parentIds: '',
                parentIdsList: [],
                path: '',
                href: '',
                icon: '',
                type: 1,
                sort: 0,
                permission: '',
                target: 'default',
                template: 'admin',
                menu: true,
                show: true,
                home: false,
                cache: false,
                remarks: ''
            },
            parent: [],
            targetList: [{
                value: 'default',
                label: 'default'
            }, {
                value: 'iframe',
                label: 'iframe'
            }, {
                value: 'blank',
                label: 'blank'
            }],
            templateList: [{
                value: 'components/error/blank',
                label: '全屏'
            }, {
                value: 'components/main/main',
                label: '后台管理'
            }, {
                value: 'components/visualize/index',
                label: '可视化'
            },{
                value: '',
                label: '空白'
            },{
                value: 'components/main/vueIframe',
                label: '全屏-iframe'
            }, {
                value: 'admin',
                label: 'antdv-后台管理'
            }, {
                value: 'admin/iframe',
                label: 'antdv-后台管理-iframe'
            },{
                value: 'fullScreen',
                label: 'antdv-全屏'
            },{
                value: 'fullScreen/iframe',
                label: 'antdv-全屏-iframe'
            }],
            ruleValidate: {
                parent: [{validator: parentCheck, trigger: "blur"}],
                title: [{
                    required: true, message: "必填", trigger: "blur"
                }, {
                    validator: validateSpecialFont, trigger: "blur"
                }],
                path: [{max: 300, message: "不能超过300个字符", trigger: "blur"}],
                href: [{max: 300, message: "不能超过300个字符", trigger: "blur"}],
                icon: [{max: 30, message: "不能超过30个字符", trigger: "blur"}],
                permission: [{max: 50, message: "不能超过50个字符", trigger: "blur"}],
                template: [{max: 100, message: "不能超过100个字符", trigger: "blur"}],
                remarks: [{max: 100, message: "不能超过100个字符", trigger: "blur"}]
            },
            rowSelection: [],
            iconStyle: {
                fontSize: '32px'
            }
        }
    },
    methods: {
        formInit() {
            this.formData = {
                title: '',
                parentIds: '',
                parentIdsList: [],
                path: '',
                href: '',
                icon: 'setting',
                type: 1,
                sort: 0,
                permission: '',
                target: 'default',
                template: '',
                menu: true,
                show: true,
                home: false,
                cache: false,
                remarks: ''
            };
            //清空select
            //this.$refs.type.clearSingleSelect();
        },
        showChildrenDrawer() {
            this.childrenDrawer = true;
        },
        onChildrenDrawerClose() {
            this.childrenDrawer = false;
        },
        onChange(checked) {
            console.log(`a-switch to ${checked}`);
        },
        renderTable() {
            this.loading = true;
            this.$http({
                url: "/zuul/upm/menu/tree",
                method: "get",
            }).then(result => {
                if (result.data.success) {
                    this.data = result.data.data;
                }
                this.loading = false;
            });
        },
        renderParent(callback) {
            this.$http({
                url: "/zuul/upm/menu/cascader",
                method: "get",
            }).then(result => {
                if (result.data.success) {
                    //console.log(result.data.data);
                    this.parent = result.data.data;
                    callback && callback();
                }
            });
        },
        onClose() {
            this.formDrawer = false;
        },
        add() {
            this.formInit();
            this.renderParent(() => {
                this.titleDrawer = "新增";
                this.formDrawer = true;
            });
        },
        /*test() {
            this.formInit();
            this.$http({
                url: "/zuul/upm/menu/sidebar",
                method: "get",
            }).then(result => {
                if (result.data.success) {
                    console.log(result.data.data)
                }
            });
        },*/
        edit(id) {
            this.formInit();
            this.loading = true;
            this.$http({
                url: "/zuul/upm/menu/" + id,
                method: "get",
            }).then(result => {
                if (result.data.success) {
                    console.log(result.data.data)
                    this.formData = result.data.data;
                }
                this.loading = false;
                this.titleDrawer = "修改";
                this.formDrawer = true;
            });
        },
        del(id) {
            let _this = this
            this.$confirm({
                title: '确定删除?',
                content: '',
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                    _this.$http({
                        url: "/zuul/upm/menu/" + id,
                        method: "delete",
                    }).then(result => {
                        if (result.data.success) {
                            _this.$notification['success']({
                                message: "操作成功",
                                description: result.data.message,
                            });
                        } else {
                            _this.$notification['error']({
                                message: "操作失败",
                                description: result.data.message,
                            });
                        }
                        _this.renderTable();
                        _this.renderParent();
                    });
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        },
        addChild(row) {
            console.log("addChild:", row)
            this.formInit();
            let parentIdsList = [];
            row.parentIdsList.forEach((item, index) => {
                parentIdsList.push(item);
            });
            parentIdsList.push(row.id);
            console.log("parentIdsList:", parentIdsList)
            this.formData.parentIdsList = parentIdsList;
            this.titleDrawer = "新增";
            this.formDrawer = true;
        },
        handleSubmit() {
            this.$refs.formData.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$http({
                        url: "/zuul/upm/menu",
                        method: "post",
                        data: this.formData
                    }).then(result => {
                        if (result.data.success) {
                            this.$notification['success']({
                                message: "操作成功",
                                description: result.data.message,
                            });
                            this.formDrawer = false;
                            this.renderParent();
                            this.renderTable();
                        }
                        this.loading = false;
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        setIcon(icon) {
            this.formData.icon = icon;
            this.childrenDrawer=false
        }
    },
    mounted() {
        this.renderTable()
        this.renderParent()
    }
}
</script>
