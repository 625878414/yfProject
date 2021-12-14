<style scoped lang="less">
/deep/ .myCheck .ant-form-explain {
  width: 100px;
}
.dataStandard {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  background-color: #f2f7fa;
  /deep/ .ant-spin-nested-loading > div > .ant-spin .ant-spin-dot {
    top: 200px;
  }
}
.catalog {
  background-color: #fff;
  width: 15%;
  margin-left: 1.429rem;
  margin-top: 1.429rem;
  margin-right: 1.429rem;
  text-align: center;
  min-width: 20.571rem;
  height: 95%;
  box-shadow: 1px 1px 5px #6da2c0;
  .bar {
    width: 100%;
    padding: 1.429rem;
    // margin: 0 auto;
    // height: 5.571rem;
    text-align: left;
    position: relative;
    span:first-child {
      margin-right: 0.714rem;
      margin-left: 0.714rem;
      width: 10.714rem;
    }
    .add {
      position: absolute;
      top: 1.857rem;
    }
  }
}
.table {
  background-color: #fff;
  margin-top: 1.429rem;
  width: 82%;
  height: 95%;
  box-shadow: 1px 1px 5px #6da2c0;
}
.tree {
  width: 65%;
  margin-bottom: 0.714rem;
  margin-left: 1.429rem;
  .ant-tree {
    font-size: 1.071rem;
    margin-left: 1.429rem;
    /deep/.ant-tree-node-content-wrapper.ant-tree-node-selected {
      background-color: #fff;
      color: red;
    }
    /deep/.ant-tree-node-content-wrapper:hover {
      background-color: #fff;
      // color: #0aa1ed;
    }
  }
  /deep/.ant-tree.ant-tree-show-line li {
    text-align: left;
  }
}
.action {
  .title {
    width: 7.143rem;
    display: inline-block;
    text-align: left;
    color: rgba(0, 0, 0, 0.65);
    &:hover {
      color: #0aa1ed;
    }
  }
  .icon1 {
    // margin-left: 2.143rem;
    color: #a3a3a3;
  }
  .icon1:hover {
    color: #0aa1ed;
  }
}
.icon {
  width: 10rem;
  text-align: left;
}
.icon_close :hover {
  color: #0aa1ed;
}
.icon_check :hover {
  color: #0aa1ed;
}
.icon_close,
.icon_check {
  color: #a3a3a3;
  margin-right: 0.357rem;
}
.editInput {
  padding: 0;
  margin-right: 5px;
  height: 24px;
}
.icon .point {
  display: none;
}
.icon:hover .point {
  display: inline-block;
}
.point {
  margin-left: 1.429rem;
}
.catalog_title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 11.429rem;
}
.status {
  display: inline-block;
  /* width: 10px;
  height: 10px; */
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #e8e8e8;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  margin-left: 18px;
  margin-top: 5px;
  margin-right: 5px;
  user-select: none;
}
/deep/.button_release.ant-btn {
  background-color: #0ae728;
  color: #fff;
}
/deep/.standardDetails .ant-descriptions-item-content {
  width: 85%;
}
/deep/.standardDetails .ant-descriptions-title {
  margin-bottom: 1rem;
}
</style>
<template>
  <div class="dataStandard" :style="'height:' + bodyHeight + 'px'">
    <!-- 左侧目录 -->
    <div class="catalog">
      <!-- 目录的新增和搜索 -->
      <div class="bar">
        <span>
          <a-input-search
            v-model="searchStr"
            placeholder="输入目录名"
            @change="onSearch"
            :maxLength="20"
          ></a-input-search>
        </span>
        <span class="add">
          <a-icon type="plus-circle" style="font-size: 20px" @click="addFirstItem"></a-icon>
        </span>
      </div>
      <!-- 树形控件 -->
      <a-spin :spinning="treeLoading" class="treeLoading">
        <vue-scroll :style="'height:' + (bodyHeight - 120) + 'px'">
          <div class="tree" :style="'height:' + (bodyHeight - 130) + 'px'">
            <a-tree
              v-model="checkedKeys"
              :treeData="treeSource"
              :selectedKeys="selectedKeys"
              :expandedKeys="expandedKeys"
              @expand="onExpand"
              :autoExpandParent="autoExpandParent"
              :replaceFields="replaceFields"
              @select="onSelect"
              @onCheck="onCheck"
              show-line
            >
              <a-icon slot="icon" type="carry-out" />
              <!-- 插槽名称写死为custom,需要传入的treeSource中需要用到自定义插槽的对象中增加scopedSlots: { title: "custom" }属性 -->
              <template slot="custom" slot-scope="item">
                <span v-if="item.isEdit">
                  <a-input
                    ref="new"
                    type="text"
                    class="editInput"
                    v-model.trim="newItem"
                    @pressEnter="addConfirm(item)"
                    :maxLength="8"
                    placeholder="目录最多8个字符"
                    @click.stop=""
                  />
                  <!-- 需要阻止事件冒泡,不然点击确定或者取消会继承父元素的select事件 -->
                  <a-icon
                    type="close-circle"
                    @click.stop="addCancel(item)"
                    style="margin-right: 10px; color: #0aa1ed"
                  />
                  <a-icon
                    type="check-circle"
                    @click.stop="addConfirm(item)"
                    style="color: #0aa1ed"
                  />
                </span>
                <div v-else>
                  <div class="icon">
                    <!-- <span class="title">{{ item.title }}</span> -->
                    <span
                      v-html="
                        item.name.replace(
                          new RegExp(searchValue, 'g'),
                          '<span style=background-color:#E8E01F>' + searchValue + '</span>'
                        )
                      "
                      class="catalog_title"
                    ></span>
                    <span class="point">
                      <a-dropdown>
                        <img src="./assets/icon/point.png" alt="" srcset="" @click.stop />
                        <a-menu slot="overlay">
                          <a-menu-item @click="addItem(item)">
                            <a-icon type="plus" />
                            <span>新增</span>
                          </a-menu-item>
                          <a-menu-item @click="editItem(item)">
                            <a-icon type="edit" />
                            <span>修改</span>
                          </a-menu-item>
                          <a-menu-item @click="deleteItem(item)">
                            <a-icon type="delete" />
                            <span>删除</span>
                          </a-menu-item>
                        </a-menu>
                      </a-dropdown>
                    </span>
                  </div>
                </div>
              </template>
            </a-tree>
          </div>
        </vue-scroll>
      </a-spin>
    </div>
    <!-- 右侧表格-->
    <div class="table">
      <div class="les-table-toolbar">
        <a-button-group>
          <a-button type="primary" icon="plus" @click="addStandard">
            新增
          </a-button>
        </a-button-group>
        <div>
          <a-input
            placeholder="中文名称"
            :maxLength="10"
            style="width: 150px; margin-right: 5px"
            allowClear
            @change="nameChange"
            v-model="searchConditions.name"
          >
            <a-icon slot="suffix" type="search" />
          </a-input>
        </div>
      </div>
      <vue-scroll :style="'height:' + (bodyHeight - 150) + 'px;'">
        <a-table
          style="width: 100%"
          :columns="columns"
          :data-source="tableData"
          :pagination="false"
          size="small"
          :rowKey="record => record.id"
          :loading="tableLoading"
        >
          <template slot="name" slot-scope="text, record">
            <a-button type="link" slot="name" @click="showDetails(record)">{{ text }}</a-button>
          </template>
          <template slot="action" slot-scope="row, record">
            <a-button
              v-if="record.standardStatus == '0'"
              style="margin-right: 5px"
              type="primary"
              icon="edit"
              size="small"
              @click="editStandard(row)"
              >修改</a-button
            >
            <a-popconfirm
              v-else
              title="下线数据标准,将同步删除映射结果"
              @confirm="() => offline(row)"
            >
              <a-button
                style="margin-right: 5px"
                type="primary"
                icon="edit"
                size="small"
                :loading="row.loading"
                >下线</a-button
              >
            </a-popconfirm>
            <a-button
              size="small"
              type="primary"
              style="margin-right: 5px"
              @click="bind(row)"
              v-show="record.standardStatus == '1'"
              >手动绑定</a-button
            >
            <a-button
              type="danger"
              :loading="record.deloading"
              icon="delete"
              size="small"
              @click="deleteStandard(row.id, record)"
              >删除</a-button
            >
          </template>
        </a-table>
      </vue-scroll>
      <a-pagination
        :defaultPageSize="20"
        style="text-align: right; margin: 10px"
        :showQuickJumper="this.total > 20"
        :show-total="total => `共 ${total} 条`"
        :total="total"
        @change="pageChange"
        :current="currentPage"
      >
      </a-pagination>
    </div>
    <!-- 模态表单 -->
    <a-modal v-model="modalVisible" :title="modalTitle" :width="690">
      <template slot="footer">
        <a-button @click="handleCancel"> 返回 </a-button>
        <a-button type="primary" @click="saveStandard('0')" :loading="btnLoadingSave">
          保存
        </a-button>
        <a-button class="button_release" @click="saveStandard('1')" :loading="btnLoadingRelease">
          发布
        </a-button>
      </template>
      <!-- 选项卡 -->
      <div v-if="modalVisible">
        <a-form-model
          layout="horizontal"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 14 }"
          :model="formData"
          :rules="ruleValidate"
          ref="formModel"
        >
          <a-tabs v-model="tabKey">
            <a-tab-pane key="1" tab="元数据标准">
              <p>基础属性</p>

              <a-form-model-item label="英文名称" prop="name">
                <a-input placeholder="最多输入20个字符" :maxLength="20" v-model="formData.name" />
              </a-form-model-item>
              <a-form-model-item label="中文名称" prop="nameCn">
                <a-input placeholder="最多输入20个字符" :maxLength="20" v-model="formData.nameCn" />
              </a-form-model-item>
              <a-form-model-item label="数据类型" prop="dataType">
                <a-select placeholder="请选择类型" v-model="formData.dataType">
                  <a-select-option
                    v-for="item in dataTypeList"
                    :key="item.value"
                    :value="item.value"
                  >
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
              <a-form-model-item label="标准目录" prop="catalogId1">
                <a-cascader
                  :options="options"
                  placeholder="请选择目录"
                  v-model="formData.catalogId1"
                  change-on-select
                />
              </a-form-model-item>
              <a-form-model-item label="业务定义">
                <a-textarea :rows="'3'" v-model="formData.businessDefinition" :maxLength="255">
                </a-textarea>
              </a-form-model-item>
            </a-tab-pane>
            <a-tab-pane key="2" tab="数据标准">
              <a-form-model-item label="是否允许空值">
                <a-radio-group v-model="formData.nullable">
                  <a-radio value="1"> 可空 </a-radio>
                  <a-radio value="0"> 不可空 </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <a-form-model-item label="是否允许重复">
                <a-radio-group v-model="formData.repeatable">
                  <a-radio value="1"> 可重复 </a-radio>
                  <a-radio value="0"> 不可重复 </a-radio>
                </a-radio-group>
              </a-form-model-item>
              <!-- <a-form-model-item
                label="取值范围"
                :label-col="{ span: 4 }"
                :wrapper-col="{ span: 20 }"
              >
                <a-select
                  style="width: 140px"
                  placeholder="请选择运算符"
                  v-model="formData.valueRange.postOperator"
                >
                  <a-select-option value="="> = </a-select-option>
                  <a-select-option value="<"> &lt; </a-select-option>
                  <a-select-option value=">"> &gt; </a-select-option>
                </a-select>
                <a-input
                  placeholder="输入数值"
                  style="width: 80px; margin-left: 5px"
                  v-model="formData.valueRange.postValue"
                  :maxLength="10"
                ></a-input>
                <span @click="statusChange" class="status">{{
                  formData.valueRange.relationType == "0"
                    ? "关"
                    : formData.valueRange.relationType == "1"
                    ? "或"
                    : "且"
                }}</span>
                <a-select
                  style="width: 140px"
                  v-model="formData.valueRange.preOperator"
                  placeholder="请选择运算符"
                >
                  <a-select-option value="="> = </a-select-option>
                  <a-select-option value="<"> &lt; </a-select-option>
                  <a-select-option value=">"> &gt; </a-select-option>
                </a-select>
                <a-input
                  placeholder="输入数值"
                  style="width: 80px; margin-left: 5px"
                  v-model="formData.valueRange.preValue"
                  :maxLength="10"
                ></a-input>
              </a-form-model-item> -->
              <a-row>
                <a-col :span="8">
                  <a-form-model-item label="取值范围" :label-col="{ span: 8 }">
                    <a-select
                      style="width: 140px"
                      placeholder="请选择运算符"
                      v-model="formData.valueRange.postOperator"
                      allowClear
                    >
                      <a-select-option value="="> = </a-select-option>
                      <a-select-option value="<"> &lt; </a-select-option>
                      <a-select-option value=">"> &gt; </a-select-option>
                      <a-select-option value=">="> &gt;= </a-select-option>
                      <a-select-option value="<="> &lt;= </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="4">
                  <a-form-model-item
                    prop="valueRange.postValue"
                    :rules="ruleValidate.postValue"
                    class="myCheck"
                  >
                    <a-input
                      style="width: 120px"
                      placeholder="输入数值"
                      v-model.number="formData.valueRange.postValue"
                      :maxLength="10"
                      allowClear
                    ></a-input>
                  </a-form-model-item>
                </a-col>

                <a-col :span="2">
                  <span @click="statusChange" class="status">{{
                    formData.valueRange.relationType == "0"
                      ? "关"
                      : formData.valueRange.relationType == "1"
                      ? "或"
                      : "且"
                  }}</span>
                </a-col>
                <a-col :span="5">
                  <a-form-model-item>
                    <a-select
                      v-model="formData.valueRange.preOperator"
                      placeholder="请选择运算符"
                      style="width: 140px"
                      :disabled="formData.valueRange.relationType === '0'"
                      allowClear
                    >
                      <a-select-option value="="> = </a-select-option>
                      <a-select-option value="<"> &lt; </a-select-option>
                      <a-select-option value=">"> &gt; </a-select-option>
                      <a-select-option value=">="> &gt;= </a-select-option>
                      <a-select-option value="<="> &lt;= </a-select-option>
                    </a-select>
                  </a-form-model-item>
                </a-col>
                <a-col :span="2">
                  <a-form-model-item
                    prop="valueRange.preValue"
                    :rules="ruleValidate.preValue"
                    class="myCheck"
                  >
                    <a-input
                      placeholder="输入数值"
                      style="width: 120px;margin-left:10px"
                      v-model.number="formData.valueRange.preValue"
                      :disabled="formData.valueRange.relationType === '0'"
                      allowClear
                      :maxLength="10"
                    ></a-input>
                  </a-form-model-item>
                </a-col>
              </a-row>
              <h3 style="padding-left: 20px; padding-bottom: 20px">枚举范围:</h3>
              <vue-scroll style="height: 250px" ref="vueScroll">
                <a-table
                  :columns="eColumns"
                  :data-source="eData"
                  bordered
                  rowKey="key"
                  :pagination="false"
                >
                  <template
                    v-for="col in ['enumValue', 'enumMeaning']"
                    :slot="col"
                    slot-scope="text, record"
                  >
                    <div :key="col">
                      <a-input
                        v-if="record.editable"
                        style="margin: -5px 0px"
                        :value="text.trim()"
                        @change="e => tableValueChange(e.target.value, record.key, col)"
                        :maxLength="10"
                      />
                      <template v-else>
                        {{ text }}
                      </template>
                    </div>
                  </template>
                  <template slot="operation" slot-scope="text, record">
                    <div class="editable-row-operations">
                      <span v-if="record.editable">
                        <a-button size="small" type="primary" @click="() => saveRow(record)"
                          >保存</a-button
                        >
                        <a-popconfirm title="确认取消吗?" @confirm="() => cancelRow(record)">
                          <a-button type="danger" size="small" style="margin-left: 5px"
                            >取消</a-button
                          >
                        </a-popconfirm>
                      </span>
                      <span v-else>
                        <a-button
                          @click="() => editRow(record)"
                          size="small"
                          type="primary"
                          icon="edit"
                          >修改</a-button
                        >
                        <a-button
                          size="small"
                          type="danger"
                          icon="delete"
                          style="margin-left: 5px"
                          @click="deleteRow(record)"
                          >删除</a-button
                        >
                      </span>
                    </div>
                  </template>
                </a-table>
              </vue-scroll>
              <a-button @click="addRow" icon="plus" type="primary">添加属性</a-button>
            </a-tab-pane>
          </a-tabs>
        </a-form-model>
      </div>
    </a-modal>
    <a-drawer
      @close="closeDrawer"
      :maskClosable="true"
      title="标准详情"
      :visible="drawerVisible"
      width="50%"
    >
      <div v-if="drawerVisible">
        <a-tabs v-model="detailTab">
          <a-tab-pane key="1" tab="元数据标准">
            <a-descriptions title="基本属性" bordered :column="1" class="standardDetails">
              <a-descriptions-item label="中文名称">
                {{ formData.nameCn }}
              </a-descriptions-item>
              <a-descriptions-item label="英文名称">
                {{ formData.name }}
              </a-descriptions-item>
              <a-descriptions-item label="数据类型">
                {{ formData.dataType }}
              </a-descriptions-item>
              <a-descriptions-item label="标准目录">
                {{ renderCatalogText(formData.catalogIds) }}
              </a-descriptions-item>
              <a-descriptions-item label="业务定义">
                {{ formData.businessDefinition }}
              </a-descriptions-item>
            </a-descriptions>
            <a-descriptions
              title="管理属性"
              bordered
              style="margin-top: 20px"
              :column="1"
              class="standardDetails"
            >
              <a-descriptions-item label="创建时间">
                {{ formData.createdTime }}
              </a-descriptions-item>
              <a-descriptions-item label="创建用户">
                {{ $store.state.user.userName }}
              </a-descriptions-item>
              <a-descriptions-item label="标准状态">
                {{ formData.standardStatus == "0" ? "未发布" : "已发布" }}
              </a-descriptions-item>
              <a-descriptions-item label="最近发布">
                {{ formData.releaseTime ? formData.releaseTime : "暂未发布" }}
              </a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>
          <a-tab-pane key="2" tab="数据标准">
            <div style="padding: 20px; color: rgba(0, 0, 0, 0.85)">
              <p style="margin-left: 40px; margin-bottom: 20px">
                <span>是否允许空值 : </span>
                <span>{{ formData.nullable == "0" ? "不可空" : "可空" }}</span>
              </p>
              <p style="margin-left: 40px; margin-bottom: 20px">
                <span>是否允许重复 : </span>
                <span>{{ formData.repeatable == "0" ? "不可重复" : "可重复" }}</span>
              </p>
              <a-form-model>
                <a-form-model-item
                  label="取值范围"
                  :label-col="{ span: 3 }"
                  :wrapper-col="{ span: 20 }"
                >
                  <a-select
                    style="width: 140px"
                    placeholder="请选择运算符"
                    v-model="formData.valueRange.postOperator"
                    :disabled="true"
                  >
                    <a-select-option value="="> = </a-select-option>
                    <a-select-option value="<"> &lt; </a-select-option>
                    <a-select-option value=">"> &gt; </a-select-option>
                    <a-select-option value=">="> &gt;= </a-select-option>
                    <a-select-option value="<="> &lt;= </a-select-option>
                  </a-select>
                  <a-input
                    placeholder="输入数值"
                    style="width: 8.5714rem; margin-left: 5px"
                    v-model="formData.valueRange.postValue"
                    :maxLength="10"
                    :disabled="true"
                  ></a-input>
                  <a-button shape="circle" :disabled="true" style="margin: 0px 5px">{{
                    formData.valueRange.relationType == "0"
                      ? "关"
                      : formData.valueRange.relationType == "1"
                      ? "或"
                      : "且"
                  }}</a-button>
                  <a-select
                    style="width: 140px"
                    v-model="formData.valueRange.preOperator"
                    placeholder="请选择运算符"
                    :disabled="true"
                  >
                    <a-select-option value="="> = </a-select-option>
                    <a-select-option value="<"> &lt; </a-select-option>
                    <a-select-option value=">"> &gt; </a-select-option>
                    <a-select-option value=">="> &gt;= </a-select-option>
                    <a-select-option value="<="> &lt;= </a-select-option>
                  </a-select>
                  <a-input
                    placeholder="输入数值"
                    style="width: 8.5714rem; margin-left: 5px"
                    v-model="formData.valueRange.preValue"
                    :disabled="true"
                    :maxLength="10"
                  ></a-input>
                </a-form-model-item>
              </a-form-model>
              <div style="margin-left: 40px">
                <span style="display: inline-block; margin-bottom: 20px">
                  枚举范围:
                </span>
                <span v-if="eData.length == 0">无</span>
                <div v-else>
                  <a-table
                    :columns="eCol"
                    :data-source="eData"
                    bordered
                    rowKey="enumValue"
                    :pagination="false"
                  >
                  </a-table>
                </div>
              </div>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-drawer>
    <a-modal v-model="bindVisible" title="手动绑定" :width="500">
      <template slot="footer">
        <a-button @click="bindClose" type="danger">
          返回
        </a-button>
        <a-button type="primary" @click="handleBind" :loading="bindLoading"> 绑定 </a-button>
      </template>
      <div v-if="bindVisible">
        <a-form-model :model="bindData" :rules="bindValidate" ref="bindData">
          <a-form-model-item label="目录" prop="assetCatalogId">
            <a-cascader
              :options="catalogList"
              placeholder="请选择目录"
              v-model="bindData.assetCatalogId"
              change-on-select
              @change="catalogChange"
            />
          </a-form-model-item>
          <a-form-model-item label="元数据" prop="dataEntityId">
            <a-select v-model="bindData.dataEntityId" placeholder="请选择元数据" @change="dataEntityChange">
              <a-select-option :value="item.value" v-for="item in dataEntityList" :key="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="字段" prop="fieldId">
            <a-select placeholder="请选择字段" v-model="bindData.fieldId">
              <a-select-option v-for="item in fieldList" :key="item.value" :value="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { GetPageByDelete } from "../../libs/util";
function validateSpecialFont(rule, value, callback) {
  const reg = new RegExp("^[\u4E00-\u9FA5][\u4E00-\u9FA50-9]*$");
  if (value == "" || value == undefined || value == null) {
    callback(new Error("必填"));
  } else {
    if (!reg.test(value)) {
      callback(new Error("请输入中文或中文加数字"));
    } else {
      callback();
    }
  }
}
// const dataTypeList = [
//   "TINYINT",
//   "SMALLINT",
//   "INT",
//   "BIGINT",
//   "FLOAT",
//   "DOUBLE",
//   "DECIMAL",
//   "TIMESTAMP",
//   "DATE",
//   "INTERVAL",
//   "STRING",
//   "VARCHAR",
//   "CHAR",
//   "BOOLEAN",
//   "BINARY",
// ];
const url = "/zuul/lmanage";
const eColumns = [
  {
    title: "枚举值",
    dataIndex: "enumValue",
    width: "30%",
    scopedSlots: { customRender: "enumValue" },
    align: "center"
  },
  {
    title: "枚举含义",
    dataIndex: "enumMeaning",
    width: "30%",
    scopedSlots: { customRender: "enumMeaning" },
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
    align: "center"
  }
];
const eCol = [
  {
    title: "枚举值",
    dataIndex: "enumValue"
  },
  {
    title: "枚举含义",
    dataIndex: "enumMeaning"
  }
];
var numbe = 0;
const eData = [];
export default {
  name: "dataStandard",
  data() {
    this.cacheData = eData.map(item => ({ ...item }));
    function isInteger(rule, value, callback) {
      if (value === "") {
        callback();
      }
      setTimeout(() => {
        if (!Number(value) && value !== 0) {
          callback(new Error("请输入数字"));
        } else {
          const re = /^(\-?)\d+(\.\d+)?$/;
          const rsCheck = re.test(value);
          if (!rsCheck) {
            callback(new Error("请输入数字"));
          } else {
            callback();
          }
        }
      }, 0);
    }
    return {
      // treeSource: [
      //   {
      //     name: "交管业务信息",
      //     id: "1",
      //     scopedSlots: { title: "custom" },
      //     isEdit: false,
      //     children: [
      //       {
      //         name: "车驾管",
      //         id: "1-1",
      //         level: 1,
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         children: [],
      //       },
      //       {
      //         name: "执法",
      //         id: "1-2",
      //         level: 2,
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         children: [],
      //       },
      //       {
      //         name: "事故",
      //         id: "1-3",
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         level: 2,
      //         children: [],
      //       },
      //       {
      //         name: "缉查布控",
      //         id: "1-4",
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         level: 2,
      //         children: [],
      //       },
      //     ],
      //   },
      //   {
      //     name: "智能交通信息",
      //     id: "2",
      //     scopedSlots: { title: "custom" },
      //     isEdit: false,
      //     level: 1,
      //     children: [
      //       {
      //         name: "事件检测",
      //         id: "2-1",
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         level: 2,
      //         children: [
      //           {
      //             name: "维数据标准1-1",
      //             id: "2-1-1",
      //             scopedSlots: { title: "custom" },
      //             isEdit: false,
      //             level: 3,
      //             children: [],
      //           },
      //           {
      //             name: "维数据标准1-2",
      //             id: "2-1-2",
      //             scopedSlots: { title: "custom" },
      //             isEdit: false,
      //             level: 3,
      //             children: [],
      //           },
      //           {
      //             name: "维数据标准1-3",
      //             id: "2-1-3",
      //             scopedSlots: { title: "custom" },
      //             isEdit: false,
      //             level: 3,
      //             children: [],
      //           },
      //         ],
      //       },
      //       {
      //         name: "交通拥堵",
      //         id: "2-2",
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         level: 2,
      //         children: [],
      //       },
      //       {
      //         name: "交通流量",
      //         id: "2-3",
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         level: 2,
      //         children: [],
      //       },
      //       {
      //         name: "GPS定位",
      //         id: "2-4",
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         level: 2,
      //         children: [],
      //       },
      //       {
      //         name: "匝道控制",
      //         id: "2-5",
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         level: 2,
      //         children: [],
      //       },
      //     ],
      //   },
      //   {
      //     name: "公安信息",
      //     id: "3",
      //     scopedSlots: { title: "custom" },
      //     isEdit: false,
      //     level: 1,
      //     children: [
      //       {
      //         name: "人口信息",
      //         id: "3-1",
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         level: 2,
      //         children: [],
      //       },
      //       {
      //         name: "犯罪人员",
      //         id: "3-2",
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         level: 2,
      //         children: [],
      //       },
      //       {
      //         name: "吸毒人员",
      //         id: "3-3",
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         level: 2,
      //         children: [],
      //       },
      //       {
      //         name: "治安卡口",
      //         id: "3-4",
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         level: 2,
      //         children: [],
      //       },
      //     ],
      //   },
      //   {
      //     name: "部门及社会信息",
      //     id: "4",
      //     scopedSlots: { title: "custom" },
      //     isEdit: false,
      //     level: 1,
      //     children: [
      //       {
      //         name: "重点车辆",
      //         id: "4-1",
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         level: 2,
      //         children: [],
      //       },
      //       {
      //         name: "停车场",
      //         id: "4-2",
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         level: 2,
      //         children: [],
      //       },
      //       {
      //         name: "两客一危",
      //         id: "4-3",
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         level: 2,
      //         children: [],
      //       },
      //       {
      //         name: "公共运输",
      //         id: "4-4",
      //         scopedSlots: { title: "custom" },
      //         isEdit: false,
      //         level: 2,
      //         children: [],
      //       },
      //     ],
      //   },
      // ],
      dataTypeList: [],
      treeSource: [],
      expandedKeys: [],
      newItem: "",
      editFlag: false, // 记录是否有已经处于编辑状态的标识
      newFlag: false, // 记录是否是新建节点，用于在cancel的时候判断是该删除还是恢复原样
      backupsExpandedKeys: [],
      autoExpandParent: false,
      checkedKeys: [],
      selectedKeys: [],
      searchValue: "",
      searchStr: "",
      replaceFields: { title: "name", key: "id" },
      tableData: [
        // {
        //   nameCn: "号牌号码",
        //   name: "PLATE_NO",
        //   businessDefinition: "号牌号码字段，一般为身份简称打头....",
        //   standardStatus: "0",
        //   created: "2021-07-02 14:21:22",
        // },
        // {
        //   nameCn: "反偷渡检测",
        //   name: "antistowcheckplace",
        //   businessDefinition: "反偷渡",
        //   standardStatus: "1",
        //   created: "2021-07-02 14:21:22",
        // },
        // {
        //   nameCn: "航线代码",
        //   name: "ServiceCode",
        //   businessDefinition: "航线代码",
        //   standardStatus: "1",
        //   created: "2021-08-05 17:38:14",
        // },
        // {
        //   nameCn: "航线代码1",
        //   name: "ServiceCode",
        //   businessDefinition: "航线代码1",
        //   standardStatus: "1",
        //   created: "2021-08-05 17:38:14",
        // },
      ],
      columns: [
        {
          dataIndex: "nameCn",
          title: "中文名称",
          align: "center",
          width: "10%",
          scopedSlots: { customRender: "name" }
        },
        {
          dataIndex: "name",
          title: "英文名称",
          align: "center"
          // width: 50,
        },
        {
          dataIndex: "businessDefinition",
          title: "业务定义",
          align: "center",
          width: 400,
          ellipsis:true
        },
        {
          dataIndex: "standardStatus",
          title: "状态",
          align: "center",
          // width: 80,
          customRender: text =>
            text == "0" ? (
              <a-badge status="error" text="未发布" />
            ) : (
              <a-badge status="success" text="已发布" />
            )
        },
        {
          title: "操作",
          key: "action",
          width: 250,
          scopedSlots: { customRender: "action" },
          align: "center"
        }
      ],
      modalVisible: false,
      modalTitle: "新增",
      catalogData: {
        parentId: "",
        parentIds: "",
        level: "",
        id: "",
        name: ""
      },
      treeLoading: false,
      options: [],
      eData,
      eColumns,
      eCol,
      // editingKey: "",
      formData: {
        valueRange: {
          postOperator: "",
          postValue: "",
          preValue: "",
          relationType: "0",
          preOperator: ""
        },
        customAttribute: null,
        standardStatus: "0",
        catalogId1: []
      },
      isAdd: false,
      catalogId: "",
      isNewValue: false,
      ruleValidate: {
        name: [{ required: true, message: "必填", trigger: "change" }],
        nameCn: [
          { required: true, message: "必填", trigger: "change" },
          { validator: validateSpecialFont, trigger: "change" }
        ],
        catalogId1: [{ required: true, message: "必填", trigger: "change" }],
        dataType: [{ required: true, message: "必填", trigger: "change" }],
        postValue: [{ validator: isInteger, trigger: "change" }],
        preValue: [{ validator: isInteger, trigger: "change" }]
      },
      bindValidate: {
        fieldId: [{ required: true, message: "必填", trigger: "change" }],
        assetCatalogId: [{ required: true, message: "必填", trigger: "change" }],
        dataEntityId: [{ required: true, message: "必填", trigger: "change" }]
      },
      tabKey: "1",
      keyArr: [],
      valueArr: [],
      btnLoadingSave: false,
      btnLoadingRelease: false,
      searchConditions: {
        name: "",
        page: 0,
        size: 20,
        catalogId: ""
      },
      total: 0,
      currentPage: 1,
      tableLoading: false,
      drawerVisible: false,
      detailTab: "1",
      catalogDetails: [],
      bindVisible: false,
      
      catalogList: [],
      dataEntityList: [], 
      standardId: "",
      fieldList: [],
      bindLoading: false,
      bindData: {
        fieldId: undefined,
        assetCatalogId: [],
        dataEntityId: undefined,
      }
    };
  },
  methods: {
    //添加顶级目录
    addFirstItem() {
      if (this.editFlag) {
        this.$message.warning("已有编辑项，请先编辑完成！");
        return;
      }
      this.treeSource.push({
        children: [],
        // id: this.getItemNextId(),
        name: "",
        // level: 1,
        scopedSlots: { title: "custom" },
        isEdit: true
      });
      this.catalogInit();
      this.newItem = "";
      this.editFlag = true;
      this.newFlag = true;
      this.$nextTick(() => {
        this.$refs.new.focus();
      });
      this.catalogData.parentId = "";
      this.catalogData.parentIds = "";
      this.catalogData.level = "1";
    },
    //添加子集
    addItem(item) {
      console.log(item);
      if (this.editFlag) {
        this.$message.warning("已有编辑项，请先编辑完成！");
        return;
      } else if (item.level == "3") {
        this.$message.warning("最多允许3级目录");
        return;
      }
      item.children.push({
        children: [],
        // id: this.getItemNextId(),
        name: "",
        // level: item.level + 1,
        scopedSlots: { title: "custom" },
        isEdit: true
      });
      this.catalogInit();
      // this.catalogData.parentId = item.id;
      if (item.parentIds !== "") {
        this.catalogData.parentIds = item.parentIds + "," + item.id;
      } else {
        this.catalogData.parentIds = item.id;
      }
      this.catalogData.level = item.level * 1 + 1 + "";
      this.newItem = "";
      console.log(this.catalogData);
      this.editFlag = true;
      this.newFlag = true;
      this.expandedKeys.push(item.id);
      // console.log(this.expandedKeys);
      this.$nextTick(() => {
        this.$refs.new.focus();
      });
    },
    //编辑目录
    editItem(item) {
      console.log(item);
      if (this.editFlag) {
        this.$message.warning("已有编辑项，请先编辑完成！");
        return;
      }
      item.isEdit = true;
      this.newFlag = false;
      this.editFlag = true;
      this.newItem = item.name;
      this.$http.get(url + "/dataStandard/catalog/" + item.id).then(res => {
        this.catalogData = res.data.data;
      });
      this.treeListItemActions(this.treeSource, item.id, "edit", item);
      this.$nextTick(() => {
        this.$refs.new.focus();
      });
    },
    //删除目录
    deleteItem(item) {
      console.log(item);
      let that = this;
      this.$confirm({
        title: "操作提示",
        content: (
          <span style="color:red">
            删除目录时,会同步删除目录下的子节点、数据标准及其映射结果,是否确认删除?
          </span>
        ),
        centered: true,
        okType: "danger",
        onOk() {
          // that.treeListItemActions(that.treeSource, item.id, "delete");
          that.treeLoading = true;
          that
            .$http({
              method: "delete",
              url: url + "/dataStandard/catalog/" + item.id + "?parentId=" + item.parentId
            })
            .then(res => {
              if (res.data.success) {
                that.$notification.success({
                  message: res.data.message,
                  duration: 2
                });
                if (item.id === that.searchConditions.catalogId) {
                  that.searchConditions.catalogId = "";
                }
                that.renderTable();
                that.renderTree();
              } else {
                that.$notification.error({
                  message: res.data.message,
                  duration: 2
                });
                that.treeLoading = false;
              }
            });
        },
        onCancel() {
          that.$message.info("已取消");
        }
      });
    },
    //取消编辑
    addCancel(item) {
      this.newItem = "";
      item.isEdit = false;
      this.editFlag = false;
      this.treeListItemActions(this.treeSource, item.id, this.newFlag ? "delete" : "edit", item);
    },
    //提交新增
    addConfirm(item) {
      if (this.newItem !== null && this.newItem.trim() !== "") {
        this.treeLoading = true;
        item.name = this.newItem;
        this.catalogData.name = this.newItem;
        item.isEdit = false;
        this.editFlag = false;
        this.treeListItemActions(this.treeSource, item.id, "edit", item);
        this.$http({
          method: "post",
          url: url + "/dataStandard/catalog/save",
          data: this.catalogData
        }).then(res => {
          if (res.data.success) {
            this.$notification.success({
              message: "操作成功",
              duration: 2
            });
            this.renderTree();
          } else {
            this.$notification.error({
              message: "操作失败",
              duration: 2,
              description:res.data.data
            });
            this.renderTree();
          }
          this.treeLoading = false;
        });
      } else {
        this.$message.warning("不允许为空");
      }
    },
    // 获取新节点的id（时间戳加随机数）
    getItemNextId() {
      return (new Date().getTime() + Math.ceil(Math.random() * 10000)).toString();
    },
    // 根据id属性从数组（树结构）中匹配元素，执行action操作
    treeListItemActions(treeList, key, action, item) {
      if (!treeList || !treeList.length) {
        return;
      }
      for (let i = 0; i < treeList.length; i++) {
        if (treeList[i].id === key) {
          if (action === "delete") {
            treeList.splice(i, 1);
            this.$forceUpdate();
          } else if (action === "edit") {
            treeList[i] = item;
            this.$forceUpdate();
          }
          break;
        }
        this.treeListItemActions(treeList[i].children, key, action, item);
      }
    },
    // 提供给调用方获取树的数据源的方法
    renderTree() {
      this.treeLoading = true;
      this.$http.get("/zuul/lmanage/dataStandard/catalog/tree").then(res => {
        if (res.data.success) {
          this.treeSource = res.data.data;
        } else {
          this.$message.error("查询目录失败", 2);
        }
        this.treeLoading = false;
      });
      // console.log(123);
    },
    catalogInit() {
      this.catalogData = {
        parentId: "",
        parentIds: "",
        level: "",
        id: "",
        name: ""
      };
    },
    //根据目录名称搜索指定目录
    onSearch() {
      this.searchValue = this.searchStr;
      if (this.searchValue === "") {
        this.expandedKeys = [];
      } else {
        this.expandedKeys = [];
        this.backupsExpandedKeys = [];
        const candidateKeysList = this.getkeyList(this.searchValue, this.treeSource, []);
        candidateKeysList.forEach(item => {
          const key = this.getParentKey(item, this.treeSource);
          // eslint-disable-next-line no-shadow
          if (key && !this.backupsExpandedKeys.some(item => item === key))
            this.backupsExpandedKeys.push(key);
        });
        const { length } = this.backupsExpandedKeys;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < length; i++) {
          this.getAllParentKey(this.backupsExpandedKeys[i], this.treeSource);
        }
        this.expandedKeys = this.backupsExpandedKeys.slice();
      }
    },
    // 获取节点中含有value的所有key集合
    getkeyList(value, tree, keyList) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.name.indexOf(value) > -1) {
          keyList.push(node.id);
        }
        if (node.children) {
          this.getkeyList(value, node.children, keyList);
        }
      }
      return keyList;
    },
    // 该递归主要用于获取key的父亲节点的key值
    getParentKey(id, tree) {
      let parentKey;
      let temp;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
          if (node.children.some(item => item.id === id)) {
            parentKey = node.id;
            // eslint-disable-next-line no-cond-assign
          } else if ((temp = this.getParentKey(id, node.children))) {
            parentKey = temp;
          }
        }
      }
      return parentKey;
    },
    // 获取该节点的所有祖先节点
    getAllParentKey(id, tree) {
      let parentKey;
      if (id) {
        parentKey = this.getParentKey(id, tree);
        if (parentKey) {
          if (!this.backupsExpandedKeys.some(item => item === parentKey)) {
            this.backupsExpandedKeys.push(parentKey);
          }
          this.getAllParentKey(parentKey, tree);
        }
      }
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      this.selectedKeys = selectedKeys;
      console.log(this.selectedKeys);
      this.searchConditions.catalogId = this.selectedKeys[0];
      // if (!this.editFlag) {
      //   this.searchConditions.page = 0;
      //   this.currentPage = 1;
      //   this.renderTable();
      // }
      this.searchConditions.page = 0;
        this.currentPage = 1;
      this.renderTable()
    },
    //关闭模态框
    handleCancel(e) {
      console.log(123);
      this.modalVisible = false;
      this.$refs.formModel.resetFields();
      // this.tabKey = "1";
    },
    //新增目录
    addStandard() {
      // this.$refs.formModel.resetFields();
      this.valueArr = [];
      this.keyArr = [];
      this.getCascader();
      this.formInit();
      this.eData = [];
      this.tabKey = "1";
      this.modalVisible = true;
      this.modalTitle = "新增标准";
      this.isAdd = false;
    },
    //或且关状态切换
    statusChange() {
      this.formData.valueRange.relationType =
        this.formData.valueRange.relationType == "0"
          ? "1"
          : this.formData.valueRange.relationType == "1"
          ? "2"
          : "0";
      //当为关状态 重置后面的值,并且不可用
      if (this.formData.valueRange.relationType === "0") {
        this.formData.valueRange.preValue = "";
        this.formData.valueRange.preOperator = undefined;
        console.log(this.$refs.formModel);
        this.$refs.formModel.clearValidate("valueRange.preValue");
      }
    },
    //表格输入框值变化
    tableValueChange(value, key, column) {
      console.log(value);
      const newData = [...this.eData];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.eData = newData;
      }
    },
    //编辑表格输入框
    editRow(record) {
      this.isNewValue = false;
      const newData = [...this.eData];
      const target = newData.filter(item => record.key === item.key)[0];
      // this.editingKey = key;
      // this.$set(record, "editingKey", true);
      if (target) {
        target.editable = true;
        this.eData = newData;
      }
    },
    //保存表格输入框
    saveRow(record) {
      if (record.enumMeaning.trim() == "" || record.enumValue.trim() == "") {
        this.$message.warning("请填写枚举值和含义", 2);
      } else {
        const newData = [...this.eData];
        // console.log(newData);
        this.keyArr = [...new Set(this.keyArr)];
        this.valueArr = [...new Set(this.valueArr)];
        if (!this.isNewValue) {
          let index = this.keyArr.findIndex(item => {
            return item === record.enumValue;
          });
          this.keyArr.splice(index, 1);
          this.valueArr.splice(index, 1);
        }
        console.log(this.keyArr);
        console.log(this.keyArr.includes(record.enumValue));
        let num = 0;
        let num1 = 0;
        this.eData.forEach(item => {
          if (item.enumValue.trim() === record.enumValue.trim()) {
            num++;
          }
        });
        this.eData.forEach(item => {
          if (item.enumMeaning.trim() === record.enumMeaning.trim()) {
            num1++;
          }
        });
        console.log(num1, num);
        if (
          this.keyArr.includes(record.enumValue) ||
          this.valueArr.includes(record.enumMeaning) ||
          num >= 2 ||
          num1 >= 2
        ) {
          this.$message.warning("枚举值或含义可能重复,请检查!");
          return;
        }
        newData.forEach(item => {
          this.keyArr.push(item.enumValue);
          this.valueArr.push(item.enumMeaning);
        });
        // console.log(keyArr.includes(record.enumValue));

        const newCacheData = [...this.cacheData];
        const target = newData.filter(item => record.key === item.key)[0];
        const targetCache = newCacheData.filter(item => record.key === item.key)[0];
        if (target && targetCache) {
          delete target.editable;
          // this.$set(record,"editable",false)
          console.log(target);
          this.eData = newData;
          Object.assign(targetCache, target);
          this.cacheData = newCacheData;
        }
        // this.$set(record, "editingKey", false);
        this.isAdd = false;
        this.isNewValue = false;
        console.log(this.eData);
      }
    },
    //取消表格输入框编辑
    cancelRow(record) {
      console.log(record);
      if ((record.enumMeaning == "" && record.enumValue == "") || this.isNewValue) {
        let currentIndex = this.eData.findIndex(item => item.key === record.key);
        console.log(currentIndex);
        this.eData.splice(currentIndex, 1);
        this.isAdd = false;
        // this.$set(record, "editingKey", false);
      } else {
        const newData = [...this.eData];
        const target = newData.filter(item => record.key === item.key)[0];
        // this.$set(record, "editingKey", false);
        if (target) {
          Object.assign(target, this.cacheData.filter(item => record.key === item.key)[0]);
          delete target.editable;
          this.eData = newData;
        }
      }
    },
    //新增表格输入框
    addRow() {
      if (this.isAdd) {
        this.$message.warning("请完成,再添加");
      } else {
        if(this.eData.length>=3){
          this.$refs["vueScroll"].scrollTo({ y: 10000 }, 500);
        }
        this.isAdd = true;
        this.isNewValue = true;
        this.eData.push({
          key: (new Date().getTime() + Math.ceil(Math.random() * 10000)).toString(),
          enumValue: "",
          enumMeaning: "",
          editable: true
          // editingKey:false
        });
        console.log(this.eData);
        // this.editingKey = this.eData[this.eData.length - 1].key;
        this.cacheData = this.eData.map(item => ({ ...item }));
      }
    },
    //删除表格输入框
    deleteRow(record) {
      this.$confirm({
        title: "信息提示",
        content: "确认删除?",
        okType: "danger",
        onOk: () => {
          let currentIndex = this.eData.findIndex(item => item.key === record.key);
          let index = this.valueArr.findIndex(item => item === record.enumValue);
          console.log(currentIndex);
          this.valueArr.splice(index, 1);
          this.keyArr.splice(index, 1);
          this.eData.splice(currentIndex, 1);
        }
      });
    },
    //保存新增数据标准
    saveStandard(standardStatus) {
      console.log(this.isAdd);
      console.log(this.eData);
      if (this.isAdd) {
        this.$message.error("请先完成或取消添加枚举", 2);
      } else {
        this.$nextTick(() => {
          this.$refs.formModel.validate(valid => {
            if (valid) {
              // console.log("success");
              standardStatus === "0"
                ? (this.btnLoadingSave = true)
                : (this.btnLoadingRelease = true);
              this.formData.enumRange = [];
              this.formData.standardStatus = standardStatus;
              this.formData.catalogId = this.formData.catalogId1[
                this.formData.catalogId1.length - 1
              ];
              this.eData.forEach(item => {
                this.formData.enumRange.push({
                  key: item.enumValue,
                  value: item.enumMeaning,
                  id: item.key,
                  editable: false
                });
              });
              console.log(this.formData.enumRange);
              if (this.formData.valueRange.postOperator === undefined) {
                this.formData.valueRange.postOperator = "";
              }
              if (this.formData.valueRange.preOperator === undefined) {
                this.formData.valueRange.preOperator = "";
              }
              this.formData.valueRange = JSON.stringify(this.formData.valueRange);
              if (this.formData.enumRange.length == 0) {
                this.formData.enumRange = null;
              } else {
                this.formData.enumRange = JSON.stringify(this.formData.enumRange);
              }
              this.$http({
                method: "post",
                data: this.formData,
                url: url + "/dataStandard/save"
              }).then(res => {
                if (res.data.success) {
                  this.$notification.success({
                    message: "操作成功",
                    duration: 2
                  });
                  // this.currentPage = 1;
                  standardStatus === "0"
                    ? (this.btnLoadingSave = false)
                    : (this.btnLoadingRelease = false);
                  this.modalVisible = false;
                  this.renderTable();
                } else {
                  this.$notification.error({
                    message: "操作失败",
                    duration: 2
                  });
                  this.formData.valueRange = JSON.parse(this.formData.valueRange);
                  if (this.formData.enumRange != null) {
                    this.formData.enumRange = JSON.parse(this.formData.enumRange);
                  }
                  standardStatus === "0"
                    ? (this.btnLoadingSave = false)
                    : (this.btnLoadingRelease = false);
                }
              });
            }
          });
        });
      }
    },
    //表单重置
    formInit() {
      this.formData = {
        valueRange: {
          postOperator: undefined,
          postValue: "",
          preValue: "",
          relationType: "0",
          preOperator: undefined
        },
        customAttribute: null,
        standardStatus: "0"
      };
    },
    //获取级联选择器的数据
    getCascader() {
      this.$http.get(url + "/dataStandard/parent/cascader").then(res => {
        console.log(res.data.data);
        this.options = res.data.data;
        this.options=this.removeChildren(this.options)
      });
    },
    renderTable() {
      this.tableLoading = true;
      this.$http({
        url: "/zuul/lmanage/dataStandard/page",
        method: "get",
        params: {
          page: this.searchConditions.page,
          size: this.searchConditions.size,
          nameCn: this.searchConditions.name,
          catalogId: this.searchConditions.catalogId
          // nameCn:""
        }
      }).then(res => {
        // console.log(res);
        if (res.data.success) {
          // console.log(res.data);
          this.tableData = res.data.data.results;
          this.total = res.data.data.total;
        } else {
          this.$message.error("查询数据标准失败", 2);
        }
        this.tableLoading = false;
      });
    },
    nameChange() {
      this.searchConditions.page = 0;
      this.currentPage = 1;
      // console.log(value);
      this.renderTable();
    },
    pageChange(currentPage) {
      this.currentPage = currentPage;
      this.searchConditions.page = currentPage - 1;
      console.log(this.searchConditions.page);
      this.renderTable();
    },
    deleteStandard(id, record) {
      this.$confirm({
        title: "信息提示",
        content: "删除标准,将同步删除映射结果!确认删除?",
        okType: "danger",
        onOk: () => {
          this.$set(record, "deloading", true);
          this.$http.delete("/zuul/lmanage/dataStandard/" + id).then(res => {
            if (res.data.success) {
              this.$notification.success({
                message: "删除成功",
                duration: 2
              });
              this.searchConditions.page = GetPageByDelete(
                this.searchConditions.page,
                this.tableData.length,
                1
              );
              this.renderTable();
              this.$set(record, "deloading", false);
            } else {
              this.$notification.error({
                message: "删除失败",
                duration: 2
              });
              this.$set(record, "deloading", false);
            }
          });
        }
      });
    },
    editStandard(row) {
      // console.log(this.editingKey);
      // this.editingKey = "1111111";
      this.isAdd = false;
      this.getCascader();
      this.tabKey = "1";
      this.formData = { ...row };
      this.eData = [];
      this.valueArr = [];
      this.keyArr = [];
      this.formData.valueRange = JSON.parse(row.valueRange);
      this.formData.enumRange = JSON.parse(row.enumRange);
      console.log(this.formData);
      this.$set(this.formData, "catalogId1", row.catalogIds.split(","));
      console.log(this.formData.catalogId1);
      if (this.formData.enumRange === null) {
        this.formData.enumRange = [];
      } else {
        this.formData.enumRange.forEach(item => {
          this.eData.push({
            enumValue: item.key,
            enumMeaning: item.value,
            key: item.id,
            editable: item.editable
          });
        });
      }
      this.eData.forEach(item => {
        this.valueArr.push(item.enumMeaning);
        this.keyArr.push(item.enumValue);
      });
      this.cacheData = this.eData.map(item => ({ ...item }));
      console.log(this.eData);
      this.modalVisible = true;
      this.modalTitle = "修改";
    },
    showDetails(record) {
      console.log(record);
      this.eData = [];
      this.drawerVisible = true;
      this.detailTab = "1";
      this.formData = { ...record };
      this.formData.valueRange = JSON.parse(record.valueRange);
      this.formData.enumRange = JSON.parse(record.enumRange);
      this.formData.catalogIds = record.catalogIds;
      console.log(this.formData.catalogIds);
      if (this.formData.enumRange !== null) {
        this.formData.enumRange.forEach(item => {
          this.eData.push({
            enumValue: item.key,
            enumMeaning: item.value
          });
        });
      }
      console.log(this.formData);
      // console.log(this.$store.state.user.userName);
    },
    closeDrawer() {
      this.drawerVisible = false;
    },
    //递归获取子节点
    getNodeId(list, newNodeId = []) {
      for (let i in list) {
        newNodeId.push(list[i]);
        if (list[i].children) {
          this.getNodeId(list[i].children, newNodeId);
        }
      }
      return newNodeId;
    },
    //渲染表格的目录字段
    renderCatalogText(text) {
      console.log(this.options);
      let a = this.getNodeId(this.options);
      console.log(text);
      text = text.split(",");
      var str = "";
      a.forEach(item => {
        text.forEach(item1 => {
          if (item.value == item1) {
            str += item.label + "/";
          }
        });
      });
      str = str.substr(0, str.length - 1);
      // console.log(str);
      return str;
    },
    offline(row) {
      this.$set(row, "loading", true);
      this.$http({
        url: url + "/dataStandard/offline",
        params: {
          id: row.id
        },
        method: "post"
      }).then(res => {
        if (res.data.success) {
          this.$notification.success({
            message: "下线成功",
            duration: 2
          });
          this.$set(row, "loading", false);
          this.renderTable();
        } else {
          this.$notification.success({
            message: "下线失败",
            duration: 2
          });
          this.$set(row, "loading", false);
        }
      });
    },
    bind(row) {
      this.bindVisible = true;
      this.standardId = row.id;
      (this.bindData.dataEntityId = undefined),
        (this.bindData.fieldId = undefined),
        (this.bindData.assetCatalogId = []);
        this.dataEntityList=[];
        this.fieldList=[]
      this.getCatalogList();
    },
    getCatalogList() {
      // this.$http.get("/zuul/lmanage/asset/parent/cascader").then(res => {
      //   // this.catalogList.push(res.data.data[2]);
      //   this.catalogList = res.data.data;
      //   console.log(res.data.data);
      // });
      this.$http({
        method: "get",
        params: {
          type: "0"
        },
        url: "/zuul/lmanage/asset/parent/cascader"
      }).then(res => {
        if (res.data.success) {
          this.catalogList = res.data.data;
          console.log(res.data.data);
          this.catalogList=this.removeChildren(this.catalogList)
        }
      });
    },
    getHiveDict() {
      this.$http({
        url: "/zuul/upm/dict/new/0059000000000000",
        method: "get"
      }).then(res => {
        console.log(res.data.data.children);
        this.dataTypeList = res.data.data.children;
      });
    },
    //目录变化
    catalogChange() {
      console.log(this.bindData.assetCatalogId);
      this.$http({
        method: "get",
        params: {
          catalogIds: this.bindData.assetCatalogId.join(",")
        },
        url: url + "/dataEntity/catalog/entityDict"
      }).then(res => {
        if (res.data.success) {
          this.dataEntityList = res.data.data;
        }
      });
    },
    dataEntityChange() {
      this.$http({
        method: "get",
        params: {
          assetId: this.bindData.dataEntityId
        },
        url: url + "/dataEntity/column/dict"
      }).then(res => {
        if (res.data.success) {
          this.fieldList = res.data.data;
        }
      });
    },
    handleBind() {
      this.$refs.bindData.validate(valid => {
        if (valid) {
          this.bindLoading = true;
          this.$http({
            url: url + "/dataStandard/field/forceBind",
            method: "post",
            data: {
              standardId: this.standardId,
              fieldId: this.bindData.fieldId
            }
          }).then(res => {
            if (res.data.success) {
              this.$notification.success({
                message: "绑定成功",
                duration: 2
              });
              this.renderTable();
              this.bindLoading = false;
              this.bindVisible = false;
            } else {
              this.$notification.error({
                message: "绑定失败",
                duration: 2
              });
              this.bindLoading = false;
            }
          });
        }
      });
    },
    bindClose() {
      console.log(123);
      this.bindVisible = false;
      this.$refs.bindData.resetFields();
    },
    removeChildren(data) {
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          if (!data[i].children || data[i].children.length < 1) {
            delete data[i].children
          } else {
            // children若不为空，则继续递归调用本方法
            this.removeChildren(data[i].children);
          }
        }
      }
 
      return data;
    }
  },
  mounted() {
    this.renderTree();
    this.getCascader();
    this.renderTable();
    this.getHiveDict();
  },
  computed: {
    bodyHeight() {
      return this.$store.state.app.bodyHeight;
    }
  }
};
// 测试
</script>
