import { defineMock } from "./base";

export default defineMock([
  {
    url: "missionList/missionCheckContentQuery/:ids",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {
          Content: {
            missionName: "A1001",
            creator: "A1001",
            createDate: "A1001",
            editDate: "A1001",
            lastExecuteDate: "A1001",
            descriptions: "A1001",
            status: 0,
          },
        },
        msg: params.message + "success",
      };
    },
  },
  {
    url: "missionList/missionListDelete/:ids",
    method: ["DELETE"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {},
        msg: params.missionName + "delete success",
      };
    },
  },
  // 返回任务列表
  {
    url: "missionList/getMissionList/page",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: {
          list: [
            {
              id: 1,
              missionName: "A1001",
              creator: "A1001",
              createDate: "A1001",
              editDate: "A1001",
              status: 0,
              lastExecuteDate: "A1001",
              descriptions: "A1001",
            },
            {
              id: 2,
              missionName: "A1002",
              creator: "A1002",
              createDate: "A1002",
              editDate: "A1002",
              status: 1,
              lastExecuteDate: "A1002",
              descriptions: "A1002",
            },
            {
              id: 3,
              missionName: "A1003",
              creator: "A1003",
              createDate: "A1003",
              editDate: "A1003",
              status: 2,
              lastExecuteDate: "A1003",
              descriptions: "A1003",
            },
          ],
          total: 3,
        },
        msg: params.missionId + "成功",
      };
    },
  },
]);
