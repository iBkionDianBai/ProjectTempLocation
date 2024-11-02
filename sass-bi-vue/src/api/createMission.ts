// 创建数据抽取任务api
import request from "@/utils/request";

const DATA_EXTRACTION_MISSION_CREATE_BASE_URL = "/api/v1/missionCreate";

class MissionCreateAPI {
  // 多表聚合源数据库查询
  static mixFormDataBaseQuery() {
    return request({
      url: `${DATA_EXTRACTION_MISSION_CREATE_BASE_URL}/mixFormDataBaseQuery`,
      method: "get",
    });
  }
  // 多表聚合源表查询
  static mixFormSourceFormQuery() {
    return request({
      url: `${DATA_EXTRACTION_MISSION_CREATE_BASE_URL}/mixFormSourceFormQuery`,
      method: "get",
    });
  }
  // 多表聚合字段表查询
  static mixFormColumnTableQuery(queryListParams: NewColumnTableQuery) {
    return request({
      url: `${DATA_EXTRACTION_MISSION_CREATE_BASE_URL}/mixFormColumnTableQuery`,
      method: "get",
      params: queryListParams,
    });
  }
}

export default MissionCreateAPI;
// 多表聚合输入数据源表
export interface NewSourceForm {
  value?: number;
  label?: string;
}
// 多表聚合输入数据库
export interface NewSourceDataBase {
  value?: number;
  label?: string;
}
// 多表聚合输入字段表
export interface NewColumnTable {
  id?: number;
  name?: string;
  type?: string;
}
// 多表聚合输入字段表关键字查询
export interface NewColumnTableQuery {
  keywords?: string;
}
