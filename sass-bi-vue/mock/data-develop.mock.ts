import { defineMock } from "./base";

export default defineMock([
  {
    url: "datadevelop/add/cleanRules/page",
    method: ["POST"],
    body({}) {
      return {
        code: "00000",
        data: null,
        msg: "成功",
      };
    },
  },
  {
    url: "datadevelop/add/cleanQuery/page",
    method: ["POST"],
    body({}) {
      return {
        code: "00000",
        data: null,
        msg: "成功",
      };
    },
  },
  //清洗配置规则
  {
    url: "datadevelop/cleanRulesList/:id/page",
    method: ["GET"],
    body: () => {
      return {
        code: "00000",
        data: {
          tableName: "aa",
          tabledescription: "nn",
          partitionsOptions1: ["optd1", "optd2", "optd3", "optd4"],
          partitionsOptions2: ["optd1", "optd2", "optd3", "optd4"],
          operationalFactorOptions: [">", "<", "="],
          operationalFactor: "",
          taskOptions: [
            { name: "组合1", id: 1 },
            { name: "组合2", id: 2 },
          ],
          nameOptions: [" a ", " b"],
        },
        msg: "成功",
      };
    },
  },
  //脱敏配置规则
  {
    url: "datadevelop/maskRulesList/:maskid/page",
    method: ["GET"],
    body: () => {
      return {
        code: "00000",
        data: {
          tableName: "aa",
          tabledescription: "nn",
          partitionsOptions1: ["optd1", "optd2", "optd3", "optd4"],
          partitionsOptions2: ["optd1", "optd2", "optd3", "optd4"],
          operationalFactorOptions: [">", "<", "="],
          operationalFactor: "",
          taskOptions: [
            { name: "组合1", id: 1 },
            { name: "组合2", id: 2 },
          ],
          nameOptions: [" a ", " b"],
        },
        msg: "成功",
      };
    },
  },
  //列表提交
  {
    url: "datadevelop/add/maskRulesListRules/page",
    method: ["POST"],
    body({}) {
      return {
        code: "00000",
        data: null,
        msg: "成功",
      };
    },
  },
  {
    url: "datadevelop/maskRulesQuery/page",
    method: ["POST"],
    body({}) {
      return {
        code: "00000",
        data: null,
        msg: "成功",
      };
    },
  },

  //标准standardRulesQuery
  {
    url: "datadevelop/standardRulesQuery/:id/page",
    method: ["GET"],
    body: () => {
      return {
        code: "00000",
        data: {
          tableName: "aa",
          tabledescription: "nn",
          partitionsOptions1: ["optd1", "optd2", "optd3", "optd4"],
          partitionsOptions2: ["optd1", "optd2", "optd3", "optd4"],
          operationalFactorOptions: [">", "<", "="],
          operationalFactor: "",
          taskOptions: [
            { name: "组合1", id: 1 },
            { name: "组合2", id: 2 },
          ],
          nameOptions: [" a ", " b"],
          dataElementOptions: [" a ", " b"],
          //数据元类目
          categoryOptions: [" aa ", " bb"],
          //数据元类别
          meteDataOptions: [" aaa ", " bbb"],
        },
        msg: "成功",
      };
    },
  },
  {
    url: "datadevelop/add/standardRulesList/page",
    method: ["POST"],
    body({}) {
      return {
        code: "00000",
        data: null,
        msg: "成功",
      };
    },
  },
  {
    url: "datadevelop/standardRulesQuery/page",
    method: ["POST"],
    body({}) {
      return {
        code: "00000",
        data: null,
        msg: "成功",
      };
    },
  },
  //错误表
  {
    url: "datadevelop/wronTableQueryList/:id/page2",
    method: ["GET"],
    body: () => {
      return {
        code: "00000",
        data: {
          datasourceOptions: [
            { id: 1, name: "a" },
            { id: 2, name: "b" },
          ],
          wronTableOptions: [
            { id: 1, name: "aa" },
            { id: 2, name: "b" },
          ],
          pationsOptions: [
            { id: 1, name: "aaa" },
            { id: 2, name: "b" },
          ],
        },
        msg: "成功",
      };
    },
  },
  //目标表
  {
    url: "datadevelop/targetTableQueryList/:Id/page",
    method: ["GET"],
    body: () => {
      return {
        code: "00000",
        data: {
          datasourceOptions: [
            { id: 1, name: "e" },
            { id: 2, name: "b" },
          ],
          TableOptions: [
            { id: 1, name: "aa" },
            { id: 2, name: "e" },
          ],
          pationsOptions: [
            { id: 1, name: "aaa" },
            { id: 2, name: "e" },
          ],
          operationalFactorOptions: [{ id: 1, nam: ">" }],
        },
        msg: "成功",
      };
    },
  },
  {
    url: "datadevelop/:newId/page",
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
        },
        msg: params.databaseDataId + "成功",
      };
    },
  },
]);
