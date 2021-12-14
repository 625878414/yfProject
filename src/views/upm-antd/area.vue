<style scoped>
</style>
<template>
    <div id="area">
        <div class="page-content-body">
            <div class="toolbar">
                <a-button type="primary" @click="add">
                    <a-icon type="plus"/>
                    新增
                </a-button>
                <div class="right">
                    <a-space>
                    <!--<Cascader :data="company" @on-change="changeOffice" placeholder="请选择所属部门" change-on-select style="width: 300px;display: inline-block"></Cascader>-->
                        <a-input  icon="search" placeholder="请输入名称查询" style="width: 150px;" allowClear></a-input>
                        <a-input  icon="search" placeholder="请输入代码查询" style="width: 160px;" allowClear></a-input>
                        <a-switch default-checked @change="onChange" />
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
            </a-table>
        </div>
        <a-drawer
            :title="titleDrawer"
            :width="400"
            :visible="formDrawer"
            :destroyOnClose="true"
            :body-style="{ paddingBottom: '80px' }"
            @close="onClose"
        >
            <a-form-model ref="formData" :model="formData" :rules="ruleValidate" layout="vertical" hide-required-mark>
                <a-row :gutter="16">
                    <a-col :span="24">
                        <a-form-model-item label="区域名称" prop="name">
                            <a-input v-model="formData.name" :maxLength="10" allowClear placeholder="最多输入10个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="区域别名">
                            <a-input v-model="formData.alias" :maxLength="10" allowClear placeholder="最多输入10个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="区域编码" prop="code">
                            <a-input v-model="formData.code" :maxLength="10" allowClear placeholder="最多输入6个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="上级区域">
                            <a-cascader
                                v-model:value="formData.parentIdsList"
                                :options="parent"
                                changeOnSelect
                                allowClear
                                placeholder="请选择上级区域"
                            />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="区域类型" prop="type">
                            <a-select v-model="formData.type" allowClear placeholder="请选择">
                                <a-select-option v-for="d in typeOption" :key="d.value">
                                    {{ d.label }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="24">
                        <a-form-model-item label="备注">
                            <a-textarea v-model="formData.remarks" :auto-size="{ minRows: 3, maxRows: 5 }" :maxLength="100" placeholder="最多输入100个字符"/>
                        </a-form-model-item>
                    </a-col>
                </a-row>
            </a-form-model>
            <div class="page-drawer-footer">
                <a-button style="margin-right: 8px"  @click="onClose">
                    关闭
                </a-button>
                <a-button type="primary" @click="handleSubmit">
                    保存
                </a-button>
            </div>
        </a-drawer>
    </div>
</template>

<script>
import {GetDictLabelByValue} from '@/api/dict'
import {validateAreaCode, validateSpecialFont} from "@/libs/validate";

export default {
    name: "antdv-area",
    data() {
        return {
            titleDrawer: '新增',
            formDrawer: false,
            loading: false,
            data: [],
            visible: false,
            columns: [{
                title: '区域名称',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '区域代码',
                dataIndex: 'code',
                key: 'code',
                width: 200,
            }, {
                title: '区域类型',
                dataIndex: 'type',
                key: 'type',
                width: 200,
                customRender: (text, row, index) => {
                    return GetDictLabelByValue(row.type, this.typeOption);
                }

            }, {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                width: 200,
                scopedSlots: {customRender: 'operation'}
            }],
            formData: {
                id: "",
                name: "",
                alias: '',
                code: "",
                parentId: "",
                parentIds: '',
                parentIdsList: [],
                type: '',
                gis: '',
                remarks: ''
            },
            parent: [],
            typeOption: [{
                value: '1',
                label: '国家'
            }, {
                value: '2',
                label: '省、直辖市'
            }, {
                value: '3',
                label: '地市'
            }, {
                value: '4',
                label: '区县'
            }, {
                value: '5',
                label: '街道'
            }],
            ruleValidate: {
                name: [
                    {required: true, message: "必填", trigger: "blur"},
                    {max: 20, message: "不能超过20个字符", trigger: "blur"},
                    {validator: validateSpecialFont, trigger: "blur"}
                ],
                code: [
                    {
                        required: true, message: "必填", trigger: "blur", transform(value) {
                            return value.trim()
                        }
                    },
                    {validator: validateAreaCode, trigger: "blur"}
                ],
                type: [
                    {required: true, message: "必填", trigger: "change"}
                ],
            },
            rowSelection: [],
            styles: {
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
                zIndex: 1,
            }
        }
    },
    methods: {
        formInit() {
            this.formData = {
                id: "",
                name: "",
                alias: "",
                code: "",
                parentId: "",
                parentIds: '',
                parentIdsList: [],
                type: '',
                gis: '',
                remarks: ''
            };
            //清空select
            //this.$refs.type.clearSingleSelect();
        },
        onChange(checked) {
            console.log(`a-switch to ${checked}`);
        },
        renderTable() {
            this.loading = true;
            this.$http({
                url: "/zuul/upm/area/tree",
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
                url: "/zuul/upm/area/cascader",
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
        edit(id) {
            this.formInit();
            this.loading = true;
            this.$http({
                url: "/zuul/upm/area/" + id,
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
                        url: "/zuul/upm/area/" + id,
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
            this.formInit();
            let parentIdsList = [];
            row.parentIdsList.forEach((item, index) => {
                parentIdsList.push(item);
            });
            parentIdsList.push(row.id);
            this.formData.parentIdsList = parentIdsList;
            this.titleDrawer = "新增";
            this.formDrawer = true;
        },
        handleSubmit() {
            this.$refs.formData.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$http({
                        url: "/zuul/upm/area",
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
    },
    mounted() {
        this.renderTable()
        this.renderParent()
    }
}
</script>
