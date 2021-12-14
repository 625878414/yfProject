<style scoped>

</style>
<template>
    <div id="userLog">
        <div class="page-content-body">
            <a-tabs>
                <a-tab-pane key="1" tab="登录日志">
                    <div class="toolbar">
                        <a-space>
                            <a-input v-model="login.searchConditions.name" allowClear placeholder="请输入姓名查询" @change="handleLoginSearch">
                                <a-icon slot="suffix" type="search" />
                            </a-input>
                            <a-input v-model="login.searchConditions.loginName" allowClear placeholder="请输入账号查询" @change="handleLoginSearch">
                                <a-icon slot="suffix" type="search" />
                            </a-input>
                        </a-space>
                        <div class="clear"></div>
                    </div>
                    <a-skeleton :loading="login.loading" :paragraph="{ rows: 20 }" active style="background-color: white">
                        <a-table
                            :columns="login.columns"
                            size="middle"
                            :rowKey="record => record.id"
                            :dataSource="login.dataTables"
                            :pagination="login.pagination"
                            :loading="login.loading"
                            @change="handleLoginTableChange"
                        >
                        </a-table>
                    </a-skeleton>
                </a-tab-pane>
                <a-tab-pane key="2" tab="操作日志">
                    <div class="toolbar">
                        <a-space>
                            <a-input v-model="action.searchConditions.name" allowClear placeholder="请输入姓名查询" @change="handleActionSearch">
                                <a-icon slot="suffix" type="search" />
                            </a-input>
                            <a-input v-model="action.searchConditions.loginName" allowClear placeholder="请输入账号查询" @change="handleActionSearch">
                                <a-icon slot="suffix" type="search" />
                            </a-input>
                        </a-space>
                        <div class="clear"></div>
                    </div>
                    <a-skeleton :loading="action.loading" :paragraph="{ rows: 20 }" active style="background-color: white">
                        <a-table
                            :columns="action.columns"
                            size="middle"
                            :rowKey="record => record.id"
                            :dataSource="action.dataTables"
                            :pagination="action.pagination"
                            :loading="action.loading"
                            @change="handleActionTableChange"
                        >
                        </a-table>
                    </a-skeleton>
                </a-tab-pane>
            </a-tabs>

        </div>
    </div>
</template>

<script>
    export default {
        name: "userLog",
        data() {
            return {
                login: {
                    loading: false,
                    searchConditions: {
                        name: '',
                        loginName: ''
                    },
                    dataTables: [],
                    columns: [
                        {
                            dataIndex: 'name',
                            key: 'name',
                            title: '姓名'
                        },
                        {
                            dataIndex: 'loginName',
                            key: 'loginName',
                            title: '账号'
                        },
                        {
                            dataIndex: 'remark',
                            key: 'remark',
                            title: '说明',
                        },
                        {
                            dataIndex: 'loginIp',
                            key: 'loginIp',
                            title: 'IP',
                            width: 200
                        },
                        {
                            dataIndex: 'loginDate',
                            key: 'loginDate',
                            title: '登录时间',
                            width: 200
                        },
                    ],
                    pagination: {
                        total: 0,
                        pageSize: 15,
                        showTotal: total => `共 ${total} 条数据`,
                        showSizeChanger: true,
                        pageSizeOptions: ['15', '25', '50', '100'],
                        //onShowSizeChange: (current, pageSize)=>this.pageSize = pageSize
                    },
                },
                action: {
                    loading: false,
                    searchConditions: {
                        name: '',
                        loginName: ''
                    },
                    dataTables: [],
                    columns: [
                        {
                            dataIndex: 'createBy',
                            key: 'createBy',
                            title: '用户名'
                        },
                        {
                            dataIndex: 'officeId',
                            key: 'officeId',
                            title: '所属机构'
                        },
                        {
                            dataIndex: 'requestUri',
                            key: 'requestUri',
                            title: '操作的URI'
                        },
                        {
                            dataIndex: 'type',
                            key: 'type',
                            title: '日志类型',
                        },
                        {
                            dataIndex: 'method',
                            key: 'method',
                            title: '操作方式',
                        },
                        {
                            dataIndex: 'remoteAddr',
                            key: 'remoteAddr',
                            title: '操作用户的地址',
                        },
                        {
                            dataIndex: 'createDate',
                            key: 'createDate',
                            title: '创建时间',
                            width: 200
                        }
                    ],
                    pagination: {
                        total: 0,
                        pageSize: 15,
                        showTotal: total => `共 ${total} 条数据`,
                        showSizeChanger: true,
                        pageSizeOptions: ['15', '25', '50', '100'],
                        //onShowSizeChange: (current, pageSize)=>this.pageSize = pageSize
                    },
                },
                typeList: [{
                    value: '1',
                    label: '接入日志'
                }, {
                    value: '2',
                    label: '错误日志'
                }],
            }
        },
        watch: {
        },
        methods: {
            init() {
            },
            handleLoginTableChange(pagination, filters, sorter) {
                console.log('handleTableChange:', pagination);
                const pager = {...this.login.pagination};
                pager.current = pagination.current;
                pager.pageSize = pagination.pageSize;
                this.login.pagination = pager;
                this.renderLoginTable({
                    size: pagination.pageSize,
                    page: pagination.current - 1,
                    ...this.login.searchConditions
                });
            },
            renderLoginTable (params = {}) {
                console.log('params:', params)
                this.login.loading = true
                this.$http({
                    url: '/zuul/log/auth',
                    method: 'get',
                    params: {
                        size: this.login.pagination.pageSize,
                        ...params
                    }
                }).then(result => {
                    if (result.data.success) {
                        console.log(result.data.data.results)
                        this.login.dataTables = result.data.data.results
                        const pagination = { ...this.login.pagination };
                        pagination.total = result.data.data.total;
                        this.login.pagination = pagination
                    }
                    this.login.loading = false
                })
            },
            handleLoginSearch () {
                this.renderLoginTable(
                    {
                        ...this.login.searchConditions
                    }
                )
            },
            handleActionTableChange(pagination, filters, sorter) {
                console.log('handleActionTableChange:', pagination);
                const pager = {...this.action.pagination};
                pager.current = pagination.current;
                pager.pageSize = pagination.pageSize;
                this.action.pagination = pager;
                this.renderLoginTable({
                    size: pagination.pageSize,
                    page: pagination.current - 1,
                    ...this.action.searchConditions
                });
            },
            renderActionTable (params = {}) {
                console.log('params:', params)
                this.action.loading = true
                this.$http({
                    url: '/zuul/log/',
                    method: 'get',
                    params: {
                        size: this.action.pagination.pageSize,
                        ...params
                    }
                }).then(result => {
                    if (result.data.success) {
                        console.log(result.data.data.results)
                        this.action.dataTables = result.data.data.results
                        const pagination = { ...this.action.pagination };
                        pagination.total = result.data.data.total;
                        this.action.pagination = pagination
                    }
                    this.action.loading = false
                })
            },
            handleActionSearch () {
                this.renderLoginTable(
                    {
                        ...this.action.searchConditions
                    }
                )
            },
        },
        mounted() {
            this.renderLoginTable()
            this.renderActionTable()
        }
    }
</script>
