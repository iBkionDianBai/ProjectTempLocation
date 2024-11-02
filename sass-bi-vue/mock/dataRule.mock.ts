import { defineMock } from "./base";

export default defineMock([
  // 获取数据合规基本信息内容
  {
    url: "dataRule/:basicInfoId/basicInfo",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {
          name: "专卖部分数据规范集",
          // 创建时间
          createDate: "2022-04-19 12:46",
          // 描述
          description: "暂无",
        },
        msg: params.basicInfoId + "成功",
      };
    },
  },
]);
