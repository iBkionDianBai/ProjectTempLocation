import { defineMock } from "./base";

export default defineMock([

  // 获取元数据基本信息
  {
    url: "metadata/:metaDataId/metaDataId",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {
          name: "专卖部分数据规范集",
          // 创建时间
          createTime: "2022-04-19 12:46",
          // 描述
          descriptions: "暂无",
        },
        msg: params.metaDataId + "成功",
      };
    },
  },
  // 获取规范字典列表信息
  {
    url: "metadata/standardDictionaryList/page",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {
          list: [
            {
              id: 1,
              // 字典列表名称
              dictionaryListName: "部门性别字典列表",
              // 描述
              descriptions: "暂无",
              // 数据标准记录数
              dataStandardsRecords: 8,
              // 审核状态
              auditStatus: 1,
              // 所属类目
              status: "专卖部门规范数据集",
            },
            {
              id: 2,
              // 字典列表名称
              dictionaryListName: "部门性别字典列表",
              // 描述
              descriptions: "暂无",
              // 数据标准记录数
              dataStandardsRecords: 8,
              // 审核状态
              auditStatus: 1,
              // 所属类目
              status: "专卖部门规范数据集",
            },
            {
              id: 3,
              // 字典列表名称
              dictionaryListName: "部门性别字典列表",
              // 描述
              descriptions: "暂无",
              // 数据标准记录数
              dataStandardsRecords: 8,
              // 审核状态
              auditStatus: 2,
              // 所属类目
              status: "专卖部门规范数据集",
            }],
          total: 3
        },
        msg: params.metaDataId + "成功",
      };
    },
  },
  // 删除规范字典列表信息
  {
    url: "metadata/standardDictionaryList/:ids",
    method: ["DELETE"],
    body({ params }) {
      return {
        code: "00000",
        data: null,
        msg: "删除规范字典" + params.ids + "成功",
      };
    },
  },
  // 规范字典列表所属类目信息
  {
    url: "metadata/:metaDataId/status",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {
          list:   [
            "专卖部门数据规范集",
            "网络部门数据规范集"
          ]
        },
        msg: params.metaDataId + "成功",
      };
    },
  },
  // 新增规范字典
  {
    url: "metadata/add/standardDictionary",
    method: ["POST"],
    body({ body }) {
      return {
        code: "00000",
        data: null,
        msg: "新增规范字典" + body.dictionaryListName + "成功",
      };
    },
  },
  // 获取字典数据基本信息
  {
    url: "metadata/:dictionaryId/dictionaryId",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {
          // 字典表名称
          dictionaryName: "部门性别字典表",
          // 创建时间
          createTime: "2022-04-19 12:46",
          // 创建人
          createUser: "管理员A",
          // 描述
          descriptions: "暂无",
        },
        msg: params.dictionaryId + "成功",
      };
    },
  },
  // 获取字典数据列表信息
  {
    url: "metadata/dictionaryList/page",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {
          list:   [
            {
              id: 1,
              // 标准字典名
              dictionaryName: "A1001",
              // 标准字典值
              dictionaryValue: "男",
              // 替换值
              replaceValue: "雄性,男性,男生",
              // 描述
              descriptions: "人员性别全为男性",
            },
            {
              id: 2,
              // 标准字典名
              dictionaryName: "A1002",
              // 标准字典值
              dictionaryValue: "女",
              // 替换值
              replaceValue: "雌性,女性,女生",
              // 描述
              descriptions: "人员性别全为女性",
            }],
          total: 2
        },
        msg: params.metaDataId + "成功",
      };
    },
  },
  // 删除字典列表信息
  {
    url: "metadata/dictionaryList/:ids",
    method: ["DELETE"],
    body({ params }) {
      return {
        code: "00000",
        data: null,
        msg: "删除字典" + params.ids + "成功",
      };
    },
  },
  // 新增字典
  {
    url: "metadata/add/dictionary",
    method: ["POST"],
    body({ body }) {
      return {
        code: "00000",
        data: null,
        msg: "新增字典" + body.dictionaryName + "成功",
      };
    },
  },
])
