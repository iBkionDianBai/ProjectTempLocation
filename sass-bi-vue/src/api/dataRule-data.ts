import request from "@/utils/request";

const DATA_RULE_BASE_URL = "/api/v1/dataRule";

class DataRuleAPI {
  // 获取元数据基本信息
  static getBasicInfo(basicInfoId: number) {
    return request({
      url: `${DATA_RULE_BASE_URL}/${basicInfoId}/basicInfo`,
      method: "get",
    });
  }

}

export default DataRuleAPI;

// 元数据基本信息
export interface getBasicInfo {
  name?: string;
  createDate?: string;
  description?: string;
}
