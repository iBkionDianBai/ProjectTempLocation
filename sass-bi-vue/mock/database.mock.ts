import { defineMock } from "./base";

export default defineMock([
  // 获取元数据基本信息
  {
    url: "database/:databaseDataId/databaseInfo",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {
          dataConnection: ["aaa", "bbb", "ccc"],
          dataHierarchyOptions: ["aaa", "bbb", "ccc"],
          departmentOptions: ["aaa", "bbb", "ccc"],
          founderOptions: ["aaa", "bbb", "ccc"],
          createTimeOptions: ["aaa", "bbb", "ccc"],
          compressedFormatOptions: ["aaa", "bbb", "ccc"],
          tableTypeOptions: ["aaa", "bbb", "ccc"],
          storageFormatOptions: ["aaa", "bbb", "ccc"],
          updatingTimeOptions: ["aaa", "bbb", "ccc"],
        },
        msg: params.databaseDataId + "成功",
      };
    },
  },
  {
    url: "database/:connectionId/newtable",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {
          // lifeCycleOptions: ["aab", "bbb", "ccc"],
          // departmentOptions1: ["1", "2", "3"],
          sysetem: ["1", "2", "3"],

          //数仓数据源
          datasource: ["1", "2", "3"],
          description: ["1", "2", "3"],
          auditStatus: ["1", "2", "3"],
          hierarchy: ["1", "2", "3"],
          department: ["1", "2", "3"],
          dataConnection: ["1", "2", "3"],
          compressedFormat: ["1", "2", "3"],
          storageFormat: ["1", "2", "3"],
          lifeCycle: ["1", "2", "3"],
          label: ["1", "2", "3"],
          tableType: ["1", "2", "3"],
          creator: "string",
          typeOptions: ["double", "string", "order"],
          typeOptions2: ["double", "string", "order"],
        },
        msg: params.databaseDataId + "成功",
      };
    },
  },
  //数据库选项查询
  {
    url: "database/databaseInfo/query",
    method: ["POST"],
    body({}) {
      return {
        code: "00000",
        data: null,
        msg: "查询" + "成功",
      };
    },
  },
  //筛选选项查询
  {
    url: "database/selection/query",
    method: ["POST"],
    body({}) {
      return {
        code: "00000",
        data: null,
        msg: "查询" + "成功",
      };
    },
  },
  // 获取详细页面数据基本信息
  {
    url: "database/table/:id/info",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {
          tableName: "111",
          //资源类型
          tableType: "11",
          //数仓分层
          hierarchy: "11",
          //所属部门
          department: "11",
          //数据连接
          dataConnection: "11",
          //创建时间
          createTime: "11",
          //更新时间
          updateTime: "11",
          //标签
          label: "11",
          //审核状态
          auditStatus: "11",
          //描述
          description: "11",
          //表更新方式
          updateWay: "11",
          //更新周期
          updateCycle: "11",
          //数据量
          amount: "11",
          //数据增量
          totalSize: "111",
        },
        msg: params.detailId + "成功",
      };
    },
  },
  //基本列表
  {
    url: "database/basicList/page",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {
          list: [
            {
              id: 1,
              // 字典列表名称
              basicListName: "ods_yy_xxx_table",
              // 描述
              descriptions: "烟叶原始业务表",
              // 表类型
              dataType: "数据表",
              // 审核状态
              auditStatus: "",
              // 数仓分层
              layering: "原始数据层",
              //所属部门
              department: "烟叶部",
              //数据连接
              dataConnection: "sjlj1",
              //创建时间
              dataCreateTime: "yyy-MM-dd hh:mm:ss",
              //更新时间
              dataUpdateTime: "yyy-MM-dd hh:mm:ss",
              //标签
              dataLabel: "1、2",
            },
            {
              id: 2,
              // 字典列表名称
              basicListName: "ods_yy_xxx_table",
              // 描述
              descriptions: "专卖利润汇总表",
              // 表类型
              dataType: "视图表",
              // 审核状态
              auditStatus: "",
              // 数仓分层
              layering: "主题数据层",
              //所属部门
              department: "专卖部",
              //数据连接
              dataConnection: "sjlj1",
              //创建时间
              dataCreateTime: "",
              //更新时间
              dataUpdateTime: "",
              //标签
              dataLabel: "",
            },
            {
              id: 3,
              // 字典列表名称
              basicListName: "ods_yy_xxx_table",
              // 描述
              descriptions: "烟叶原始业务表",
              // 表类型
              dataType: "数据表",
              // 审核状态
              auditStatus: "",
              // 数仓分层
              layering: "原始数据层",
              //所属部门
              department: "",
              //数据连接
              dataConnection: "sjlj1",
              //创建时间
              dataCreateTime: "",
              //更新时间
              dataUpdateTime: "",
              //标签
              dataLabel: "",
            },
            {
              id: 4,
              // 字典列表名称
              basicListName: "ods_yy_xxx_table",
              // 描述
              descriptions: "烟叶原始业务表",
              // 表类型
              dataType: "数据表",
              // 审核状态
              auditStatus: "待审核",
              // 数仓分层
              layering: "原始数据层",
              //所属部门
              department: "",
              //数据连接
              dataConnection: "sjlj1",
              //创建时间
              dataCreateTime: "",
              //更新时间
              dataUpdateTime: "",
              //标签
              dataLabel: "",
            },
            {
              id: 5,
              // 字典列表名称
              basicListName: "ods_yy_xxx_table",
              // 描述
              descriptions: "烟叶原始业务表",
              // 表类型
              dataType: "数据表",
              // 审核状态
              auditStatus: "待审核",
              // 数仓分层
              layering: "原始数据层",
              //所属部门
              department: "",
              //数据连接
              dataConnection: "sjlj1",
              //创建时间
              dataCreateTime: "",
              //更新时间
              dataUpdateTime: "",
              //标签
              dataLabel: "",
            },
            {
              id: 6,
              // 字典列表名称
              basicListName: "ods_yy_xxx_table",
              // 描述
              descriptions: "烟叶原始业务表",
              // 表类型
              dataType: "数据表",
              // 审核状态
              auditStatus: "待审核",
              // 数仓分层
              layering: "原始数据层",
              //所属部门
              department: "",
              //数据连接
              dataConnection: "sjlj1",
              //创建时间
              dataCreateTime: "",
              //更新时间
              dataUpdateTime: "",
              //标签
              dataLabel: "",
            },
            {
              id: 7,
              // 字典列表名称
              basicListName: "ods_yy_xxx_table",
              // 描述
              descriptions: "烟叶原始业务表",
              // 表类型
              dataType: "数据表",
              // 审核状态
              auditStatus: "待审核",
              // 数仓分层
              layering: "原始数据层",
              //所属部门
              department: "",
              //数据连接
              dataConnection: "sjlj1",
              //创建时间
              dataCreateTime: "",
              //更新时间
              dataUpdateTime: "",
              //标签
              dataLabel: "",
            },
            {
              id: 8,
              // 字典列表名称
              basicListName: "ods_yy_xxx_table",
              // 描述
              descriptions: "烟叶原始业务表",
              // 表类型
              dataType: "数据表",
              // 审核状态
              auditStatus: "待审核",
              // 数仓分层
              layering: "原始数据层",
              //所属部门
              department: "",
              //数据连接
              dataConnection: "sjlj1",
              //创建时间
              dataCreateTime: "",
              //更新时间
              dataUpdateTime: "",
              //标签
              dataLabel: "",
            },
            {
              id: 9,
              // 字典列表名称
              basicListName: "ods_yy_xxx_table",
              // 描述
              descriptions: "烟叶原始业务表",
              // 表类型
              dataType: "数据表",
              // 审核状态
              auditStatus: "待审核",
              // 数仓分层
              layering: "原始数据层",
              //所属部门
              department: "",
              //数据连接
              dataConnection: "sjlj1",
              //创建时间
              dataCreateTime: "",
              //更新时间
              dataUpdateTime: "",
              //标签
              dataLabel: "",
            },
            {
              id: 10,
              // 字典列表名称
              basicListName: "10",
              // 描述
              descriptions: "烟叶原始业务表",
              // 表类型
              dataType: "数据表",
              // 审核状态
              auditStatus: "待审核",
              // 数仓分层
              layering: "原始数据层",
              //所属部门
              department: "",
              //数据连接
              dataConnection: "sjlj1",
              //创建时间
              dataCreateTime: "",
              //更新时间
              dataUpdateTime: "",
              //标签
              dataLabel: "",
            },
          ],
          total: 10,
        },
        msg: params.databaseId + "成功",
      };
    },
  },
  //新建表提交
  {
    url: "database/add/newdatabaseinfo",
    method: ["POST"],
    body({ body }) {
      return {
        code: "00000",
        data: null,
        msg: "新建表" + body.name + "成功",
      };
    },
  },
  //添加列
  {
    url: "database/addcolumns/newDataListQuery",
    method: ["POST"],
    body({}) {
      return {
        code: "00000",
        data: null,
        msg: "添加列" + "成功",
      };
    },
  },
  //详细操作字段信息
  {
    url: "database/fieldInfo/page",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {
          list: [
            {
              id: 1,
              // 列表名称
              name: "11",
              type: "",
              description: "77",
              length: "h",
              null: "",
              primarykey: "",
              distinguishkey: "",
              remark: "",
            },
            {
              id: 2,
              // 列表名称
              name: "",
              type: "jj",
              description: "",
              length: "",
              null: "",
              primaryKey: "",
              distinguishKey: "",
              remark: "",
            },
          ],
          total: 2,
        },
        msg: "成功",
      };
    },
  },
  //趋势图
  {
    url: "database/increasementInfo/:id/page",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {
          list: [
            { date: "11-22", increment: 100, total: 0 },
            { date: "22-00", increment: 135, total: 100 },
            { date: "33-00", increment: 100, total: 220 },
          ],
        },
        msg: "成功",
      };
    },
  },
]);
