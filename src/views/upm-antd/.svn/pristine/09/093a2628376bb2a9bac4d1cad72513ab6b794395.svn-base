<style scoped lang="less">
</style>
<template>
    <div class="user">
        <a-layout>
            <a-layout-sider theme="light" style="position: fixed;z-index:10;" :collapsible="true" :defaultCollapsed="true" collapsedWidth="0" @collapse="changeCollapsed" :zeroWidthTriggerStyle="zeroWidthTriggerStyle">
                <div :style="'height:'+windowH+'px;overflow:auto;'">
                    <div style="margin: 10px 0 0 10px;font-weight: bold">
                        <a-icon type="menu-unfold"/>
                        所属部门
                    </div>
                    <a-divider style="margin:10px 0;"/>
                    <div>
                        <a-tree
                            :tree-data="officeTree"
                            @select="changeTreeSelect">
                        </a-tree>
                    </div>
                </div>
            </a-layout-sider>
            <a-layout :style="{ marginLeft: !collapsedStatus?'200px':'0px' }">
                <a-layout-content :style="{ margin: '0', overflow: 'initial',height: windowH+'px;',width:!collapsedStatus?(windowW-200)+'px':windowW+'px' }">
                    <div class="page-content-body">
                        <div class="toolbar">
                            <a-button-group>
                                <a-button type="primary" icon="user-add" @click="add">新增</a-button>
                                <a-button type="danger" icon="user-delete" @click="multiDelete">删除</a-button>
                                <a-button type="info" icon="hdd" @click="showRecycleModel">
                                    回收站
                                </a-button>
<!--                                <shiro-hasPermission name="sys:user:edit">
                                    <a-button type="primary" icon="user-add" @click="add">新增</a-button>
                                </shiro-hasPermission>
                                <shiro-hasPermission name="sys:user:del">
                                    <a-button type="danger" icon="user-delete" @click="multiDelete">删除</a-button>
                                </shiro-hasPermission>
                                <shiro-hasPermission name="sys:user:del">
                                    <a-button type="info" icon="hdd" @click="showRecycleModel">
                                        回收站
                                    </a-button>
                                </shiro-hasPermission>-->
                            </a-button-group>
                            <div class="right">
                                <!--<Cascader :data="company" @on-change="changeOffice" placeholder="请选择所属部门" change-on-select style="width: 300px;display: inline-block"></Cascader>-->
                                <a-input v-model="searchConditions.name" icon="search" @change="handleSearch" placeholder="请输入姓名查询" style="width: 150px;margin-left:5px" allowClear></a-input>
                                <a-input v-model="searchConditions.loginName" icon="search" @change="handleSearch" placeholder="请输入登录名查询" style="width: 160px;margin-left:5px" allowClear></a-input>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div class="page-table-frame">
                            <a-skeleton :loading="skeletonLoading" :paragraph="{ rows: 15 }" active style="background-color: white">
                                <a-table :loading="loading"
                                         size="middle"
                                         :columns="columns1"
                                         :data-source="dataTables"
                                         :rowKey="record => record.id"
                                         :row-selection="{ selectedRowKeys: selectedRowKeys,selectedRows: selectedRows, onChange: onSelectChange }"
                                         @change="handleTableChange"
                                         :pagination="pagination">
                                    <template slot="officeNameSlots" slot-scope="text, record">
                                        <span>{{ !!record.office ? record.office.name : '' }}</span>
                                    </template>
                                    <template slot-scope="text, record" slot="action">
                                        <a-space>
                                            <a-button type="primary" size="small" @click="edit(record.id)">修改</a-button>
                                            <a-button type="danger" size="small" @click="logicDel(record.id)">删除</a-button>
                                            <a-button class="button-color-warning" size="small" v-show="record.checkIp"
                                                      @click="config(record.id)"
                                                      style="margin-right: 5px;">权限
                                            </a-button>
<!--                                            <shiro-hasPermission name="sys:user:edit">
                                                <a-button type="primary" size="small" @click="edit(record.id)">修改</a-button>
                                            </shiro-hasPermission>
                                            <shiro-hasPermission name="sys:user:logicDel">
                                                <a-button type="danger" size="small" @click="logicDel(record.id)">删除</a-button>
                                            </shiro-hasPermission>
                                            <shiro-hasPermission name="sys:user:checkIp">
                                                <a-button class="button-color-warning" size="small" v-show="record.checkIp"
                                                          @click="config(record.id)"
                                                          style="margin-right: 5px;">权限
                                                </a-button>
                                            </shiro-hasPermission>-->
                                        </a-space>
                                    </template>
                                    <template slot-scope="text, record" slot="rolesSlot">
                                        <a-tag color="blue" v-for="(item, index) in record.roleNames.split(',')" @click="getRoleInfo(index, record.roleIdList)" :key="item.id">
                                            {{ item }}
                                        </a-tag>
                                    </template>
                                </a-table>
                            </a-skeleton>
                        </div>
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout>

        <a-drawer
            :title=titleDrawer
            :visible="visible"
            width="500"
            @close="onClose"
            :destroyOnClose="true"
            :body-style="{ paddingBottom: '80px' }">
            <a-form-model ref="ruleForm" :model="formData" :rules="ruleValidate" label-position="top" layout='vertical' :form="formDrawer">
                <a-form-model-item label="登录名" prop="loginName">
                    <a-input v-model="formData.loginName" allowClear :maxLength="10" placeholder="最多输入10个字符"></a-input>
                </a-form-model-item>
                <a-form-model-item label="姓名" prop="name">
                    <a-input v-model="formData.name" :maxLength="30" placeholder="最多输入30个字符"></a-input>
                </a-form-model-item>
                <a-form-model-item label="所属机构" prop="officeIdList">
                    <a-cascader :options="company" v-model="formData.officeIdList" changeOnSelect placeholder="请选择所属机构"></a-cascader>
                </a-form-model-item>
                <a-form-model-item label="工号" prop="no">
                    <a-input v-model="formData.no" :maxLength="20" placeholder="最多输入20个字符"></a-input>
                </a-form-model-item>
                <a-form-model-item label="电子邮件" prop="email">
                    <a-input v-model="formData.email" placeholder="请输入正确的电子邮件地址" :maxLength="50"></a-input>
                </a-form-model-item>
                <a-form-model-item label="密码" prop="newPassword">
                    <a-input type="password" v-model="formData.newPassword" placeholder="修改时若不修改密码，请留空。"></a-input>
                </a-form-model-item>
                <a-form-model-item label="确认密码" prop="confirmNewPassword">
                    <a-input type="password" v-model="confirmNewPassword" placeholder="修改时若不修改密码，请留空。"></a-input>
                </a-form-model-item>
                <a-form-model-item label="用户类型" prop="userType">
                    <a-select v-model="formData.userType" placeholder="请选择用户类型">
                        <a-select-option value="0">系统管理</a-select-option>
                        <a-select-option value="1">普通用户</a-select-option>
                    </a-select>
                </a-form-model-item>
                <a-form-model-item label="手机" prop="mobile">
                    <a-input v-model="formData.mobile" placeholder="最多输入15个字符"></a-input>
                </a-form-model-item>
                <a-form-model-item label="角色" prop="roleIdList">
                    <a-select v-model="formData.roleIdList" mode="multiple" :filter-option="filterOption" placeholder="请选择角色">
                        <a-select-option v-for="item in roles" :value="item.value" :key="item.value">
                            {{ item.label }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
                <shiro-hasPermission name="sys:user:checkIp">
                    <a-row>
                        <a-col>
                            <a-form-model-item label="是否限制IP">
                                <a-switch size="large" v-model="formData.checkIp">
                                    <a-icon type="check" slot="open"></a-icon>
                                    <a-icon type="close" slot="close"></a-icon>
                                </a-switch>
                            </a-form-model-item>
                        </a-col>
                        <a-col>
                            <a-form-model-item label="过期时间">
                                <a-date-picker v-model="formData.expireDate" format="YYYY-MM-DD" placeholder="请选择过期时间" @change="onChange"></a-date-picker>
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                </shiro-hasPermission>
                <a-form-model-item label="备注" prop="remarks">
                    <a-textarea v-model="formData.remarks" placeholder="最多输入100个字符" :maxLength="100" :auto-size="{ minRows: 3, maxRows: 5 }" />
                </a-form-model-item>
            </a-form-model>
            <div class="page-drawer-footer">
                <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
                <a-button type="primary" :loading="submitLoading" @click="handleSubmit()">保存</a-button>
            </div>
        </a-drawer>
        <a-modal
            v-model="ipModal"
            title="IP权限"
            @ok="handleIpSubmit"
            ok-text="保存"
            @cancel="cancel"
            cancel-text="关闭"
            :destroyOnClose="true">
            <a-form-model ref="ipConfig" :model="ipConfig" label-position="top" :rules="ruleValidateIP">
                <a-row>
                    <a-col span="9">
                        <a-form-model-item prop="startIp">
                            <a-input v-model="ipConfig.startIp" placeholder="请填写正确的起始IP"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col span="2" style="text-align: center">
                        <a-form-model-item>-</a-form-model-item>
                    </a-col>
                    <a-col span="9">
                        <a-form-model-item prop="endIp">
                            <a-input v-model="ipConfig.endIp" placeholder="请填写正确的结束IP"></a-input>
                        </a-form-model-item>
                    </a-col>
                    <a-col span="4" style="text-align: right">
                        <a-form-model-item>
                            <a-button type="primary" icon="md-add" @click="addIp">增加</a-button>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-form-item label="IP列表">
                    <a-table
                        :rowKey="record => record.id"
                        :columns="columnsIP"
                        :data-source="ipConfig.dataTableIP"
                        max-height="400"
                        size="small">
                        <template slot-scope="text, record" slot="startIpSlot">
                            <span>{{ getStartIpFormat(record) }}</span>
                        </template>
                        <template slot-scope="text, record" slot="action2">
                            <a-button type="error" size="small" @click="removeIp(index)">删除</a-button>
                        </template>
                    </a-table>
                </a-form-item>
            </a-form-model>
        </a-modal>
        <a-drawer
            title="角色授权信息"
            :visible="roleDrawer"
            width="400"
            maskClosable
            :styles="styles"
            @close="roleDrawer = false">
            <a-tree v-if="roleDrawer" :tree-data="menuList" defaultExpandAll>
            </a-tree>
        </a-drawer>
        <a-modal
            v-model="recycleModel"
            title="回收站"
            :width="1000"
            >
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
    </div>
</template>
<script>
import {validatePhone, validateIP, validatePassword} from '@/libs/validate'
import {GetPageByDelete} from '@/libs/util'

export default {
    name: 'user',
    data() {
        const validateLoginNameCheck = (rule, value, callback) => {
            this.$http({
                url: '/zuul/upm/user/checkLoginName',
                method: 'get',
                params: {
                    oldLoginName: this.formData.oldLoginName,
                    loginName: this.formData.loginName
                }
            }).then(result => {
                if (!result.data) {
                    callback(new Error('登录名已存在!'))
                } else {
                    callback()
                }
            })
        }
        const validatePass = (rule, value, callback) => {
            //判断新增还是修改
            if (!this.formData.id) {//新增
                callback()
                /* if (value === '') {
                   callback()
                 } else {//密码不为空时
                   //新增时不验证密码规则
                   /!*validatePassword(rule, value, () => {

                   })*!/
                   // if (this.confirmNewPassword !== '') {
                   //   // 对第二个密码框单独验证
                   //   this.$refs.formData.validateField('confirmNewPassword')
                   // }
                   callback()
                 }*/
            } else {
                /*if (this.formData.newPassword != null && this.formData.newPassword.length !== 0) {
                    /!*!//修改时码负责度验证
                    console.log(this.$config.isPwdRule)
                    if (this.isPwdRule) {
                        validatePassword(rule, this.formData.newPassword, (res) => {
                            console.log(this.formData.newPassword)
                            callback(res)
                            if (!!res) {
                                return
                            }
                        })
                    }*!/
                    validatePassword(rule, this.formData.newPassword, (res) => {
                        callback(res)
                        if (!!res) {
                            return
                        }
                    })
                }
                if (this.confirmNewPassword !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.formData.validateField('confirmNewPassword')
                }
                callback()*/
            }
        }
        const validatePassCheck = (rule, value, callback) => {
            if (!this.formData.newPassword) {
                this.formData.newPassword = ''
            }
            if (this.confirmNewPassword !== this.formData.newPassword) {
                callback(new Error('密码不一致!'))
            } else {
                callback()
            }
        }
        const validateIPCheck = (rule, value, callback) => {
            if (this.ipConfig.endIp.length > 0) {
                let temp1 = this.ipConfig.startIp.split('.')
                let temp2 = this.ipConfig.endIp.split('.')
                for (let i = 0; i < 3; i++) {
                    if (temp1[i] !== temp2[i]) {
                        callback(new Error('IP范围不合理!'))
                    }
                }
                if (temp1[3] >= temp2[3]) {
                    callback(new Error('IP范围不合理!'))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }
        return {
            collapsedStatus: true,
            skeletonLoading: false,
            selectedRows: [],
            selectedRowKeys: [],
            pagination: {
                total: 0,
                size: "middle",
                hideOnSinglePage: false,//只有一页时是否隐藏分页器
                pageSize: 15,//每页条数
                showTotal: total => `共 ${total} 条数据`,
                showSizeChanger: true,
                pageSizeOptions: ['15', '25', '50', '100'],
            },
            formDrawer: this.$form.createForm(this),
            zeroWidthTriggerStyle: {
                backgroundColor: '#1890ff',
                color: " #fff",
                right: " -31px",
                top: "70px"
            },
            loading: false,
            ipModal: false,
            recycleModel: false,
            submitLoading: false,
            titleDrawer: '新增',
            visible: false,
            roleDrawer: false,
            searchConName1: '',
            searchConditions: {
                sort: 'id,ASC',
                name: '',
                loginName: '',
                officeIds: '',
                officeId: ''
            },
            ipConfig: {
                id: '',//用户id
                startIp: '',//开始ip
                endIp: '',//结束ip
                dataTableIP: [],//ip列表
                ipList: [],//用于存储数据
            },
            officeTree: [],
            activeTabName: 'menuTab',
            menuList: [],
            columnsIP: [
                {
                    title: '起止IP',
                    dataIndex: 'startIp',
                    key: 'startIp',
                    scopedSlots: {customRender: 'startIpSlot'}
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    key: 'action',
                    width: 100,
                    align: 'left',
                    scopedSlots: {customRender: 'action2'}
                }
            ],
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },
            selectionIds: [],
            dataTables: [],
            recycleTables: [],
            total: 0,
            company: [],
            confirmNewPassword: '',
            formData: {
                id: '',
                loginName: '',
                oldLoginName: '',
                password: '',
                newPassword: '',
                officeIdList: [],
                no: '',
                name: '',
                email: '',
                mobile: '',
                userType: undefined,
                roleIdList: [],
                checkIp: false,
                expireDate: undefined,
                remarks: ''
            },
            ruleValidate: {
                name: [{
                    required: true, message: '必填', trigger: 'blur', transform(value) {
                        return value.trim()
                    }
                }],
                loginName: [{
                    required: true, message: '必填', trigger: 'blur', transform(value) {
                        return value.trim()
                    }
                }, {validator: validateLoginNameCheck, trigger: 'blur'}],
                //TODO 判断所属机构是否大于当前用户所属机构
                officeIdList: [{required: true, message: '必填', trigger: 'change', type: 'array'}],
                no: [{
                    required: true, message: '必填', trigger: 'blur', transform(value) {
                        return value.trim()
                    }
                }],
                /*newPassword: [{validator: validatePass, trigger: 'blur'}],*/
                confirmNewPassword: [{validator: validatePassCheck, trigger: 'blur'}],
                userType: [{required: true, message: '必填', trigger: 'change'}],
                mobile: [{validator: validatePhone, trigger: 'blur'}],
                roleIdList: [{required: true, message: '必选', trigger: 'change'}]
            },
            ruleValidateIP: {
                'startIp': [{required: true, message: '必填', trigger: 'blur'}, {validator: validateIP, trigger: 'blur'}],
                'endIp': [{validator: validateIP, trigger: 'blur'}, {validator: validateIPCheck, trigger: 'blur'}],
            },
            roles: [],
            columns1: [
                {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                    width: 150,
                    /*sortable: true*/
                }, {
                    title: '登录名',
                    key: 'loginName',
                    dataIndex: 'loginName',
                    width: 120,
                }, {
                    title: '工号',
                    key: 'no',
                    dataIndex: 'no',
                    sorter: true,
                    width: 100,
                    // sorter: (a, b) => a.no - b.no,
                    // sortDirections: ['descend', 'ascend'],
                    // defaultSortOrder: "descend"
                }, {
                    title: '所属部门',
                    key: 'officeName',
                    dataIndex: 'officeName',
                    scopedSlots: {customRender: 'officeNameSlots'},
                    width: 150,
                    render: (h, params) => {
                        return h('p', !!params.row.office ? params.row.office.name : '')
                    }
                },
                {
                    title: '角色',
                    key: 'roles',
                    dataIndex: 'roles',
                    scopedSlots: {customRender: 'rolesSlot'},
                },
                {
                    title: '操作',
                    dataIndex: 'action',
                    key: 'action',
                    width: 300,
                    align: 'left',
                    scopedSlots: {customRender: 'action'}
                }
            ],
            recycleColumns: [
                {
                    title: '姓名',
                    dataIndex: 'name',
                    key: 'name',
                }, {
                    title: '登录名',
                    dataIndex: 'loginName',
                    key: 'loginName',
                    width: 200,
                }, {
                    title: '操作',
                    width: 150,
                    dataIndex: 'operation',
                    key: 'operation',
                    scopedSlots: { customRender: 'operation' },
                },
            ],
            recyclePagination: {
                total: 0,
                pageSize: 15,
                size: "middle",
                showTotal: total => `共 ${total} 条数据`,
            },
        }
    },
    computed: {
        windowH() {
            return this.$store.state.app.bodyHeight;
        },
        windowW() {
            return this.$store.state.app.bodyWidth;
        }
    },
    watch: {
        // visible(val) {
        //   if (val) {
        //     // if (this.$refs['ruleForm'] !== undefined) {
        //     this.$refs['ruleForm'].resetFields()
        //     // }
        //   }
        // },
        /*ipModal(val) {
            if (val) {
                this.$refs['ipConfig'].resetFields()
            }
        }*/
    },
    methods: {
        init() {
            this.formData = {
                id: '',
                loginName: '',
                oldLoginName: '',
                password: '',
                newPassword: '',
                officeIdList: [],
                no: '',
                name: '',
                email: '',
                mobile: '',
                userType: undefined,
                roleIdList: [],
                checkIp: false,
                expireDate: undefined,
                remarks: ''
            }
            this.confirmNewPassword = ''
        },
        changeCollapsed(status) {
            this.collapsedStatus = status;
        },
        //角色多选带选择框
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
            );
        },
        //分页change
        handleTableChange(pagination, filters, sorter) {
            if (!!sorter['order']) {
                this.searchConditions.sort = sorter['columnKey'] + ',' + (sorter['order'] == 'ascend' ? 'ASC' : 'DESC');
            } else {
                this.searchConditions.sort = 'id,ASC';
            }
            const pager = {...this.pagination};
            pager.current = pagination.current;
            pager.pageSize = pagination.pageSize;
            this.pagination = pager;
            this.renderTable({
                size: pagination.pageSize,
                page: pagination.current - 1,
                ...this.searchConditions
                /*sortField: sorter.field,
                sortOrder: sorter.order,
                ...filters*/
            });
        },
        handleChange(index, roleIdList) {
            console.log('index: ', index);
            console.log('roleIdList: ', roleIdList);
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
        //关闭抽屉
        onClose() {
            this.visible = false;
            this.submitLoading = false;
            //this.$refs["ruleForm"].resetFields();
        },
        initIpConfig() {
            this.ipConfig = {
                id: '',//用户id
                startIp: '',//开始ip
                endIp: '',//结束ip
                dataTableIP: [],//ip列表
                ipList: [],//用于存储数据
            }
        },
        changeOffice(value, selectedData) {
            this.searchConditions.officeIds = value.join(',')
            this.handleSearch()
        },
        changeTreeSelect(selectedData, info) {
            this.searchConditions.officeIds = info.node.dataRef.ids;
            this.handleSearch()
        },
        handleIpSubmit() {
            this.$http({
                url: '/zuul/upm/user/ip/' + this.ipConfig.id,
                method: 'post',
                data: this.ipConfig.ipList
            }).then(result => {
                if (result.data.success) {
                    this.$notification.success({
                        message: result.data.message,
                        duration: 2,
                    })
                }
                this.ipModal = false
            })

        },
        cancel() {
            // this.$message.info('Clicked cancel')
        },
        handleSearch() {
            this.renderTable(
                {
                    ...this.searchConditions
                    /*sortField: sorter.field,
                    sortOrder: sorter.order,
                    ...filters*/
                }
            )
        },
        addIp() {
            this.$refs.ipConfig.validate(valid => {
                if (valid) {
                    //判断单个IP的情况
                    if (this.ipConfig.endIp.length === 0) {
                        //表格数据
                        this.ipConfig.dataTableIP.push({
                                startIp: this.ipConfig.startIp,
                                endIp: '',
                            }
                        )
                        //存储数据
                        let sip = this.ipConfig.startIp.split('.')
                        this.ipConfig.ipList.push(
                            sip[0] + '.' + sip[1] + '.' + sip[2] + '.' + sip[3] + '|' + sip[3]
                        )
                    } else if (this.ipConfig.startIp.length > 0 && this.ipConfig.endIp.length > 0) {
                        //表格数据
                        this.ipConfig.dataTableIP.push({
                                startIp: this.ipConfig.startIp,
                                endIp: this.ipConfig.endIp,
                            }
                        )
                        //存储数据
                        let sip = this.ipConfig.startIp.split('.')
                        let eip = this.ipConfig.endIp.split('.')
                        this.ipConfig.ipList.push(
                            sip[0] + '.' + sip[1] + '.' + sip[2] + '.' + sip[3] + '|' + eip[3]
                        )
                    }
                    console.log(this.ipConfig.ipList)
                }
            })
        },
        removeIp(index) {
            //TODO 这里要换个逻辑,不然会报错
            this.ipConfig.dataTableIP.splice(index, 1)
            this.ipConfig.ipList.splice(index, 1)
        },
        renderTable(params = {}) {
            this.loading = true
            this.$http({
                url: '/zuul/upm/user',
                method: 'get',
                params: {
                    size: this.pagination.pageSize,
                    ...params
                }
            }).then(result => {
                if (result.data.success) {
                    this.dataTables = result.data.data.results
                    this.pagination.total = result.data.data.total
                }
                this.loading = false
            })
        },
        renderOffice() {
            this.loading = true
            this.$http({
                url: '/zuul/upm/office/cascader',
                method: 'get'
            }).then(result => {
                if (result.data.success) {
                    this.company = result.data.data
                }
                this.loading = false
            })
        },
        renderOfficeTree() {
            this.$http({
                url: '/zuul/upm/office/tree',
                method: 'get',
            }).then(result => {
                if (result.data.success) {
                    this.officeTree = result.data.data
                }
            })
        },
        renderRole() {
            this.loading = true
            this.$http({
                url: '/zuul/upm/role/select',
                method: 'get'
            }).then(result => {
                if (result.data.success) {
                    this.roles = result.data.data
                }
                this.loading = false
            })
        },
        changeSort(sort) {
            if (sort['order'] !== 'normal') {
                this.searchConditions.sort = sort['key'] + ',' + sort['order']
                this.renderTable()
            }
        },
        add() {
            this.init()
            this.titleDrawer = '新增'
            this.visible = true
        },
        config(id) {
            //数据初始化
            this.initIpConfig()
            this.ipConfig.id = id
            //获取ip段数据
            this.$http({
                url: '/zuul/upm/user/ip/' + this.ipConfig.id,
                method: 'get'
            }).then(result => {
                if (result.data.success) {
                    let ipList = result.data.data
                    for (let i in ipList) {
                        this.ipConfig.ipList.push(
                            ipList[i]
                        )
                        let ip = ipList[i].split('.')
                        this.ipConfig.dataTableIP.push(
                            {
                                startIp: ip[0] + '.' + ip[1] + '.' + ip[2] + '.' + ip[3].split('|')[0],
                                endIp: ip[0] + '.' + ip[1] + '.' + ip[2] + '.' + ip[3].split('|')[1],
                            }
                        )
                    }

                }
            })
            this.ipModal = true
        },
        edit(id) {
            this.init()
            this.loading = true
            this.$http({
                url: '/zuul/upm/user/' + id,
                method: 'get',
            }).then(result => {
                if (result.data.success) {
                    this.formData = result.data.data
                    this.formData.oldLoginName = result.data.data.loginName
                }
                this.loading = false
                this.titleDrawer = '修改'
                this.visible = true
            })
        },
        handleSubmit() {
            this.submitLoading = true
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    this.$http({
                        url: '/zuul/upm/user',
                        method: 'post',
                        data: this.formData
                    }).then(result => {
                        if (result.data.success) {
                            this.$notification.success({
                                message: '保存成功',
                                description: result.data.message,
                                duration: 5,
                            })
                            this.visible = false
                            this.renderTable()
                        } else {
                            this.$notification.error({
                                message: '保存失败',
                                description: result.data.message,
                                duration: 5,
                            })
                        }
                        this.loading = false
                        this.submitLoading = false
                    })
                } else {
                    this.submitLoading = false
                }
            })
        },
        del(id) {
            this.$confirm({
                title: '信息提示',
                okType: 'danger',
                content: '确定删除?',
                onOk: () => {
                    this.$http
                        .delete('/zuul/upm/user/' + id)
                        .then(result => {
                            if (result.data.success) {
                                this.$notification.success({
                                    message: result.data.message,
                                    duration: 2,
                                })
                                this.selectionIds = []
                                this.pagination.current = GetPageByDelete(this.pagination.current, this.dataTables.length, 1)
                                this.renderTable({
                                    results: this.pagination.pageSize,
                                    page: this.pagination.current - 1,
                                    ...this.searchConditions
                                })
                            } else {
                                this.$notification.error({
                                    message: result.data.message,
                                    duration: 2,
                                })
                            }
                        })
                }
            })
        },
        logicDel(id) {
            this.$confirm({
                title: '信息提示',
                okType: 'danger',
                content: '确定删除?',
                onOk: () => {
                    this.$http
                        .delete('/zuul/upm/user/logic/' + id)
                        .then(result => {
                            if (result.data.success) {
                                this.$notification.success({
                                    message: result.data.message,
                                    duration: 2,
                                })
                                this.renderTable()
                            } else {
                                this.$notification.error({
                                    message: result.data.message,
                                    duration: 2,
                                })
                            }
                        })
                }
            })
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
                            url: '/zuul/upm/user',
                            method: "delete",
                            data: _this.selectedRows
                        }).then(result => {
                            if (result.data.success) {
                                _this.$notification.success({
                                    message: result.data.message,
                                    duration: 2,
                                })
                                _this.selectionIds = []
                                _this.renderTable()
                            } else {
                                _this.$notification.error({
                                    message: result.data.message,
                                    duration: 2,
                                })
                            }
                        })
                    },
                    onCancel() {
                    },
                });
            }
        },
        //时间控件
        onChange(value, dateString) {
            //过期时间加上时分秒 + ' 23:59:59'
            this.formData.expireDate = dateString + ' 23:59:59';
        },
        selectionClick(arr) {
            this.selectionIds = []
            for (let i in arr) {
                this.selectionIds.push(arr[i].id)
            }
        },
        getRoleInfo(index, roleIdList) {
            console.log(index)
            console.log(roleIdList)
            let id = roleIdList[index]
            this.$http({
                url: '/zuul/upm/role/' + id + "/menus",
                method: 'get'
            }).then(result => {
                if (result.data.success) {
                    this.roleDrawer = true;
                    this.menuList = result.data.data
                }
            })
        },
        setDisable(item) {
            item.disabled = true
            if (Array.isArray(item.children) && item.children.length > 0) {
                item.children.forEach(item2 => {
                    item2.disabled = true;
                    this.setDisable(item2)
                })
            } else {
                return
            }
        },
        getStartIpFormat(row) {
            if (row.endIp.length === 0) {
                return row.startIp;
            } else {
                return row.startIp + ' - ' + row.endIp;
            }
        },
        showRecycleModel() {
            this.recycleModel = true;
            this.renderRecycleTable();
        },
        recycleHandleCancel() {
            this.recycleModel = false
        },
        renderRecycleTable(params = {}) {
            this.$http({
                url: '/zuul/upm/user/recycle',
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
                url: '/zuul/upm/user/recycle/' + id,
                method: 'delete'
            }).then(result => {
                if (result.data.success) {
                    this.renderRecycleTable()
                }
            })
        },
        recycleRevert(id) {
            this.$http({
                url: '/zuul/upm/user/recycle/' + id,
                method: 'post'
            }).then(result => {
                if (result.data.success) {
                    this.renderRecycleTable()
                    this.renderTable({
                        results: this.pagination.pageSize,
                        page: this.pagination.current - 1,
                        ...this.searchConditions
                    });
                }
            })
        }
    },

    mounted() {
        this.renderTable()
        this.renderOffice()
        this.renderOfficeTree()
        this.renderRole()
    }
}
</script>
