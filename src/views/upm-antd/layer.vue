<style lang="less">

</style>
<template>
    <div class="layer">
        <div class="page-content-body">
            <div class="toolbar">
                <a-space>
                    <a-button type="primary" @click="add" icon="plus">
                        新增
                    </a-button>
                    <a-button type="danger" @click="multiDelete" icon="delete">删除</a-button>
<!--                    <div class="right">
                        <a-input v-model="searchConditions.name" placeholder="请输入单位名称查询" :maxLength=30 style="width: 200px" allowClear @change="handleSearch"></a-input>
                    </div>-->
                </a-space>
            </div>
            <a-skeleton :loading="skeletonLoading" :paragraph="{ rows: 15 }" active style="background-color: white">
                <a-table :columns="columns"
                         :data-source="initTable"
                         :rowKey="record => record.id"
                         :loading="loading"
                         size="middle"
                         :row-selection="{ selectedRowKeys: selectedRowKeys,selectedRows: selectedRows, onChange: onSelectChange }"
                         @change="handleTableChange" :pagination="pagination">
<!--                    <template slot="gradeSlots" slot-scope="text, record">
                        <span>{{ getGradeFormat(text) }}</span>
                    </template>
                    <template slot="typeSlots" slot-scope="text, record">
                        <span>{{ getTypeFormat(text) }}</span>
                    </template>-->
                    <template slot="action" slot-scope="text, record">
                        <a-space>
                            <a-button type="primary" size="small" @click="edit(record.id)">
                                修改
                            </a-button>
                            <a-button type="primary" size="small" @click="role(record)">
                                角色
                            </a-button>
                            <a-button type="danger" size="small" @click="del(record.id)">
                                删除
                            </a-button>
                        </a-space>
                    </template>
                </a-table>
            </a-skeleton>
        </div>

        <a-drawer
            :title="drawerTitle"
            :width="500"
            :visible="drawerVisible"
            :body-style="{ paddingBottom: '80px' }"
            @close="onClose">

            <a-form-model ref="formData" :model="formData"  layout="vertical" hide-required-mark>
                <a-row :gutter="16">
                    <a-col :span="12">
                        <a-form-model-item label="名称">
                            <a-input v-model="formData.name" :maxLength="10" allowClear placeholder="最多输入10个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="模块标识">
                            <a-input v-model="formData.module" :maxLength="10" allowClear placeholder="最多输入10个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="组件标识">
                            <a-input v-model="formData.component" :maxLength="10" allowClear placeholder="最多输入10个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="形状">
                            <a-select v-model="formData.shape" allowClear placeholder="请选择">
                                <a-select-option v-for="d in shapeList" :key="d.value">
                                    {{ d.label }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="类型">
                            <a-select v-model="formData.type" allowClear placeholder="请选择">
                                <a-select-option v-for="d in typeList" :key="d.value">
                                    {{ d.label }}
                                </a-select-option>
                            </a-select>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="类别">
                            <a-input v-model="formData.category" :maxLength="10" allowClear placeholder="最多输入10个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="最小缩放">
                            <a-input-number v-model="formData.minZoom" :min="1" :max="20" :step="1" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="最大缩放">
                            <a-input-number v-model="formData.maxZoom" :min="1" :max="20" :step="1" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="文字缩放">
                            <a-input-number v-model="formData.textZoom" :min="1" :max="20" :step="1" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="排序">
                            <a-input-number v-model="formData.sort" :min="1" :max="999" :step="1" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="地图图标">
                            <a-input v-model="formData.icon" :maxLength="100" allowClear placeholder="最多输入100个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="控制图标">
                            <a-input v-model="formData.iconFont" :maxLength="100" allowClear placeholder="最多输入100个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="是否首页" prop="cluster">
                            <a-switch size="large" v-model="formData.cluster">
                                <a-icon type="check" slot="open"></a-icon>
                                <a-icon type="close" slot="close"></a-icon>
                            </a-switch>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="聚合距离">
                            <a-input-number v-model="formData.distance" :min="0" :max="9999" :step="0.01" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="层级">
                            <a-input-number v-model="formData.level" :min="1" :max="99" :step="1" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="是否默认开启" prop="open">
                            <a-switch size="large" v-model="formData.open">
                                <a-icon type="check" slot="open"></a-icon>
                                <a-icon type="close" slot="close"></a-icon>
                            </a-switch>
                        </a-form-model-item>
                    </a-col>
                    <a-divider orientation="left">点</a-divider>
                    <a-col :span="12">
                        <a-form-model-item label="颜色">
                            <a-input v-model="formData.color" :maxLength="10" allowClear placeholder="最多输入10个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="文字颜色">
                            <a-input v-model="formData.textColor" :maxLength="10" allowClear placeholder="最多输入10个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-divider orientation="left">线</a-divider>
                    <a-col :span="12">
                        <a-form-model-item label="宽度">
                            <a-input-number v-model="formData.width" :min="1" :max="99" :step="1" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="偏移">
                            <a-input v-model="formData.offset" :maxLength="10" allowClear placeholder="最多输入10个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-divider orientation="left">面</a-divider>
                    <a-col :span="12">
                        <a-form-model-item label="边框颜色">
                            <a-input v-model="formData.borderColor" :maxLength="10" allowClear placeholder="最多输入10个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="背景颜色">
                            <a-input v-model="formData.backgroundColor" :maxLength="10" allowClear placeholder="最多输入10个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="不透明度">
                            <a-input-number v-model="formData.opacity" :min="0" :max="1" :step="0.01" />
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="12">
                        <a-form-model-item label="是否有箭头" prop="open">
                            <a-switch size="large" v-model="formData.arrow">
                                <a-icon type="check" slot="open"></a-icon>
                                <a-icon type="close" slot="close"></a-icon>
                            </a-switch>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="标签">
                            <a-input v-model="formData.tagName" :maxLength="100" allowClear placeholder="最多输入100个字符"/>
                        </a-form-model-item>
                    </a-col>
                    <a-col :span="24">
                        <a-form-model-item label="接口">
                            <a-input v-model="formData.dataUrl" :maxLength="100" allowClear placeholder="最多输入100个字符"/>
                        </a-form-model-item>
                    </a-col>
                </a-row>
                <a-row :gutter="24">
                    <a-col :span="24">
                        <a-form-model-item label="备注">
                            <a-textarea v-model="formData.remarks" :rows="4" :maxLength="100" placeholder="最多输入100个字符"/>
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
        <a-drawer
            :title="roles.drawerTitle"
            placement="right"
            :width="400"
            :closable="false"
            :visible="roles.drawerVisible"
            @close="rolesOnClose"
        >
            <a-tree
                checkable
                v-model="roles.checkedKeys"
                :tree-data="roles.data"
                @expand="onExpand"
                @check="onCheck"
            />
            <div class="page-drawer-footer">
                <a-button style="margin-right: 8px" @click="rolesOnClose">关闭</a-button>
                <a-button type="primary" :loading="roles.submitLoading" @click="rolesHandleSubmit()">保存</a-button>
            </div>
        </a-drawer>
    </div>
</template>
<script>
import {GetDictLabelByValue, RenderDictSelect} from '@/api/dict';
export default {
    name: "layer",
    data() {
        return {
            inline: 'inline',
            vertical: 'vertical',
            drawerVisible: false,
            saveLoading: false,
            skeletonLoading: false,
            loading: false,
            drawerTitle: "新增",
            selectedId: "",
            roles: {
                drawerTitle: "角色分配",
                drawerVisible: false,
                submitLoading: false,
                data: [],
                checkedKeys: [],

            },
            searchConditions: {
                name: "",
            },
            formData: {
                id: '',
                name: '',//名称
                component: '',
                module: '',
                shape: '',//形状
                type: '',//类型  动态:静态
                category: '',//类别 信号机;视频监控等
                minZoom: 0,//最小缩放
                maxZoom: 0,//最大缩放
                textZoom: 0,//文字缩放
                icon: '',//图标
                color: '',//颜色
                textColor: '',
                width: 0,//宽度
                offset: 0,//偏移
                sort: 0,//排序
                level: 0,
                arrow: false,//是否有箭头
                open: false,//默认是否开启
                cluster: false,//是否聚合
                distance: 0,
                borderColor: '',//边框颜色
                backgroundColor: '',//背景颜色
                opacity: 0.0,//不透明度
                shapeLabel: '',//形状名称
                iconFont: '',//图标字体
                dataUrl: '',//数据接口
                tagName: '',//标签名称
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
                    type: "selection",
                    width: 60,
                    align: "center"
                },
                {
                    title: '名称',
                    dataIndex: 'name',
                    key: 'name',
                }, {
                    title: '形状',
                    key: 'shape',
                    dataIndex: 'shape',
                }, {
                    key: "category",
                    dataIndex: "category",
                    title: "类别"
                }, {
                    key: "minZoom",
                    dataIndex: "minZoom",
                    title: "最小缩放"
                }, {
                    key: "maxZoom",
                    dataIndex: "maxZoom",
                    title: "最大缩放"
                }, {
                    key: "textZoom",
                    dataIndex: "textZoom",
                    title: "文字缩放"
                }, {
                    key: "icon",
                    dataIndex: "icon",
                    title: "图层图标"
                }, {
                    key: "iconFont",
                    dataIndex: "iconFont",
                    title: "图层控制图标"
                }, {
                    key: "opacity",
                    dataIndex: "opacity",
                    title: "不透明度"
                }, {
                    key: "level",
                    dataIndex: "level",
                    title: "层级"
                }, {
                    key: "sort",
                    dataIndex: "sort",
                    title: "排序"
                }, {
                    title: '操作',
                    width: 200,
                    key: 'action',
                    scopedSlots: {customRender: 'action'},
                }
            ],
            shapeList: [
                {
                    value: "1",
                    label: "点"
                },
                {
                    value: "2",
                    label: "线"
                },
                {
                    value: "3",
                    label: "面"
                }
            ],
            typeList: [
                {
                    value: "1",
                    label: "静态"
                },
                {
                    value: "2",
                    label: "动态"
                }
            ],
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
        renderTable(params = {}) {
            this.loading = true;
            this.$http({
                url: '/zuul/upm/layer/page',
                method: "get",
                ...params
            }).then(result => {
                if (result.data.success) {
                    this.initTable = result.data.data.results
                    this.pagination.total = result.data.data.total
                } else {
                    this.initTable = [];
                }
                this.loading = false;
                this.skeletonLoading = false;
            });
        },
        //显示新增表单
        add() {
            this.drawerTitle = "新增";
            this.resetForm();
            this.drawerVisible = true;
        },
        //修改
        edit(id) {
            this.drawerTitle = "修改";
            this.resetForm();
            this.$http({
                url: '/zuul/upm/layer/' + id,
                method: 'get',
            }).then(result => {
                if (result.data.success) {
                    this.formData = result.data.data;
                    this.drawerVisible = true;
                }
            })
        },
        //关闭抽屉
        onClose() {
            this.drawerVisible = false;
            //this.$refs["ruleForm"].resetFields();
        },
        //重置新增表单
        resetForm() {
            this.formParams = {}
        },
        //保存
        handleSubmit() {
            this.$http({
                url: "/zuul/upm/layer",
                method: "post",
                data: this.formData
            }).then(result => {
                if (result.data.success) {
                    this.$notification.success({
                        message: '保存成功',
                        description: result.data.message,
                        duration: 5,
                    })
                    this.renderTable();
                } else {
                    this.$notification.error({
                        message: '保存失败',
                        description: result.data.message,
                        duration: 5,
                    })
                }
                this.drawerVisible = false;
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
                            // this.queryParams.page = GetPageByDelete(this.queryParams.page, this.tableData.length, 1)
                            _this.handleSearch();
                        } else {
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
        role(row) {
            this.roles.drawerVisible = true;
            this.roles.drawerTitle = "【" + row.name +"】图层角色分配"
            this.$http({
                url: "/zuul/upm/layer/roles/" + row.id,
                method: "get",
            }).then(result => {
                console.log(result.data);
                if (result.data.success) {
                    this.roles.data = result.data.data.treeData;
                    this.roles.checkedKeys = result.data.data.roleIdList;
                    this.selectedId = row.id
                }
            });
        },
        rolesOnClose() {
            this.roles.drawerVisible = false;
            //this.$refs["ruleForm"].resetFields();
        },
        rolesHandleSubmit() {
            console.log(this.roles.checkedKeys)
            let roleIdList = []
            for (let i = 0; i < this.roles.checkedKeys.length; i++) {
                roleIdList.push(this.roles.checkedKeys[i])
            }
            this.$http({
                url: "/zuul/upm/layer/roles/" + this.selectedId,
                method: "post",
                data: roleIdList
            }).then(result => {
                if (result.data.success) {
                    this.$notification.success({
                        message: '保存成功',
                        description: result.data.message,
                        duration: 5,
                    })
                } else {
                    this.$notification.error({
                        message: '保存失败',
                        description: result.data.message,
                        duration: 5,
                    })
                }
                this.roles.drawerVisible = false;
            });
        },
        init() {
        },
        onExpand(expandedKeys) {
            console.log('onExpand', expandedKeys);
            // if not set autoExpandParent to false, if children expanded, parent can not collapse.
            // or, you can remove all expanded children keys.
            this.expandedKeys = expandedKeys;
            this.autoExpandParent = false;
        },
        onCheck(checkedKeys) {
            console.log('onCheck', checkedKeys);
            console.log('onCheck', this.roles.checkedKeys);
            //this.roles.checkedKeys = checkedKeys;
        },
        onSelect(selectedKeys, info) {
            console.log('onSelect', info);
            this.selectedKeys = selectedKeys;
        },
    },
    mounted() {
        this.skeletonLoading = true;
        this.init();
        this.renderTable();
    }
};
</script>
