<!-- 数据开发任务列表(未完成) -->
<!-- 这个文件里是清洗任务列表 -->
<!-- 创建者: 黄云乔 1825207860@qq.com -->
<template>
  <div class="app-container">
    <div class="common-container">
      <el-descriptions title="表信息" :column="2">
        <el-descriptions-item label="表名称:">{{
          tableForm.tableName
        }}</el-descriptions-item>
        <el-descriptions-item label="表描述:">{{
          tableForm.tabledescription
        }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="common-container">
      <el-descriptions title="清洗配置" :column="2">
        <el-descriptions-item label="数据清洗任务名称:"
          ><el-select
            v-model="listref.taskName"
            placeholder="Select"
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="item in taskOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item />
        <el-descriptions-item label="原表配置描述:">
          <template #default>
            <el-input
              style="width: 240px"
              :rows="2"
              type="textarea"
              placeholder="Please input"
            />
          </template>
        </el-descriptions-item>
        <el-descriptions-item label="设置分区:"
          ><el-select
            v-model="listref.partitions1"
            placeholder="optdt"
            size="small"
            style="width: 120px"
          >
            <el-option
              v-for="item in partitionsOptions1"
              :key="item"
              :label="item"
              :value="item"
          /></el-select>
          <el-select
            v-model="listref.operationalFactor"
            placeholder=">=<"
            size="small"
            style="width: 120px; margin-right: 10px; margin-left: 10px"
          >
            <el-option
              v-for="item in operationalFactorOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-select
            v-model="listref.partitions2"
            placeholder="optdt"
            size="small"
            style="width: 120px; margin-left: 10px"
          >
            <el-option
              v-for="item in partitionsOptions2"
              :key="item"
              :label="item"
              :value="item"
          /></el-select>
        </el-descriptions-item>
        <el-descriptions-item label="清洗规则配置:" />
      </el-descriptions>
      <el-card shadow="never" class="table-container">
        <el-table
          :data="listinfoForm"
          height="150px"
          highlight-current-row
          border
        >
          <el-table-column
            fixed="left"
            label="列名"
            prop="name"
            align="center"
            width="100px"
          >
            <template #default="scope">
              <el-select
                v-model="scope.row.name"
                @change="addRow"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in nameOptions"
                  :key="item"
                  :label="item"
                  :value="item"
              /></el-select>
            </template>
          </el-table-column>
          <el-table-column label="描述" prop="description" align="center" />
          <el-table-column label="空格去除" prop="spaceRemove" align="center"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.spaceRemove" />
            </template>
          </el-table-column>
          <el-table-column label="空值处理" prop="isEmpty" align="center">
            <template #default="scope">
              <el-checkbox v-model="scope.row.isEmpty" /> </template
          ></el-table-column>
          <el-table-column label="全半角转换" prop="fullhalf" align="center"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.fullhalf" /> </template
          ></el-table-column>
          <el-table-column
            label="大小写转换"
            prop="caseConversion"
            align="center"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.caseConversion" /> </template
          ></el-table-column>
          <el-table-column
            label="去除特定字符"
            prop="specificCharacters"
            align="center"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.specificCharacters" /> </template
          ></el-table-column>
          <el-table-column
            label="字符串截取"
            prop="stringTruncation"
            align="center"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.stringTruncation" /> </template
          ></el-table-column>
          <el-table-column label="正则校验" prop="regexCheck" align="center"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.regexCheck" /> </template
          ></el-table-column>
          <el-table-column
            label="长度校验与处理"
            prop="lengthCheck"
            align="center"
            width="100"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.lengthCheck" /> </template
          ></el-table-column>
          <el-table-column
            label="数据类型校验与处理"
            prop="dataTypeCheck"
            width="100"
            align="center"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.dataTypeCheck" /> </template
          ></el-table-column>
          <el-table-column
            label="日期格式校验与处理"
            prop="dateCheck"
            align="center"
            width="100"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.dateCheck" /> </template
          ></el-table-column>
          <el-table-column
            label="值域校验与处理"
            prop="RangeCheck"
            align="center"
            width="100"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.RangeCheck" /> </template
          ></el-table-column>
          <el-table-column
            label="命名实体识别"
            prop="nameRecognition"
            align="center"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.nameRecognition" /> </template
          ></el-table-column>
          <el-table-column
            label="引用标准规则"
            prop="standardRules"
            align="center"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.standardRules" /> </template
          ></el-table-column>
          <el-table-column label="添加自定义规则" align="center" width="100">
            {{}}"##"
          </el-table-column>
          <el-table-column align="center" width="100">
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                link
                @click="editRow(scope.row)"
              >
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-button @click="handlelistinfo">提交</el-button>
    </div>
    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogVisible" title="编辑">
      <div style="display: flex">
        <div style="width: 20%">
          <el-menu :default-active="activeIndex" @select="handleSelect">
            <el-menu-item
              v-for="index in selectedOptions"
              :key="index"
              :index="index.toString()"
              :value="index.valueOf"
              >{{ index }}</el-menu-item
            >
          </el-menu>
        </div>

        <div style="width: 80%">
          <!-- 这里放置的是右侧对应的页面内容 -->
          <component :is="currentComponent" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import developAPI, {
  cleanRulesList,
  cleanRulesQuery,
} from "@/api/data-develop";
import standar from "@/views/data-develop/standardization/index.vue";
///////////////////编辑/////////////
var selectedOptions = ref<string[]>([]); //定义一个空字符串数组
const dialogVisible = ref(false); //控制编辑弹窗开闭
var currentComponent = ref();
const selectedRow = ref();
const activeIndex = ref();
//清洗规则配置列表的编辑功能
function editRow(scope: any) {
  selectedOptions.value = []; //清空数组，将当前行被勾选的项加入数组
  if (scope.name) selectedOptions.value.push(scope.name);
  if (scope.spaceRemove) selectedOptions.value.push("空格去除");
  if (scope.isEmpty) selectedOptions.value.push("空值处理");
  if (scope.fullhalf) selectedOptions.value.push("全半角转换");
  if (scope.caseConversion) selectedOptions.value.push("大小写转换");
  if (scope.specificCharacters) selectedOptions.value.push("去除特定字符");
  if (scope.stringTruncation) selectedOptions.value.push("字符串截取");
  if (scope.regexCheck) selectedOptions.value.push("正则校验");
  if (scope.lengthCheck) selectedOptions.value.push("长度校验与处理");
  if (scope.dataTypeCheck) selectedOptions.value.push("数据类型校验与处理");
  if (scope.dateCheck) selectedOptions.value.push("日期格式校验与处理");
  if (scope.RangeCheck) selectedOptions.value.push("值域校验与处理");
  if (scope.nameRecognition) selectedOptions.value.push("命名实体识别");
  if (scope.standardRules) selectedOptions.value.push("引用标准规则");
  if (scope.customRules) selectedOptions.value.push("添加自定义规则");
  dialogVisible.value = true; //显示编辑弹窗
}
//定义一个数组，里面是所有编辑弹窗右边出现的组件
const AA = [
  { id: 0, name: "空值处理", component: "" },
  {
    id: 1,
    name: "全半角转换",
    component: "",
  },
];
//用于匹配编辑弹窗左侧导航，当左侧选中某一栏后，
//该函数将选中内容与所有组件的名字进行比较，相等则右便显示对应组件
function handleSelect(index: string) {
  console.log(999);
  for (let item of AA) {
    currentComponent.value = null;
    if (item.name === index) {
      console.log("ojbk");
      currentComponent.value = item.component;
      break;
    }
  }
}
////////////////////////////////////////////

//初始化清洗表的表信息
const tableForm = reactive<cleanRulesQuery>({
  tableName: "",
  tabledescription: "",
});
//获取选项
const partitionsOptions1 = ref<string[]>(); //设置分区1
//设置分区2
const partitionsOptions2 = ref<string[]>();
//设置分区的符号
const operationalFactorOptions = ref<string[]>();
//列表列名
const nameOptions = ref<string[]>();
//清洗任务名称
const taskOptions = ref<string[]>();

//获取清洗表选项
const cleanrulesLoading = ref(false);
const Id = ref(0);
function cleanRulesListQuery() {
  cleanrulesLoading.value = true;
  developAPI
    .getcleanRulesList(Id.value)
    .then((data) => {
      // task.tableConfiguration = data.taskconfiguration
      tableForm.tableName = data.tableName;
      tableForm.tabledescription = data.tabledescription;
      taskOptions.value = data.taskOptions;
      partitionsOptions1.value = data.partitionsOptions1;
      partitionsOptions2.value = data.partitionsOptions2;
      operationalFactorOptions.value = data.operationalFactorOptions;
      nameOptions.value = data.nameOptions;
    })
    .finally(() => {
      cleanrulesLoading.value = false;
    });
}
//清洗列表提交
const listinfoForm = reactive<cleanRulesList[]>([]);
const dataLoading = ref(false); //数据加载
const cleanlistref = ref(ElForm);
const handlelistinfo = useThrottleFn(() => {
  console.log("aaaa");
  cleanlistref.value.validate((valid: any) => {
    if (valid) {
      cleanrulesLoading.value = true;
      developAPI
        .cleanRules(listinfoForm)
        .then(() => {
          ElMessage.success("成功");
        })
        .finally(() => (dataLoading.value = false));
    }
  });
}, 3000);
//清洗任务名称、设置分区提交
const listref = reactive<cleanRulesList>({
  taskName: "", //提交清洗任务名称
  partitions1: "", //设置分区1
  partitions2: "", //设置分区2
  operationalFactor: "", //设置分区符号
});
const cleanrefLoading = ref(false); //数据清洗
const cleanref = ref(ElForm);
const handlelistref = useThrottleFn(() => {
  console.log("aaaa");
  cleanref.value.validate((valid: any) => {
    if (valid) {
      cleanrefLoading.value = true;
      developAPI
        .cleanrefpost(listref)
        .then(() => {
          ElMessage.success("成功");
        })
        .finally(() => (cleanrefLoading.value = false));
    }
  });
}, 3000);
//选择列名后自增一行
const addRow = () => {
  // 当用户点击按钮时，自动添加一行
  listinfoForm.push({
    //运算因子
    operationalFactor: "",
    //任务名称选项
    taskName: "",
    //原表配置描述
    //tableConfiguration?: string;
    //列名
    name: "",
    //无效化处理
    name: "",
    //空格移除
    spaceRemove: false,
    //空值处理
    isEmpty: false,
    //全半角转换
    fullhalf: false,
    //大小写转换
    caseConversion: false,
    //去除特定字符
    specificCharacters: false,
    //字符串截取
    stringTruncation: false,
    //正则校验
    regexCheck: false,
    //长度校验与处理
    lengthCheck: false,
    //数据类型校验
    dataTypeCheck: false,
    //日期格式校验
    dateCheck: false,
    //值域校验
    RangeCheck: false,
    //命名的实体识别
    nameRecognition: false,
    //引用标准规则
    standardRules: false,
    //添加自定义规则
    customRules: false,
  });
};
onMounted(() => {
  //cleanQuery();
  cleanRulesListQuery();
  addRow();
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
