<template>
  <div class="api-auth">
    <div class="page-content-body">
      <div class="toolbar" style="height:32px">
        <a-space>
          <!-- <a-button type="danger"  icon="delete" >批量审批</a-button> -->
        </a-space>
        <div class="right" style="height:30px">
          <a-input
            v-model="searchConditions.entity.name"
            placeholder="请输入API名称查询"
            :maxLength="30"
            style="width: 200px"
            allowClear
            @change="handleSearch"
          ></a-input>
        </div>
      </div>
      <a-skeleton
        :loading="skeletonLoading"
        :paragraph="{ rows: 15 }"
        active
        style="background-color: white"
      >
        <a-table
          :columns="columns"
          :data-source="initTable"
          :rowKey="record => record.id"
          :loading="loading"
          size="middle"
          @change="handleTableChange"
          :pagination="pagination"
        >
          <template slot="action" slot-scope="text, record">
            <a-space>
              <a-button type="primary" size="small" @click="approve(record)">
                审核
              </a-button>
            </a-space>
          </template>
        </a-table>
      </a-skeleton>
    </div>
    <a-modal v-model="visible" title="审核" @ok="handleSubmit">
      <a-form-model ref="ruleForm" :model="formData" label-position="top" layout="vertical">
        <a-form-model-item label="API名称" prop="apiId">
          <h3>{{ formData.entity.name }}</h3>
        </a-form-model-item>
        <a-form-model-item label="审核结果" prop="apiId">
          <a-radio-group v-model="formData.status" default-value="1" button-style="solid">
            <a-radio-button value="1">
              通过
            </a-radio-button>
            <a-radio-button value="-1" >
              不通过
            </a-radio-button>
          </a-radio-group>
        </a-form-model-item>
        <!-- <a-form-model-item label="审核意见">
          <a-textarea
            v-model="formData.reviewRemark"
            placeholder="最多输入100个字符"
            :maxLength="100"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-model-item> -->
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "apiAuth",
  data() {
    return {
      visible: false,
      saveLoading: false,
      skeletonLoading: false,
      loading: false,
      selectedId: "",
      searchConditions: {
        entity: {
          name: ""
        }
      },
      pagination: {
        total: 0,
        current: 1, //当前页数
        size: "middle",
        hideOnSinglePage: false, //只有一页时是否隐藏分页器
        pageSize: 20, //每页条数
        showTotal: total => `共 ${total} 条`
      },
      selectedRows: [],
      selectedRowKeys: [],
      initTable: [],
      formData: {
        ids: "",
        apiId: "",
        reviewRemark: "",
        status: false,
        entity:{
            name:""
        }
      },
      columns: [
        // {
        //   type: "selection",
        //   width: 60,
        //   align: "center"
        // },
        {
          title: "API名称",
          dataIndex: "entity.name",
          key: "entity.name",
          width: 300,
          align:"center",
          ellipsis:true
        },
        {
          title: "调用次数",
          key: "requestCount",
          dataIndex: "requestCount",
          width:80,
          customRender:(text,record)=>{
              if(record.requestCountSwitch){
                  return "不限制"
              }else{
                  return text
              }
          },
          align:"center"
        },
        {
          key: "requestTimeStart",
          dataIndex: "requestTimeStart",
          title: "调用开始时间",
          customRender:(text,record)=>{
              if(record.requestTimeLimitSwitch){
                  return "不限制"
              }else{
                  return text
              }
          },
          width:180,
          align:"center"
        },
        {
          key: "requestTimeEnd",
          dataIndex: "requestTimeEnd",
          title: "调用结束时间",
          customRender:(text,record)=>{
              if(record.requestTimeLimitSwitch){
                  return "不限制"
              }else{
                  return text
              }
          },
          width:180,
          align:"center"
        },
        // {
        //   key: "createBy",
        //   dataIndex: "createBy",
        //   title: "申请人"
        // },
        {
          key: "createDate",
          dataIndex: "createDate",
          title: "申请时间",
          width:180,
          align:"center"
        },
        {
          title: "申请说明",
          dataIndex: "reviewRemark",
          key: "reviewRemark",
          width:600,
          align:"center",
          ellipsis:true
        },
        {
          key: "status",
          dataIndex: "status",
          title: "审核状态",
          customRender: (text, row, index) => {
            return this.statusDict[text];
          },
          width:100,
          align:"center"
        },
        {
          title: "操作",
          width: 200,
          key: "action",
          scopedSlots: { customRender: "action" },
          align:"center"
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
      statusDict: { "0": "待审核", "1": "审核通过", "-1": "审核不通过" }
    };
  },
  methods: {
    formInit() {
      this.formData = {
        ids: "",
        apiId: "",
        reviewRemark: "",
        status: false,
        entity:{
            name:""
        }
      };
      //清空select
      //this.$refs.type.clearSingleSelect();
    },
    approve(record) {
        console.log(record);
      this.formInit();
      this.formData.ids = record.id;
      this.formData.apiId = record.apiId;
      this.visible = true;
      this.formData.entity.name=record.entity.name
      this.formData.status=record.status
    },
    renderTable(params = {}) {
      this.loading = true;
      this.$http({
        url: "/zuul/api-management/authorization",
        method: "get",
        params: {
          size: this.pagination.pageSize,
          page: this.pagination.current - 1,
          "entity.name": this.searchConditions.entity.name
        }
      }).then(result => {
        if (result.data.success) {
          this.initTable = result.data.data.results;
          this.pagination.total = result.data.data.total;
        }
        this.loading = false;
      });
    },
    handleSubmit() {
      //this.$refs.formData.validate(valid => {
      //if (valid) {
        if(this.formData.status==='0'){
          this.$message.error("请选择审核结果",1)
          return
        }
      this.loading = true;
      this.$http({
        url: "/zuul/api-management/authorization/",
        method: "put",
        params: this.formData
      }).then(result => {
        if (result.data.success) {
          this.$notification["success"]({
            message: "操作成功",
            description: result.data.message
          });
          this.visible = false;
          this.renderTable();
        }
        this.loading = false;
      });
      /*} else {
                console.log('error submit!!');
                return false;
            }
        });*/
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.searchConditions.page = pagination.current - 1;
      this.pagination = pager;
      this.renderTable();
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRows = [];
      if (selectedRows.length > 0) {
        for (let i = 0; i < selectedRows.length; i++) {
          this.selectedRows.push(selectedRows[i].id);
        }
      }
      this.selectedRowKeys = selectedRowKeys;
    },
    handleSearch() {
      this.pagination.current = 1;
      this.searchConditions.page = 0;
      this.renderTable();
    }
  },
  mounted() {
    this.renderTable();
  }
};
</script>

<style scoped></style>
