import { defineMock } from "./base";

export default defineMock([
  // 获取列表信息
  {
    url: "dataSource/:listData/page",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {
          list: [
            {
              id: 1,
              // 数据连接名称
              dataConnectionName: "A1001",
              // 创建者
              creator: "A1001",
              // 数据源类型
              dataSourceType: "A1001",
              // 服务地址
              address: "A1001",
              // 端口
              port: 1001,
              // 数据库
              dataBase: "A1001",
              // 数据源用户名
              dataSourceUserName: "A1001",
              // 创建时间
              createDate: "A1001",
              // 描述信息
              description: "A1001",
            },
            {
              id: 2,
              // 数据连接名称
              dataConnectionName: "A1002",
              // 创建者
              creator: "A1002",
              // 数据源类型
              dataSourceType: "A1002",
              // 服务地址
              address: "A1002",
              // 端口
              port: 1002,
              // 数据库
              dataBase: "A1002",
              // 数据源用户名
              dataSourceUserName: "A1002",
              // 创建时间
              createDate: "A1002",
              // 描述信息
              description: "A1002",
            },
            {
              id: 3,
              // 数据连接名称
              dataConnectionName: "A1003",
              // 创建者
              creator: "A1003",
              // 数据源类型
              dataSourceType: "A1003",
              // 服务地址
              address: "A1003",
              // 端口
              port: 1003,
              // 数据库
              dataBase: "A1003",
              // 数据源用户名
              dataSourceUserName: "A1003",
              // 创建时间
              createDate: "A1003",
              // 描述信息
              description: "A1003",
            },
          ],
          total: 3,
        },
        msg: "成功",
      };
    },
  },
  // 新建数据源
  {
    url: "dataSource/:addDataSource/dataSource",
    method: ["POST"],
    body({ body }) {
      return {
        code: "00000",
        data: null,
        msg: "新增字典" + body.connectionName + "成功",
      };
    },
  },
  // 删除数据源
  {
    url: "dataSource/deleteDataList/:ids",
    method: ["DELETE"],
    body({ params }) {
      return {
        code: "00000",
        data: null,
        msg: "删除字典" + params.ids + "成功",
      };
    },
  },
  // 测试数据源
  {
    url: "dataSource/testDataSource/:id",
    method: ["GET"],
    body({ params }) {
      return {
        code: "00000",
        data: {
          result: 1,
        },
        msg: "测试完成" + params.id + "成功",
      };
    },
  },
]);
