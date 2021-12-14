<style>
/*.ant-form-item {
    margin-bottom: 0 !important;
}*/
</style>
<style scoped lang="less">
</style>
<template>
    <div class="office">
        <div class="page-content-body">
            <div class="toolbar">
                <a-button type="primary" icon="md-add" @click="add">新增</a-button>
<!--                <shiro-hasPermission name="sys:user:edit">
                    <a-button type="primary" icon="md-add" @click="add">新增</a-button>
                </shiro-hasPermission>-->
                <!--<shiro-hasPermission name="sys:user:del">
                    <Button type="error" icon="ios-trash" @click="multiDelete">删除</Button>
                </shiro-hasPermission>-->
<!--                <div class="right">
                    <a-input placeholder="Basic usage"/>
                </div>-->
            </div>
            <a-table :rowKey="record => record.id" :columns="columns" :data-source="data" :loading="loading" size="middle" :pagination="false" style="background-color: white">
                <template slot-scope="text, record" slot="typeSlots">
                    <span>{{ getTypeOption(text) }}</span>
                </template>
                <template slot-scope="text, record" slot="actionSlots">
                    <a-button type="primary" size="small" @click="edit(record.id)" style="margin-right: 5px">修改
                    </a-button>
                    <a-button type="warning" size="small" @click="addChild(record)" style="margin-right: 5px;">
                        下级
                    </a-button>
                    <a-button type="danger" size="small" @click="del(record)">删除</a-button>
                </template>
            </a-table>
        </div>
        <a-drawer
            :title="titleDrawer"
            :visible="formDrawer"
            width="400"
            @close="onClose"
            :destroyOnClose="true"
            :body-style="{ paddingBottom: '80px' }"
        >
            <a-form-model ref="formData" :model="formData" :rules="ruleValidate" label-position="top" :form="formDrawerCreate">
                <a-form-model-item label="机构名称" label-position="top" prop="name">
                    <a-input v-model="formData.name" placeholder="最多输入20个字符" :maxLength="20" allowClear/>
                </a-form-model-item>
                <a-form-model-item label="机构全称" label-position="top" prop="fullname">
                    <a-input v-model="formData.fullname" placeholder="最多输入50个字符" :maxLength="50" allowClear/>
                </a-form-model-item>

                <a-form-model-item label="机构编码" label-position="top" prop="code">
                    <!--<Input v-model="formData.code" :disabled="formData.id.trim().length !== 0" placeholder="最多输入20个字符" :maxLength=20 allowClear/>-->
                    <a-row :gutter="10">
                        <a-col :md="18" v-if="isNew">
                            <a-input v-model="formData.code" placeholder="最多输入20个字符" :maxLength="20" allowClear/>
                        </a-col>
                        <a-col :md="18" v-else>
                            <shiro-hasDisabled name="sys:office:code">
                                <a-input v-model="formData.code" placeholder="最多输入20个字符" :maxLength="20" allowClear/>
                            </shiro-hasDisabled>
                        </a-col>
                        <a-col :md="6">
                            <Button type="primary" v-if="formData.code != formData.id && !isNew" @click="handleUpdate" long ghost>
                                更新
                            </Button>
                        </a-col>
                    </a-row>
                </a-form-model-item>
                <a-form-model-item label="上级机构" label-position="top" prop="parentIdsList">
<!--                    <Cascader :data="parent" v-model="formData.parentIdsList" change-on-select :disabled="!isNew"></Cascader>-->
                    <a-cascader :options="parent" v-model="formData.parentIdsList" changeOnSelect :disabled="!isNew" placeholder="请选择所属部门"></a-cascader>
                </a-form-model-item>
                <a-form-model-item label="机构类型" label-position="top" prop="type">
                    <a-select v-model="formData.type" placeholder="请选择机构类型">
                        <a-select-option v-for="item in typeOption" :value="item.value" :key="item.value">{{ item.label }}</a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="机构级别" label-position="top" prop="grade">
                    <a-select v-model="formData.grade" placeholder="请选择机构级别">
                        <a-select-option v-for="item in gradeOption" :value="item.value" :key="item.value">{{ item.label }}</a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="排序" label-position="top" prop="sort">
                    <a-input-number :max="999" :min="0" :step="1" :precision="0" v-model="formData.sort"></a-input-number>
                </a-form-model-item>
                <a-form-model-item label="归属区域" label-position="top" prop="areaIdList">
                    <a-cascader :options="area" v-model="formData.areaIdList" changeOnSelect placeholder="请选择归属区域"></a-cascader>
                </a-form-model-item>
                <a-form-model-item label="地址" label-position="top" prop="address">
                    <a-textarea v-model="formData.address" placeholder="最多输入100个字符" :maxLength="100" :auto-size="{ minRows: 1, maxRows: 3 }" />
                </a-form-model-item>
                <a-form-model-item label="备注" label-position="top" prop="remarks">
                    <a-textarea v-model="formData.remarks" placeholder="最多输入100个字符" :maxLength="100" :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-model-item>
            </a-form-model>
            <div class="page-drawer-footer">
                <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
                <a-button type="primary" :loading="submitLoading" @click="handleSubmit()">保存</a-button>
            </div>
        </a-drawer>
    </div>
</template>
<script>
import {RenderDictSelect, GetDictLabelByValue} from '@/api/dict'
import {validateSpecialFont} from '@/libs/validate'
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";

export default {
    name: 'l-office',
    data() {
        const validateCodeCheck = (rule, value, callback) => {
            if (this.isNew) {
                //callback()
                this.$http({
                    url: '/zuul/upm/office/checkCode',
                    method: 'get',
                    params: {
                        oldCode: this.formData.oldCode,
                        code: this.formData.code
                    }
                }).then(result => {
                    console.log(result.data)
                    if (!result.data.success) {
                        callback(new Error('机构编码已存在!'))
                    } else {
                        callback()
                    }
                })
            } else {
                if (this.formData.code === this.formData.id) {
                    this.$http({
                        url: '/zuul/upm/office/checkCode',
                        method: 'get',
                        params: {
                            oldCode: this.formData.oldCode,
                            code: this.formData.code
                        }
                    }).then(result => {
                        console.log(result.data)
                        if (!result.data.success) {
                            callback(new Error('机构编码已存在!'))
                        } else {
                            callback()
                        }
                    })
                } else {
                    callback(new Error('机构编码已改变，请点击【更新】按钮更新机构编码！'))
                }
            }
        }
        const parentCheck = (rule, value, callback) => {
            if (value.length === 0) {
                this.$http({
                    url: '/zuul/upm/user/checkAdmin',
                    method: 'get'
                }).then(result => {
                    console.log(result.data)
                    if (!result.data) {
                        callback(new Error('非超级管理员用户时上级机构不能为空'))
                    } else {
                        callback()
                    }
                })
            } else {
                //验证是否上级菜单等于本菜单
                //获取parentId
                var parentId = value[value.length - 1]
                //修改时本菜单id等于上级菜单id时报错
                if (this.formData.id.length > 0 && this.formData.id === parentId) {
                    callback(new Error('上级机构不能修改为当前机构'))
                } else if (value.length > 3) {
                    callback(new Error('上级机构层级不能大于3'))
                } else {
                    callback()
                }
            }
        }
        return {
            locale: zhCN,
            titleDrawer: '新增',
            loading: true,
            submitLoading: false,
            isNew: false,
            formDrawer: false,
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '80px',
                position: 'static'
            },
            columns: [{
                title: '机构名称',
                dataIndex: 'name',
                key: 'name',
                // tree: true
            }, {
                title: '机构编码',
                key: 'code',
                dataIndex: 'code',
                width: 200,
            }, {
                title: '机构类型',
                width: 200,
                key: 'type',
                dataIndex: 'type',
                scopedSlots: {customRender: 'typeSlots'},
                /*}, {
                    title: '排序',
                    key: 'sort',
                    width: 100,*/
            }, {
                title: '操作',
                width: 200,
                scopedSlots: {customRender: 'actionSlots'},
            }],
            data: [],
            formDrawerCreate: this.$form.createForm(this),
            formData: {
                id: '',
                name: '',
                fullname: '',
                code: '',
                oldCode: '',
                parentIds: '',
                parentIdsList: [],
                type: '',
                areaId: '',
                areaIdList: [],
                grade: '',
                sort: 0,
                address: '',
                remarks: '',
            },
            ruleValidate: {
                name: [{required: true, message: '必填', trigger: 'blur'}, {validator: validateSpecialFont, trigger: 'blur'}],
                fullname: [{required: true, message: '必填', trigger: 'blur'}, {validator: validateSpecialFont, trigger: 'blur'}],
                code: [{required: true, message: '必填', trigger: 'blur'}, {validator: validateCodeCheck, trigger: 'blur'}],
                parentIdsList: [{validator: parentCheck, trigger: 'change', type: 'array'}],
                type: [{required: true, message: '必填', trigger: 'change'}],
                grade: [{required: true, message: '必填', trigger: 'change'}]
            },
            typeOption: [],
            gradeOption: [],
            parent: [],
            area: []
        }
    },
    watch: {
        // formDrawer(val) {
        //   if (val) {
        //     this.$refs['formData'].resetFields()
        //   }
        // }
    },
    methods: {
        //表格父表展开事件
        /*expand(expanded, record) {
            console.log(expanded)
            console.log(record)
            if (expanded) {
                //   this.innerData = this.innerDataCache[record.plateNo];
                //   this.expandedRowKeys = [record.id]
                // } else {
                //   this.expandedRowKeys = []
                //   this.map.removeLayer('crossingPoint');

                this.$http({
                    url: '/zuul/upm/office',
                    method: 'get',
                    params: {
                        parentId: record.id
                    }
                }).then(result => {
                    if (result.data.success) {
                        record.children = result.data.data;
                    }
                })
            }
        },*/
        init() {
            //初始化字典typeOption
            RenderDictSelect('0004000200000000', (data) => {
                this.typeOption = data
            })
            //初始化字典gradeOption
            RenderDictSelect('0004000300000000', (data) => {
                this.gradeOption = data
            })
        },
        handleLoadData(item, callback) {
            this.$http({
                url: '/zuul/upm/office',
                method: 'get',
                params: {
                    parentId: item.id
                }
            }).then(result => {
                if (result.data.success) {
                    callback(result.data.data);
                }
            })
        },
        formInit() {
            this.formData = {
                id: '',
                name: '',
                fullname: '',
                code: '',
                oldCode: '',
                parentIds: '',
                parentIdsList: [],
                type: '',
                areaId: '',
                areaIdList: [],
                grade: '',
                sort: 0,
                address: '',
                remarks: '',
            }
        },
        renderTable() {
            this.loading = true;
            this.$http({
                url: '/zuul/upm/office',
                method: 'get',
                //params: this.searchConditions
            }).then(result => {
                console.log(result.data)
                if (result.data.success) {
                    console.log(result.data.data)
                    this.data = result.data.data
                }
                this.loading = false
            })
        },
        renderParent(callback) {
            this.$http({
                url: '/zuul/upm/office/parent/cascader',
                method: 'get',
            }).then(result => {
                if (result.data.success) {
                    //console.log(result.data.data);
                    this.parent = result.data.data
                    callback && callback()
                }
            })
        },
        //机构类型格式化
        getTypeOption(value) {
            return GetDictLabelByValue(value, this.typeOption)
        },
        renderArea(callback) {
            this.$http({
                url: '/zuul/upm/area/cascader',
                method: 'get',
            }).then(result => {
                if (result.data.success) {
                    console.log(result.data.data)
                    this.area = result.data.data
                    callback && callback()
                }
            })
        },
        handleSubmit() {
            this.submitLoading = true
            this.$refs['formData'].validate(valid => {
                if (valid) {
                    this.loading = true
                    //修改时不更新code,code有单独的按钮进行更新
                    /*if (!this.isNew) {
                        this.formData.code = this.formData.id
                    }*/
                    this.$http({
                        url: '/zuul/upm/office',
                        method: 'post',
                        data: this.formData
                    }).then(result => {
                        if (result.data.success) {
                            //console.log(result.data.message);
                            this.$notification.success({
                                message: '保存成功',
                                description: result.data.message,
                                duration: 5,
                            })
                            this.formDrawer = false
                            this.renderParent()
                            this.renderTable()
                        }
                        this.submitLoading = false
                        this.loading = false
                    })
                } else {
                    this.submitLoading = false
                }
            })
        },
        handleUpdate() {
            this.$http({
                url: '/zuul/upm/office/' + this.formData.id,
                method: 'put',
                params: {
                    code: this.formData.code,
                }
            }).then(result => {
                console.log(result.data)
                if (result.data.success) {
                    this.$Notice.success({
                        title: '操作成功',
                        duration: 2
                    })
                    this.renderTable()
                    this.formDrawer = false
                } else {
                    this.$Notice.error({
                        title: '操作失败',
                        desc: result.data.message,
                        duration: 3
                    })
                }
            })
        },
        add() {
            this.formInit()
            this.isNew = true
            this.titleDrawer = '新增'
            this.formDrawer = true
        },
        edit(id) {
            console.log(id)
            /*this.formInit();
            this.titleDrawer = "修改";
            this.formData = scope.row;
            //this.formData.oldLoginName = result.data.data.loginName
            this.formDrawer = true;*/
            this.formInit()
            this.titleDrawer = '修改'
            this.isNew = false
            this.loading = true
            this.$http({
                url: '/zuul/upm/office/' + id,
                method: 'get'
            }).then(result => {
                if (result.data.success) {
                    console.log(result.data.data)
                    this.formData = result.data.data
                    this.formData.oldCode = result.data.data.code
                }
                this.loading = false
                this.titleDrawer = '修改'
                this.formDrawer = true
            })
        },
        addChild(row) {
            this.formInit()
            this.isNew = true
            var parentIdsList = []
            row.parentIdsList.forEach((item, index) => {
                parentIdsList.push(item)
            })
            parentIdsList.push(row.id)
            this.formData.parentIdsList = parentIdsList
            this.titleDrawer = '新增'
            this.formDrawer = true
        },
        /*addChild(scope) {
            this.formInit();
            this.renderParent(() => {
                var parentIdsList = [];
                console.log("1111111111111111111111111");
                console.log(scope.row.parentIdsList);
                scope.row.parentIdsList.forEach((item, index) => {
                    parentIdsList.push(item);
                });
                parentIdsList.push(scope.row.id);
                console.log(parentIdsList);
                this.formData.parentIdsList = parentIdsList;
                console.log(this.formData.parentIdsList);
                this.titleDrawer = "新增";
                this.formDrawer = true;
            });
        },*/
        del(row) {
            console.log(row.id)
            this.$confirm({
                title: '信息提示',
                okType: 'danger',
                content: '确定删除?删除此机构会同时删除此机构下所有用户!',
                onOk: () => {
                    this.$http({
                        url: '/zuul/upm/office/' + row.id,
                        method: 'delete',
                        //params: this.searchConditions
                    }).then(result => {
                        if (result.data.success) {
                            this.$Notice.success({
                                title: result.data.message,
                                duration: 2
                            })
                        } else {
                            this.$Notice.error({
                                title: result.data.message,
                                duration: 2
                            })
                        }
                        this.renderTable()
                        //删除完重新渲染parent
                        this.renderParent()
                        //this.loading = false;
                    })
                }
            })

        },
        //关闭抽屉
        onClose() {
            this.formDrawer = false;
        },
    },
    mounted() {
        this.init()
        this.renderTable()
        this.renderParent()
        this.renderArea()
    }
}
</script>

<style scoped>

</style>
