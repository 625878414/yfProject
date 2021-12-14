<style lang="less">
.maintain {
    .ant-card-body {
        padding: 10px;
    }

    .ant-form-inline .ant-form-item {
        margin-right: 10px;
    }

    .right {
        float: right;
    }

    .toolbar {
        margin-top: 0 !important;
    }

    .toolbar button {
        margin-right: 5px;
    }

    .mr5 {
        margin-right: 5px;
    }
}
</style>
<template>
    <a-config-provider :locale="locale">
        <div class="maintain">
            <div class="page-content-body">
                <div class="toolbar">
                    <a-button type="primary" @click="add" icon="plus">
                        新增
                    </a-button>
                    <a-button type="danger" @click="multiDelete" icon="delete">删除</a-button>
                    <div class="right">
                        <a-input v-model="searchConditions.name" placeholder="请输入单位名称查询" :maxLength=30 style="width: 200px" allowClear @change="handleSearch"></a-input>
                        <!--            <a-button type="primary" @click='search' style="margin-right: 5px;" :loading="queryLoading">查询-->
                        <!--            </a-button>-->
                    </div>
                </div>
                <a-skeleton :loading="skeletonLoading" :paragraph="{ rows: 15 }" active style="background-color: white">
                    <a-table :columns="columns" :data-source="initTable"
                             :rowKey="record => record.id"
                             :loading="loading"
                             :row-selection="{ selectedRowKeys: selectedRowKeys,selectedRows: selectedRows, onChange: onSelectChange }"
                             @change="handleTableChange" :pagination="pagination">
                        <template slot="gradeSlots" slot-scope="text, record">
                            <span>{{ getGradeFormat(text) }}</span>
                        </template>
                        <template slot="typeSlots" slot-scope="text, record">
                            <span>{{ getTypeFormat(text) }}</span>
                        </template>
                        <template slot="action" slot-scope="text, record">
                            <a-button type="primary" size="small" @click="edit(record.id)" style="margin-right: 5px">
                                修改
                            </a-button>
                            <a-button type="danger" size="small" @click="del(record.id)">
                                删除
                            </a-button>
                        </template>
                    </a-table>
                </a-skeleton>
            </div>

            <a-drawer
                :title=drawerTitle
                :width="400"
                :visible="visible"
                :body-style="{ paddingBottom: '80px' }"
                @close="onClose">
                <!--        <a-form-model :form="formDrawer" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }"-->
                <a-form-model :form="formDrawer" :layout="vertical"
                              ref="ruleForm"
                              :model="formParams"
                              :rules="formRules"><!--hide-required-mark-->
                    <a-form-model-item label="单位名称">
                        <a-input v-model="formParams.name" placeholder="最多输入30个字符" :maxLength=30 style="width: 100%"/>
                    </a-form-model-item>
                    <a-form-model-item label="E-mail">
                        <a-input v-model="formParams.email" placeholder="最多输入30个字符" :maxLength=30 style="width: 100%"/>
                    </a-form-model-item>
                </a-form-model>
                <div
                    :style="{
                      position: 'absolute',
                      right: 0,
                      bottom: 0,
                      width: '100%',
                      borderTop: '1px solid #e9e9e9',
                      padding: '10px 16px',
                      background: '#fff',
                      textAlign: 'right',
                      zIndex: 1,
                    }"
                >
                    <a-button :style="{ marginRight: '8px' }" @click="onClose">
                        关闭
                    </a-button>
                    <a-button type="primary" @click="save" :loading="saveLoading">
                        保存
                    </a-button>
                </div>
            </a-drawer>
        </div>
    </a-config-provider>
</template>
<script>
import {GetDictLabelByValue, RenderDictSelect} from '@/api/dict';
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN"; // 汉化
export default {
    name: "user-table",
    data() {
        return {
            queryForm: this.$form.createForm(this, {name: 'coordinated'}),
            inline: 'inline',
            vertical: 'vertical',
            formDrawer: this.$form.createForm(this),
            visible: false,
            locale: zhCN,
            saveLoading: false,
            skeletonLoading: false,
            loading: false,
            drawerTitle: "新增",
            searchConditions: {
                size: 20,
                page: 0,
                name: "",
            },
            formParams: {
                name: "",
            },
            formRules: {},
            pagination: {
                total: 0,
                current: 1,//当前页数
                size: "middle",
                hideOnSinglePage: false,//只有一页时是否隐藏分页器
                pageSize: 20,//每页条数
                showTotal: total => `共 ${total} 条`,
            },
            selectedRows: [],
            selectedRowKeys: [],
            initTable: [],
            columns: [
                {
                    title: 'code',
                    dataIndex: 'code',
                    key: 'code',
                }, {
                    title: '单位名称',
                    dataIndex: 'name',
                    key: 'name',
                }, {
                    title: '所属区域',
                    dataIndex: 'area.name',
                    key: 'area.name',
                }, {
                    title: '机构等级',
                    dataIndex: 'grade',
                    key: 'grade',
                    scopedSlots: {customRender: 'gradeSlots'},
                }, {
                    title: '机构类型',
                    dataIndex: 'type',
                    key: 'type',
                    scopedSlots: {customRender: 'typeSlots'},
                }, {
                    title: 'E-mail',
                    dataIndex: 'email',
                    key: 'email'
                }, {
                    title: '操作',
                    dataIndex: 'action',
                    key: 'action',
                    scopedSlots: {customRender: 'action'},
                }
            ],
            gradeList: [],//机构等级
            typeList: [],//机构类型
        };
    },
    watch: {},
    computed: {},
    methods: {
        handleSearch() {
            this.pagination.current = 1;
            this.searchConditions.page = 0;
            this.selectedRowKeys = [];
            this.selectedRows = [];
            this.search();
        },
        //查询
        search() {
            this.loading = true;
            this.$http({
                url: '/zuul/upm/office/maintain',
                method: "get",
                params: this.searchConditions
            }).then(res => {
                if (res.data.success) {
                    var data = res.data.data;
                    if (data.length > 0) {
                        this.initTable = data;
                        this.pagination.total = data.length;
                    } else {
                        this.initTable = [];
                        this.$message.info('暂无数据');
                    }
                } else {
                    this.initTable = [];
                    this.$message.info('查询失败');
                }
                this.loading = false;
                this.skeletonLoading = false;
            });
        },
        //显示新增表单
        add() {
            this.drawerTitle = "新增";
            this.resetForm();
            this.visible = true;
        },
        //修改
        edit(id) {
            this.drawerTitle = "修改";
            this.resetForm();
            this.$http({
                url: '/zuul/upm/office/maintain/' + id,
                method: 'get',
            }).then(result => {
                if (result.data.success) {
                    this.formParams = result.data.data;
                    this.visible = true;
                }
            })

        },
        //关闭抽屉
        onClose() {
            this.visible = false;
            this.$refs["ruleForm"].resetFields();
        },
        //重置新增表单
        resetForm() {
            this.formParams = {}
        },
        //保存
        save() {
            this.$http({
                url: "/zuul/",
                method: "post",
                data: this.formParams
            }).then(res => {
                if (res.data.success) {
                    this.$message.success('保存成功');
                    this.visible = false;
                    this.search();
                } else {
                    this.$message.error('保存失败');
                }
                this.saveLoading = false;
            })
        },
        //单个删除
        del(id) {
            var _this = this;
            this.$confirm({
                title: '信息提示',
                content: '确定删除此条信息?',
                okText: '确定',
                okType: 'primary',
                cancelText: '取消',
                onOk() {
                    _this.$http({
                        url: '/zuul/' + id,
                        method: 'delete',
                    }).then((result) => {
                        if (result.data.success) {
                            _this.$message.success("删除成功");
                            // this.queryParams.page = GetPageByDelete(this.queryParams.page, this.tableData.length, 1)
                            _this.handleSearch();
                        } else {
                            _this.$message.error('删除失败');
                        }
                    })
                },
                onCancel() {
                },
            });
        },
        //批量删除
        multiDelete() {
            var _this = this;
            if (this.selectedRows.length === 0) {
                this.$message.warning("请至少选择一项");
            } else {
                // this.selectedRows[i]
                this.$confirm({
                    title: '信息提示',
                    content: '确定删除?',
                    okText: '确定',
                    okType: 'primary',
                    cancelText: '取消',
                    onOk() {
                        _this.$http({
                            url: "/zuul/",
                            method: "delete",
                            data: _this.selectedRows
                        }).then(res => {
                            if (res.data.success) {
                                _this.$message.success("删除成功");
                                // this.queryParams.page = GetPageByDelete(this.queryParams.page, this.tableData.length, 1)
                                _this.handleSearch()
                            } else {
                                _this.$message.error('删除失败');
                            }
                        })
                    },
                    onCancel() {
                    },
                });
            }
        },
        //表格复选框change方法
        onSelectChange(selectedRowKeys, selectedRows) {
            this.selectedRows = [];
            if (selectedRows.length > 0) {
                for (let i = 0; i < selectedRows.length; i++) {
                    this.selectedRows.push(selectedRows[i].id);
                }
            }
            this.selectedRowKeys = selectedRowKeys;
        },
        //分页change
        handleTableChange(pagination, filters, sorter) {
            const pager = {...this.pagination};
            pager.current = pagination.current;
            this.searchConditions.page = pagination.current - 1
            this.pagination = pager;
            this.search();
        },
        //机构等级格式化
        getGradeFormat(value) {
            return GetDictLabelByValue(value, this.gradeList)
        },
        //机构类型格式化
        getTypeFormat(value) {
            return GetDictLabelByValue(value, this.typeList)
        },
        init() {
            //机构等级
            RenderDictSelect("0004000300000000", (data) => {
                this.gradeList = data;
            });
            //机构类型
            RenderDictSelect("0004000200000000", (data) => {
                this.typeList = data;
            });
        },
    },
    mounted() {
        this.skeletonLoading = true;
        this.init();
        this.search();
    }
};
</script>
