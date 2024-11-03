<!-- 数仓数据概览(未完成) -->
<!-- 这个文件是详细信息的历史增量功能，绘制趋势图 -->
<!-- 创建者: 黄云乔 1825207860@qq.com -->
<template>
  <div class="app-container">
    <div style="display: flex">
      <div
        ref="chartRef"
        style="
          width: 50%;
          height: 400px;
          margin-top: auto; /* 自动计算上边距 */
          margin-bottom: auto;
        "
      ></div>

      <el-table
        class="table-container"
        :data="tableData"
        style="
          width: 50%;
          padding-left: 20px;
          margin-top: auto; /* 自动计算上边距 */
          margin-bottom: auto;
        "
        border
      >
        <el-table-column prop="date" label="日期" width="130" />
        <el-table-column prop="increment" label="增量" width="100" />
        <el-table-column prop="total" label="总量" width="100" />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import * as echarts from "echarts";
import databaseAPI, { increasement } from "@/api/database";
const dataLoading = ref();
const dataId = ref(0);
const tableData = ref<increasement[]>();

//获取列表信息以及折线图数据
function handleincreaseQuery() {
  dataLoading.value = true;
  databaseAPI
    .getincreasedata(dataId.value)
    .then((data) => {
      tableData.value = data.list;
      fuzhi(
        tableData.value
        // tableData.value.map((item) => item.date),
        // tableData.value.map((item) => item.increment)
      );
    })
    .finally(() => {
      dataLoading.value = false;
    });
}

const chartRef = ref(null);
//初始化
function initChart() {
  handleincreaseQuery();
}

//画折线图
var a = ref();
function fuzhi(x: any) {
  a.value = x;
  console.log(a);
  const chartData = reactive({
    option: {
      title: {
        text: "总量趋势",
      },
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        data: tableData.value?.map((item) => item.date),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: tableData.value?.map((item) => item.increment),
          type: "line",
        },
      ],
    },
  });
  if (chartRef.value) {
    const myChart = echarts.init(chartRef.value);
    myChart.setOption(chartData.option);
  }
}
console.log(tableData.value);
console.log(tableData.value?.map((item) => item.date));

onMounted(() => {
  initChart();
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
