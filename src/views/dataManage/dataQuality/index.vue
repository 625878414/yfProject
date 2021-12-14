<template>
  <div class="dataQuality-index">
    <!-- 标题 -->
    <div class="title">
      <img src="../assets/image/title.png" alt="" />
    </div>
    <div class="content" :style="'height:' + (bodyHeight - 70) + 'px;'">
      <div class="les-table-toolbar">
        <div style="height:40px;width:400px">
          <img src="../assets/image/project.png" style="width:100%;height:100%" alt="" />
        </div>
        <div>
          <a-button type="primary" ghost style="margin-right:5px" size="large" @click="add"
            >创建项目</a-button
          >
          <a-button type="primary" ghost size="large" @click="toList">项目列表</a-button>
        </div>
      </div>
      <div class="card">
        <div class="card-1" v-for="(item, index) in projectList" :key="index">
          <a-card>
            <template slot="title">
              <div class="card-title">
                <div>
                  <div style="color:#D5D4D2">{{ item.alias }}</div>
                  <div style="color:#7B8CA4">{{ item.name }}</div>
                </div>
                <div>
                  <img src="../assets/image/card.png" alt="" />
                </div>
              </div>
            </template>
            <div class="card-content">
              <div>
                <span style="color:#7B8CA4;margin-right:5px">创建时间 : </span>
                <span style="color:#0aa1ed">{{ item.createdTime }}</span>
              </div>
              <div style="height:195px;text-align:left">
                <span style="color:#7B8CA4;margin-right:5px;">项目描述 : </span>
                <span style="color:#0aa1ed;word-break:break-all">{{ item.description }}</span>
              </div>
            </div>
            <div class="card-bottom">
              <a-button
                type="primary"
                ghost
                style="width:150px;margin-right:20px"
                @click="toRules(item)"
                >规则配置</a-button
              >
              <a-button type="primary" ghost style="width:150px" @click="toTask(item)"
                >任务查询</a-button
              >
            </div>
          </a-card>
        </div>
        <div class="card-2" v-for="index of 3 - projectList.length" :key="index">
          <div>
            <div style="color:#7B8CA4;font-size:18px">
              暂无项目
            </div>
            <div>
              <a-button type="primary" @click="add" ghost style="width:240px;margin-top:10px">
                <a-icon type="plus"> </a-icon>
                <span>新增项目</span>
              </a-button>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <!-- <img src="../assets/image/a.jpg" alt=""> -->
      </div>
    </div>
    <a-modal v-model="addVisible" title="新增项目" :maskClosable="false" centered>
      <template slot="footer">
        <a-button @click="addCancel"> 返回 </a-button>
        <a-button type="primary" @click="save" :loading="btnLoading">
          确定
        </a-button>
      </template>
      <a-form-model
        layout="horizontal"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 14 }"
        :model="formData"
        :rules="ruleValidate"
        ref="formModel"
      >
        <a-form-model-item label="名称" prop="name">
          <a-input v-model="formData.name" placeholder="请输入名称" :maxLength="10"> </a-input>
        </a-form-model-item>
        <a-form-model-item
          label="别名"
          prop="alias"
        >
          <a-input v-model="formData.alias" :maxLength="10" placeholder="请输入别名"> </a-input>
        </a-form-model-item>
        <a-form-model-item label="常用排序">
          <a-input-number v-model="formData.sort" style="width:100%" :max="100" :min="0" :precision="0"> </a-input-number>
        </a-form-model-item>
        <a-form-model-item label="项目描述">
          <a-input
            v-model="formData.description"
            placeholder="请输入描述"
            type="textarea"
            :maxLength="100"
          >
          </a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "dataQuality-index",
  data() {
    return {
      projectList: [],
      addVisible: false,
      formData: {
        name: "",
        alias: "",
        description: "",
        sort: 0
      },
      ruleValidate: {
        name: [{ required: true, message: "必填", trigger: "change" }],
        alias: [{ required: true, message: "必填", trigger: "change" }]
      },
      btnLoading: false
    };
  },
  methods: {
    add() {
      this.addVisible = true;
      try {
        this.$refs.formModel.resetFields();
      } catch (error) {
        
      }
    },
    addCancel() {
      this.formData = {
        name: "",
        alias: "",
        description: "",
        sort: 0
      };
      this.addVisible = false;
      this.$refs.formModel.resetFields();
    },
    save() {
      this.$refs.formModel.validate(valid => {
        if (valid) {
          this.btnLoading = true;
          this.$http({
            method: "post",
            url: "/zuul/lmanage/dataQuality/project/save",
            data: this.formData
          }).then(res => {
            if (res.data.success) {
              this.$notification.success({
                message: "操作成功",
                duration: 2
              });
              // this.currentPage = 1;
              this.btnLoading = false;
              this.addVisible = false;
              this.renderCard();
            } else {
              this.$notification.error({
                message: "操作失败",
                duration: 2
              });
              this.btnLoading = false;
            }
          });
        }
      });
    },
    toList() {
      this.$router.push({
        path: "/dataManage/dataQuality/projectList"
      });
    },
    //跳转至规则列表页面,并且将此项目的ID保存到localStorage中
    toRules(item) {
      this.$router.push({
        path: "/dataManage/dataQuality/rules",
        query: {
          id: item.id
        }
      });
      localStorage.setItem("projectId", item.id);
      localStorage.setItem("projectName", item.alias);
    },
    renderCard() {
      this.$http({
        method: "get",
        url: "/zuul/lmanage/dataQuality/project/page",
        params: {
          size: 3,
          page: 0
        }
      }).then(res => {
        if (res.data.success) {
          console.log(res.data);
          this.projectList = res.data.data.results;
        }
      });
    },
    //跳转至任务列表页面,并且将此项目的ID保存到localStorage中
    toTask(item) {
      this.$router.push({
        path: "/dataManage/dataQuality/task",
        query: {
          id: item.id
        }
      });
      localStorage.setItem("projectId", item.id);
      localStorage.setItem("projectName", item.alias);
    }
  },
  mounted() {
    this.renderCard();
  },
  computed: {
    bodyHeight() {
      return this.$store.state.app.bodyHeight;
    }
  }
};
</script>

<style scoped lang="less">
.dataQuality-index {
  .title {
    // background-color: #fff;
    color: #fff;
    font-size: 1.875rem;
    img {
      width: 100%;
    }
  }
  .content {
    background-color: #0c0f26;
  }
  .les-table-toolbar {
    padding: 50px;
    display: flex;
    justify-content: space-between;
    background-color: #0c0f26;
  }
  .card {
    background-color: #12173f;
    padding: 40px;
    display: flex;
    justify-content: space-around;
    .card-1 {
      width: 600px;
    }
    .card-title {
      display: flex;
      justify-content: space-around;
      font-family: "PMZD";
      src: url("../assets/font/PangMenZhengDaoBiaoTiTi-1.ttf");
      font-size: 2.5rem;
      color: #fff;
    }
    /deep/ .ant-card-bordered {
      border: 1px solid #344286;
    }
    /deep/.ant-card {
      background-color: #12173f;
    }
    /deep/ .ant-card-head {
      border-bottom: none;
    }
    /deep/ .ant-card-body {
      padding-top: 0px;
    }
    .card-content {
      font-size: 1.875rem;
      color: #fff;
      text-align: left;
      margin-top: 4.2857rem;
    }
    .card-bottom {
      text-align: center;
      padding-top: 20px;
    }
  }
  .footer {
    background-image: url("../assets/image/a.jpg");
    background-size: 100%, 100%;
    width: 100%;
    height: 40%;
    background-repeat: no-repeat;
  }
  .card-2 {
    height: 291px;
    border: 1px solid #344286;
    width: 598px;
    border-radius: 3px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
/deep/.bread-header {
  padding: 20px;
  .ant-breadcrumb {
    font-size: 1.25rem;
  }
}
</style>
