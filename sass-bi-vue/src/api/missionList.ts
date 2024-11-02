// 数据抽取任务列表api
import request from "@/utils/request";

const MISSION_LIST_BASE_URL = "/api/v1/missionList";

class MissionListAPI {
  // 任务列表查询
  static missionListContentQuery(queryMissionListParams: MissionListPageQuery) {
    return request<any, PageResults<MissionListContent[]>>({
      url: `${MISSION_LIST_BASE_URL}/getMissionList/Page`,
      method: "get",
      params: queryMissionListParams,
    });
  }
  // 任务列表删除
  static missionListDelete(ids: string) {
    return request({
      url: `${MISSION_LIST_BASE_URL}/missionListDelete/${ids}`,
      method: "delete",
    });
  }
  // 任务查看内容获取
  static missionCheckContentQuery(ids: number) {
    return request({
      url: `${MISSION_LIST_BASE_URL}/missionCheckContentQuery/${ids}`,
      method: "get",
    });
  }
}

export default MissionListAPI;

// 任务表格内容
export interface MissionListContent {
  missionName?: string;
  creator?: string;
  createDate?: string;
  editDate?: string;
  lastExecuteDate?: string;
  descriptions?: string;
  status?: number;
}
// 任务列表分页查询
export interface MissionListPageQuery extends PageQuery {
  missionName?: string;
  creator?: string;
  executeDate?: string;
  missionStatus?: number;
}
