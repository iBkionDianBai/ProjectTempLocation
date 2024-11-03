<!-- 数仓数据概览(未完成) -->
<!-- 收藏、标签、详细信息、新建视图按钮的编辑没写 -->
<!-- 新建表弹窗以及查看某表详细信息的弹窗都写在这个文件里，包括详细信息的字段信息也写在这里 -->
<!-- 创建者: 黄云乔 1825207860@qq.com -->
<template>
  <div class="app-container">
    <div class="common-container">
      <el-descriptions ref="databaseref">
        <el-descriptions-item label="数据连接:"
          ><el-select
            v-model="databaseForm.connection"
            placeholder="Select"
            size="small"
            @change="databaseListQuery"
            style="width: 240px"
          >
            <el-option
              v-for="item in connectionOptions"
              :key="item"
              :label="item"
              :value="item"
            /> </el-select
        ></el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="3">
        <el-descriptions-item label="类目:"> {{}}</el-descriptions-item>
        <el-descriptions-item label="数仓分层:"
          ><el-select
            v-model="databaseForm.hierarchy"
            placeholder="Select"
            size="small"
            @change="databaseListQuery"
            style="width: 240px"
          >
            <el-option
              v-for="item in dataHierarchyOptions"
              :key="item"
              :label="item"
              :value="item"
            /> </el-select
        ></el-descriptions-item>
        <el-descriptions-item label="所属部门:"
          ><el-select
            v-model="databaseForm.department"
            placeholder="Select"
            size="small"
            @change="databaseListQuery"
            style="width: 240px"
          >
            <el-option
              v-for="item in departmentOptions"
              :key="item"
              :label="item"
              :value="item"
            /> </el-select
        ></el-descriptions-item>
        <el-descriptions-item label="其他过滤选项:" />
        <el-descriptions-item label="压缩格式:">
          <el-select
            v-model="databaseForm.compressedFormat"
            placeholder="Select"
            size="small"
            @change="databaseListQuery"
            style="width: 240px"
          >
            <el-option
              v-for="item in compressedFormatOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="存储格式:">
          <el-select
            v-model="databaseForm.storageFormat"
            placeholder="Select"
            size="small"
            @change="databaseListQuery"
            style="width: 240px"
          >
            <el-option
              v-for="item in storageFormatOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item />

        <el-descriptions-item>
          <span style="margin-right: 30px">表类型:</span>
          <el-select
            v-model="databaseForm.tableType"
            placeholder="Select"
            size="small"
            @change="databaseListQuery"
            style="width: 240px"
          >
            <el-option
              v-for="item in tableTypeOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-descriptions-item>
        <el-descriptions-item>
          <span style="margin-right: 30px">创建人:</span>
          <el-select
            v-model="databaseForm.creator"
            placeholder="Select"
            size="small"
            @change="databaseListQuery"
            style="width: 240px"
          >
            <el-option
              v-for="item in founderOptions"
              :key="item"
              :label="item"
              :value="item"
            /> </el-select
        ></el-descriptions-item>
        <el-descriptions-item />
        <el-descriptions-item>
          <div style="width: 100%; display: flex; align-items: center">
            <span style="margin-right: 20px">创建时间:</span>
            <el-select
              v-model="databaseForm.createTimeStart"
              placeholder="Select"
              size="small"
              @change="databaseListQuery"
              style="width: 100px"
            >
              <el-option
                v-for="item in createTimeOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <span style="margin-right: 5px; margin-left: 5px"> To </span>
            <el-select
              v-model="databaseForm.createTimeEnd"
              placeholder="Select"
              size="small"
              @change="databaseListQuery"
              style="width: 100px"
            >
              <el-option
                v-for="item in createTimeOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
        </el-descriptions-item>

        <el-descriptions-item>
          <div style="width: 100%; display: flex; align-items: center">
            <span style="margin-right: 20px">更新时间:</span>
            <el-select
              v-model="databaseForm.updateTimeStart"
              placeholder="Select"
              size="small"
              @change="databaseListQuery"
              style="width: 100px"
            >
              <el-option
                v-for="item in updatingTimeOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <span style="margin-right: 5px; margin-left: 5px"> To </span>
            <el-select
              v-model="databaseForm.updateTimeEnd"
              placeholder="Select"
              size="small"
              @change="databaseListQuery"
              style="width: 100px"
            >
              <el-option
                v-for="item in updatingTimeOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select></div
        ></el-descriptions-item>
      </el-descriptions>
    </div>

    <el-card shadow="never" class="table-container">
      <template #header>
        <el-row :gutter="24">
          <el-col :span="40">
            <el-button @click="collection"> 收藏 </el-button>
            <el-button @click="tableLabel"> 标签 </el-button>
            <el-input
              v-model="databaseForm.keywords"
              placeholder="请输入搜索内容"
              clearable
              style="width: 200px; margin-left: 15px"
              @keyup.enter="databaseListQuery"
            />
          </el-col>
          <el-col :span="8"><div></div></el-col>
          <el-col :span="8">
            <el-button type="warning" @click="handleOpenNewDialog()">
              新建表
            </el-button>
            <el-button type="primary">新建视图</el-button>
          </el-col>
        </el-row>
      </template>

      <el-table
        ref="dataTableRef"
        v-loading="dataLoading"
        :data="basicDataList"
        highlight-current-row
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column
          label="表名称"
          prop="basicListName"
          align="center"
          width="150"
        />
        <el-table-column
          label="表类型"
          prop="dataType"
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
          label="审核状态"
          prop="auditStatus"
          align="center"
          width="150"
        />
        <el-table-column
          label="数仓分层"
          align="center"
          width="150"
          prop="layering"
        />
        <el-table-column
          label="所属部门"
          align="center"
          width="150"
          prop="department"
        />
        <el-table-column
          label="数据连接"
          align="center"
          width="150"
          prop="dataConnection"
        />
        <el-table-column
          label="创建时间"
          align="center"
          width="150"
          prop="dataCreateTime"
        />
        <el-table-column
          label="更新时间"
          align="center"
          width="150"
          prop="dataUpdateTime"
        />
        <el-table-column
          label="标签"
          align="center"
          width="150"
          prop="dataLabel"
        />

        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template #default="scope">
            <el-button type="primary" size="small" link @click="dataCollection">
              收藏
            </el-button>
            <el-button type="primary" size="small" link @click="dataLabel"
              >标签
            </el-button>
            <el-button
              type="primary"
              size="small"
              link
              @click="handleOpenDetailDialog(scope.row.id)"
            >
              详细
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-if="databaseTableTotal"
        v-model:total="databaseTableTotal"
        v-model:page="databaseForm.pageNum"
        v-model:limit="databaseForm.pageSize"
        @pagination="databaseListQuery"
      />
    </el-card>

    <el-dialog
      v-model="detailDialog.visible"
      width="800px"
      :show-close="true"
      @close="handleCloseDetailDialog"
    >
      <!-- <Detailpage /> -->
      <div class="common-container">
        <el-descriptions title="基本信息" :column="5">
          <el-descriptions-item label="表名:">{{
            detailBasicInfo.tableName
          }}</el-descriptions-item>
          <el-descriptions-item label="资源类型:">{{
            detailBasicInfo.tableType
          }}</el-descriptions-item>
          <el-descriptions-item label="数仓分层:">{{
            detailBasicInfo.hierarchy
          }}</el-descriptions-item>
          <el-descriptions-item label="所属部门:">{{
            detailBasicInfo.department
          }}</el-descriptions-item>
          <el-descriptions-item label="数据连接:">{{
            detailBasicInfo.dataConnection
          }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions :column="4">
          <el-descriptions-item label="创建时间:">{{
            detailBasicInfo.createTime
          }}</el-descriptions-item>
          <el-descriptions-item label="更新时间:">{{
            detailBasicInfo.updateTime
          }}</el-descriptions-item>
          <el-descriptions-item label="标签:">{{
            detailBasicInfo.label
          }}</el-descriptions-item>
          <el-descriptions-item label="审核状态:">{{
            detailBasicInfo.auditStatus
          }}</el-descriptions-item>
          <el-descriptions-item label="描述:">{{
            detailBasicInfo.description
          }}</el-descriptions-item>
        </el-descriptions>
        <el-descriptions :column="4">
          <el-descriptions-item label="表更新方式:">{{
            detailbaseref.updateWay
          }}</el-descriptions-item>
          <el-descriptions-item label="更新周期:">{{
            detailbaseref.updateCycle
          }}</el-descriptions-item>
          <el-descriptions-item label="数据量:">{{
            detailBasicInfo.amount
          }}</el-descriptions-item>
          <el-descriptions-item label="数据增量:"
            >{{ detailbaseref.increase }} 昨日增量
            <el-button size="small" @click="showincreasedialog"
              >历史增量</el-button
            ></el-descriptions-item
          >
        </el-descriptions>
      </div>

      <el-card shadow="never" class="table-container">
        <template #header>
          <el-row :gutter="20">
            <el-col :span="10" style="padding-top: 5px">
              <el-text class="mx-1" size="large" tag="b">操作</el-text>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-button
                type="primary"
                size="small"
                link
                :class="index == number ? 'btn1' : 'btn'"
                @click="tab(index)"
                v-for="(item, index) in dataList"
                :key="index"
                >{{ item.option }}
              </el-button>
            </el-col>
          </el-row>
        </template>
        <!--5div-->

        <div id="content1" v-show="number == 0">
          <el-input
            v-model="detailtableinfo.keywords"
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
              prop="description"
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
              align="center"
              width="150"
              prop="ifCanBeNull"
            />
            <el-table-column
              label="是否主键"
              align="center"
              width="150"
              prop="ifIsKey"
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
            v-model:page="detailtableinfo.pageNum"
            v-model:limit="detailtableinfo.pageSize"
            @pagination="fieldinfoQuery"
            style="margin-bottom: 0px"
          />
        </div>
        <div id="content2" v-show="number == 1">
          <span></span>
        </div>
        <div id="content3" v-show="number == 2">
          <span></span>
        </div>
        <div id="content4" v-show="number == 3">
          <span></span>
        </div>
        <div id="content5" v-show="number == 4">
          <span></span>
        </div>
      </el-card>

      <el-dialog
        title="历史增量"
        width="900px"
        v-model="increaseDialog.visible"
        :show-close="true"
        align="center"
      >
        <increament />
      </el-dialog>
    </el-dialog>

    <el-dialog
      title="新建表"
      width="800px"
      v-model="newDialog.visible"
      :show-close="true"
      @close="handelCloseNewDialog"
      align="center"
    >
      <div class="common-container">
        <el-descriptions
          title="表基础信息"
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
              v-model="newdatabaseForm.system"
              placeholder="Select"
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="item in sysetemOptions"
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
                <el-button size="small" @click="delete1()">删除</el-button>
              </el-col>
            </el-row>
          </template>
          <el-table
            height="150px"
            ref="dataTableRef"
            v-loading="newdataLoading"
            :data="newdatabaseForm.ColumnTableReqs"
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
                <el-input v-model="scope.row.columnName" />
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
                  @change="isdouble(scope.row)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in typeOptions"
                    :key="item"
                    :label="item"
                    :value="item"
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
                  :disabled="scope.row.type == 'double'"
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
                  :disabled="scope.row.type == 'double'"
                  v-model="scope.row.precision"
                  :controls="false"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="是否可为空"
              prop="ifCanBeNull"
              width="150"
              align="center"
            >
              <template #default="scope">
                <el-select
                  v-model="scope.row.ifCanBeNull"
                  placeholder="请选择"
                  @change="test(scope.row)"
                >
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
                <el-select v-model="scope.row.ifIsKey" placeholder="请选择">
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
                <el-button size="small" @click="delete2()">删除</el-button>
              </el-col>
            </el-row>
          </template>
          <el-table
            height="150px"
            ref="dataTableRef"
            :data="newdatabaseForm.ColumnTableReqs2"
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
                  @change="isdouble2(scope.row)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in typeOptions2"
                    :key="item"
                    :label="item"
                    :value="item"
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
                  :disabled="scope.row.type == 'double'"
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
                  :disabled="scope.row.type == 'double'"
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
  </div>
</template>

<script setup lang="ts">
import databaseAPI, {
  basicList,
  databasePageQuery,
  //详细信息
  detailInfo,
  //详细信息页面下字段信息的api
  fieldinfo,
  fieldPageQuery,
  //新建表
  newdataBaseInfo,
  newDataListColumn,
} from "@/api/database";

import Detailpage from "@/views/DBdata/dwt/index.vue";
import increament from "@/views/DBdata/dwt/increament/index.vue";
//increament详细信息下 历史增量查询
import datainfo from "@/views/DBdata/dwt/datainfo/index.vue";

function test(index) {
  console.log(index.ifCanBeNull); //测试添加列是否正常
}

// 数据id
const databaseDataId = ref(0);
//分层
const dataHierarchyOptions = ref<string[]>();
//部门
const departmentOptions = ref<string[]>();
//创建者
const founderOptions = ref<string[]>();
//创建时间
const createTimeOptions = ref<string[]>();
//压缩格式
const compressedFormatOptions = ref<string[]>();
//表格类型
const tableTypeOptions = ref<string[]>();
//存储格式
const storageFormatOptions = ref<string[]>();
//更新时间
const updatingTimeOptions = ref<string[]>();
//数据连接选项
const connectionOptions = ref<string[]>();

//数据库查询信息提交
const databaseref = ref(ElForm);
const dataLoading = ref(false);
//选项卡作为查询参数，查询数仓内的表
function handlebasicDataQuery() {
  dataLoading.value = true;
  databaseAPI
    .getdatabaseInfo(databaseDataId.value)
    .then((data) => {
      console.log(connectionOptions);
      connectionOptions.value = data.dataConnection;
      dataHierarchyOptions.value = data.dataHierarchyOptions;
      departmentOptions.value = data.departmentOptions;
      founderOptions.value = data.founderOptions;
      createTimeOptions.value = data.createTimeOptions;
      compressedFormatOptions.value = data.compressedFormatOptions;
      tableTypeOptions.value = data.tableTypeOptions;
      storageFormatOptions.value = data.storageFormatOptions;
      updatingTimeOptions.value = data.updatingTimeOptions;
    })
    .finally(() => {
      dataLoading.value = false;
    });
}

// 数据基本列表选中id
const basicListIds = ref<number[]>([]);
// 选中id
function handleSelectionChange(selection: any) {
  basicListIds.value = selection.map((item: any) => item.id);
}
//表格数据收藏
function collection() {}
//表格数据标签
function tableLabel() {}
//单条数据收藏
function dataCollection() {}
//单条数据标签
function dataLabel() {}

// 数据基本信息列表
const basicDataList = ref<basicList[]>();
//分页查询
const databaseTableTotal = ref(0);
const databaseForm = reactive<databasePageQuery>({
  pageNum: 1,
  pageSize: 10,
});
// 基本列表信息查询
function databaseListQuery() {
  dataLoading.value = true;
  databaseAPI
    .getdatabaseList(databaseForm)
    .then((data) => {
      basicDataList.value = data.list;
      databaseTableTotal.value = data.total;
      console.log(databaseForm);
    })
    .finally(() => {
      dataLoading.value = false;
    });
}
/////////////////////新建表////////////////////
// 新建表弹窗控制
const newDialog = reactive({
  visible: false,
});
// 打开新建弹窗
function handleOpenNewDialog() {
  newDialog.visible = true;
  handlenewDataQuery(); //查询新建表选项
  add(); //添加列 列表增加一行
  add2(); //添加分区列
}
// 关闭新建弹窗
function handelCloseNewDialog() {
  newDialog.visible = false;
  newdatabaseForm.ColumnTableReqs = []; //清空添加列列表
  newdatabaseForm.ColumnTableReqs2 = []; //清空分区列
}

const newdatabaseForm = reactive<newdataBaseInfo>({
  //名称
  tableName: "",
  //生命周期
  lifeCycle: "",
  //描述
  description: "",
  //业务系统
  system: "",
  //部门
  department: "",
  //数仓数据源
  datasource: "",
  dataConnection: "",
  //数仓层域
  hierarchy: "",
  auditStatus: "",
  dataConnection: "",
  compressedFormat: "",
  storageFormat: "",
  label: "",
  tableType: "",
  creator: "",
  ColumnTableReqs: [], //初始化添加列
  ColumnTableReqs2: [], //初始化 添加分区列
});
//添加列数据是否为空选项
const nullOptions = ref([
  { value: 1, label: "是" },
  {
    value: 0,
    label: "否",
  },
]);
//添加分区列数据是否为空选项
const nullOptions2 = ref([
  { value: 1, label: "是" },
  {
    value: 0,
    label: "否",
  },
]);
//是否为主键选项
const keyOptions = ref([
  { value: 1, label: "是" },
  {
    value: 0,
    label: "否",
  },
]);
//分区列主键选项
const keyOptions2 = ref([
  { value: 1, label: "是" },
  {
    value: 0,
    label: "否",
  },
]);
//添加列增加一行
function add() {
  const newRow: newDataListColumn = {
    columnName: "",
    type: "", // 默认值，根据实际情况修改
    length: "",
    precision: "",
    ifCanBeNull: "", // 默认值，根据实际情况修改
    ifIsKey: "", // 默认值，根据实际情况修改
    description: "",
    ifIsPartitionKey: "", // 可选属性，默认为空字符串
    remark: "", // 可选属性，默认为空字符串
  };
  // 确保newdatabaseForm和ColumnTableReqs存在
  if (newdatabaseForm && Array.isArray(newdatabaseForm.ColumnTableReqs)) {
    newdatabaseForm.ColumnTableReqs.push(newRow);
  } else {
    console.error("newdatabaseForm或ColumnTableReqs未定义或不是数组");
  }
}
//分区列里增加一行
function add2() {
  const newRow: newDataListColumn = {
    columnName: "",
    type: "", // 默认值，根据实际情况修改
    length: "",
    precision: "",
    ifCanBeNull: "", // 默认值，根据实际情况修改
    ifIsKey: "", // 默认值，根据实际情况修改
    description: "",
    ifIsPartitionKey: "", // 可选属性，默认为空字符串
    remark: "", // 可选属性，默认为空字符串
  };
  // 确保newdatabaseForm和ColumnTableReqs存在
  if (newdatabaseForm && Array.isArray(newdatabaseForm.ColumnTableReqs2)) {
    newdatabaseForm.ColumnTableReqs2.push(newRow);
  } else {
    console.error("newdatabaseForm或ColumnTableReqs未定义或不是数组");
  }
}

//当数据类型为“double”时，禁长度和精度格
function isdouble(scope: any) {
  if (scope.type.localeCompare("double") == 0) {
    scope.length = null;
    scope.precision = null;
  }
}
function isdouble2(scope: any) {
  if (scope.type.localeCompare("double") == 0) {
    scope.length = null;
    scope.precision = null;
  }
  console.log(scope.type.localeCompare("double"));
}
const newdataLoading2 = ref(false);//分区列加载
//清空列
function delete1() {
  newdatabaseForm.ColumnTableReqs = [];
  console.log(newdatabaseForm.ColumnTableReqs);
}
//清空分区列
function delete2() {
  newdatabaseForm.ColumnTableReqs2 = [];
  console.log(newdatabaseForm.ColumnTableReqs2);
}

//取消
function handelcancel() {
  //名称
  newdatabaseForm.tableName = "";
  //生命周期
  newdatabaseForm.lifeCycle = "";
  //描述
  newdatabaseForm.description = "";
  //业务系统
  newdatabaseForm.system = "";
  //部门
  newdatabaseForm.department = "";
  //数仓数据源
  newdatabaseForm.datasource = "";
  newdatabaseForm.dataConnection = "";
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
  handelCloseNewDialog();//关闭弹窗
}
//提交
const newdatabaseref = ref(ElForm);
const newdataLoading = ref(false);
const handlesubmit = useThrottleFn(() => {
  newdatabaseref.value.validate((valid: any) => {
    if (valid) {
      newdataLoading.value = true;
      databaseAPI
        .addnewdata(newdatabaseForm)
        .then(() => {
          console.log(newdatabaseForm);
          console.log("newdata_ok");
        })
        .finally(() => (newdataLoading.value = false));
    }
  });
}, 3000);
function handlesubmitnew() {
  handlesubmit();
  console.log(newdatabaseForm.ColumnTableReqs);//测试提交时添加列表格内容是否正常
  console.log("ColumnTableReqst_ok");
  handelcancel();//提交后清空页面内容
}
//删除分区列某一行
function remove2(index) {
  if (
    newdatabaseForm &&
    Array.isArray(newdatabaseForm.ColumnTableReqs2) &&
    index >= 0 &&
    index < newdatabaseForm.ColumnTableReqs2.length
  ) {
    newdatabaseForm.ColumnTableReqs2.splice(index, 1);
  } else {
    console.error("无效的索引或newdatabaseForm.ColumnTableReqs2未定义");
  }
}
//删除添加列某一行
function remove(index) {
  console.log(newdatabaseForm.ColumnTableReqs);
  console.log(newdatabaseForm);
  if (
    newdatabaseForm &&
    Array.isArray(newdatabaseForm.ColumnTableReqs) &&
    index >= 0 &&
    index < newdatabaseForm.ColumnTableReqs.length
  ) {
    newdatabaseForm.ColumnTableReqs.splice(index, 1);
  } else {
    console.error("无效的索引或newdatabaseForm.ColumnTableReqs2未定义");
  }
}
//获取新建表的选项、下拉框
const newDataId = ref(0);
const newLoading = ref(false);
const lifeCycle = ref<string[]>();
const sysetemOptions = ref<string[]>();
//部门
const department = ref<string[]>();
//数仓数据源
const datasource = ref<string[]>();
const dataConnection = ref<string[]>();
//数仓层域
const hierarchy = ref<string[]>();
const compressedFormat = ref<string[]>();
const storageFormat = ref<string[]>();
const label = ref<string[]>();
const tableType = ref<string[]>();
const typeOptions = ref<string[]>();
const typeOptions2 = ref<string[]>();
const auditStatus = ref(["审核完成", "审核中"]);
function handlenewDataQuery() {
  newLoading.value = true;
  databaseAPI
    .getnewdataList(newDataId.value)
    .then((data) => {
      // dataconnection.value = data.listtion;
      lifeCycle.value = data.lifeCycle;
      sysetemOptions.value = data.sysetem;
      //部门
      department.value = data.department;
      //数仓数据源
      datasource.value = data.datasource;
      dataConnection.value = data.dataConnection;
      //数仓层域
      hierarchy.value = data.hierarchy;
      compressedFormat.value = data.compressedFormat;
      storageFormat.value = data.storageFormat;
      label.value = data.label;
      tableType.value = data.tableType;
      typeOptions.value = data.typeOptions;
      typeOptions2.value = data.typeOptions2;
      console.log(typeOptions.value);
    })
    .finally(() => {
      newLoading.value = false;
    });
}

/////////////////详细表//////////////////////
// 查看详细弹窗显示控制
const detailDialog = reactive({
  visible: false,
});
// 打开详细弹窗
function handleOpenDetailDialog(id?: number) {
  detailDialog.visible = true;
  handledetailQuery(); //查询详细信息
  fieldinfoQuery(); //查询字段信息
  detailId.value = id; //选中基础表的某一条，传该条的id，用于查询该条信息的详细信息
  console.log(detailId.value);
  //  handledetailQuery(typeof id === "number" ? id : -1);
}
// 关闭详细弹窗
function handleCloseDetailDialog() {
  detailDialog.visible = false;
}
const increaseDialog = reactive({
  visible: false,
});
function showincreasedialog() {
  increaseDialog.visible = true;
}
//控制选择了一下哪一个选项
const number = ref(0);
const dataList = ref([
  { option: "字段信息" },
  { option: "数据探查" },
  { option: "数据标准" },
  { option: "数据清洗" },
  { option: "数据血缘" },
]);
function tab(this: any, index: any) {
  this.number = index;
}
// 详细列表基础信息
const detailBasicInfo = reactive<detailInfo>({
  tableName: "",
  tableType: "",
  hierarchy: "",
  department: "",
  dataConnection: "",
  createTime: "",
  updateTime: "",
  label: "",
  auditStatus: "",
  description: "",
  // updateWay: " ",
  // updateCycle: "",
  amount: "",
  // increase: "",
});
//也属于详细表基本信息
const detailbaseref = reactive({
  updateWay: "增量",
  updateCycle: "xxx",
  increase: "3000",
});

// 数据加载
const detailLoading = ref(false);
//数据id
const detailId = ref(0);
// 查询详细列表数据
function handledetailQuery() {
  detailLoading.value = true;
  databaseAPI
    .getdetailInfo(detailId.value)
    .then((data) => {
      detailBasicInfo.tableName = data.tableName;
      detailBasicInfo.tableType = data.tableType;
      detailBasicInfo.hierarchy = data.hierarchy;
      detailBasicInfo.department = data.department;
      detailBasicInfo.dataConnection = data.dataConnection;
      detailBasicInfo.createTime = data.createTime;
      detailBasicInfo.updateTime = data.updateTime;
      detailBasicInfo.label = data.label;
      detailBasicInfo.auditStatus = data.auditStatus;
      detailBasicInfo.description = data.description;
      // detailBasicInfo.updateWay = data.updateway;
      //detailBasicInfo.updateCycle = data.updatecycle;
      detailBasicInfo.amount = data.amount;
      // detailBasicInfo.increase = data.increase;
    })
    .finally(() => {
      detailLoading.value = false;
    });
}

function editdata(id) {} //编辑
//详细表分页查询
const datainfoTotal = ref(0);
const detailtableinfo = reactive<fieldPageQuery>({
  pageNum: 1,
  pageSize: 10,
});
//字段信息初始化
const fieldinformation = ref<fieldinfo[]>();
//数据加载
const fieldinfoLoading = ref(false);
function fieldinfoQuery() {
  fieldinfoLoading.value = true;
  databaseAPI
    .getfieldInfoList(detailtableinfo)
    .then((data) => {
      fieldinformation.value = data.list;
      datainfoTotal.value = data.total;
      console.log(fieldinformation);
    })
    .finally(() => {
      fieldinfoLoading.value = false;
    });
}
onMounted(() => {
  handlebasicDataQuery();
  databaseListQuery();
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
