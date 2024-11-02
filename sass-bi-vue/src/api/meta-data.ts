import request from "@/utils/request";

const META_DATA_BASE_URL = "/api/v1/metadata";

class MetaDataAPI {
  // 获取元数据基本信息
  static getMetaDataInfo(metaDataId: number) {
    return request({
      url: `${META_DATA_BASE_URL}/${metaDataId}/metaDataId`,
      method: "get",
    });
  }
  // 获取标准字典列表数据
  static getStandardDictionaryList(
    queryStandardDictionaryParams: StandardDictionaryPageQuery
  ) {
    return request<any, PageResult<StandardDictionaryPageVO[]>>({
      url: `${META_DATA_BASE_URL}/standardDictionaryList/page`,
      method: "get",
      params: queryStandardDictionaryParams,
    });
  }
  // 删除标准字典列表数据
  static deleteStandardDictionaryList(ids: string) {
    return request({
      url: `${META_DATA_BASE_URL}/standardDictionaryList/${ids}`,
      method: "delete",
    });
  }
  // 获取标准字典所属类别数据
  static getStandardDictionaryStatus(metaDataId: number) {
    return request({
      url: `${META_DATA_BASE_URL}/${metaDataId}/status`,
      method: "get",
    });
  }
  // 新增标准字典数据
  static addStandardDictionary(data: StandardDictionaryForm) {
    return request({
      url: `${META_DATA_BASE_URL}/add/standardDictionary`,
      method: "post",
      data: data,
    });
  }
  // 字典数据加载
  static getDictionaryDataInfo(dictionaryId: number) {
    return request({
      url: `${META_DATA_BASE_URL}/${dictionaryId}/dictionaryId`,
      method: "get",
    });
  }
  // 字典列表查询
  static getDictionaryList(queryDictionaryParams: DictionaryPageQuery) {
    return request<any, PageResult<DictionaryPageVO[]>>({
      url: `${META_DATA_BASE_URL}/dictionaryList/page`,
      method: "get",
      params: queryDictionaryParams,
    });
  }
  // 删除字典列表
  static deleteDictionaryList(ids: string) {
    return request({
      url: `${META_DATA_BASE_URL}/dictionaryList/${ids}`,
      method: "delete",
    });
  }
  // 新增字典列表
  static addDictionary(data: DictionaryForm) {
    return request({
      url: `${META_DATA_BASE_URL}/add/dictionary`,
      method: "post",
      data: data,
    });
  }
}

export default MetaDataAPI;

// 元数据基本信息
export interface MetaDataInfo {
  // 名称
  metaDataName?: string;
  // 创建时间
  createTime?: Date;
  // 描述
  descriptions?: string;
}

// 规范字典列表分页查询
export interface StandardDictionaryPageQuery extends PageQuery {
  keywords?: string;
}

// 规范字典列表分页对象
export interface StandardDictionaryPageVO {
  // 字典列表名称
  dictionaryListName?: string;
  // 描述
  descriptions?: string;
  // 数据标准记录数
  dataStandardsRecords?: number;
  // 审核状态
  auditStatus?: number;
  // 所属类目
  status?: string;
}

// 新建规范字典表单
export interface StandardDictionaryForm {
  // 字典列表名称
  dictionaryListName?: string;
  // 描述
  descriptions?: string;
  // 数据标准记录数
  dataStandardsRecords?: number;
  // 所属类目
  status?: string;
  // 审核状态
  auditStatus?: number;
  // 创建人
  createUser?: string;
}

// 字典表基础信息
export interface DictionaryBasicInfo {
  // 字典表名称
  dictionaryName?: string;
  // 创建时间
  createTime?: Date;
  // 创建人
  createUser?: string;
  // 描述
  descriptions?: string;
}

// 字典列表分页查询
export interface DictionaryPageQuery extends PageQuery {
  keywords?: string;
}

// 字典列表分页对象
export interface DictionaryPageVO {
  // 标准字典名
  dictionaryName?: string;
  // 标准字典值
  dictionaryValue?: string;
  // 替换值
  replaceValue?: string;
  // 描述
  descriptions?: string;
}

// 新建字典表单
export interface DictionaryForm {
  // 标准字典名
  dictionaryName?: string;
  // 标准字典值
  dictionaryValue?: string;
  // 替换值
  replaceValue?: string;
  // 描述
  descriptions?: string;
}
