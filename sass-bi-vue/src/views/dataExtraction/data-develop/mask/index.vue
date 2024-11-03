<!-- 数据开发任务列表(未完成) -->
<!-- 这个文件是脱敏规则配置 -->
<!-- 创建者: 黄云乔 1825207860@qq.com -->
<template>
  <div class="app-container">
    <div class="common-container">
      <el-descriptions title="表信息" :column="2">
        <el-descriptions-item label="表名称:">{{
          maskRulesQueryRef.tableName
        }}</el-descriptions-item>
        <el-descriptions-item label="表描述:">{{
          maskRulesQueryRef.tabledescription
        }}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="common-container">
      <el-descriptions title="脱敏配置" :column="2">
        <el-descriptions-item label="脱敏任务名称:">
          <el-select
            v-model="maskListRef.taskName"
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
        <el-descriptions-item label="原表配置:"
          ><template #default>
            <el-input
              style="width: 240px"
              :rows="2"
              type="textarea"
              placeholder="Please input"
            /> </template
        ></el-descriptions-item>
        <el-descriptions-item label="设置分区:"
          ><el-select
            v-model="maskListRef.partitions1"
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
            v-model="maskListRef.operationalFactor"
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
            v-model="maskListRef.partitions2"
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
        <el-descriptions-item label="脱敏规则配置:" />
      </el-descriptions>
      <el-card shadow="never" class="table-container">
        <el-table
          height="150px"
          highlight-current-row
          :data="maskListForm"
          border
        >
          <el-table-column
            fixed="left"
            label="列名"
            prop="name"
            align="center"
            height="50"
          >
            <template #default="scope">
              <el-select
                v-model="scope.row.name"
                placeholder="请选择"
                @change="addRow"
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
          <el-table-column
            label="无效化处理"
            prop="neutralization"
            align="center"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.neutralization" />
            </template>
          </el-table-column>
          <el-table-column
            label="随机值替换"
            prop="randomSitution"
            align="center"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.randomSitution" /> </template
          ></el-table-column>
          <el-table-column label="对称加密" prop="encryption" align="center"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.encryption" /> </template
          ></el-table-column>
          <el-table-column label="数据取整" prop="dataRouding" align="center"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.dataRouding" /> </template
          ></el-table-column>
          <el-table-column
            label="同分布随机值替换"
            prop="sameDistribution"
            align="center"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.sameDistribution" /> </template
          ></el-table-column>

          <el-table-column
            label="引用标准规则"
            prop="standardrules"
            align="center"
            ><template #default="scope">
              <el-checkbox v-model="scope.row.standardrules" /> </template
          ></el-table-column>
          <el-table-column
            label="添加自定义规则"
            prop="customRules"
            align="center"
          />

          <el-table-column align="center" width="100">
            <template #default="scope">
              <el-button type="primary" size="small" link> 编辑 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <el-button @click="masksubmit()">提交</el-button>
  </div>
</template>
<script lang="ts" setup>
import developAPI, { maskRulesList, maskRulesQuery } from "@/api/data-develop";

//脱敏配置提交按钮，将任务名称、设置分区以及下方列表提交，会提交两次
const maskdataLoading = ref(false);
function masksubmit() {
  handlesubmit1();
  handlesubmit2();
}
//脱敏规则配置的列表提交
const maskListForm = reactive<maskRulesList[]>([]);
const maskdatabaseref = ref(ElForm);
const handlesubmit1 = useThrottleFn(() => {
  maskdatabaseref.value.validate((valid: any) => {
    if (valid) {
      maskdataLoading.value = true;
      developAPI
        .maskRulesListpost(maskListForm)
        .then(() => {
          console.log("aa");
        })
        .finally(() => (maskdataLoading.value = false));
    }
  });
}, 3000);

//初始化
const maskListRef = reactive<maskRulesList>({
  taskName: "", //脱敏任务名称
  partitions1: "", //设置分区1
  partitions2: "", //设置分区2
  operationalFactor: "", //设置分区符号
});
//脱敏任务名称、设置分区的提交
const maskref = ref(ElForm);
const maskrefLoading = ref(false); //数据加载
const handlesubmit2 = useThrottleFn(() => {
  maskref.value.validate((valid: any) => {
    if (valid) {
      maskrefLoading.value = true;
      developAPI
        .maskrefpost(maskListRef)
        .then(() => {
          console.log("aa");
        })
        .finally(() => (maskrefLoading.value = false));
    }
  });
}, 3000);
// 获取脱敏表的选项信息
const maskRulesQueryRef = reactive<maskRulesQuery>({
  tableName: "",
  tabledescription: "",
});

const maskrulesLoading = ref(false);//数据加载
// 设置分区1
const partitionsOptions1 = ref<string[]>();
// 设置分区2
const partitionsOptions2 = ref<string[]>();
// 设置分区符号
const operationalFactorOptions = ref<string[]>();
//脱敏规则配置列表的列名
const nameOptions = ref<string[]>();
//脱敏任务名称
const taskOptions = ref<string[]>();
//脱敏表的选项获取
const maskId = ref(0);
function maskRulesListQuery() {
  maskrulesLoading.value = true;
  developAPI
    .getmaskRulesList(maskId.value)
    .then((data) => {
      maskRulesQueryRef.tabledescription = data.tabledescription;
      maskRulesQueryRef.tableName = data.tableName;
      nameOptions.value = data.nameOptions;
      operationalFactorOptions.value = data.operationalFactorOptions;
      partitionsOptions1.value = data.partitionsOptions1;
      partitionsOptions2.value = data.partitionsOptions2;
      taskOptions.value = data.taskOptions;
    })
    .finally(() => {
      maskrulesLoading.value = false;
    });
}
//当列名选择完，自增一行
const addRow = () => {
  // 当用户点击按钮时，自动添加一行
  maskListForm.push({
    //运算因子
    operationalFactor: "",
    //任务名称选项
    taskName: "",
    //原表配置描述
    //tableConfiguration?: string;
    //设置分区
    //列名
    name: "",
    //无效化处理
    neutralization: false,
    //随机值替换
    randomSitution: false,
    //对称加密
    encryption: false,
    //数据取整
    dataRouding: false,
    //同分布随机值替换
    sameDistribution: false,
    //引用标准规则
    standardrules: false,
    //添加自定义规则
    customRules: false,
  });
};
onMounted(() => {
  maskRulesListQuery(); //选项获取
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
