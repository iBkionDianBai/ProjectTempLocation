<template>
  <div class="outer-container">
    <!-- 基本信息 -->
    <el-card class="basic-info">
      <el-text class="mx-1" size="large" tag="b"> 基本信息：</el-text>
      <div class="basic-info-content">
        <el-row>
          <el-col :span="6">
            <el-text> 名称：{{ basicInfoContent.name }}</el-text>
          </el-col>
          <el-col :span="6">
            <el-text> 创建时间：{{ basicInfoContent.createDate }}</el-text>
          </el-col>
        </el-row>
        <el-row>
          <el-text> 描述： </el-text>
          <!-- 描述文本区 -->
          <el-text>
            {{ basicInfoContent.description }}
          </el-text>
        </el-row>
      </div>
    </el-card>
    <!-- 规范字典列表 -->
    <el-card class="std-dict-list">
      <!-- 标题、输入框和按钮 -->
      <div class="std-dict-list-top-content">
        <el-text class="mx-1" size="large" tag="b"> 规范字典列表 </el-text>
        <el-input
          class="std-dict-list-search"
          v-model="search"
          clearable
          placeholder="搜索"
          style="width: 200px; margin-right: 15px"
        />
        <el-button class="std-dict-list-add" type="success" @click="handleAdd">
          <i-ep-edit />新建
        </el-button>
        <el-button type="danger" class="std-dict-list-delete" @click="handleDelete">
          <i-ep-delete /> 删除
        </el-button>
      </div>
      <!-- 表格 -->
      <div class="std-dict-list-content" style="margin-top: 10px">
        <el-table
          default-expand-all
          v-loading="loading"
          :data="listData.arr"
          border
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />

          <el-table-column prop="dictListName" label="字典表名称" width="170" align="center" />
          <el-table-column prop="discription" label="描述" min-width="170" align="center" />
          <el-table-column prop="record" label="数据标准记录数" width="170" align="center" />
          <el-table-column prop="status" label="状态" width="170" align="center" />
          <el-table-column prop="class" label="所属类目" width="170" align="center" />
          <el-table-column label="操作" width="140" align="center">
            <template #default="scope">
              <el-button
                size="small"
                link
                @click="handleEdit(scope.$index, scope.row)"
                ><i-ep-edit />编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                link
                @click="handleDeleteRow(scope.$index, scope.row)"
                ><i-ep-delete />删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="std-dict-list-pagger-container">
          <el-pagination
            :page-size="pagesize"
            layout="->, total, prev, pager, next, sizes"
            :page-sizes="[10, 20, 30]"
            :total="listData.arr.length"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import DataRuleAPI, { getBasicInfo } from "@/api/dataRule-data";

// 基本内容加载
const basicInfoLoading = ref(false);
// 基本信息内容
const basicInfoId = ref(0);
const basicInfoContent = reactive<getBasicInfo>({
  name: "",
  createDate: "",
  description: "",
});
function handleBasicInfoQuery() {
  basicInfoLoading.value = true;
  DataRuleAPI.getBasicInfo(basicInfoId.value)
    .then((data) => {
      basicInfoContent.name = data.name;
      basicInfoContent.description = data.description;
      basicInfoContent.createDate = data.createDate;
    })
    .finally(() => {
      basicInfoLoading.value = false;
    });
}

// 搜索输入内容
const search = ref("");

// 列表内容
const listData = ref({
  arr: [
    {
      dictListName: "部门性别字典表",
      discription: "",
      record: "3",
      status: "待审核",
      class: "专卖部门数据规范集",
    },
    {
      dictListName: "部门性别字典表",
      discription: "",
      record: "3",
      status: "待审核",
      class: "专卖部门数据规范集",
    },
    {
      dictListName: "部门性别字典表",
      discription: "",
      record: "3",
      status: "待审核",
      class: "专卖部门数据规范集",
    },
    {
      dictListName: "部门性别字典表",
      discription: "",
      record: "3",
      status: "待审核",
      class: "专卖部门数据规范集",
    },
    {
      dictListName: "部门性别字典表",
      discription: "",
      record: "3",
      status: "待审核",
      class: "专卖部门数据规范集",
    },
    {
      dictListName: "部门性别字典表",
      discription: "",
      record: "3",
      status: "待审核",
      class: "专卖部门数据规范集",
    },
    {
      dictListName: "部门性别字典表",
      discription: "",
      record: "3",
      status: "待审核",
      class: "专卖部门数据规范集",
    },
    {
      dictListName: "部门性别字典表",
      discription: "",
      record: "3",
      status: "待审核",
      class: "专卖部门数据规范集",
    },
    {
      dictListName: "部门性别字典表",
      discription: "",
      record: "3",
      status: "待审核",
      class: "专卖部门数据规范集",
    },
  ],
});

const handleAdd = () => {
  console.log("添加");
};

const handleDelete = () => {
  console.log("删除");
};

const handleEdit = (index: string, row: string) => {
  console.log("编辑:index:", index, "row:", row);
};

const handleDeleteRow = (index: string, row: string) => {
  console.log("删除:index:", index, "row:", row);
};

onMounted(() => {
  handleBasicInfoQuery();
});
</script>

<style scoped lang="scss">
.outer-container{
  padding: 20px;
}
.basic-info,
.std-dict-list {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  background-color: var(--el-bg-color-overlay);
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);
}
</style>
