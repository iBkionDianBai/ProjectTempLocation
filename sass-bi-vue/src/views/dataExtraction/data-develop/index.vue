<!-- 数据开发任务列表(未完成) -->
<!-- 这个文件里的错误表和目标表内容没封装，都写在这里，其他封装了 -->
<!-- 创建者: 黄云乔 1825207860@qq.com -->
<template>
  <div class="app-container">
    <div class="common-container">
      <el-button @click="handleOpencleanDialog"> 清洗规则配置 </el-button>
      <el-button @click="handleOpenmaskDialog">脱敏配置</el-button>
      <el-button @click="handleOpenstandardDialog"> 标准化规则配置 </el-button>
      <el-button @click="handleOpenwronDialog"> 错误表输出</el-button>
      <el-button @click="handleOpentargetDialog"> 目标表输出</el-button>
      <!-- 清洗表 -->
      <el-dialog
        v-model="cleanRulesDialog.visible"
        width="1000px"
        :show-close="true"
        @close="handleClosecleanDialog"
        title="清洗表"
      >
        <cleanComponent />
      </el-dialog>
      <!-- 脱敏表 -->
      <el-dialog
        v-model="maskRulesDialog.visible"
        width="800px"
        :show-close="true"
        @close="handleClosemaskDialog"
        title="脱敏表"
        ><maskComponent />
      </el-dialog>
      <!-- 标准表 -->
      <el-dialog
        v-model="standardRulesDialog.visible"
        width="800px"
        :show-close="true"
        @close="handleClosestandardDialog"
        title="标准表"
        ><standarComponent />
      </el-dialog>
      <!-- 目标表 -->
      <el-dialog
        v-model="targetDialog.visible"
        width="600px"
        :show-close="true"
        @close="handleClosetargetDialog"
        title="目标表"
      >
        <div class="common-container">
          <el-form label-width="auto" style="max-width: 600px">
            <el-form-item label="目标表数据源：">
              <el-select
                v-model="targetListref.datasource"
                size="small"
                style="width: 240px"
              >
                <el-option
                  v-for="item in targetdataQuery.datasourceOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
              /></el-select>
            </el-form-item>
            <el-form-item label="目标表：">
              <el-select
                v-model="targetListref.wrongTable"
                size="small"
                style="width: 240px"
              >
                <el-option
                  v-for="item in targetdataQuery.TableOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
              /></el-select>
              <el-button
                size="small"
                type="primary"
                text
                bg
                style="margin-left: 10px"
                @click="handleOpentargetNewDialog"
                >新建目标表</el-button
              >
            </el-form-item>
            <el-form-item label="写入规则：">
              <el-radio-group v-model="targetListref.rules">
                <el-radio value=" 覆盖写入">覆盖写入</el-radio>
                <el-radio value="追加写入">追加写入</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="设置分区：">
              <el-select
                v-model="targetListref.pations"
                placeholder="optdt"
                size="small"
                style="width: 180px"
                @change="handlewronsubmit"
              >
                <el-option
                  v-for="item in pationsOptions"
                  :key="item"
                  :label="item"
                  :value="item"
              /></el-select>
              <el-select
                v-model="targetListref.operationalFactor"
                placeholder=">=<"
                size="small"
                style="width: 120px; margin-left: 10px"
                @change="handlewronsubmit"
              >
                <el-option
                  v-for="item in operationalFactorOptions"
                  :key="item"
                  :label="item"
                  :value="item"
              /></el-select>
            </el-form-item>
            <el-form-item label="数据存储格式：">
              <el-radio-group v-model="targetListref.rules">
                <el-radio value=" 是否压缩">是否压缩</el-radio>
                <el-radio value="列式存储">列式存储</el-radio>
                <el-radio value=" 行式存储">行式存储</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
      <!-- 错误表 -->
      <el-dialog
        v-model="wrontableDialog.visible"
        width="600px"
        :show-close="true"
        @close="handleClosewronDialog"
        title="错误表"
      >
        <div class="common-container">
          <el-form label-width="auto" style="max-width: 600px">
            <el-form-item label="错误表数据源：">
              <el-select
                v-model="wrongtableref.datasource"
                size="small"
                style="width: 240px"
              >
                <el-option
                  v-for="item in wrongdataQueryref.datasourceOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
              /></el-select>
            </el-form-item>
            <el-form-item label="错误表：">
              <el-select
                v-model="wrongtableref.wrongTable"
                size="small"
                style="width: 240px"
              >
                <el-option
                  v-for="item in wrongdataQueryref.wronTableOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
              /></el-select>
              <!-- 功能没写 -->
              <el-button
                size="small"
                type="primary"
                text
                bg
                style="margin-left: 10px"
                @click="handleOpenwronNewDialog"
                >新建错误表</el-button
              >
            </el-form-item>
            <el-form-item label="写入规则：">
              <el-radio-group v-model="wrongtableref.rules">
                <el-radio value=" 覆盖写入">覆盖写入</el-radio>
                <el-radio value="追加写入">追加写入</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="设置分区：">
              <el-select
                v-model="wrongtableref.pations"
                placeholder="optdt"
                size="small"
                style="width: 180px"
                @change="handlewronsubmit"
              >
                <el-option
                  v-for="item in wrongdataQueryref.pationsOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
              /></el-select>
              <el-select
                v-model="wrongtableref.operationalFactor"
                placeholder=">=<"
                size="small"
                style="width: 120px; margin-left: 10px"
                @change="handlewronsubmit"
              >
                <el-option
                  v-for="item in wrongdataQueryref.operationalFactorOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
              /></el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
    <!-- 新建错误表 -->
    <el-dialog
      title="新建表"
      width="800px"
      v-model="wronNewDialog.visible"
      :show-close="true"
      @close="handleClosewronNewDialog"
      align="center"
    >
      <div class="common-container">
        <el-descriptions
          title="错误表基础信息"
          :column="3"
          ref="newdatabaseref"
          :model="newdatabaseForm"
        >
          <el-descriptions-item label="名称:"
            ><el-input
              v-model="newdatabaseForm.tableName"
              size="small"
              style="width: 240px"
          /></el-descriptions-item>
          <el-descriptions-item label="生命周期:">
            <el-select
              v-model="newdatabaseForm.lifeCycle"
              placeholder="Select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="item in lifeCycle"
                :key="item"
                :label="item"
                :value="item"
              /> </el-select
          ></el-descriptions-item>
          <el-descriptions-item label="表描述:"
            ><el-input
              v-model="newdatabaseForm.description"
              size="small"
              style="width: 240px"
          /></el-descriptions-item>
          <el-descriptions-item label="业务系统:"
            ><el-select
              v-model="newdatabaseForm.sysetem"
              placeholder="Select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="item in sysetem"
                :key="item"
                :label="item"
                :value="item"
              /> </el-select
          ></el-descriptions-item>
          <el-descriptions-item label="部门:"
            ><el-select
              v-model="newdatabaseForm.department"
              placeholder="Select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="item in department"
                :key="item"
                :label="item"
                :value="item"
              /> </el-select
          ></el-descriptions-item>
          <el-descriptions-item label="数仓数据源:"
            ><el-select
              v-model="newdatabaseForm.datasource"
              placeholder="Select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="item in datasource"
                :key="item"
                :label="item"
                :value="item"
              /> </el-select
          ></el-descriptions-item>
          <el-descriptions-item label="数仓层域:"
            ><el-select
              v-model="newdatabaseForm.hierarchy"
              placeholder="Select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="item in hierarchy"
                :key="item"
                :label="item"
                :value="item"
              /> </el-select
          ></el-descriptions-item>
          <el-descriptions-item label="审核状态:">
            <el-select
              v-model="newdatabaseForm.auditStatus"
              placeholder="Select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="item in auditStatus"
                :key="item"
                :label="item"
                :value="item"
              /> </el-select
          ></el-descriptions-item>
          <el-descriptions-item label="数据连接:">
            <el-select
              v-model="newdatabaseForm.dataConnection"
              placeholder="Select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="item in dataConnection"
                :key="item"
                :label="item"
                :value="item"
              /> </el-select
          ></el-descriptions-item>
          <el-descriptions-item label="压缩格式:">
            <el-select
              v-model="newdatabaseForm.compressedFormat"
              placeholder="Select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="item in compressedFormat"
                :key="item"
                :label="item"
                :value="item"
              /> </el-select
          ></el-descriptions-item>
          <el-descriptions-item label="存储格式:">
            <el-select
              v-model="newdatabaseForm.storageFormat"
              placeholder="Select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="item in storageFormat"
                :key="item"
                :label="item"
                :value="item"
              /> </el-select
          ></el-descriptions-item>
          <el-descriptions-item label="标签:">
            <el-select
              v-model="newdatabaseForm.label"
              placeholder="Select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="item in label"
                :key="item"
                :label="item"
                :value="item"
              /> </el-select
          ></el-descriptions-item>
          <el-descriptions-item label="表类型:">
            <el-select
              v-model="newdatabaseForm.tableType"
              placeholder="Select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="item in tableType"
                :key="item"
                :label="item"
                :value="item"
              /> </el-select
          ></el-descriptions-item>
          <el-descriptions-item label="创建人:">
            <el-input
              v-model="newdatabaseForm.creator"
              size="small"
              style="width: 240px"
          /></el-descriptions-item>
          <el-descriptions-item />
        </el-descriptions>
      </div>
      <div class="common-container">
        <el-card shadow="never" class="table-container">
          <template #header>
            <el-row :gutter="60">
              <el-col :span="5">
                <el-text class="mx-1" size="large" tag="b">添加列</el-text>
              </el-col>
              <el-col :span="8" />
              <el-col :span="10">
                <el-button size="small" @click="add">添加</el-button>
                <el-button size="small">删除</el-button>
              </el-col>
            </el-row>
          </template>
          <el-table
            height="150px"
            ref="dataTableRef"
            v-loading="newdataLoading"
            :data="newdatacolumn"
            highlight-current-row
            border
          >
            <el-table-column
              label="列名"
              prop="name"
              width="110"
              align="center"
            >
              <template #default="scope">
                <el-input v-model="scope.row.name" />
              </template>
            </el-table-column>
            <el-table-column
              label="类型"
              prop="type"
              width="150"
              align="center"
            >
              <template #default="scope">
                <el-select
                  v-model="scope.row.type"
                  @change="ifisDouble(scope.row)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                /></el-select>
              </template>
            </el-table-column>

            <el-table-column
              label="长度"
              prop="length"
              idth="150"
              align="center"
            >
              <template #default="scope">
                <!-- <el-input v-model="scope.row.length" :disabled="isj" /> -->
                <el-input
                  :disabled="scope.row.type === 1"
                  v-model="scope.row.length"
                  :controls="false"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="精度"
              prop="precision"
              width="150"
              align="center"
            >
              <template #default="scope">
                <!-- <el-input v-model="scope.row.precision" :disabled="isj" /> -->
                <el-input
                  :disabled="scope.row.type === 1"
                  v-model="scope.row.precision"
                  :controls="false"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="是否可为空"
              prop="isnull"
              width="150"
              align="center"
            >
              <template #default="scope">
                <el-select v-model="scope.row.null" placeholder="请选择">
                  <el-option
                    v-for="item in nullOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                /></el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="是否主键"
              prop="key"
              width="150"
              align="center"
            >
              <template #default="scope">
                <el-select v-model="scope.row.key" placeholder="请选择">
                  <el-option
                    v-for="item in keyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                /></el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="描述"
              align="center"
              prop="descriptions"
              min-width="200"
            >
              <template #default="scope">
                <el-input v-model="scope.row.description" />
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150"
              align="center"
            >
              <template #default="scope">
                <el-button
                  type="danger"
                  size="small"
                  link
                  @click="remove(scope.$index)"
                >
                  <i-ep-delete />删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <div class="common-container">
        <el-card shadow="never" class="table-container">
          <template #header>
            <el-row :gutter="20">
              <el-col :span="5">
                <el-text class="mx-1" size="large" tag="b">添加分区列</el-text>
              </el-col>
              <el-col :span="9" />
              <el-col :span="10">
                <el-button size="small" @click="add2">添加</el-button>
                <el-button size="small" @click="delete2">删除</el-button>
              </el-col>
            </el-row>
          </template>
          <el-table
            height="150px"
            ref="dataTableRef"
            :data="newdatacolumn2"
            v-loading="newdataLoading2"
            highlight-current-row
            border
          >
            <el-table-column
              label="列名"
              prop="name"
              width="110"
              align="center"
            >
              <template #default="scope">
                <el-input v-model="scope.row.name" />
              </template>
            </el-table-column>
            <el-table-column
              label="类型"
              prop="type"
              width="150"
              align="center"
            >
              <template #default="scope">
                <el-select
                  v-model="scope.row.type"
                  @change="ifisDouble2(scope.row)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in typeOptions2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                /></el-select>
              </template>
            </el-table-column>

            <el-table-column
              label="长度"
              prop="length"
              idth="150"
              align="center"
            >
              <template #default="scope">
                <!-- <el-input v-model="scope.row.length" :disabled="isj" /> -->
                <el-input
                  :disabled="scope.row.type === 1"
                  v-model="scope.row.length"
                  :controls="false"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="精度"
              prop="precision"
              width="150"
              align="center"
            >
              <template #default="scope">
                <!-- <el-input v-model="scope.row.precision" :disabled="isj" /> -->
                <el-input
                  :disabled="scope.row.type === 1"
                  v-model="scope.row.precision"
                  :controls="false"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="是否可为空"
              prop="isnull"
              width="150"
              align="center"
            >
              <template #default="scope">
                <el-select v-model="scope.row.null" placeholder="请选择">
                  <el-option
                    v-for="item in nullOptions2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                /></el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="是否主键"
              prop="key"
              width="150"
              align="center"
            >
              <template #default="scope">
                <el-select v-model="scope.row.key" placeholder="请选择">
                  <el-option
                    v-for="item in keyOptions2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                /></el-select>
              </template>
            </el-table-column>
            <el-table-column
              label="描述"
              align="center"
              prop="descriptions"
              min-width="200"
            >
              <template #default="scope">
                <el-input v-model="scope.row.description" />
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150"
              align="center"
            >
              <template #default="scope">
                <el-button
                  type="danger"
                  size="small"
                  link
                  @click="remove2(scope.$index)"
                >
                  <i-ep-delete />删除
                </el-button>
              </template>
            </el-table-column>
          </el-table></el-card
        >
      </div>
      <el-button @click="handlesubmitnew">确定</el-button>
      <el-button type="primary" @click="handelcancel"> 取消 </el-button>
    </el-dialog>
    <!-- 新建目标表 -->
    <el-dialog
      title="新建表"
      width="800px"
      v-model="targetNewDialog.visible"
      :show-close="true"
      @close="handleClosetargetNewDialog"
      align="center"
    >
      ll
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import developAPI, {
  newdataBaseInfo,
  newDataListQuery,
  targetList,
  targetTableListQuery,
  wronList,
  wronTableListQuery,
} from "@/api/data-develop";
import cleanComponent from "@/views/dataExtraction/data-develop/clean/index.vue";
import maskComponent from "@/views/dataExtraction/data-develop/mask/index.vue";
import standarComponent from "@/views/dataExtraction/data-develop/standardization/index.vue";

//清洗配置表
const cleanRulesDialog = reactive({ visible: false });
function handleClosecleanDialog() {
  cleanRulesDialog.visible = false;
}
function handleOpencleanDialog() {
  cleanRulesDialog.visible = true;
  console.log("qunimade");
}
//脱敏
const maskRulesDialog = reactive({ visible: false });
function handleClosemaskDialog() {
  maskRulesDialog.visible = false;
}
function handleOpenmaskDialog() {
  maskRulesDialog.visible = true;
}
//标准
const standardRulesDialog = reactive({ visible: false });
function handleClosestandardDialog() {
  standardRulesDialog.visible = false;
}
function handleOpenstandardDialog() {
  standardRulesDialog.visible = true;
}

//错误表
const wrontableDialog = reactive({
  visible: false,
});
function handleClosewronDialog() {
  wrontableDialog.visible = false;
  handlewroncancle();
}
function handleOpenwronDialog() {
  wrontableDialog.visible = true;
  console.log("open");
}
//目标表
const targetDialog = reactive({ visible: false });
function handleClosetargetDialog() {
  targetDialog.visible = false;
}
function handleOpentargetDialog() {
  targettableQuery(); //目标表选项获取
  targetDialog.visible = true;
}

//新建目标表
const targetNewDialog = reactive({ visible: false });
function handleClosetargetNewDialog() {
  wronNewDialog.visible = false;
}
function handleOpentargetNewDialog() {
  wronNewDialog.visible = true;
}

////////////////////////////目标表
////////////////////////////目标表
////////////////////////////目标表

//目标表数据源
const datasourceOptions = ref<string[]>();
//目标表选择
const TableOptions = ref<string[]>();
// 设置分区
const pationsOptions = ref<string[]>();
const operationalFactorOptions = ref<string[]>();
//获取目标表选项
const targetId = ref(0);
const targetqueryLoading = ref(false); //数据加载
const targetdataQuery = reactive<targetTableListQuery>({}); //选项获取
function targettableQuery() {
  targetqueryLoading.value = true;
  console.log("olll");
  developAPI
    .gettargetTableQuery(targetId.value)
    .then(() => {
      console.log(4);
      targetdataQuery.datasourceOptions = data.datasourceOptions; //数据源选项
      targetdataQuery.pationsOptions = data.pationsOptions; //设置分区
      targetdataQuery.TableOptions = data.wronTableOptions; //目标表
      targetdataQuery.operationalFactorOptions = data.operationalFactorOptions; //设置分区符号
    })
    .finally(() => {
      targetqueryLoading.value = false;
    });
}
// 初始化目标表
const targetListref = reactive<targetList>({
  datasource: "",
  wrongTable: "",
  pations: "",
  operationalFactor: "",
});
//目标表提交
const targettableList = ref(ElForm);
const targetLoading = ref(false);
const handletargetsubmit = useThrottleFn(() => {
  console.log(targetListref);
  targettableList.value.validate((valid: any) => {
    if (valid) {
      targetLoading.value = true;
      developAPI
        .wronTablepost(targetListref)
        .then(() => {
          console.log("aa");
        })
        .finally(() => (targetLoading.value = false));
    }
  });
}, 3000);
/////////////////////////////////////////////////错误表数据源
/////////////////////////////////////////////////错误表数据源
/////////////////////////////////////////////////错误表数据源
const wrongtableref = reactive<wronList>({
  datasource: "", //数据源
  wrongTable: "", //错误表
  pations: "",
  operationalFactor: "", //设置分区符号
});
//提交错误表
const wrontableList = ref(ElForm);
const wronLoading = ref(false);
const handlewronsubmit = useThrottleFn(() => {
  console.log(wrongtableref);
  wrontableList.value.validate((valid: any) => {
    if (valid) {
      wronLoading.value = true;
      developAPI
        .wronTablepost(wrongtableref)
        .then(() => {
          console.log("aa");
        })
        .finally(() => (wronLoading.value = false));
    }
  });
}, 3000);
//关闭错误表时,错误表所有内容清空
function handlewroncancle() {
  wrongtableref.datasource = "";
  wrongtableref.operationalFactor = "";
  wrongtableref.wrongTable = "";
  wrongtableref.rules = "";
  wrongtableref.pations = "";
}

//错误表选项初始化,目标表和错误表选项获取方式不太对
const wrongId = ref(0);
const wrongdataQueryref = reactive<wronTableListQuery>({
  datasourceOptions: [], //数据源
  wronTableOptions: [],
  pationsOptions: [],
  operationalFactorOptions: [],
});
//获取错误表选项
const wrongqueryLoading = ref(false); //数据加载
function wrongtableQuery() {
  wrongqueryLoading.value = true;
  console.log(111);
  developAPI
    .getwronTableQuery(wrongId.value)
    .then((data) => {
      wrongdataQueryref.datasourceOptions = data.datasourceOptions;
      wrongdataQueryref.pationsOptions = data.pationsOptions;
      wrongdataQueryref.wronTableOptions = data.wronTableOptions;
      wrongdataQueryref.operationalFactorOptions =
        data.operationalFactorOptions;
      console.log(333);
      console.log(wrongdataQueryref);
    })
    .finally(() => {
      wrongqueryLoading.value = false;
    });
}

////////////////////////新建错误表////////////////
////////////////////////新建错误表////////////////
//新建表和数仓数据概览一样的,但这里的新建表是还没修改过的,就是提交的时候是分开提交的,添加分区列的提交还没写
//新建错误表
const wronNewDialog = reactive({ visible: false });
function handleClosewronNewDialog() {
  wronNewDialog.visible = false;
  newdatacolumn.value = [];
  newdatacolumn2.value = [];
}
//新建错误表弹窗打开
function handleOpenwronNewDialog() {
  wronNewDialog.visible = true;
  add();
  add2();
}
function add() {
  newdatacolumn.value.push({
    name: "",
    type: "",
    length: "",
    precision: "",
    isnull: "",
    key: "",
    description: "",
  });
}
//
const newdatacolumn = ref<newDataListQuery[]>([]);
const typeOptions = ref([
  {
    value: 1,
    label: "double",
  },
  {
    value: 2,
    label: "string",
  },
  {
    value: 3,
    label: "order",
  },
]);
const nullOptions = ref([
  { value: 1, label: "是" },
  {
    value: 0,
    label: "否",
  },
]);
const keyOptions = ref([
  { value: 1, label: "是" },
  {
    value: 0,
    label: "否",
  },
]);
//如果是是double型,则锁精度和长度
function ifisDouble(scope: any) {
  if (scope.type == 1) {
    scope.length = null;
    scope.precision = null;
  }
}

const newcolumnLoading = ref(false);
const newdatalist = ref(ElForm);
//添加列提交
const addcolumns = useThrottleFn(() => {
  newdatalist.value.validate((valid: any) => {
    if (valid) {
      newcolumnLoading.value = true;
      developAPI
        .addnewcolumns(newdatacolumn.value)
        .then(() => {
          ElMessage.success("成功");
          console.log("jjj");
        })
        .finally(() => (newdataLoading.value = false));
    }
  });
}, 3000);
// 新建表基础信息
const newdatabaseForm = reactive<newdataBaseInfo>({
  //名称
  tableName: "",
  //生命周期
  lifeCycle: "",
  //描述
  description: "",
  //业务系统
  sysetem: "",
  //部门
  department: "",
  //数仓数据源
  datasource: "",
  //数仓层域
  hierarchy: "",
  auditStatus: "",
  dataConnection: "",
  compressedFormat: "",
  storageFormat: "",
  label: "",
  tableType: "",
  creator: "",
});
//分区列加一行
function add2() {
  newdatacolumn2.value.push({
    name: "",
    type: "",
    length: "",
    precision: "",
    isnull: "",
    key: "",
    description: "",
  });
}
const typeOptions2 = ref([
  {
    value: 1,
    label: "double",
  },
  {
    value: 2,
    label: "string",
  },
  {
    value: 3,
    label: "order",
  },
]);
const nullOptions2 = ref([
  { value: 1, label: "是" },
  {
    value: 0,
    label: "否",
  },
]);
const keyOptions2 = ref([
  { value: 1, label: "是" },
  {
    value: 0,
    label: "否",
  },
]);

function ifisDouble2(scope: any) {
  if (scope.type == 1) {
    scope.length = null;
    scope.precision = null;
  }
}
//添加分区列提交
const newcolumnLoading2 = ref(false);
const newdataLoading2 = ref(false);
const newdatalist2 = ref(ElForm);
const newdatacolumn2 = ref<newDataListQuery[]>([]);
const addcolumns2 = useThrottleFn(() => {
  newdatalist2.value.validate((valid: any) => {
    if (valid) {
      newcolumnLoading2.value = true;
      developAPI
        .addnewcolumns(newdatacolumn2.value)
        .then(() => {
          ElMessage.success("成功");
          console.log("jjj");
        })
        .finally(() => (newdataLoading2.value = false));
    }
  });
}, 3000);
function delete2() {
  newdatacolumn2.value = [];
}

//取消
function handelcancel() {
  console.log(newdatacolumn.value);//打印添加列
  console.log(newdatabaseForm);//打印新建表基本信息
  console.log(newdatacolumn2.value);//打印分区列
  //名称
  newdatabaseForm.tableName = "";
  //生命周期
  newdatabaseForm.lifeCycle = "";
  //描述
  newdatabaseForm.description = "";
  //业务系统
  newdatabaseForm.sysetem = "";
  //部门
  newdatabaseForm.department = "";
  //数仓数据源
  newdatabaseForm.datasource = "";
  //数仓层域
  newdatabaseForm.hierarchy = "";
  newdatabaseForm.hierarchy = "";
  newdatabaseForm.auditStatus = "";
  newdatabaseForm.dataConnection = "";
  newdatabaseForm.compressedFormat = "";
  newdatabaseForm.storageFormat = "";
  newdatabaseForm.label = "";
  newdatabaseForm.tableType = "";
  newdatabaseForm.creator = "";
  handleClosewronNewDialog();
}

//提交新建表基本信息
const newdatabaseref = ref(ElForm);
const newdataLoading = ref(false);
const handlesubmit = useThrottleFn(() => {
  newdatabaseref.value.validate((valid: any) => {
    if (valid) {
      newdataLoading.value = true;
      developAPI
        .submmitnewtable(newdatabaseForm)
        .then(() => {
          //ElMessage.success("新增规范字典成功");
          console.log("aa");
        })
        .finally(() => (newdataLoading.value = false));
    }
  });
}, 3000);
function handlesubmitnew() {
  handlesubmit();//提交基本信息
  addcolumns(); //添加列提交
  addcolumns2(); //分区列提交
  handelcancel();//关闭弹窗
}
//删除某一行
function remove2(index: any) {
  newdatacolumn2.value.splice(index, 1);//添加列
}
function remove(index: any) {
  newdatacolumn.value.splice(index, 1);//删除分区列
}
//基本信息选项
const newDataId = ref(0);
const newLoading = ref(false);
const lifeCycle = ref<string[]>();
const sysetem = ref<string[]>();
//部门
const department = ref<string[]>();
//数仓数据源
const datasource = ref<string[]>();
//数仓层域
const hierarchy = ref<string[]>();
const dataConnection = ref<string[]>();
const compressedFormat = ref<string[]>();
const storageFormat = ref<string[]>();
const label = ref<string[]>();
const tableType = ref<string[]>();
//const creator = ref<string[]>();
const auditStatus = ref(["审核完成", "审核中"]);
function handlenewDataQuery() {
  newLoading.value = true;

  developAPI
    .getnewtable(newDataId.value)
    .then((data) => {
      console.log("123488");
      // dataconnection.value = data.listtion;
      lifeCycle.value = data.lifeCycle;
      sysetem.value = data.sysetem;
      //部门
      department.value = data.department;
      //数仓数据源
      datasource.value = data.datasource;
      //数仓层域
      hierarchy.value = data.hierarchy;
      // auditStatus.value = data.auditStatus;
      dataConnection.value = data.dataConnection;
      compressedFormat.value = data.compressedFormat;
      storageFormat.value = data.storageFormat;
      label.value = data.label;
      tableType.value = data.tableType;
      console.log(lifeCycle);
    })
    .finally(() => {
      newLoading.value = false;
    });
}
onMounted(() => {
  wrongtableQuery();
  handlenewDataQuery();
  //targettableQuery();
  // handlenewDataQuery();
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
