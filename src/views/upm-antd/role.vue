<style>
    .role {
        background-color: #f0f2f5;
    }
    .role .right {
        float: right;
    }

    .role .toolbar button {
        margin-right: 5px;
    }
</style>
<template>
    <div class="role">
        <div class="page-content-body">
            <div class="toolbar">
                <a-button type="primary" icon="usergroup-add" @click="edit('')">
                    新增
                </a-button>
                <a-button type="danger" icon="usergroup-delete" @click="multiDelete">
                    删除
                </a-button>
                <div class="right">
                    <a-space>
                        <a-cascader :options="office" @change="changeOfficeSearch" change-on-select placeholder="请选择所属机构查询"></a-cascader>
                        <a-input v-model="searchConditions.name" allowClear placeholder="请输入角色名称查询" @change="handleSearch" style="width: 200px;">
                            <a-icon slot="suffix" type="search" />
                        </a-input>
                        <a-switch checked-children="水平" un-checked-children="垂直" default-checked slot="tabBarExtraContent" v-model="isVertical" @change="changeRoleMode"/>
                    </a-space>
                </div>
                <div class="clear"></div>
            </div>
            <a-skeleton :loading="loading" :paragraph="{ rows: 20 }" active style="background-color: white">
                <a-table
                        :v-show="isShow"
                        :columns="columns"
                        :rowKey="record => record.id"
                        :dataSource="dataTables"
                        :pagination="pagination"
                        :loading="loading"
                        :row-selection="rowSelection"
                        size="middle"
                        @change="handleTableChange"
                >
                    <template slot-scope="text, record" slot="dataScope">
                        <strong>{{ getDataScopeName(record.dataScope) }}</strong>
                    </template>
                    <template slot-scope="text, record" slot="homePage" >
                        <a-tag v-if="record.homeMenuId != null " color="green" @click="home(record)">
                            {{record.homeMenuName}}
                        </a-tag>
                        <a-tag v-else color="red" @click="home(record)">
                            未设置，请点击设置首页
                        </a-tag>
                    </template>
                    <template slot-scope=" text, record " slot="action">
<!--                        <shiro-hasPermission name="sys:role:edit">
                            <a-button type="primary" size="small" @click="edit(record.id)" style="margin-right: 5px;">修改</a-button>
                            <a-button type="info" size="small" @click="copy(record.id)" style="margin-right: 5px;">复制</a-button>
                        </shiro-hasPermission>
                        <shiro-hasPermission name="sys:user:edit">
                            <a-button type="success" size="small" @click="user(record)" style="margin-right: 5px;">用户</a-button>
                        </shiro-hasPermission>
                        <shiro-hasPermission name="sys:role:home">
                            <a-button type="warning" size="small" @click="setHome(record)" style="margin-right: 5px;">首页</a-button>
                        </shiro-hasPermission>
                        <shiro-hasPermission name="sys:role:del">
                            <a-button type="error" size="small" @click="del(record.id)">删除</a-button>
                        </shiro-hasPermission>-->
                        <a-space>
                            <a-button type="primary" size="small" @click="edit(record.id)" style="">修改</a-button>
                            <a-button type="info" size="small" @click="copy(record.id)" style="background-color: #2db7f5;color: white">复制</a-button>
<!--                            <a-button type="success" size="small" @click="user(record)" style="background-color: #87d068;color: white">用户</a-button>-->
                            <a-button type="danger" size="small" @click="del(record)">删除</a-button>
                        </a-space>
                    </template>
                </a-table>
            </a-skeleton>
        </div>

        <a-drawer
                :title="titleDrawer"
                :width="formDrawerWidth"
                :visible="formDrawer"
                :maskClosable="false"
                :destroyOnClose = "true"
                :body-style="{ paddingBottom: '80px'}"
                @close="onClose"
        >
            <a-spin :spinning="spinning">
                <a-form-model layout="vertical" :model="formData" :rules="ruleValidate" ref="formData">
                    <a-row :gutter="10">
                        <a-col :md="12">
                            <a-form-model-item label="角色名称" prop="name">
                                <a-input v-model="formData.name" allowClear :maxLength=30 placeholder="最多输入30个字符" />
                            </a-form-model-item>
                        </a-col>
                        <a-col :md="12">
                            <a-form-model-item label="数据范围" prop="dataScope">
                                <a-select v-model="formData.dataScope" @change="changeDataScope">
                                    <a-select-option v-for="item in scopeList" :value="item.value" :key="item.value">
                                        {{ item.label }}
                                    </a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-col>
                        <a-col :md="24">
                            <a-form-model-item label="所属机构" prop="officeIdList">
                                <a-cascader :options="office" v-model="formData.officeIdList" @change="changeOffice" change-on-select placeholder="请选择所属机构"></a-cascader>
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                    <a-tabs v-model="activeTabKey">
                        <a-tab-pane key="menuTab" tab="角色授权">
                            <a-tree
                                    ref="tree"
                                    v-model="formData.menuIdList"
                                    checkable
                                    :expandedKeys="expandedKeys"
                                    :tree-data="menuList"
                                    @check="onCheck"
                                    @expand="onExpand"
                                    @select="onSelect"
                            />
                        </a-tab-pane>
<!--                        <a-tab-pane key="layerTab" tab="图层授权">
                            图层授权
                        </a-tab-pane>-->
<!--                        <a-tab-pane key="officeTab" tab="机构授权">
                            机构授权
                        </a-tab-pane>-->
<!--                        <a-button slot="tabBarExtraContent">
                            Extra Action
                        </a-button>-->
                        <!--<shiro-hasPermission name="sys:role:display">-->

                        <!--</shiro-hasPermission>-->
                    </a-tabs>
                </a-form-model>
            </a-spin>
            <div class="page-drawer-footer">
                <a-button :style="{ marginRight: '8px' }" @click="onClose">
                    关闭
                </a-button>
                <a-button type="primary" @click="handleSubmit">
                    保存
                </a-button>
            </div>
        </a-drawer>
        <a-drawer
            :title="roleName"
            :width="400"
            :closable="false"
            :visible="visible"
            @close="onClose1"
        >
            <a-spin :spinning="spinning1">
                <a-tree
                    :show-line="false"
                    :show-icon="true"
                    :selected-keys="selectedKeys"
                    :expandedKeys="expandedKeys"
                    :tree-data="menuHomeList"
                    @select="onSelect1"
                >
                    <a-icon slot="home" type="home" theme="twoTone" />
                    <a-icon slot="menu" type="menu" />
                </a-tree>
            </a-spin>
        </a-drawer>
    </div>
</template>

<script>
    import {validateSpecialFont} from '@/libs/validate'
    import {GetPageByDelete} from '@/libs/util'

    export default {
        name: 'l-role',
        data() {
            return {
                visible: false,
                searchConditions: {
                    name: '',
                    officeIds: ''
                },
                formDrawer: false,
                formDrawerWidth: 500,
                roleId: '',
                roleName: '',
                titleDrawer: '新增',
                loading: false,
                spinning: false,
                spinning1: false,
                activeTabKey: 'officeTab',
                selectionIds: [],
                dataTables: [],
                menuList: [],
                menuHomeList: [],
                oldName: '',
                isShow: true,
                isVertical: false,
                formData: {
                    id: '',
                    name: '',
                    dataScope: '',
                    officeIdList: [],
                    roleOfficeIdList: [],//机构授权所选ID
                    menuIdList: []//角色授权所选ID
                },
                office: [],
                checkedKeys: [],
                halfCheckedKeys: [],
                expandedKeys: [],
                autoExpandParent: false,
                selectedKeys: [],
                ruleValidate: {
                    name: [
                        /*{
                            required: true, message: "必填", trigger: "blur", transform(value) {
                                return value.trim()
                            }
                        },
                        {max: 30, message: "不能超过30个字符", trigger: "blur"}*/
                        { required: true, message: '必填', trigger: 'blur' },
                        { validator: validateSpecialFont, trigger: 'blur' }
                    ],
                    dataScope: [
                        { required: true, message: '必填', trigger: 'change' }
                    ],
                    officeIdList: [
                        { required: true, message: '必填', trigger: 'change', type: 'array' }
                    ]
                },
                columns: [
                    {
                        dataIndex: 'name',
                        key: 'name',
                        title: '角色名称'
                    },
                    {
                        dataIndex: 'officeName',
                        key: 'officeName',
                        title: '所属机构'
                    },
                    {
                        dataIndex: 'dataScope',
                        key: 'dataScope',
                        title: '数据范围',
                        width: 200,
                        scopedSlots: { customRender: 'dataScope' },
                    },
                    {
                        dataIndex: 'homeMenuId',
                        key: 'homeMenuId',
                        title: '首页',
                        width: 200,
                        scopedSlots: { customRender: 'homePage' },
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 300,
                        align: 'left',
                        scopedSlots: { customRender: 'action' },
                    }
                ],
                pagination: {
                    total: 0,
                    pageSize: 15,
                    size: "middle",
                    showTotal: total => `共 ${total} 条数据`,
                    showSizeChanger: true,
                    pageSizeOptions: ['15', '25', '50', '100'],
                    //onShowSizeChange: (current, pageSize)=>this.pageSize = pageSize
                },
                scopeList: [
                    {
                        value: 'data_scope_all',
                        label: '所有数据'
                    },
                    {
                        value: 'data_scope_company_and_child',
                        label: '所在支队及以下数据'
                    },
                    {
                        value: 'data_scope_company',
                        label: '所在支队数据'
                    },
                    {
                        value: 'data_scope_office_and_child',
                        label: '所在部门及以下数据'
                    },
                    {
                        value: 'data_scope_office',
                        label: '所在部门数据'
                    },
                    {
                        value: 'data_scope_self',
                        label: '仅本人数据'
                    },
                    /*{
                        value: 'data_scope_custom',
                        label: '按明细设置'
                    }*/
                ],
            }
        },
        watch: {
        },
        methods: {
            init() {
            },
            formInit () {
                this.formData = {
                    id: '',
                    name: '',
                    dataScope: '',
                    officeIdList: [],
                    menuIdList: []
                }
                this.activeTabKey = 'menuTab'
            },
            getDataScopeName (value) {
                var name = ''
                this.scopeList.forEach(type => {
                    if (type.value === value) {
                        name = type.label
                    }
                })
                return name
            },
            edit (id) {
                this.formInit()
                this.formDrawer = true
                if (id === '') {
                    this.titleDrawer = '新增'
                } else {
                    this.titleDrawer = '修改'
                }
                this.spinning = true
                this.$http({
                    url: '/zuul/upm/role/antd/form/' + id,
                    method: 'get',
                    params: {
                        mode: this.isVertical
                    }
                }).then(result => {
                    if (result.data.success) {
                        console.log(result.data)
                        this.formData = result.data.data.role
                        this.menuList = result.data.data.menuList
                        this.expandedKeys = result.data.data.expandedKeys
                        //this.roleOfficeList = result.data.data.officeList
                        this.oldName = result.data.data.role.name
                    }
                    this.spinning = false
                })
            },
            copy (id) {
                this.formInit()
                this.titleDrawer = '新增'
                this.formDrawer = true
                this.$http({
                    url: '/zuul/upm/role/antd/form/' + id,
                    method: 'get',
                    params: {
                        mode: this.isVertical
                    }
                }).then(result => {
                    if (result.data.success) {
                        this.formData.menuIdList = result.data.data.role.menuIdList
                        this.menuList = result.data.data.menuList
                        this.expandedKeys = result.data.data.expandedKeys
                        this.oldName = result.data.data.role.name
                    }
                })
            },
            del (row) {
                let _this = this
                this.$confirm({
                    title: '信息提示',
                    content: h => <div style="color:red;">确定删除角色【{row.name}】?</div>,
                    onOk() {
                        _this.$http.delete('/zuul/upm/role/' + row.id, {
                        }).then(result => {
                            if (result.data.success) {
                                _this.$notification.success({
                                    message: '删除成功',
                                    description: result.data.message,
                                    duration: 5,
                                })
                                _this.selectionIds = []
                                _this.pagination.current = GetPageByDelete(_this.pagination.current, _this.dataTables.length, 1)
                                _this.renderTable({
                                    results: _this.pagination.pageSize,
                                    page: _this.pagination.current - 1,
                                    ..._this.searchConditions
                                })
                                //_this.handleSearch()
                            } else {
                                _this.$notification.error({
                                    message: '删除失败',
                                    description: result.data.message,
                                    duration: 5,
                                })
                            }
                        })
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                    class: 'test',
                });
            },
            multiDelete () {
                let _this = this
                console.log(this.selectionIds)
                if (this.selectionIds.length > 0) {
                    this.$confirm({
                        title: '确定删除?',
                        content: h => <div style="color:red;">Some descriptions</div>,
                        onOk() {
                            _this.$http({
                                url: '/zuul/upm/role',
                                method: 'DELETE',
                                data: _this.selectionIds
                            }).then(result => {
                                if (result.data.success) {
                                    _this.$notification.success({
                                        message: '删除成功',
                                        description: result.data.message,
                                        duration: 5,
                                    })
                                    _this.selectionIds = []
                                    _this.handleSearch()
                                } else {
                                    _this.$notification.error({
                                        message: '删除失败',
                                        description: result.data.message,
                                        duration: 5,
                                    })
                                }
                            })
                        },
                        onCancel() {
                            console.log('Cancel');
                        },
                        class: 'test',
                    });
                } else {
                    this.$warning({
                        title: '提示',
                        content: '请至少选择一项!',
                    });
                }
            },
            handleTableChange(pagination, filters, sorter) {
                console.log('handleTableChange:', pagination);
                const pager = {...this.pagination};
                pager.current = pagination.current;
                // pager.pageSize = pagination.pageSize;
                this.searchConditions.page = pagination.current - 1
                this.pagination = pager;
                this.renderTable({
                    size: pagination.pageSize,
                    ...this.searchConditions
                    /*sortField: sorter.field,
                    sortOrder: sorter.order,
                    ...filters*/
                });
            },
            renderTable (params = {}) {
                console.log('params:', params)
                this.loading = true
                this.$http({
                    url: '/zuul/upm/role',
                    method: 'get',
                    params: {
                        size: this.pagination.pageSize,
                        ...params
                    }
                }).then(result => {
                    if (result.data.success) {
                        console.log(result.data.data.results)
                        this.dataTables = result.data.data.results
                        const pagination = { ...this.pagination };
                        pagination.total = result.data.data.total;
                        this.pagination = pagination
                    }
                    this.loading = false
                })
            },
            renderOffice () {
                this.$http({
                    url: '/zuul/upm/office/cascader',
                    method: 'get'
                }).then(result => {
                    if (result.data.success) {
                        this.office = result.data.data
                    }
                })
            },
            home (row) {
                this.visible = true
                this.spinning1 = true
                this.roleId = row.id
                this.roleName = "【" + row.name + "】角色首页设置"
                this.$http({
                    url: '/zuul/upm/role/home/menu/tree',
                    method: 'get',
                    params: {
                        id: this.roleId,
                        mode: this.isVertical
                    }
                }).then(result => {
                    if (result.data.success) {
                        console.log(result.data)
                        this.menuHomeList = result.data.data.menuList
                        this.expandedKeys = result.data.data.expandedKeys
                    }
                    this.spinning1 = false
                })
            },
            onClose() {
                this.formDrawer = false;
            },
            onClose1() {
                this.visible = false;
            },
            handleSubmit () {
                console.log("checkedKeys:", this.checkedKeys)
                this.$refs['formData'].validate(valid => {
                    if (valid) {
                        this.formData.menuIdList = this.checkedKeys
                        //自定义机构权限
                        /*if (this.formData.dataScope === 'data_scope_custom') {
                            //获取机构选中及半选节点
                            let officeIds = []
                            let officeParams = this.$refs.officeTree.getCheckedAndIndeterminateNodes()
                            for (let i = 0; i < officeParams.length; i++) {
                                officeIds.push(officeParams[i].id)
                            }
                            this.formData.roleOfficeIdList = officeIds
                        }*/
                        this.$http({
                            url: '/zuul/upm/role',
                            method: 'post',
                            data: this.formData,
                            params: {
                                oldName: this.oldName
                            }
                        }).then(result => {
                            if (result.data.success) {
                                this.$notification.success({
                                    message: '保存成功',
                                    description: result.data.message,
                                    duration: 5,
                                })
                                this.formDrawer = false
                                this.handleSearch()
                            } else {
                                this.$notification.error({
                                    message: '保存失败',
                                    description: result.data.message,
                                    duration: 5,
                                })
                            }
                        })
                    }
                })
            },
            handleSearch () {
                this.pagination.current = 1;
                this.searchConditions.page = 0;
                this.renderTable(
                    {
                        ...this.searchConditions
                        /*sortField: sorter.field,
                        sortOrder: sorter.order,
                        ...filters*/
                    }
                )
            },
            changeOfficeSearch (value, selectedData) {
                this.searchConditions.officeIds = value.join(',')
                this.handleSearch()
            },
            changeRoleMode (checked, event) {
                console.log("changeRoleMode", checked)
                if (checked) {
                    this.formDrawerWidth = 1200
                } else {
                    this.formDrawerWidth = 500
                }
            },
            changeOffice(value, selectedData) {
                console.log("===========================")
                console.log(value)
                console.log(selectedData)
                /*let id;
                if (value.length === 1) {
                    id = value
                } else {
                    id = value[value.length - 1]
                }
                //根据所选机构编码获取这个机构的所有子从而形成树
                this.$http({
                    url: '/zuul/upm/office/tree/' + id,
                    method: 'get'
                }).then(result => {
                    if (result.data.success) {
                        console.log(result.data)
                    }
                })*/
            },
            changeDataScope (value) {
                //判断是否自定义,如果是自定义,渲染机构授权
                console.log(value)
                if (value === 'data_scope_custom') {
                    this.activeTabKey = 'officeTab'
                    //这时候渲染机构数据
                    /*console.log(this.formData)
                    this.$http({
                        url: '/zuul/upm/role/tree',
                        method: 'get',
                        params: {
                            id: this.formData.id
                        }
                    }).then(result => {
                        if (result.data.success) {
                            this.roleOfficeList = result.data.data
                        }
                    })*/

                } else {
                    this.activeTabKey = 'menuTab'
                }
            },
            onExpand(expandedKeys, info) {
                console.log('onExpand', expandedKeys);
                console.log('onExpand', info);
                // if not set autoExpandParent to false, if children expanded, parent can not collapse.
                // or, you can remove all expanded children keys.
                this.expandedKeys = expandedKeys;
                this.autoExpandParent = false;
            },
            onCheck(checkedKeys, info) {
                //半选节点的作用是给菜单显示的时候有上下级,但是如果在角色授权里check的时候会导致下级所有的节点全选
                console.log('onCheck', checkedKeys);
                console.log('halfCheckedKeys', info.halfCheckedKeys);
                this.checkedKeys = checkedKeys;
                this.halfCheckedKeys = info.halfCheckedKeys;
            },
            onSelect(selectedKeys, info) {
                console.log('onSelect', info);
                this.selectedKeys = selectedKeys;
            },
            onSelect1(selectedKeys, info) {
                console.log('node', info.node);
                console.log('selectedKeys', selectedKeys);
                //this.selectedKeys = selectedKeys;
                if (!info.node.isLeaf) {
                    this.$error({
                        title: '请选择正确的菜单！',
                        content: '您所选择的菜单【'+info.node.title+'】不可设置为首页，请重新选择。',
                    });
                    return
                }
                let _this = this
                this.$confirm({
                    title: '是否确认将' + this.roleName + "为" + info.node.title + "?",
                    content: h => <div style="color:red;"></div>,
                    onOk() {
                        console.log('OK');
                        _this.$http({
                            url: '/zuul/upm/role/home/' + _this.roleId,
                            method: 'post',
                            data: {
                                id: selectedKeys[0],
                                title: info.node.title,
                                home: true
                            }
                        }).then(result => {
                            console.log(result.data)
                            //this.homeMenuId = data.id
                            //把所有的开关变比,打开返回值中传的id的开关
                            if (result.data.success) {
                                _this.$notification.success({
                                    message: '保存成功',
                                    description: result.data.message,
                                    duration: 5,
                                })
                            } else {
                                _this.$notification.error({
                                    message: '保存失败',
                                    description: result.data.message,
                                    duration: 5,
                                })
                            }
                            this.visible = false
                        })
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                    class: 'test',
                });
            },
        },
        computed: {
            rowSelection() {
                return {
                    onChange: (selectedRowKeys, selectedRows) => {
                        //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                        this.selectionIds = []
                        for (let a of selectedRowKeys) {
                            this.selectionIds.push(a)
                        }
                    },
                    getCheckboxProps: record => ({
                        props: {
                            disabled: record.name === 'Disabled User', // Column configuration not to be checked
                            name: record.name,
                        },
                    }),
                };
            },
        },
        mounted() {
            this.renderTable()
            this.renderOffice()
        }
    }
</script>
<style>

</style>
