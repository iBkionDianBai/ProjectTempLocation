<!-- 数据抽取任务列表页面-->
<!-- 创建者: 刘海鑫 dian_bai2021@163.com -->
<template>
  <div class="outer-container">
    <!-- 上半部分功能 -->
    <el-card class="top-container">
      <!--      <el-text class="mx-1" size="large" tag="b">-->
      <!--        当前路径：{{ missionStatus.currentLocate }}-->
      <!--      </el-text>-->
      <div class="top-content">
        <div class="status">
          <el-text class="mx-1" size="large" tag="b"> 状态：</el-text>
          <div class="status-content" style="margin-bottom: 10px">
            <el-radio-group
              v-model="queryMissionListParams.missionStatus"
              @change="handleMissionListContentQuery"
            >
              <el-radio-button class="preparing" label="准备中" value="0" />
              <el-radio-button class="scheduling" label="正在调度" value="1" />
              <el-radio-button class="executing" label="正在执行" value="2" />
              <el-radio-button class="completed" label="已完成" value="3" />
              <el-radio-button class="failed" label="已失败" value="4" />
              <el-radio-button class="stopped" label="已停止" value="5" />
              <el-radio-button class="retrying" label="正在重试" value="6" />
            </el-radio-group>
          </div>
        </div>
        <el-row :gutter="20" style="margin-bottom: 10px">
          <el-col :span="6">
            <el-text class="mx-1" size="large" tag="b"> 任务名称：</el-text>
            <el-input
              v-model="queryMissionListParams.missionName"
              placeholder="搜索"
              style="width: 200px; margin-right: 15px"
              @keyup.enter="handleMissionListContentQuery"
            />
          </el-col>
          <el-col :span="6">
            <el-text class="mx-1" size="large" tag="b"> 创建者：</el-text>
            <el-input
              v-model="queryMissionListParams.creator"
              placeholder="搜索"
              style="width: 200px; margin-right: 15px"
              @keyup.enter="handleMissionListContentQuery"
            />
          </el-col>
          <el-col :span="6">
            <el-text class="mx-1" size="large" tag="b"> 执行时间：</el-text>
            <el-input
              v-model="queryMissionListParams.executeDate"
              placeholder="搜索"
              style="width: 200px; margin-right: 15px"
              @keyup.enter="handleMissionListContentQuery"
            />
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 下半部分功能 -->
    <el-card class="table-container">
      <div class="btn-container" style="margin-bottom: 10px">
        <el-button type="success" @click="handleAdd">
          <i-ep-plus />
          新增
        </el-button>
        <el-button
          type="danger"
          @click="handleDeleteMissionList"
          :disabled="missionListSelectionIds.length === 0"
        >
          <i-ep-delete />
          删除
        </el-button>
      </div>
      <el-table
        default-expand-all
        v-loading="missionListQueryLoading"
        :data="missionListContentList"
        border
        highlight-current-row
        @selection-change="handleMissionListSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          prop="missionName"
          label="任务名称"
          min-width="140"
          align="center"
        />
        <el-table-column
          prop="creator"
          label="创建者"
          width="120"
          align="center"
        />
        <el-table-column
          prop="createDate"
          label="创建时间"
          width="120"
          align="center"
        />
        <el-table-column
          prop="editDate"
          label="修改时间"
          width="100"
          align="center"
        />
        <el-table-column
          prop="lastExecuteDate"
          label="最近执行时间"
          width="140"
          align="center"
        />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.status == 0" type="info">准备中</el-tag>
            <el-tag v-else-if="row.status == 1" type="primary">正在调度</el-tag>
            <el-tag v-else-if="row.status == 2" type="primary">正在执行</el-tag>
            <el-tag v-else-if="row.status == 3" type="success">已完成</el-tag>
            <el-tag v-else-if="row.status == 4" type="danger">已失败</el-tag>
            <el-tag v-else-if="row.status == 5" type="warning">已停止</el-tag>
            <el-tag v-else-if="row.status == 6" type="warning">正在重试</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="descriptions"
          label="描述"
          width="120"
          align="center"
        />
        <el-table-column label="操作" width="150" align="center">
          <template #default="scope">
            <el-button
              size="small"
              @click="handleOpenCheckDialog(scope.row.id)"
              link
              type="primary"
            >
              <i-ep-edit />查看
            </el-button>
            <el-button
              size="small"
              @click="handleMissionReference(scope.row.id)"
              link
              type="primary"
            >
              <i-ep-edit />引用
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <pagination
        v-if="missionListContentTotal > 0"
        v-model:total="missionListContentTotal"
        v-model:page="queryMissionListParams.pageNum"
        v-model:limit="queryMissionListParams.pageSize"
        @pagination="handleMissionListContentQuery"
      />
    </el-card>
    <!-- 查看功能弹窗 -->
    <el-dialog
      v-model="newMissionCheckDialog.visible"
      :show-close="true"
      @close="handleCloseCheckDialog"
      style="max-width: 800px"
    >
      <div class="dialog-container">
        <el-descriptions
          :title="missionCheckContent.missionName"
          :column="2"
          border
        >
          <el-descriptions-item label="创建者">
            {{ missionCheckContent.creator }}
          </el-descriptions-item>
          <el-descriptions-item label="创建时间">
            {{ missionCheckContent.createDate }}
          </el-descriptions-item>
          <el-descriptions-item label="修改时间">
            {{ missionCheckContent.editDate }}
          </el-descriptions-item>
          <el-descriptions-item label="最近执行时间">
            {{ missionCheckContent.lastExecuteDate }}
          </el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag v-if="missionCheckContent.status == 0" type="info"
              >准备中</el-tag
            >
            <el-tag v-else-if="missionCheckContent.status == 1" type="primary"
              >正在调度</el-tag
            >
            <el-tag v-else-if="missionCheckContent.status == 2" type="primary"
              >正在执行</el-tag
            >
            <el-tag v-else-if="missionCheckContent.status == 3" type="success"
              >已完成</el-tag
            >
            <el-tag v-else-if="missionCheckContent.status == 4" type="danger"
              >已失败</el-tag
            >
            <el-tag v-else-if="missionCheckContent.status == 5" type="warning"
              >已停止</el-tag
            >
            <el-tag v-else-if="missionCheckContent.status == 6" type="warning"
              >正在重试</el-tag
            >
          </el-descriptions-item>
          <el-descriptions-item label="描述" :span="2">
            {{ missionCheckContent.descriptions }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import MissionListAPI, {
  MissionListContent,
  MissionListPageQuery,
} from "@/api/missionList";

// 查询任务列表加载
const missionListQueryLoading = ref(false);
// 任务列表选中id
const missionListSelectionIds = ref<number[]>([]);
// 任务列表选中更改
function handleMissionListSelectionChange(selection: any) {
  missionListSelectionIds.value = selection.map((item: any) => item.id);
}
// 任务列表查询对象
const queryMissionListParams = reactive<MissionListPageQuery>({
  pageNum: 1,
  pageSize: 10,
});
// 任务列表内容
const missionListContentList = ref<MissionListContent[]>();
// 任务列表内容总数
const missionListContentTotal = ref(0);

// 查询任务列表
function handleMissionListContentQuery() {
  missionListQueryLoading.value = true;
  MissionListAPI.missionListContentQuery(queryMissionListParams)
    .then((data) => {
      missionListContentList.value = data.list;
      missionListContentTotal.value = data.total;
    })
    .finally(() => {
      missionListQueryLoading.value = false;
    });
}

// 跳转到任务添加界面
const router = useRouter();
function handleAdd() {
  router.push({ path: "/createMission" });
}
// 任务删除加载
const missionDeleteLoading = ref(false);
// 处理删除任务
function handleDeleteMissionList(missionListSelectionIds: number) {
  const ids = [missionListSelectionIds || missionListSelectionIds.value].join(
    ","
  );
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
      missionDeleteLoading.value = true;
      MissionListAPI.missionListDelete(ids).then(() => {
        ElMessage.success("删除成功");
        handleMissionListContentQuery();
      });
    })
    .catch(() => {
      ElMessage.info("已取消删除");
    })
    .finally(() => {
      missionDeleteLoading.value = false;
    });
}
// 任务查看弹窗显示
const newMissionCheckDialog = reactive({
  visible: false,
});
// 打开任务查看窗口
function handleOpenCheckDialog(id?: number) {
  newMissionCheckDialog.visible = true;
  handleMissionCheckContentQuery(typeof id == "number" ? id : -1);
}
// 关闭任务栏查看窗口
function handleCloseCheckDialog() {
  newMissionCheckDialog.value = false;
}
// 任务查看内容
const missionCheckContent = ref<MissionListContent>({});

// 任务查看内容获取
function handleMissionCheckContentQuery(id?: number) {
  MissionListAPI.missionCheckContentQuery(id).then((data) => {
    missionCheckContent.value = data.Content;
  });
}

const handleMissionReference = (id?: number) => {
  ElMessage.success(id + "引用成功");
};

onMounted(() => {
  handleMissionListContentQuery();
});
</script>

<style lang="scss" scoped>
.outer-container {
  padding: 20px;
}

.top-container,
.table-container {
  padding: 18px 0 0 10px;
  margin-bottom: 10px;
  background-color: var(--el-bg-color-overlay);
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);
}
</style>
