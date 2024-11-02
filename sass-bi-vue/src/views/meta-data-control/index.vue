<template>
  <div class="app-container">
    <div class="common-container">
      <el-descriptions title="基本信息" column="2">
        <el-descriptions-item label="名称:">{{
          metaDataInfo.metaDataName
        }}</el-descriptions-item>
        <el-descriptions-item label="创建时间:">{{
          metaDataInfo.createTime
        }}</el-descriptions-item>
        <el-descriptions-item label="描述:">{{
          metaDataInfo.descriptions
        }}</el-descriptions-item>
      </el-descriptions>
    </div>

    <el-card shadow="never" class="table-container">
      <template #header>
        <el-row :gutter="20">
          <el-col :span="2" style="padding-top: 5px">
            <el-text class="mx-1" size="large" tag="b">规范字典列表</el-text>
          </el-col>
          <el-col :span="6">
            <el-input
              v-model="queryStandardDictionaryParams.keywords"
              placeholder="请输入搜索内容"
              clearable
              style="width: 200px; margin-right: 15px"
              @keyup.enter="handleStandardDictionaryQuery"
            />
            <el-button type="primary" @click="handleStandardDictionaryQuery">
              <i-ep-search />搜索
            </el-button>
            <el-button @click="handleResetMetaDataQuery">
              <i-ep-refresh />
              重置
            </el-button>
          </el-col>
          <el-col :span="12" />
          <el-col :span="4">
            <el-button
              type="success"
              @click="handleOpenNewStandardDictionaryDialog()"
            >
              <i-ep-plus />新建
            </el-button>
            <el-button
              type="danger"
              :disabled="standardDictionaryIds.length === 0"
              @click="handleDeleteStandardDictionary()"
            >
              <i-ep-delete />删除
            </el-button>
          </el-col>
        </el-row>
      </template>

      <el-table
        ref="dataTableRef"
        v-loading="metaLoading"
        :data="standardDictionaryList"
        highlight-current-row
        border
        @selection-change="handleStandardDictionarySelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          label="字典列表名称"
          prop="dictionaryListName"
          align="center"
          width="150"
        />
        <el-table-column label="描述" prop="descriptions" min-width="150" />
        <el-table-column
          label="数据标准记录数"
          prop="dataStandardsRecords"
          align="center"
          width="150"
        />
        <el-table-column label="审核状态" align="center" width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.auditStatus === 1" type="success"
              >审核完成</el-tag
            >
            <el-tag v-else type="info">待审核</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="所属类目"
          align="center"
          width="200"
          prop="status"
        />

        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              link
              @click="handleOpenDetailStandardDictionaryDialog(scope.row.id)"
            >
              <i-ep-edit />查看
            </el-button>
            <el-button
              type="danger"
              size="small"
              link
              @click="handleDeleteStandardDictionary(scope.row.id)"
            >
              <i-ep-delete />删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-if="standardDictionaryTotal > 0"
        v-model:total="standardDictionaryTotal"
        v-model:page="queryStandardDictionaryParams.pageNum"
        v-model:limit="queryStandardDictionaryParams.pageSize"
        @pagination="handleMetaDataQuery"
      />
    </el-card>

    <el-dialog
      v-model="detailStandardDictionaryDialog.visible"
      :show-close="true"
      @close="handleCloseDetailStandardDictionaryDialog"
    >
      <div class="common-container">
        <el-descriptions title="字典表基础信息" column="3">
          <el-descriptions-item label="字典表名称:">{{
            dictionaryBasicInfo.dictionaryName
          }}</el-descriptions-item>
          <el-descriptions-item label="创建时间:">{{
            dictionaryBasicInfo.createTime
          }}</el-descriptions-item>
          <el-descriptions-item label="创建人:">{{
            dictionaryBasicInfo.createUser
          }}</el-descriptions-item>
          <el-descriptions-item label="描述:">{{
            dictionaryBasicInfo.descriptions
          }}</el-descriptions-item>
        </el-descriptions>
      </div>

      <el-card shadow="never" class="table-container">
        <template #header>
          <el-row :gutter="20">
            <el-col :span="3" style="padding-top: 5px">
              <el-text class="mx-1" size="large" tag="b">字典列表</el-text>
            </el-col>
            <el-col :span="12">
              <el-input
                v-model="queryDictionaryParams.keywords"
                placeholder="请输入搜索内容"
                clearable
                style="width: 200px; margin-right: 15px"
                @keyup.enter="handleDictionaryListQuery"
              />
              <el-button type="primary" @click="handleDictionaryListQuery">
                <i-ep-search />搜索
              </el-button>
              <el-button @click="handleResetDictionaryQuery">
                <i-ep-refresh />
                重置
              </el-button>
            </el-col>
            <el-col :span="3" />
            <el-col :span="6">
              <el-button type="success" @click="handleOpenNewDictionaryDialog">
                <i-ep-plus />新建
              </el-button>
              <el-button
                type="danger"
                :disabled="dictionaryIds.length === 0"
                @click="handleDeleteDictionary"
              >
                <i-ep-delete />删除
              </el-button>
            </el-col>
          </el-row>
        </template>

        <el-table
          height="300px"
          ref="dataTableRef"
          v-loading="dictionaryLoading"
          :data="dictionaryList"
          highlight-current-row
          border
          @selection-change="handleDictionarySelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="标准字典名"
            prop="dictionaryName"
            width="110"
            align="center"
          />
          <el-table-column
            label="标准字典值"
            prop="dictionaryValue"
            width="100"
            align="center"
          />
          <el-table-column
            label="替换值"
            prop="replaceValue"
            width="150"
            align="center"
          />
          <el-table-column
            label="描述"
            align="center"
            prop="descriptions"
            min-width="200"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="150"
            align="center"
          >
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                link
                @click="handleOpenEditDialog(scope.row.id)"
              >
                <i-ep-edit />编辑
              </el-button>
              <el-button
                type="danger"
                size="small"
                link
                @click="handleDeleteDictionary(scope.row.id)"
              >
                <i-ep-delete />删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-if="dictionaryTotal > 0"
          v-model:total="dictionaryTotal"
          v-model:page="queryDictionaryParams.pageNum"
          v-model:limit="queryDictionaryParams.pageSize"
          @pagination="handleDictionaryQuery"
        />
      </el-card>
    </el-dialog>

    <el-dialog
      width="600px"
      v-model="newStandardDictionaryDialog.visible"
      :show-close="true"
      @close="handelCloseNewStandardDictionaryDialog"
    >
      <el-form
        style="max-width: 600px"
        label-width="auto"
        status-icon
        ref="newStandardDictionaryFormRef"
        :model="newStandardDictionaryForm"
        :rules="newStandardDictionaryFormRules"
      >
        <el-form-item label="字典表名称" prop="dictionaryListName">
          <el-input v-model="newStandardDictionaryForm.dictionaryListName" />
        </el-form-item>
        <el-form-item label="描述" prop="descriptions">
          <el-input
            v-model="newStandardDictionaryForm.descriptions"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="数据标准记录数" prop="dataStandardsRecords">
          <el-input-number
            v-model="newStandardDictionaryForm.dataStandardsRecords"
            :min="1"
          />
        </el-form-item>
        <el-form-item label="所属类目" prop="status">
          <el-select
            v-model="newStandardDictionaryForm.status"
            placeholder="所属类目"
          >
            <div v-for="s in status">
              <el-option :label="s" :value="s" />
            </div>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleNewStandardDictionarySubmit">
            提交
          </el-button>
          <el-button @click="handelCloseNewStandardDictionaryDialog"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      width="600px"
      v-model="newDictionaryDialog.visible"
      :show-close="true"
      @close="handelCloseNewDictionaryDialog"
    >
      <el-form
        style="max-width: 600px"
        label-width="auto"
        status-icon
        ref="newDictionaryFormRef"
        :model="newDictionaryForm"
        :rules="newDictionaryFormRules"
      >
        <el-form-item label="标准字典名" prop="dictionaryName">
          <el-input v-model="newDictionaryForm.dictionaryName" />
        </el-form-item>
        <el-form-item label="标准字典值" prop="dictionaryValue">
          <el-input v-model="newDictionaryForm.dictionaryValue" />
        </el-form-item>
        <el-form-item label="替换值" prop="replaceValue">
          <el-input v-model="newDictionaryForm.replaceValue" />
        </el-form-item>
        <el-form-item label="描述" prop="descriptions">
          <el-input v-model="newDictionaryForm.descriptions" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleNewDictionarySubmit">
            提交
          </el-button>
          <el-button @click="handelCloseNewDictionaryDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import MetaDataAPI, {
  MetaDataInfo,
  StandardDictionaryPageQuery,
  StandardDictionaryPageVO,
  DictionaryBasicInfo,
  DictionaryPageQuery,
  DictionaryPageVO,
  StandardDictionaryForm,
  DictionaryForm,
} from "@/api/meta-data";

// 元数据id
const metaDataId = ref(0);
// 元数据基本信息
const metaDataInfo = reactive<MetaDataInfo>({
  metaDataName: "",
  createTime: "",
  descriptions: "",
});
// 规范字典列表查询对象
const queryStandardDictionaryParams = reactive<StandardDictionaryPageQuery>({
  pageNum: 1,
  pageSize: 10,
});
// 规范字典列表总数
const standardDictionaryTotal = ref(0);
// 规范字典列表
const standardDictionaryList = ref<StandardDictionaryPageVO[]>();
// 规范字典选中id
const standardDictionaryIds = ref<number[]>([]);
// 查看弹窗显示控制
const detailStandardDictionaryDialog = reactive({
  visible: false,
});
// 元数据加载
const metaLoading = ref(false);

// 重置查询
function handleResetMetaDataQuery() {
  queryStandardDictionaryParams.keywords = "";
  queryStandardDictionaryParams.pageNum = 1;
  handleMetaDataQuery();
}
// 元数据基本信息查询
function handleMetaDataQuery() {
  metaLoading.value = true;
  MetaDataAPI.getMetaDataInfo(metaDataId.value)
    .then((data) => {
      metaDataInfo.metaDataName = data.metaDataName;
      metaDataInfo.createTime = data.createTime;
      metaDataInfo.descriptions = data.descriptions;
    })
    .finally(() => {
      metaLoading.value = false;
    });
}
// 规范字典列表查询
function handleStandardDictionaryQuery() {
  metaLoading.value = true;
  MetaDataAPI.getStandardDictionaryList(queryStandardDictionaryParams)
    .then((data) => {
      standardDictionaryList.value = data.list;
      standardDictionaryTotal.value = data.total;
    })
    .finally(() => {
      metaLoading.value = false;
    });
}
// 打开规范字典查看弹窗
function handleOpenDetailStandardDictionaryDialog(id?: number) {
  detailStandardDictionaryDialog.visible = true;
  handleDictionaryQuery(typeof id === "number" ? id : -1);
  handleDictionaryListQuery();
}
// 关闭规范字典查看弹窗
function handleCloseDetailStandardDictionaryDialog() {
  detailStandardDictionaryDialog.visible = false;
}
// 选中标准字典id
function handleStandardDictionarySelectionChange(selection: any) {
  standardDictionaryIds.value = selection.map((item: any) => item.id);
}
// 删除规范字典
function handleDeleteStandardDictionary(standardDictionaryId?: number) {
  const ids = [standardDictionaryId || standardDictionaryIds.value].join(",");
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
      metaLoading.value = true;
      MetaDataAPI.deleteStandardDictionaryList(ids).then(() => {
        ElMessage.success("删除成功");
        handleStandardDictionaryQuery();
      });
    })
    .catch(() => {
      ElMessage.info("已取消删除");
    })
    .finally(() => {
      metaLoading.value = false;
    });
}

// 字典表基础信息
const dictionaryBasicInfo = reactive<DictionaryBasicInfo>({
  // 字典表名称
  dictionaryName: "",
  // 创建时间
  createTime: "",
  // 创建人
  createUser: "",
  // 描述
  descriptions: "",
});
// 字典数据加载
const dictionaryLoading = ref(false);
// 字典查询对象
const queryDictionaryParams = reactive<DictionaryPageQuery>({
  pageNum: 1,
  pageSize: 10,
});
// 字典查询总数
const dictionaryTotal = ref(0);
// 字典列表
const dictionaryList = ref<DictionaryPageVO[]>();
// 字典选择id
const dictionaryIds = ref<number[]>([]);

// 查询字典表
function handleDictionaryQuery(dictionaryId: number) {
  dictionaryLoading.value = true;
  MetaDataAPI.getDictionaryDataInfo(dictionaryId)
    .then((data) => {
      dictionaryBasicInfo.dictionaryName = data.dictionaryName;
      dictionaryBasicInfo.createTime = data.createTime;
      dictionaryBasicInfo.createUser = data.createUser;
      dictionaryBasicInfo.descriptions = data.descriptions;
    })
    .finally(() => {
      dictionaryLoading.value = false;
    });
}
// 查询字典列表
function handleDictionaryListQuery() {
  dictionaryLoading.value = true;
  MetaDataAPI.getDictionaryList(queryDictionaryParams)
    .then((data) => {
      dictionaryList.value = data.list;
      dictionaryTotal.value = data.total;
    })
    .finally(() => {
      dictionaryLoading.value = false;
    });
}
// 重置字典列表查询
function handleResetDictionaryQuery() {
  queryDictionaryParams.keywords = "";
  queryDictionaryParams.pageNum = 1;
  handleDictionaryListQuery();
}
// 选中字典列表id
function handleDictionarySelectionChange(selection: any) {
  dictionaryIds.value = selection.map((item: any) => item.id);
}
// 删除字典
function handleDeleteDictionary(dictionaryId?: number) {
  const ids = [dictionaryId || dictionaryIds.value].join(",");
  if (!ids) {
    ElMessage.warning("请勾选删除项");
    return;
  }
  ElMessageBox.confirm("确认删除?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(function () {
      metaLoading.value = true;
      MetaDataAPI.deleteDictionaryList(ids).then(() => {
        ElMessage.success("删除成功");
        handleDictionaryListQuery();
      });
    })
    .catch(function () {
      ElMessage.info("已取消删除");
    })
    .finally(() => {
      metaLoading.value = false;
    });
}
// 打开编辑字典弹窗
function handleOpenEditDialog() {}

// 新建规范字典弹窗控制
const newStandardDictionaryDialog = reactive({
  visible: false,
});
// 新建规范字典弹窗表单
const newStandardDictionaryForm = reactive<StandardDictionaryForm>({
  // 数据标准记录数
  dataStandardsRecords: 0,
  // 审核状态
  auditStatus: 0,
  // 创建人
  createUser: "ADMIN",
});
//  新建规范字典弹窗表单控制规则
const newStandardDictionaryFormRules = reactive({
  dictionaryListName: [
    { required: true, message: "字典表名称不能为空", trigger: "blur" },
  ],
  descriptions: [{ required: true, message: "描述不能为空", trigger: "blur" }],
  dataStandardsRecords: [
    {
      required: true,
      message: "请输入数据标准记录数",
      trigger: "change",
    },
  ],
  status: [{ required: true, message: "所属类目不能为空", trigger: "blur" }],
});
// 所属类别信息
const status = ref<string[]>();
// 新建规范字典表单提交
const newStandardDictionaryFormRef = ref(ElForm);
// 获取所属类别信息
function handleStatusQuery() {
  MetaDataAPI.getStandardDictionaryStatus(metaDataId.value).then((data) => {
    status.value = data.list;
  });
}
// 打开规范字典新建弹窗
function handleOpenNewStandardDictionaryDialog() {
  handleStatusQuery();
  newStandardDictionaryDialog.visible = true;
}
// 关闭新建规范字典弹窗
function handelCloseNewStandardDictionaryDialog() {
  newStandardDictionaryDialog.visible = false;
  newStandardDictionaryForm.dictionaryListName = "";
  newStandardDictionaryForm.descriptions = "";
  newStandardDictionaryForm.dataStandardsRecords = 0;
  newStandardDictionaryForm.status = "";
}
// 新建规范字典表单提交
const handleNewStandardDictionarySubmit = useThrottleFn(() => {
  newStandardDictionaryFormRef.value.validate((valid: any) => {
    if (valid) {
      metaLoading.value = true;
      MetaDataAPI.addStandardDictionary(newStandardDictionaryForm)
        .then(() => {
          ElMessage.success("新增规范字典成功");
          handelCloseNewStandardDictionaryDialog();
          handleResetMetaDataQuery();
        })
        .finally(() => (metaLoading.value = false));
    }
  });
}, 3000);

// 新建字典弹窗控制
const newDictionaryDialog = reactive({
  visible: false,
});
// 新建字典弹窗表单
const newDictionaryForm = reactive<DictionaryForm>({});
// 新建字典表单提交
const newDictionaryFormRef = ref(ElForm);
//  新建字典弹窗表单控制规则
const newDictionaryFormRules = reactive({
  dictionaryName: [
    { required: true, message: "标准字典名不能为空", trigger: "blur" },
  ],
  dictionaryValue: [
    { required: true, message: "标准字典值不能为空", trigger: "blur" },
  ],
  replaceValue: [
    { required: true, message: "替换值不能为空", trigger: "blur" },
  ],
  descriptions: [{ required: true, message: "描述不能为空", trigger: "blur" }],
});
// 关闭新建规范字典弹窗
function handelCloseNewDictionaryDialog() {
  newDictionaryDialog.visible = false;
  newDictionaryForm.dictionaryName = "";
  newDictionaryForm.dictionaryValue = "";
  newDictionaryForm.replaceValue = "";
  newDictionaryForm.descriptions = "";
}
// 打开新建字典弹窗
function handleOpenNewDictionaryDialog() {
  newDictionaryDialog.visible = true;
}
// 新建字典表单提交
const handleNewDictionarySubmit = useThrottleFn(() => {
  newDictionaryFormRef.value.validate((valid: any) => {
    if (valid) {
      dictionaryLoading.value = true;
      MetaDataAPI.addDictionary(newDictionaryForm)
        .then(() => {
          ElMessage.success("新增字典成功");
          handelCloseNewDictionaryDialog();
          handleResetDictionaryQuery();
        })
        .finally(() => (dictionaryLoading.value = false));
    }
  });
}, 3000);

onMounted(() => {
  handleMetaDataQuery();
  handleStandardDictionaryQuery();
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
