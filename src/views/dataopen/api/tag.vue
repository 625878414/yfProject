<template>
  <div class="dataopen-api-tag">
    <div class="page-content-body">
      <div class="toolbar">
        <a-space>
          <a-button type="primary" @click="add" icon="plus">新增</a-button>
          <a-button type="danger" @click="multiDelete" icon="delete">删除</a-button>
        </a-space>
        <div class="right">
          <a-input
            v-model="searchConditions.name"
            placeholder="名称"
            :maxLength="32"
            style="width: 200px;margin-right: 5px"
            allowClear
            @change="handleSearch"
          >
          </a-input>
        </div>
        <div class="clear"></div>
      </div>
      <a-skeleton :loading="skeletonLoading" :paragraph="{ rows: 20 }" active>
        <div>
          <a-row type="flex" justify="start" align="middle" :gutter="[0, 10]" class="wrapAll">
            <a-col :span="4" v-for="(item, index) in initTable" :key="index">
              <a-card :title="item.name" hoverable style="width: 300px">
                <template slot="actions" class="ant-card-actions">
                  <a-checkbox
                    :checked="item.checked"
                    @click="toggleChecked(item.id)"
                    @change="onChange(item.id)"
                  />
                  <a-icon key="edit" type="edit" @click="edit(item.id)" />
                  <a-icon key="ellipsis" type="delete" @click="del(item.id)" />
                </template>
                <p style="word-break:break-all">{{ item.remarks }}</p>
              </a-card>
            </a-col>
          </a-row>
          <div class="pagination-bottom">
            <a-pagination
              :default-current="1"
              :current="current"
              :total="total"
              :page-size="18"
              :show-total="total => `共 ${total} 条`"
              :hideOnSinglePage="true"
              @change="onPageChange"
            />
          </div>
        </div>
      </a-skeleton>
    </div>

    <a-modal
      class="les-drawer-form"
      :title="drawerTitle"
      :width="500"
      :visible="visible"
      ok-text="保存"
      @ok="save"
      @cancel="onClose"
    >
      <a-form-model
        :form="formDrawer"
        :layout="vertical"
        ref="ruleForm"
        :model="formData"
        :rules="formRules"
      >
        <a-form-model-item label="名称" prop="name">
          <a-input
            v-model="formData.name"
            clearable
            :maxLength="10"
            placeholder="最多输入10个字符"
          />
        </a-form-model-item>
        <a-form-model-item label="备注" prop="remarks">
          <a-textarea
            v-model="formData.remarks"
            :maxLength="100"
            placeholder="最多输入100个字符"
            :rows="5"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "tag",
  data() {
    return {
      vertical: "vertical",
      formDrawer: this.$form.createForm(this),
      visible: false,
      saveLoading: false,
      skeletonLoading: false,
      loading: false,
      drawerTitle: "新增",
      searchConditions: {
        size: 18,
        page: 0,
        name: ""
      },
      // pagination: {
      total: 0,
      current: 1, //当前页数
      size: "middle",
      hideOnSinglePage: true, //只有一页时是否隐藏分页器
      pageSize: 18, //每页条数
      // },
      selectedRows: [],
      initTable: [],
      formData: {
        name: ""
      },
      formRules: {
        name: [{ required: true, message: "必填", trigger: "change" }]
      },
      newObject: {
        checked: true,
        createBy: null,
        createDate: "",
        delFlag: "",
        id: "",
        name: "",
        sort: 0,
        updateBy: null,
        updateDate: ""
      },
      isAdd:true
    };
  },
  methods: {
    //查询
    renderTable() {
      this.loading = true;
      this.$http({
        url: "/zuul/api-management/tag",
        method: "get",
        params: this.searchConditions
      }).then(res => {
        if (true) {
          var data = res.data.data.results;
          this.total = res.data.data.total;
          if (data.length > 0) {
            this.initTable = data;
            this.initTable.forEach((item, index) => {
              item.checked = false;
            });
          } else {
            this.initTable = [];
            this.$message.info("暂无数据");
          }
        } else {
          this.$message.error("查询错误");
          this.initTable = [];
        }
        this.loading = false;
        this.skeletonLoading = false;
      });
    },
    handleSearch() {
      this.current = 1;
      this.searchConditions.page = 0;
      this.selectedRows = [];
      this.renderTable();
    },
    //显示新增表单
    add() {
      this.drawerTitle = "新增";
      this.resetFormParams();
      this.visible = true;
      this.isAdd=true
    },
    //修改
    edit(id) {
      this.drawerTitle = "修改";
      this.isAdd=false
      this.resetFormParams();
      this.visible = true;
      this.$http({
        url: "/zuul/api-management/tag/" + id,
        method: "get"
      }).then(result => {
        if (result.data.success) {
          this.formData = result.data.data;
        }
      });
    },
    //保存
    save() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let isReapt = this.initTable.some(item => {
          return item.name === this.formData.name;
        });
        if (isReapt && !this.formData.id) {
          this.$message.error("此标签已存在");
          return;
        }
        let initTableFilter=this.initTable.filter(item=>{
            return item.id!==this.formData.id
        })
        console.log(initTableFilter);
        let editReapt=initTableFilter.some(item=>{
            return item.name===this.formData.name
        })
        if(editReapt){
            this.$message.error("此标签已存在");
          return;
        }
          this.saveLoading=true
          this.$http({
              url: "/zuul/api-management/tag/",
              method: "post",
              data: this.formData
            }).then(res => {
              if (res.data.success) {
                this.$notification["success"]({
                  message: "保存成功",
                  description: res.data.message
                });
                this.visible = false;
                this.handleSearch();
              } else {
                this.$notification["error"]({
                  message: "保存失败",
                  description: res.data.message
                });
              }
              this.saveLoading = false;
            });
        }
      });
    },
    //单个删除
    del(id) {
      var _this = this;
      this.$confirm({
        title: "信息提示",
        content: "确定删除此条信息?",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          _this
            .$http({
              url: "/zuul/api-management/tag/" + id,
              method: "delete"
            })
            .then(result => {
              if (result.data.success) {
                _this.$notification["success"]({
                  message: "删除成功",
                  // description: result.data.message
                });
                _this.handleSearch();
              } else {
                _this.$notification["error"]({
                  message: "删除失败",
                  description: result.data.message
                });
              }
            });
        },
        onCancel() {}
      });
    },
    //批量删除
    multiDelete() {
      var _this = this;
      if (this.selectedRows.length === 0) {
        this.$message.warning("请至少选择一项");
      } else {
        this.$confirm({
          title: "信息提示",
          content: "确定删除?",
          okText: "确定",
          okType: "primary",
          cancelText: "取消",
          onOk() {
            _this
              .$http({
                url: "/zuul/api-management/tag/",
                method: "delete",
                data: _this.selectedRows
              })
              .then(res => {
                if (res.data.success) {
                  _this.$notification["success"]({
                    message: "删除成功",
                    description: res.data.message
                  });
                  _this.handleSearch();
                } else {
                  _this.$notification["error"]({
                    message: "删除失败",
                    description: res.data.message
                  });
                }
              });
          },
          onCancel() {}
        });
      }
    },
    //关闭抽屉
    onClose() {
      this.visible = false;
      this.$refs["ruleForm"].resetFields();
    },
    //重置新增表单
    resetFormParams() {
      this.formData = {
        name: ""
      };
    },
    //分页change
    onPageChange(currents) {
      const current = currents;
      const pageSize = this.pageSize;
      this.current = currents;
      this.searchConditions.page = currents - 1;
      this.searchConditions.size = this.pageSize;
      this.renderTable();
    },
    //多选
    onChange(id) {
      if (this.selectedRows.length > 0) {
        let newArr = this.selectedRows.filter((item, i) => {
          return item == id;
        });
        if (newArr.length == 0) {
          this.selectedRows.push(id);
        } else {
          this.selectedRows = this.selectedRows.filter((item, i) => {
            return item != id;
          });
        }
      } else {
        this.selectedRows.push(id);
      }
    },
    toggleChecked(id) {
      let _this = this;
      _this.initTable.forEach((item, index) => {
        if (item.id == id) {
          item.checked = !item.checked;
          this.newObject = item;
          this.$set(this.initTable, index, this.newObject);
        }
      });
    }
  },
  mounted() {
    this.skeletonLoading = true;
    this.renderTable();
  }
};
</script>

<style scoped lang="less">
.dataopen-api-tag {
  body {
    background-color: white;
  }

  .pagination-bottom {
    margin-top: 20px;
    margin-left: 80%;
  }
}
</style>
