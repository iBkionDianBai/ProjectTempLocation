<!-- 数据源管理页面 -->
<!-- 创建者: 刘海鑫 dian_bai2021@163.com -->
<template>
  <div class="outer-container">
    <!-- 搜索栏及功能按钮区域 -->
    <el-card class="top-content-container">
      <el-text class="mx-1" size="large" tag="b"> 数据源管理</el-text>
      <!-- 搜索栏和按钮 -->
      <el-row :gutter="20" style="margin-top: 10px">
        <el-col span="6">
          <el-input
            class="search"
            placeholder="搜索"
            size="normal"
            style="width: 200px; margin-top: 2px"
            v-model="queryListDataParams.keywords"
            @keyup.enter="handleListDataQuery"
          />
        </el-col>
        <el-col span="6">
          <el-button
            class="btn-search"
            size="default"
            type="primary"
            @click="handleListDataQuery"
          >
            <i-ep-search />搜索
          </el-button>
        </el-col>
        <el-col span="6">
          <el-button
            class="btn-reset"
            size="default"
            type="primary"
            @click="handleListDataReset"
          >
            <i-ep-refresh />重置
          </el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="list-content-container">
      <!-- 表格 -->
      <div style="margin-left: 10px">
        <el-button
          class="btn-search"
          size="default"
          type="success"
          @click="handleOpenAddDataSourceDialog"
        >
          <i-ep-plus />添加
        </el-button>
        <el-button
          class="btn-reset"
          size="default"
          type="danger"
          @click="handleDeleteListData"
          :disabled="listDataIds.length === 0"
        >
          <i-ep-delete /> 删除
        </el-button>
      </div>

      <el-table
        :data="listData"
        border
        v-loading="ListDataLoading"
        highlight-current-row
        @selection-change="handleListDataSelectionChange"
        style="margin-top: 10px"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          prop="dataConnectionName"
          label="数据连接名称"
          width="150"
          align="center"
        />
        <el-table-column
          prop="creator"
          label="创建者"
          width="130"
          align="center"
        />
        <el-table-column
          prop="dataSourceType"
          label="数据源类型"
          width="130"
          align="center"
        />
        <el-table-column
          prop="address"
          label="服务地址"
          width="130"
          align="center"
        />
        <el-table-column prop="port" label="端口" width="100" align="center" />
        <el-table-column
          prop="dataBase"
          label="数据库"
          width="130"
          align="center"
        />
        <el-table-column
          prop="dataSourceUserName"
          label="数据源用户名"
          width="140"
          align="center"
        />
        <el-table-column
          prop="createDate"
          label="创建时间"
          width="130"
          align="center"
        />
        <el-table-column
          prop="description"
          label="描述信息"
          min-width="130"
          align="center"
        />
        <el-table-column label="操作" width="140" align="center">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleDataSourceTest(scope.row.id)"
              link
              type="primary"
            >
              <i-ep-edit />
              测试
            </el-button>
            <el-button
              size="small"
              @click="handleDataSourceReference(scope.row.id)"
              link
              type="primary"
            >
              <i-ep-edit />
              引用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-if="listDataTotal > 0"
        v-model:total="listDataTotal"
        v-model:page="queryListDataParams.pageNum"
        v-model:limit="queryListDataParams.pageSize"
        @pagination="handleListDataQuery"
      />
    </el-card>
    <!--  弹窗  -->
    <el-dialog
      v-model="newDataSourceDialog.visible"
      :show-close="true"
      @close="handleCloseAddDataSourceDialog"
      style="max-width: 600px"
    >
      <div class="form-content-container" style="margin-top: 10px">
        <el-form
          style="max-width: 600px"
          label-width="auto"
          ref="newDataSourceFormRef"
          :model="newDataSourceForm"
          :rules="newDataSourceFormRules"
        >
          <el-form-item label="数据源连接类型" prop="dataSourceType">
            <el-select v-model="newDataSourceForm.dataSourceType" filterable>
              <el-option
                v-for="items in newDataSourceType"
                :key="items.value"
                :label="items.label"
                :value="items.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="连接名称" prop="connectionName">
            <el-input v-model="newDataSourceForm.connectionName" />
          </el-form-item>
          <el-form-item label="描述" prop="descriptions">
            <el-input
              type="textarea"
              row="2"
              v-model="newDataSourceForm.descriptions"
              placeholder="描述"
            />
          </el-form-item>
          <el-form-item label="连接地址" prop="address">
            <el-input v-model="newDataSourceForm.address" placeholder="地址" />
          </el-form-item>
          <el-form-item label="端口" prop="port">
            <el-input v-model="newDataSourceForm.port" placeholder="端口" />
          </el-form-item>
          <el-form-item label="数据库名称" prop="dataBase">
            <el-input
              v-model="newDataSourceForm.dataBase"
              placeholder="数据库"
            />
          </el-form-item>
          <el-form-item label="用户名" prop="userName">
            <el-input
              v-model="newDataSourceForm.userName"
              placeholder="用户名"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              show-password
              v-model="newDataSourceForm.password"
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item>
            <div class="form-btn">
              <el-button type="success" @click="handleNewDataSourceFormSubmit"
                >确定</el-button
              >
              <el-button type="danger" @click="handleCloseAddDataSourceDialog"
                >取消</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import DataSourceAPI, {
  ListDataPageQuery,
  ListDataPageVO,
  DataSourceForm,
  NewDataSourceType,
} from "@/api/dataSourceManager";

// 表格查询对象
const queryListDataParams = reactive<ListDataPageQuery>({
  pageNum: 1,
  pageSize: 10,
});
// 表格列表总数
const listDataTotal = ref(0);
// 规范表格列表
const listData = ref<ListDataPageVO[]>();
// 表格选中id
const listDataIds = ref<number[]>([]);
// 表格数据加载
const ListDataLoading = ref(false);

// 表格数据查询
function handleListDataQuery() {
  ListDataLoading.value = true;
  DataSourceAPI.getListData(queryListDataParams)
    .then((data) => {
      listData.value = data.list;
      listDataTotal.value = data.total;
    })
    .finally(() => {
      ListDataLoading.value = false;
    });
}
// 表格数据重置
const handleListDataReset = () => {
  queryListDataParams.keywords = "";
  queryListDataParams.pageNum = 1;
  handleMetaDataQuery();
};
// 添加数据源弹窗显示
const newDataSourceDialog = reactive({
  visible: false,
});
// 打开添加数据源弹窗
function handleOpenAddDataSourceDialog() {
  newDataSourceDialog.visible = true;
}
// 关闭添加数据源弹窗
function handleCloseAddDataSourceDialog() {
  newDataSourceDialog.visible = false;
  newDataSourceForm.dataSourceType = "";
  newDataSourceForm.connectionName = "";
  newDataSourceForm.password = "";
  newDataSourceForm.dataBase = "";
  newDataSourceForm.descriptions = "";
  newDataSourceForm.port = "";
  newDataSourceForm.userName = "";
  newDataSourceForm.address = "";
}
// 新建数据源表单
const newDataSourceForm = reactive<DataSourceForm>({});
// 新建数据源类型
const newDataSourceType = ref<NewDataSourceType[]>();
// 新建数据源表单填入规则
const newDataSourceFormRules = reactive({
  dataSourceType: [
    { required: true, message: "请选择数据源类型", trigger: "blur" },
  ],
  connectionName: [
    { required: true, message: "数据源名不能为空", trigger: "blur" },
  ],
  descriptions: [{ required: true, message: "描述不能为空", trigger: "blur" }],
  address: [{ required: true, message: "数据源地址不能为空", trigger: "blur" }],
  port: [{ required: true, message: "数据源端口不能为空", trigger: "blur" }],
  dataBase: [
    { required: true, message: "数据库名称不能为空", trigger: "blur" },
  ],
  userName: [
    { required: true, message: "数据源用户名不能为空", trigger: "blur" },
  ],
  password: [
    { required: true, message: "数据源密码不能为空", trigger: "blur" },
  ],
});
// 新建数据源表单加载
const newDataSourceFormLoading = ref(false);
// 新建数据源表单提交
const newDataSourceFormRef = ref(ElForm);
// 数据源新建类型查询加载
const dataSourceTypeQueryLoading = ref(false);
// 数据源新建类型查询
function handleDataSourceTypeQuery() {
  dataSourceTypeQueryLoading.value = true;
  DataSourceAPI.getDataSourceType()
    .then((data) => {
      newDataSourceType.value = data.list;
    })
    .finally(() => {
      dataSourceTypeQueryLoading.value = false;
    });
}
// 新建数据源表单提交
const handleNewDataSourceFormSubmit = useThrottleFn(() => {
  newDataSourceFormRef.value.validate((valid: any) => {
    if (valid) {
      newDataSourceFormLoading.value = true;
      DataSourceAPI.addDataSource(newDataSourceForm)
        .then(() => {
          ElMessage.success("新增字典成功");
          handleCloseAddDataSourceDialog();
        })
        .finally(() => (newDataSourceFormLoading.value = false));
    }
  });
}, 3000);
// 选中表格id
function handleListDataSelectionChange(selection: any) {
  listDataIds.value = selection.map((item: any) => item.id);
}
// 删除表格元素
function handleDeleteListData(listDataId: number) {
  const ids = [listDataId || listDataIds.value].join(",");
  if (!ids) {
    ElMessage.warning("请勾选删除项");
    return;
  }
  ElMessageBox.confirm("确认删除?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ListDataLoading.value = true;
      DataSourceAPI.deleteDataList(ids).then(() => {
        ElMessage.success("删除成功");
        handleListDataQuery();
      });
    })
    .catch(() => {
      ElMessage.info("已取消删除");
    })
    .finally(() => {
      ListDataLoading.value = false;
    });
}
// 数据源测试加载
const dataSourceTestLoading = ref(false);
// 数据源测试
function handleDataSourceTest(id?: number) {
  dataSourceTestLoading.value = true;
  DataSourceAPI.testDataSource(id).then((data) => {
    if (data.result == 1) {
      ElMessage.success("测试成功");
    } else {
      ElMessage.warning("测试失败");
    }
  });
}

// 数据源引用
function handleDataSourceReference(id?: number) {}
onMounted(() => {
  handleListDataQuery();
  handleDataSourceTypeQuery();
});
</script>

<style lang="scss" scoped>
.outer-container {
  padding: 20px;
}

.top-content-container {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  background-color: var(--el-bg-color-overlay);
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);
}
</style>
