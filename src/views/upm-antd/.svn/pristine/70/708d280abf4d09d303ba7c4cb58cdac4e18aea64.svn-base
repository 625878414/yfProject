<template>
    <div id="file">
        <a-layout>
            <a-layout-sider theme="light" :style="{ height: '100vh', borderWidth: 0}">
                <div style="height:48px;line-height:48px;font-size:14px;text-indent: 4px;border-bottom: 1px solid rgb(235, 237, 240);background-color: #f5f5f5;padding-left:20px">
                    <h3>
                        <a-icon type="snippets" />
                        文件管理
                    </h3>
                </div>
                <a-menu
                        style="height: 100vh; background-color: #f5f5f5;border-width: 0"
                        :default-selected-keys="['ltp']"
                        mode="inline"
                        theme="light"
                        @click="handleClickMenu"
                >
                    <template v-for="item in menuList">
                        <a-menu-item :key="item.key">
                            <a-icon :type="item.icon"/>
                            {{item.title}}
                        </a-menu-item>
                    </template>
                </a-menu>
            </a-layout-sider>
            <a-layout>
                <a-layout-content style="background-color: white">
                    <div style="padding: 5px 20px;">
                        <div class="toolbar">
                            <a-upload
                                    name="file"
                                    :multiple="true"
                                    :action="uploadUrl"
                                    :showUploadList="false"
                                    @change="handleChange"
                            >
                                <a-button type="primary">
                                    <a-icon type="upload"/>
                                    上传
                                </a-button>
                            </a-upload>
                            <a-button icon="folder-add" @click="createFolder">
                                新建文件夹
                            </a-button>
                            <a-button type="danger" v-if="hasSelected" icon="delete">
                                删除
                            </a-button>
                            <template v-if="hasSelected">
                                {{ `已选中 ${selectedRowKeys.length} 个文件/文件夹` }}
                            </template>
                            <div class="right">
                                <a-space :size="size">
                                    <a-input v-model="searchConditions.name" allowClear placeholder="请输入文件称查询" @change="handleSearch" style="width: 200px;">
                                        <a-icon slot="suffix" type="search"/>
                                    </a-input>
                                    <!--<a-button type="link" icon="appstore"/>
                                    <a-button type="link" icon="sort-ascending"/>
                                    <a-button type="link" icon="sort-descending"/>-->
                                </a-space>
                            </div>
                            <div class="clear"></div>
                        </div>
                        <div>
                            <div style="float: left">
                                <a-breadcrumb>
                                    <a-breadcrumb-item href="">
                                        <a-icon v-if="currentPrefix == ''" type="home"/>
                                        <a v-else @click="renderTable(currentBucket, lastPrefix)">
                                            返回上一级
                                        </a>
                                    </a-breadcrumb-item>
                                    <a-breadcrumb-item href="">
                                        <a-icon type="cloud"/>
                                        <span>{{currentBucket}}</span>
                                    </a-breadcrumb-item>
                                    <a-breadcrumb-item>
                                        {{currentPrefix}}
                                    </a-breadcrumb-item>
                                </a-breadcrumb>
                            </div>
                            <div style="float: right">
                                已全部加载，共{{dataSize}}个
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <a-table
                            :v-show="isShow"
                            :columns="columns"
                            :rowKey="record => record.objectName"
                            :dataSource="dataTables"
                            :loading="loading"
                            :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                            size="middle"

                    >
                        <template slot-scope="text, record" slot="name">
                            <div class="objectName" style="position: relative">
                                <a-icon v-if="record.dir" type="folder" theme="filled" :style="{ fontSize: '20px', color: '#ffd659'}"/>
                                <a-icon v-else-if="record.pic" type="file-image"/>
                                <a-icon v-else type="file"/>
                                <a v-if="record.dir" style="margin-left:10px" @click="renderTable(currentBucket, record.objectName)">{{ record.name }}</a>
                                <a-tooltip v-else placement="right">
                                    <template slot="title">
                                        {{record.viewUrl}}
                                    </template>
                                    <a style="margin-left:10px" @click="handleView(record.viewUrl)">{{ record.name }}</a>
                                </a-tooltip>
                                <div class="action" style="position: absolute;right:0;top:-5px;">
                                    <a-button v-if="!record.dir" type="link" icon="download" @click="handleDownload(record.downloadUrl)"/>
                                    <a-button type="link" icon="delete" @click="handleRemove(record.removeUrl)"/>
                                </div>
                            </div>
                        </template>
                    </a-table>
                </a-layout-content>
            </a-layout>
        </a-layout>
        <a-modal v-model="imageModal" title="查看" @ok="handleOk">
            <div style="text-align: center">
                <img :src="viewImageUrl" style="max-width: 480px"/>
            </div>
        </a-modal>
        <a-modal v-model="folderModal" title="新建文件夹" @ok="handleCreateFolder">
            <div style="text-align: center">
                <a-input v-model="newFolderName" placeholder="请输入正确的文件夹名" />
            </div>
        </a-modal>
    </div>
</template>

<script>
    import {GetDictLabelByValue, RenderUserDict, RenderOfficeDict} from "@/api/dict";
    /*import ImgCanvas from "../gis/components/imgCanvas";*/

    export default {
        name: "userLog",
        data() {
            return {
                size: 'small',
                loading: false,
                imageModal: false,
                folderModal: false,
                searchConditions: {
                    name: '',
                    loginName: ''
                },
                currentBucket: '',
                currentPrefix: '',
                uploadUrl: '',
                lastPrefix: '',
                dataTables: [],
                dataSize: 0,
                theme: 'light',
                isShow: true,
                newFolderName: '',
                viewImageUrl: '',
                menuList: [],
                selectedRowKeys: [],
                fileName: '123',
                columns: [
                    {
                        dataIndex: 'name',
                        key: "name",
                        title: "文件名",
                        ellipsis: true,
                        scopedSlots: {customRender: 'name'},
                    }, {
                        dataIndex: 'size',
                        key: "size",
                        title: "大小",
                        sorter: (a, b) => a.size - b.size,
                        sortDirections: ['descend', 'ascend'],
                        width: 150,
                    }, {
                        dataIndex: 'lastModified',
                        key: "lastModified",
                        title: "修改日期",
                        sorter: (a, b) => a.lastModified > b.lastModified,
                        sortDirections: ['descend', 'ascend'],
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
            }
        },
        watch: {},
        /*components: {ImgCanvas},*/
        computed: {
            'windowH'() {
                return this.$store.state.app.bodyHeight;
            },
            'windowW'() {
                return this.$store.state.app.bodyWidth;
            },
            hasSelected() {
                return this.selectedRowKeys.length > 0;
            },
            rowSelection() {
                return {
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
        methods: {
            init() {
            },

            renderBucket() {
                this.loading = true
                let _this = this
                this.$http({
                    url: '/zuul/file/oss',
                    method: 'get',
                }).then(result => {
                    console.log(result.data)
                    if (result.data.success) {
                        result.data.data.forEach(function (val, index, arr) {
                            //console.log(val, index, arr);
                            _this.menuList.push({
                                key: val.name,
                                title: val.name,
                                icon: "cloud",
                            })
                        });
                        _this.currentBucket = _this.menuList[0].key
                        this.renderTable(_this.menuList[0].key, '')
                    }
                    this.loading = false
                    //点击bucket后重置prefix
                    this.currentPrefix = ''
                })
            },
            renderTable(bucket, prefix) {
                //这里要传对象
                console.log("bucket=" + bucket)
                console.log("prefix=" + prefix)
                this.currentPrefix = prefix
                this.lastPrefix = this.getLastPrefix(this.currentPrefix)
                this.uploadUrl = "/zuul/file/oss/" + this.currentBucket + "/upload?prefix=" + this.currentPrefix
                this.loading = true
                this.$http({
                    url: '/zuul/file/oss/' + bucket + '/list',
                    method: 'get',
                    params: {
                        prefix: prefix
                    }
                }).then(result => {
                    if (result.data.success) {
                        console.log(result.data.data)
                        this.dataTables = result.data.data
                        this.dataSize = this.dataTables.length
                    }
                    this.loading = false
                })
            },
            handleClickMenu(e) {
                console.log('click ', e);
                this.currentBucket = e.key
                this.uploadUrl = "/zuul/file/oss/" + this.currentBucket + "/upload"
                this.renderTable(this.currentBucket, '')
            },
            handleClick() {
                this.loading = !this.loading;
            },
            handleChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    this.$message.success(`${info.file.name} 文件上传成功`);
                    this.renderTable(this.currentBucket, this.currentPrefix)

                } else if (info.file.status === 'error') {
                    this.$message.error(`${info.file.name} 文件上传失败.`);
                }
            },
            handleSearch(url) {
            },
            handleRemove(url) {
                this.$confirm({
                    title: '确定删除?',
                    content: 'Some descriptions',
                    okText: '确定',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk:()=>{
                        this.$http({
                            url: url,
                            method: 'delete',
                        }).then(result => {
                            if (result.data.success) {
                                console.log(result.data.data)
                                this.$message.success('文件删除成功');
                                this.renderTable(this.currentBucket, this.currentPrefix)
                            }
                        })
                    },
                    onCancel() {
                        console.log('Cancel');
                    },
                });
            },
            handleDownload(url) {
                location.href = url
            },
            handleView(url) {
                console.log(url)
                this.imageModal = true
                this.viewImageUrl = url
            },
            createFolder(){
                this.folderModal = true
                this.newFolderName = ''
            },
            handleOk() {

            },
            handleCreateFolder() {
                this.currentPrefix = this.currentPrefix + this.newFolderName + "/"
                this.folderModal = false
                this.renderTable(this.currentBucket, this.currentPrefix)
            },
            onSelectChange(selectedRowKeys) {
                console.log('selectedRowKeys changed: ', selectedRowKeys);
                this.selectedRowKeys = selectedRowKeys;
            },
            getLastPrefix(prefix) {
                let result = ''
                if (prefix.indexOf("/") > 0) {
                    let items = prefix.split("/")
                    if (items.length === 2) {
                        return "";
                    } else {
                        for (let i = 0; i < items.length - 2; i++) {
                            result += items[i] + "/"
                        }
                    }
                }
                return result
            },
        },
        mounted() {
            this.renderBucket()
        }
    }
</script>

<style scoped>
    #file .action {
        display: none;
    }

    #file .objectName:hover .action {
        display: block;
    }
</style>
