<template>
  <div class="applyRecord">
    <div class="les-table-toolbar">
      <div>
        <a-input
          v-model="searchConditions.entity.name"
          placeholder="请输入API名称查询"
          :maxLength="30"
          style="width: 200px"
          allowClear
          @change="handleSearch"
        ></a-input>
        <a-select
          v-model="searchConditions.status"
          style="width: 150px; margin-left: 5px"
          allowClear
          placeholder="审核状态"
          @change="handleSearch"
        >
          <a-select-option value="1"> 审核通过 </a-select-option>
          <a-select-option value="-1"> 审核未通过 </a-select-option>
          <a-select-option value="0"> 待审核 </a-select-option>
        </a-select>
      </div>
    </div>
    <vue-scroll :style="'height:' + (bodyHeight - 110) + 'px;'">
      <a-table
        style="width: 100%"
        :columns="columns"
        :data-source="tableData"
        rowKey="id"
        :pagination="false"
        :loading="loading"
      >
        <template slot="applyUser" slot-scope="text, record">
          <span>
            {{ renderApplyUser(text) }}
          </span>
        </template>
      </a-table>
    </vue-scroll>
    <a-pagination
      :defaultPageSize="20"
      style="text-align: right; margin: 10px"
      :showQuickJumper="this.total > 20"
      :show-total="(total) => `共 ${total} 条`"
      :total="total"
      @change="pageChange"
      :current="currentPage"
    >
    </a-pagination>
  </div>
</template>

<script>
function debounce(fn, wait) {
  let timeout = null;
  wait = wait || 600;
  return function () {
    let that = this;
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(that);
    }, wait);
  };
}
export default {
  name: "applyRecord",
  data() {
    return {
      tableData: [],
      columns: [
        {
          title: "API名称",
          dataIndex: "entity.name",
          key: "entity.name",
          width: 300,
          align: "center",
          ellipsis: true,
        },
        {
          key: "createBy",
          dataIndex: "createBy",
          title: "申请人",
          scopedSlots: { customRender: "applyUser" },
          width:160
        },
        {
          key: "status",
          dataIndex: "status",
          title: "审核状态",
          customRender: (text, row, index) => {
            return this.statusDict[text];
          },
          width: 100,
          align: "center",
        },
        {
          key: "createDate",
          dataIndex: "createDate",
          title: "申请时间",
          width: 180,
          align: "center",
        },
        {
          title: "调用次数",
          key: "requestCount",
          dataIndex: "requestCount",
          width: 80,
          customRender: (text, record) => {
            if (record.requestCountSwitch) {
              return "不限制";
            } else {
              return text;
            }
          },
          align: "center",
        },
        {
          key: "requestTimeStart",
          dataIndex: "requestTimeStart",
          title: "调用开始时间",
          customRender: (text, record) => {
            if (record.requestTimeLimitSwitch) {
              return "不限制";
            } else {
              return text;
            }
          },
          width: 180,
          align: "center",
        },
        {
          key: "requestTimeEnd",
          dataIndex: "requestTimeEnd",
          title: "调用结束时间",
          customRender: (text, record) => {
            if (record.requestTimeLimitSwitch) {
              return "不限制";
            } else {
              return text;
            }
          },
          width: 180,
          align: "center",
        },
        {
          title: "申请说明",
          dataIndex: "reviewRemark",
          key: "reviewRemark",
          width: 400,
          align: "center",
          ellipsis: true,
        },
      ],
      total: 0,
      currentPage: 1,
      searchConditions: {
        status: undefined,
        page: 0,
        size: 20,
        entity: {
          name: "",
        },
      },
      loading: false,
      statusDict: { 0: "待审核", 1: "审核通过", "-1": "审核未通过" },
      userList: [],
    };
  },
  methods: {
    pageChange(currentPage) {
      this.currentPage = currentPage;
      this.searchConditions.page = currentPage - 1;
      console.log(this.searchConditions.page);
      this.renderTable();
    },
    renderTable() {
      this.loading = true;
      this.$http({
        url: "/zuul/api-management/authorization",
        method: "get",
        params: {
          page: this.searchConditions.page,
          size: this.searchConditions.size,
          status: this.searchConditions.status,
          userId: this.$store.state.user.userId,
          "entity.name": this.searchConditions.entity.name,
        },
      }).then((res) => {
        if (res.data.success) {
          console.log(res.data);
          this.tableData = res.data.data.results;
          this.total = res.data.data.total;
        }
        this.loading = false;
      });
    },
    handleSearch: debounce(function () {
      this.searchConditions.page = 0;
      this.currentPage = 1;
      this.renderTable();
    }, 500),
    getUserList() {
      this.$http({
        method: "get",
        url: "/zuul/upm/user",
        params: {
          size: 500,
        },
      }).then((res) => {
        if (res.data.success) {
          this.userList = res.data.data.results;
          console.log(this.userList);
        }
      });
    },
    renderApplyUser(text) {
      let str = "";
      this.userList.forEach((item) => {
        if (item.id === text) {
          // console.log(item.code);
          str = item.name;
        }
      });
      if (str) {
        return str;
      } else {
        return "--";
      }
    },
  },
  mounted() {
    this.renderTable();
    this.getUserList();
  },
  computed: {
    bodyHeight() {
      return this.$store.state.app.bodyHeight;
    },
  },
};
</script>

<style scoped lang="less">
.applyRecord {
  .les-table-toolbar {
    padding: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
