<template>
    <div class="dict">
        <div class="page-content-body">
            <div class="toolbar">
                <a-space>
                    <a-button type="primary"  icon="search" @click="add">
                        新增
                    </a-button>
                    <a-button type="danger" icon="reload" @click="refresh">
                        刷新缓存
                    </a-button>
                    <a-button type="primary" icon="hdd" @click="showRecycleModel">
                        回收站
                    </a-button>
                </a-space>
            </div>
            <div class="page-table-frame">
                <a-skeleton :loading="loading" :paragraph="{ rows: 20 }" active style="background-color: white">
                    <a-table
                        :columns="columns"
                        :row-key="record => record.id"
                        :data-source="dataTables"
                        size="middle"
                        :pagination="pagination"
                        :loading="loading"
                        @change="handleTableChange">
                        <template slot-scope="text, record" slot="operation">
                            <a-button-group>
                                <a-button type="primary" size="small" @click="edit(record.id)">修改</a-button>
                                <a-button type="warning" size="small" @click="showDrawer(record)">字典配置</a-button>
                                <a-button type="danger" size="small" @click="del(record.id)">删除</a-button>
                            </a-button-group>
                        </template>
                    </a-table>
                </a-skeleton>
            </div>
        </div>
        <a-modal
            v-model="formModel"
            title="新增"
            cancelText="关闭"
            @ok="handleSubmit">
            <a-form-model ref="ruleForm" layout="horizontal" :model="formData" :rules="ruleValidate">
                <a-form-model-item label="ID">
                    <a-input v-model="formData.id" disabled/>
                </a-form-model-item>
                <a-form-model-item label="字典名称" prop="name">
                    <a-input v-model="formData.name" />
                </a-form-model-item>
                <a-form-model-item label="字典编码" prop="code">
                    <a-input v-model="formData.code" />
                </a-form-model-item>
                <a-form-model-item label="排序">
                    <a-input-number v-model="formData.order" :min="0" :max="1000" />
                </a-form-model-item>
                <a-form-model-item label="备注">
                    <a-input v-model="formData.remarks" type="textarea" />
                </a-form-model-item>
            </a-form-model>
        </a-modal>
        <a-modal
            v-model="recycleModel"
            title="回收站"
            :width="1000"
            on-ok="recycleHandleOk" >
            <template slot="footer">
                <a-button key="back" @click="recycleHandleCancel">
                    关闭
                </a-button>
            </template>
            <a-table
                :columns="recycleColumns"
                :data-source="recycleTables"
                :row-key="record => record.id"
                :pagination="recyclePagination"
                childrenColumnName="test"
                size="middle">
                <template slot-scope="text, record" slot="operation">
                    <a-button-group>
                        <a-button type="primary" size="small" @click="recycleRevert(record.id)">还原</a-button>
                        <a-popconfirm title="确定删除？" @confirm="() => recycleDel(record.id)">
                            <a-button type="danger" size="small">删除</a-button>
                        </a-popconfirm>
                    </a-button-group>
                </template>
            </a-table>
        </a-modal>
        <a-drawer
            title="字典列表"
            :width="720"
            :visible="listDrawer"
            :body-style="{ paddingBottom: '80px' }"
            @close="listDrawerOnClose"
        >
            <div class="toolbar">
                <a-space>
                    <a-button type="primary"  icon="search" @click="addItem">
                        新增
                    </a-button>
                    <div class="right">
                        <!--<Cascader :data="company" @on-change="changeOffice" placeholder="请选择所属部门" change-on-select style="width: 300px;display: inline-block"></Cascader>-->
                        <a-input v-model="searchConditions.name" icon="search" @change="handleSearch" placeholder="名称" style="width: 150px;margin-left:5px" allowClear></a-input>
                    </div>
                </a-space>
            </div>
            <a-table :columns="dictColumns"
                     :data-source="dictTables"
                     :row-key="record => record.id"
                     size="middle"
                     :pagination="false">
                <template slot="label" slot-scope="text, record, index" >
                    <a-input v-if="record.editable" style="margin: -5px 0;" :value="text" @change="e => handleChange(e.target.value, record.id, 'label')" />
                    <template v-else>
                        {{ text }}
                    </template>
                </template>
                <template slot="value" slot-scope="text, record, index" >
                    <a-input v-if="record.editable" style="margin: -5px 0;" :value="text" :placeholder="editingKey" @change="e => handleChange(e.target.value, record.id, 'value')" />
                    <template v-else>
                        {{ text }}
                    </template>
                </template>
                <template slot="order" slot-scope="text, record, index" >
                    <a-input v-if="record.editable" style="margin: -5px 0;" :value="text" @change="e => handleChange(e.target.value, record.id, 'order')" />
                    <template v-else>
                        {{ text }}
                    </template>
                </template>
                <template slot="operation" slot-scope="text, record, index">
                    <div>
                        <a-space v-if="record.editable">
                            <a-button type="primary" size="small" @click="() => save(record.id)">保存</a-button>
                            <a-popconfirm title="确定取消？" @confirm="() => cancel(record.id)">
                                <a-button type="danger" size="small">取消</a-button>
                            </a-popconfirm>
                        </a-space>
                        <a-space v-else>
                            <a-button type="primary" size="small" :disabled="editingKey !== ''" @click="() => editItem(record.id)">修改</a-button>
                            <a-popconfirm title="确定删除？" @confirm="() => delItem(record.id)">
                                <a-button type="danger" size="small" :disabled="editingKey !== ''">删除</a-button>
                            </a-popconfirm>
                        </a-space>
                    </div>
                </template>
            </a-table>
        </a-drawer>
    </div>
</template>

<script>
import {GetPageByDelete} from '@/libs/util'
export default {
    name: "dict",
    data() {
        const validateCodeCheck = (rule, value, callback) => {
            this.$http({
                url: '/zuul/upm/dict/new/checkCode',
                method: 'get',
                params: {
                    oldLoginName: this.formData.oldCode,
                    loginName: this.formData.code
                }
            }).then(result => {
                if (result.data) {
                    callback(new Error('字典编码已存在!'))
                } else {
                    callback()
                }
            })
        }
        return {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
            formModel: false,
            recycleModel: false,
            form: this.$form.createForm(this),
            listDrawer: false,
            dataTables: [],
            dictTables: [],
            recycleTables: [],
            cacheData: [],
            formData: {
                id: "",
                name: "",
                code: "",
                oldCode: "",
                parentId: "",
                order: 0,
                remarks: ""
            },
            ruleValidate: {
                name: [{
                    required: true, message: '必填', trigger: 'blur'
                }],
                code: [{
                    required: true, message: '必填', trigger: 'blur'},
                    {validator: validateCodeCheck, trigger: 'blur'}
                ],
            },
            dictColumns: [
                {
                    title: '名称',
                    dataIndex: 'label',
                    key: 'label',
                    scopedSlots: { customRender: 'label' },
                }, {
                    title: '数据值',
                    dataIndex: 'value',
                    key: 'value',
                    scopedSlots: { customRender: 'value' },
                }, {
                    title: '排序',
                    width: 80,
                    dataIndex: 'order',
                    key: 'order',
                    scopedSlots: { customRender: 'order' },
                }, {
                    title: '操作',
                    width: 100,
                    dataIndex: 'operation',
                    key: 'operation',
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            recycleColumns: [
                {
                    title: '字典名称',
                    dataIndex: 'name',
                    key: 'name',
                }, {
                    title: '字典编码',
                    dataIndex: 'code',
                    key: 'code',
                    width: 200,
                }, {
                    title: '描述',
                    dataIndex: 'remarks',
                    key: 'remarks',
                    width: 300,
                }, {
                    title: '操作',
                    width: 150,
                    dataIndex: 'operation',
                    key: 'operation',
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            editingKey: '',
            selectedItem: {},
            searchConditions: {
                name: '',
                code: ''
            },
            pagination: {
                total: 0,
                pageSize: 15,
                size: "middle",
                showTotal: total => `共 ${total} 条数据`,
                showSizeChanger: true,
                pageSizeOptions: ['15', '25', '50', '100'],
                //onShowSizeChange: (current, pageSize)=>this.pageSize = pageSize
            },
            recyclePagination: {
                total: 0,
                pageSize: 15,
                size: "middle",
                showTotal: total => `共 ${total} 条数据`,
                showSizeChanger: true,
                pageSizeOptions: ['15', '25', '50', '100'],
                //onShowSizeChange: (current, pageSize)=>this.pageSize = pageSize
            },
            loading: false,
            submitLoading: false,
            columns:[
                {
                    title: 'ID',
                    dataIndex: 'id',
                }, {
                    title: '字典名称',
                    dataIndex: 'name',
                }, {
                    title: '字典编码',
                    dataIndex: 'code',
                }, {
                    title: '描述',
                    dataIndex: 'remarks',
                }, {
                    title: '排序',
                    dataIndex: 'order',
                }, {
                    title: '操作',
                    dataIndex: 'action',
                    width: 250,
                    scopedSlots: {customRender: 'operation'}
                },
            ]
        };
    },
    mounted() {
        this.renderTable();
    },
    watch: {
        // visible(val) {
        //   if (val) {
        //     // if (this.$refs['ruleForm'] !== undefined) {
        //     this.$refs['ruleForm'].resetFields()
        //     // }
        //   }
        // },
        listDrawer(val) {
            console.log("listDrawer", val)
            if (!val) {
                //this.$refs['ipConfig'].resetFields()
                this.renderTable({
                    size: this.pagination.pageSize,
                    page: this.pagination.current - 1,
                    ...this.searchConditions
                    /*sortField: sorter.field,
                    sortOrder: sorter.order,
                    ...filters,*/
                });
            }
        }
    },
    methods: {
        listDrawerOnClose() {
            this.listDrawer = false;
        },
        recycleHandleCancel() {
            this.recycleModel = false
        },
        handleSearch() {

        },
        showDrawer(item) {
            this.selectedItem = item
            this.listDrawer = true
            this.renderDrawerTable(item)
        },
        refresh() {
            this.$http({
                url: '/zuul/upm/dict/new/refresh',
                method: 'get',
            }).then(result => {
                if (result.data.success) {
                    this.$notification.success({
                        message: '刷新缓存成功',
                        duration: 5,
                    })
                    this.renderTable()
                }
            })
        },
        renderTable (params = {}) {
            console.log('params:', params)
            this.loading = true
            this.$http({
                url: '/zuul/upm/dict/new',
                method: 'get',
                params: {
                    size: this.pagination.pageSize,
                    ...params
                }
            }).then(result => {
                if (result.data.success) {
                    this.dataTables = result.data.data.results
                    const pagination = { ...this.pagination };
                    pagination.total = result.data.data.total;
                    this.pagination = pagination
                }
                this.loading = false
            })
        },
        add() {
            this.$http({
                url: "/zuul/upm/dict/new/add/0000000000000000",
                method: "get",
            }).then(result => {
                console.log(result.data)
                if (result.data.success) {
                    this.formData = result.data.data;
                    this.formData.oldCode = ""
                    this.formModel = true;
                    // console.log(this.formData)
                }
            })
        },
        edit(id) {
            this.$http({
                url: "/zuul/upm/dict/new/" + id,
                method: "get"
            }).then(result => {
                if (result.data.success) {
                    this.formData = result.data.data;
                    this.formData.oldCode = result.data.data.code
                    this.formModel = true;
                    // console.log(this.formData)
                }
            })
        },
        del(id) {
            this.$confirm({
                title: '信息提示',
                okType: 'danger',
                okText: '确认',
                cancelText: '取消',
                content: '确定删除？',
                onOk: () => {
                    this.$http({
                        url: '/zuul/upm/dict/new/' + id,
                        method: 'delete'
                    }).then(result => {
                        if (result.data.success) {
                            this.$notification.success({
                                message: '删除成功',
                                description: result.data.message,
                                duration: 5,
                            })
                            //这里要判断当前页码是否大于总页码
                            this.pagination.current = GetPageByDelete(this.pagination.current, this.dataTables.length, 1)
                            this.renderTable({
                                size: this.pagination.pageSize,
                                page: this.pagination.current - 1,
                                ...this.searchConditions
                            });
                        }
                    })
                }
            })
        },
        handleSubmit(e) {
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    console.log(e);
                    this.formModel = false;
                    this.$http({
                        url: "/zuul/upm/dict/new",
                        method: "post",
                        data: this.formData
                    }).then(result => {
                        if (result.data.success) {
                            this.$notification.success({
                                message: '保存成功',
                                description: result.data.message,
                                duration: 5,
                            })
                            this.renderTable({
                                size: this.pagination.pageSize,
                                page: this.pagination.current - 1,
                                ...this.searchConditions
                                /*sortField: sorter.field,
                                sortOrder: sorter.order,
                                ...filters,*/
                            });
                        } else {
                            this.$notification.error({
                                message: '保存失败',
                                description: result.data.message,
                                duration: 5,
                            })
                        }
                        this.submitLoading = false;
                    });
                } else {
                    this.submitLoading = false;
                }
            })
        },
        handleTableChange(pagination, filters, sorter) {
            const pager = { ...this.pagination };
            pager.current = pagination.current;
            pager.pageSize = pagination.pageSize;
            this.pagination = pager;
            this.renderTable({
                size: pagination.pageSize,
                page: pagination.current - 1,
                ...this.searchConditions
                /*sortField: sorter.field,
                sortOrder: sorter.order,
                ...filters,*/
            });
        },
        handleChange(value, id, column) {
            const newData = [...this.dictTables];
            const target = newData.filter(item => id === item.id)[0];
            if (target) {
                target[column] = value;
                this.dictTables = newData;
            }
        },
        renderDrawerTable(item) {
            this.$http({
                url: '/zuul/upm/dict/new/item/' + item.id,
                method: 'get'
            }).then(result => {
                if (result.data.success) {
                    //console.log(result.data.data)
                    this.dictTables = result.data.data
                    this.cacheData = result.data.data
                }
            })
        },
        addItem() {
            let target = {}
            this.$http({
                url: '/zuul/upm/dict/new/item/add',
                method: 'get',
                params: {
                    parentId: this.selectedItem.id,
                    name: this.selectedItem.name,
                    code: this.selectedItem.code,
                }
            }).then(result => {
                if (result.data.success) {
                    target = result.data.data
                    target.editable = true;
                    //console.log("add target=", target)
                    this.editingKey = target.id;
                    this.dictTables = [target, ...this.dictTables];
                }
            })
        },
        editItem(id) {
            const newData = [...this.dictTables];
            const target = newData.filter(item => id === item.id)[0];
            console.log(target)
            this.editingKey = id;
            if (target) {
                target.editable = true;
                this.dictTables = newData;
            }
        },
        save(id) {
            const newData = [...this.dictTables];
            const newCacheData = [...this.cacheData];
            const target = newData.filter(item => id === item.id)[0];
            const targetCache = newCacheData.filter(item => id === item.id)[0];
            if (target) {
                this.$http({
                    url: '/zuul/upm/dict/new/item',
                    method: 'post',
                    data: target
                }).then(result => {
                    if (result.data.success) {
                        this.renderDrawerTable(this.selectedItem)
                        /*if (targetCache) {
                            //修改
                            delete target.editable;
                            this.dictTables = newData;
                            Object.assign(targetCache, target);
                            this.cacheData = newCacheData;
                        } else {
                            //新增
                            delete target.editable;
                            this.dictTables = newData;
                            this.cacheData = newData;
                            //保存完更新缓存
                        }*/
                    }
                })
            }
            this.editingKey = '';
        },
        cancel(id) {
            const newData = [...this.cacheData];
            const target = newData.filter(item => id === item.id)[0];
            this.editingKey = '';
            if (target) {
                Object.assign(target, this.cacheData.filter(item => id === item.id)[0]);
                delete target.editable;
                this.dictTables = newData;
            } else {
                this.dictTables = newData;
            }
        },
        delItem(id) {
            /*const newData = [...this.dictTables];
            const target = newData.filter(item => id === item.id)[0];
            console.log("del target=", target)*/
            this.$http({
                url: '/zuul/upm/dict/new/item/' + id,
                method: 'delete'
            }).then(result => {
                if (result.data.success) {
                    this.renderDrawerTable(this.selectedItem)
                }
            })
        },
        showRecycleModel() {
            this.recycleModel = true;
            this.renderRecycleTable();
        },
        renderRecycleTable(params = {}) {
            this.$http({
                url: '/zuul/upm/dict/new/recycle',
                method: 'get',
                params: {
                    size: this.recyclePagination.pageSize,
                    ...params
                }
            }).then(result => {
                if (result.data.success) {
                    this.recycleTables = result.data.data.results
                    const pagination = { ...this.recyclePagination };
                    pagination.total = result.data.data.total;
                    this.recyclePagination = pagination
                }
            })
        },
        recycleDel(id) {
            this.$http({
                url: '/zuul/upm/dict/new/recycle/' + id,
                method: 'delete'
            }).then(result => {
                if (result.data.success) {
                    this.renderRecycleTable()
                }
            })
        },
        recycleRevert(id) {
            this.$http({
                url: '/zuul/upm/dict/new/recycle/' + id,
                method: 'post'
            }).then(result => {
                if (result.data.success) {
                    this.renderRecycleTable()
                    this.renderTable({
                        size: this.pagination.pageSize,
                        page: this.pagination.current - 1,
                        ...this.searchConditions
                        /*sortField: sorter.field,
                        sortOrder: sorter.order,
                        ...filters,*/
                    });
                }
            })
        }
    },
}
</script>

<style scoped>
.ant-form-item {
    margin-bottom: 0 !important;
}
</style>
