<!-- 数仓数据概览(未完成) -->
<!-- 这个文件是某表详细信息下的操作-查看字段信息，其中的编辑功能没实现，他没封装 -->
<!-- 创建者: 黄云乔 1825207860@qq.com -->
<template>
  <div class="app-container">
    <div class="table-container">
      <el-input
        v-model="datainfo.keywords"
        placeholder="请输入搜索内容"
        clearable
        style="width: 200px; margin-bottom: 10px"
        @keyup.enter="fieldinfoQuery"
      />

      <el-table
        highlight-current-row
        :data="fieldinformation"
        border
        style="height: 200px"
      >
        <el-table-column prop="id" align="center" width="50" />
        <el-table-column
          label="表名称"
          prop="columnName"
          align="center"
          width="150"
        />
        <el-table-column
          label="表类型"
          prop="type"
          align="center"
          width="150"
        />
        <el-table-column
          label="描述"
          prop="descriptions"
          align="center"
          min-width="150"
        />
        <el-table-column
          label="长度"
          prop="length"
          align="center"
          width="150"
        />
        <el-table-column
          label="是否允许为空"
          align="ifCanBeNull"
          width="150"
          prop="layering"
        />
        <el-table-column
          label="是否主键"
          align="ifIsKey"
          width="150"
          prop="department"
        />
        <el-table-column
          label="是否区分键"
          align="center"
          width="150"
          prop="ifIsPartitionKey"
        />
        <el-table-column
          label="备注"
          align="center"
          min-width="150"
          prop="remark"
        />
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              link
              @click="editdata(scope.row.id)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-if="datainfoTotal"
        v-model:total="datainfoTotal"
        v-model:page="datainfo.pageNum"
        v-model:limit="datainfo.pageSize"
        @pagination="fieldinfoQuery"
        style="margin-bottom: 0px"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import databaseAPI, { fieldinfo, fieldPageQuery } from "@/api/database";
function editdata(id: any) {} //编辑

const datainfoTotal = ref(0);
const datainfo = reactive<fieldPageQuery>({
  pageNum: 1,
  pageSize: 10,
});
//表id
const tableId = ref(0);
//
const fieldinformation = ref<fieldinfo[]>();
//数据加载
const fieldinfoLoading = ref(false);
function fieldinfoQuery() {
  fieldinfoLoading.value = true;
  databaseAPI
    .getfieldInfoList(datainfo)
    .then((data) => {
      fieldinformation.value = data.list;
      datainfoTotal.value = data.total;
      console.log("ss");
      console.log(datainfo);
    })
    .finally(() => {
      fieldinfoLoading.value = false;
    });
}
onMounted(() => {
  fieldinfoQuery();
});
</script>

<style lang="scss" scoped>
.common-container {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  background-color: var(--el-bg-color-overlay);
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);
}
</style>
