<!-- 创建数据抽取任务页面(未完成) -->
<!-- 创建者: 刘海鑫 dian_bai2021@163.com -->
<template>
  <div class="outer-container">
    <!-- 顶部按钮区 -->
    <div class="top-btn-container" fixed="right">
      <el-button @click="handleLock">锁定</el-button>
      <el-button @click="handleSubmit">提交</el-button>
      <el-button @click="handleSave">保存</el-button>
      <el-button @click="handleVer">版本</el-button>
      <el-button @click="handleLog">日志</el-button>
      <el-button @click="handleRun">运行</el-button>
      <el-button @click="handleTestRun">试运行</el-button>
    </div>

    <!-- 中部功能按钮区 -->
    <div class="mid-btn-container">
      <!-- 表输入按钮 -->
      <div class="form-input">
        <el-button @click="newMixFormInputOpen">表输入</el-button>
      </div>
      <!-- 表输入弹窗 -->
      <el-dialog
        class="form-input-dialog"
        title="表输入"
        v-model="newMixFormInput.visible"
        style="max-width: 870px"
        :show-close="true"
        @close="newMixFormInputClose"
        align-center
      >
        <el-row :gutter="20">
          <el-col span="20">
            <span style="margin-right: 20px">源数据库</span>
            <el-select
              v-model="mixFormInputDataBaseValue"
              style="width: 240px"
              placeholder="选择"
            >
              <el-option
                v-for="items in mixFormInputDataBase"
                :label="items.label"
                :key="items.value"
                :value="items.value"
              />
            </el-select>
          </el-col>
          <el-col span="20">
            <!-- 源表 -->
            <span style="margin-right: 20px">源表</span>
            <el-select
              v-model="mixFormInputSourceFormValue"
              style="width: 240px"
              placeholder="选择"
            >
              <el-option
                v-for="items in mixFormInputSourceForm"
                :label="items.label"
                :key="items.value"
                :value="items.value"
              />
            </el-select>
          </el-col>
        </el-row>
        <!-- 字段表部分 -->
        <div class="col-form-container" style="margin-top: 10px">
          <span class="col-title" style="margin-right: 20px">字段内容</span>
          <el-input
            v-model="mixFormInputColumnTableParams.keywords"
            placeholder="输入字段名查询"
            style="width: 240px"
            @keyup.enter="mixFormInputColumnTableQuery"
          />
        </div>
        <div class="col-form" style="margin-top: 5px">
          <el-table
            :data="mixFormInputColumnTable"
            border
            max-height="300px"
            :show-header="false"
          >
          </el-table>
        </div>
        <!-- 数据期列部分 -->
        <div class="data-series-container" style="margin-top: 10px">
          <span class="data-series-title" style="margin-right: 20px"
            >数据期列</span
          >
          <el-input
            v-model="mixFormInputDataPeriod"
            style="width: 240px"
            placeholder="请输入"
          />
        </div>
        <div class="fliter-container">
          <span class="fliter-title">过滤条件</span>
          <el-popover
            placement="bottom-start"
            title="提示"
            width="200"
            trigger="click"
            content="请输入SQL语句以过滤"
          >
            <template #reference>
              <el-input
                class="filter-input"
                autosize
                type="textarea"
                :rows="10"
                :style="{ fontFamily: 'monospace', fontSize: '14px' }"
                v-model="mixFormInputFilter"
                placeholder="请输入"
              />
            </template>
          </el-popover>
        </div>
        <div class="scanner-btn">
          <el-button @click="handleOpenDataExplorationDialog"
            >数据探查</el-button
          >
        </div>
      </el-dialog>
      <!-- 数据探查窗口 -->
      <el-dialog
        class="data-extraction-dialog"
        title="数据探查"
        v-model="newDataExplorationDialog.visible"
        style="min-width: 900px"
        :show-close="true"
        @close="handleCloseDataExplorationDialog"
        align-center
      ></el-dialog>
      <div class="muti-form-mix">
        <el-button @click="handleMutiForm001.show = true">多表聚合</el-button>
      </div>

      <!-- 多表聚合001弹窗 -->
      <el-dialog
        class="muti-form-mix-001-dialog"
        title="多表聚合001"
        v-model="newMutiForm001Dialog.visible"
        width="870"
        :close-on-click-modal="false"
        :beforeClose="handleClose"
        append-to-body
      >
        <!-- 源表输入部分 -->
        <div class="input-container-1">
          <div>源表A：</div>
          <el-input
            v-model="handleMutiForm001.sourceFormA"
            placeholder="请输入"
          />
        </div>
        <div class="input-container-2">
          <div>源表B：</div>
          <el-input
            v-model="handleMutiForm001.sourceFormB"
            placeholder="请输入"
          />
        </div>
        <div class="uni-method-container">
          <div class="uni-method-title">聚合方式：</div>
          <el-radio-group v-model="handleMutiForm001.uniMethod">
            <el-radio value="1"> 横向聚合(join) </el-radio>
            <el-radio value="2"> 纵向聚合(union) </el-radio>
          </el-radio-group>
        </div>
        <el-button @click="handleMutiForm001.handleFormEdit = true"
          >调整字段</el-button
        >
        <!-- 显示调整字段 -->
        <el-dialog
          title="调整聚合字段"
          v-model="handleMutiForm001.handleFormEdit"
          width="870"
          :close-on-click-modal="false"
          draggable
        >
          <el-table :data="handleMutiForm001.colFormA" border stripe>
            <el-table-column prop="colContentA" label="源表A">
              <!-- 编辑表格功能未实现 -->
            </el-table-column>
          </el-table>
          <el-table :data="handleMutiForm001.colFormB" border stripe>
            <el-table-column prop="colContentB" label="源表B" />
          </el-table>
        </el-dialog>
        <!-- 选择关联方式 -->
        <div class="choose-connect-method">
          <div>选择关联方式：</div>
          <el-radio-group v-model="handleMutiForm001.methodChoice">
            <el-radio value="1"> inner join </el-radio>
            <el-radio value="2"> full join </el-radio>
            <el-radio value="3"> left join </el-radio>
            <el-radio value="4"> right join </el-radio>
          </el-radio-group>
        </div>
        <!-- 选择关联字段 -->
        <div class="choose-connect-col">
          <div>选择关联字段：</div>
          <el-table border stripe />
        </div>
        <!-- 合并预览 -->
        <div class="preview">
          <el-button @click="handleMutiForm001.showPreView = true"
            >显示合并预览</el-button
          >
          <el-dialog
            title="合并预览"
            v-model="handleMutiForm001.showPreView"
            width="870"
            :close-on-click-modal="false"
          >
            <!-- 预览窗口内容未知 -->
          </el-dialog>
        </div>

        <!-- 数据期列 -->
        <div class="data-series-container">
          <div class="data-series-title">数据期列：</div>
          <el-input
            v-model="handleMutiForm001.dataSeries"
            placeholder="请输入"
          />
        </div>

        <div class="fliter-container">
          <div class="fliter-title">过滤条件：</div>
          <el-popover
            placement="bottom-start"
            title="提示"
            width="200"
            trigger="click"
            content="请输入SQL语句以过滤"
          >
            <template #reference>
              <el-input
                class="fliter-input"
                type="textarea"
                style="min-height: 300px"
                v-model="handleMutiForm001.fliterInput"
                placeholder="请输入"
              />
            </template>
          </el-popover>
        </div>
        <div class="scanner-btn">
          <el-button @click="handleMutiForm001.handleDataScanner"
            >数据探查</el-button
          >
        </div>
      </el-dialog>

      <div class="data-sort-001">
        <el-button @click="handleSort">数据排序</el-button>
      </div>
      <div class="form-output-001">
        <el-button @click="handleOutput">表输出</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from "element-plus";
import MissionCreateAPI, {
  NewColumnTableQuery,
  NewSourceDataBase,
  NewSourceForm,
} from "@/api/createMission";

// 新建表弹窗打开控制
const newMixFormInput = reactive({
  visible: false,
});
// 新建表弹窗打开
function newMixFormInputOpen() {
  newMixFormInput.visible = true;
}
// 新建表弹窗关闭
function newMixFormInputClose() {
  newMixFormInput.visible = false;
}
// 新建表源数据库选择
const mixFormInputDataBaseValue = ref("");
// 新建表源数据库
const mixFormInputDataBase = ref<NewSourceDataBase[]>({});
// 新建表源数据库查询加载
const mixFormInputDataBaseLoading = ref(false);
// 新建表源数据库查询
function handleMixFormInputDataBaseQuery() {
  mixFormInputDataBaseLoading.value = true;
  MissionCreateAPI.mixFormDataBaseQuery()
    .then((data) => {
      mixFormInputDataBase.value = data.list;
    })
    .finally(() => {
      mixFormInputDataBaseLoading.value = false;
    });
}
// 新建表源表选择
const mixFormInputSourceFormValue = ref("");
// 新建表源表
const mixFormInputSourceForm = ref<NewSourceForm[]>({});
// 新建表源表查询加载
const mixFormInputSourceFormLoading = ref(false);
// 新建表源表查询
function handleMixFormInputSourceFormQuery() {
  mixFormInputSourceFormLoading.value = true;
  MissionCreateAPI.mixFormSourceFormQuery()
    .then((data) => {
      mixFormInputSourceForm.value = data.list;
    })
    .finally(() => {
      mixFormInputSourceFormLoading.value = false;
    });
}
// 新建表字段表
const mixFormInputColumnTable = ref<NewColumnTable[]>();
// 新建表字段表查询对象
const mixFormInputColumnTableParams = reactive<NewColumnTableQuery>({});
// 新建表字段表查询加载
const mixFormInputColumnTableLoading = ref(false);
// 新建表字段表查询
function mixFormInputColumnTableQuery() {
  mixFormInputColumnTableLoading.value = true;
  MissionCreateAPI.mixFormColumnTableQuery(
    mixFormInputColumnTableParams,
    mixFormInputDataBaseValue,
    mixFormInputSourceFormValue
  )
    .then((data) => {
      mixFormInputColumnTable.value = data.list;
    })
    .finally(() => {
      mixFormInputColumnTableLoading.value = false;
    });
}
// 新建表数据期列
const mixFormInputDataPeriod = ref("");
// 新建表过滤条件
const mixFormInputFilter = ref("");
// 新建表数据探查弹窗显示
const newDataExplorationDialog = reactive({
  visible: false,
});
// 新建表打开数据探查弹窗
function handleOpenDataExplorationDialog() {
  newDataExplorationDialog.visible = false;
}
// 新建表关闭数据探查弹窗
function handleCloseDataExplorationDialog() {
  newDataExplorationDialog.visible = false;
}
const handleForm001 = ref({
  show: false,
});

const newMutiForm001Dialog = reactive({
  visible: false,
});
const handleSort = ref({
  show: false,
});
const handleOutput = ref({
  show: false,
});

const handleLock = () => {};
const handleSubmit = () => {};
const handleSave = () => {};
const handleVer = () => {};
const handleLog = () => {};
const handleRun = () => {};
const handleTestRun = () => {};

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("确认退出?")
    .then(() => {
      done();
    })
    .catch(() => {});
};

onMounted(() => {
  handleMixFormInputDataBaseQuery();
  handleMixFormInputSourceFormQuery();
});
</script>

<style lang="scss" scoped>
.outer-container {
  padding: 20px;
}
</style>
