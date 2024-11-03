<!-- 数据开发任务列表(未完成) -->
<!-- 这个文件是标准规则配置 -->
<!-- 创建者: 黄云乔 1825207860@qq.com -->
<template>
  <div class="app-container">
    <div class="common-container">
      <el-descriptions title="表信息" :column="2">
        <el-descriptions-item label="表名称:">{{
          standartable.tableName
        }}</el-descriptions-item>
        <el-descriptions-item label="表描述:">{{
          standartable.tabledescription
        }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="common-container">
      <el-descriptions title="标准化配置" :column="2">
        <el-descriptions-item label="标准化名称:"
          ><el-select
            v-model="standarListRef.taskName"
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="item in taskOptions"
              :key="item"
              :label="item"
              :value="item" /></el-select
        ></el-descriptions-item>
        <el-descriptions-item />
        <el-descriptions-item label="原表配置:">
          <template #default>
            <el-input
              style="width: 240px"
              :rows="2"
              type="textarea"
              placeholder="Please input"
            /> </template
        ></el-descriptions-item>
        <el-descriptions-item label="设置分区:"
          ><el-select
            v-model="standarListRef.partitions1"
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
            v-model="standarListRef.operationalFactor"
            placeholder=">=<"
            size="small"
            style="width: 120px; margin-left: 10px; margin-right: 10px"
          >
            <el-option
              v-for="item in operationalFactorOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-select
            v-model="standarListRef.partitions2"
            placeholder="optdt"
            size="small"
            style="width: 120px"
          >
            <el-option
              v-for="item in partitionsOptions2"
              :key="item"
              :label="item"
              :value="item"
          /></el-select>
        </el-descriptions-item>
        <el-descriptions-item label="标准化规则配置:" />
      </el-descriptions>
      <el-card shadow="never" class="table-container">
        <el-table
          height="150px"
          highlight-current-row
          border
          :data="standarListForm"
        >
          <el-table-column
            fixed="left"
            label="列名"
            prop="name"
            align="center"
            height="50"
          >
            <template #default="scope">
              <el-select v-model="scope.row.name" @change="standaraddRow">
                <el-option
                  v-for="item in nameOptions"
                  :key="item"
                  :label="item"
                  :value="item"
              /></el-select> </template
          ></el-table-column>
          <el-table-column label="描述" prop="description" align="center" />
          <el-table-column label="数据元" prop="dataElement" align="center"
            ><template #default="scope">
              <el-select v-model="scope.row.dataElement">
                <el-option
                  v-for="item in dataElementOptions"
                  :key="item"
                  :label="item"
                  :value="item"
              /></el-select>
            </template>
          </el-table-column>
          <el-table-column label="数据元类目" prop="category" align="center"
            ><template #default="scope">
              <el-select v-model="scope.row.category">
                <el-option
                  v-for="item in categoryOptions"
                  :key="item"
                  :label="item"
                  :value="item"
              /></el-select>
            </template>
          </el-table-column>
          <el-table-column label="数据元类别" prop="meteData" align="center"
            ><template #default="scope">
              <el-select v-model="scope.row.meteData">
                <el-option
                  v-for="item in meteDataOptions"
                  :key="item"
                  :label="item"
                  :value="item"
              /></el-select>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="100">
            <template #default="scope">
              <el-button type="primary" size="small" link> 编辑 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-button @click="standardsubmit">提交</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import developAPI, {
  standardRulesList,
  standardRulesQuery,
} from "@/api/data-develop";
const standartable = reactive<standardRulesQuery>({
  tableName: "",
  //表名称
  tabledescription: "",
});

// 标准化任务名称选项
const taskOptions = ref<string[]>();
//设置分区
const partitionsOptions1 = ref<string[]>();
const partitionsOptions2 = ref<string[]>();
//设置分区符号
const operationalFactorOptions = ref<string[]>();
//标准化规则配置列表的列名
const nameOptions = ref<string[]>();
//数据元
const dataElementOptions = ref<string[]>();
//数据元类目
const categoryOptions = ref<string[]>();
//数据元类别
const meteDataOptions = ref<string[]>();

//获取标准表的选项
const standarId = ref(0);
const standarLoading = ref(false); //数据加载
function standardRuleListsQuery() {
  standarLoading.value = true;
  developAPI
    .getstandardRulesList(standarId.value)
    .then((data) => {
      standartable.tableName = data.tableName;
      nameOptions.value = data.nameOptions;
      operationalFactorOptions.value = data.operationalFactorOptions;
      partitionsOptions1.value = data.partitionsOptions1;
      partitionsOptions2.value = data.partitionsOptions2;
      standartable.tabledescription = data.tabledescription;
      taskOptions.value = data.taskOptions;
      categoryOptions.value = data.categoryOptions;
      meteDataOptions.value = data.meteDataOptions;
      dataElementOptions.value = data.dataElementOptions;
      // console.log(standartable);
      console.log(standartable.nameOptions);
    })
    .finally(() => {
      standarLoading.value = false;
    });
}
//初始化 标准任务名称及设置分区
const standarListRef = reactive<standardRulesList>({
  taskName: "",
  partitions1: "",
  partitions2: "",
  operationalFactor: "",
});

//提交按钮
function standardsubmit() {
  console.log(standarListRef);
  console.log(standarListForm);
  handlestandarsubmit1();
  handlestandarsubmit2();
}

const standardataLoading = ref(false);
//初始化标准规则配置列表
const standarListForm = reactive<standardRulesList[]>([]);
//标准化配置列表提交
const standarref = ref(ElForm);
const handlestandarsubmit1 = useThrottleFn(() => {
  console.log(standarListForm);
  standarref.value.validate((valid: any) => {
    if (valid) {
      standardataLoading.value = true;
      developAPI
        .standardRulesListpost(standarListForm)
        .then(() => {
          console.log("aa");
        })
        .finally(() => (standardataLoading.value = false));
    }
  });
}, 3000);
//标准化任务以及设置分区提交
const standardataref = ref(ElForm);
const standarQueryLoading = ref(false);
const handlestandarsubmit2 = useThrottleFn(() => {
  console.log(standarListRef);
  standardataref.value.validate((valid: any) => {
    if (valid) {
      standarQueryLoading.value = true;
      developAPI
        .standardrefpost(standarListRef)
        .then(() => {
          console.log("aa");
        })
        .finally(() => (standarQueryLoading.value = false));
    }
  });
}, 3000);
//列名选择完,列表自增一行
const standaraddRow = () => {
  // 当用户点击按钮时，自动添加一行
  standarListForm.push({
    operationalFactor: "",
    //任务名称选项
    taskName: "",
    //原表配置描述
    //tableConfiguration?: string;
    //列名
    name: "",
    //数据元
    dataElement: "",
    //数据元类目
    category: "",
    //数据元类别
    meteData: "",
  });
};
onMounted(() => {
  standardRuleListsQuery(); //选项查询
  standaraddRow();
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
