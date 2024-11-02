import request from "@/utils/request";

const datbase_DATA_BASE_URL = "/api/v1/database";

class databaseAPI {
  //选项获取
  static getdatabaseInfo(databaseDataId: number) {
    return request({
      url: `${datbase_DATA_BASE_URL}/${databaseDataId}/databaseInfo`,
      method: "get",
    });
  }
  // 获取数据表基本列表信息
  static getdatabaseList(queryParams: databasePageQuery) {
    return request<any, PageResult<basicList[]>>({
      url: `${datbase_DATA_BASE_URL}/basicList/page`,
      method: "get",
      params: queryParams,
    });
  }
  //新建表选项
  static getnewdataList(connectionId: number) {
    return request({
      url: `${datbase_DATA_BASE_URL}/${connectionId}/newtable`,
      method: "get",
    });
  }
  //获取详细页面数据信息
  static getdetailInfo(id: number) {
    return request({
      url: `${datbase_DATA_BASE_URL}/table/${id}/info`,
      method: "get",
    });
  }
  //新建表提交
  static addnewdata(data: newdataBaseInfo) {
    return request({
      url: `${datbase_DATA_BASE_URL}/basicTable`,
      method: "post",
      data: data,
    });
  }
  //字段信息列表
  static getfieldInfoList(queryfieldparams: fieldPageQuery) {
    return request<any, PageResult<fieldinfo[]>>({
      url: `${datbase_DATA_BASE_URL}/fieldInfo/page`,
      method: "get",
      params: queryfieldparams, //关键要不要query
    });
  }
  //增量趋势图
  static getincreasedata(id: number) {
    return request<any, PageResult<increasement[]>>({
      url: `${datbase_DATA_BASE_URL}/increasementInfo/${id}/page`,
      method: "get",
    });
  }
}

export default databaseAPI;

// 基本数据列表
export interface basicList {
  // 名称
  basicListName?: string;
  //描述
  descriptions?: string;
  // 表类型
  dataType?: string;
  // 审核状态
  auditStatus?: number;
  // 数仓分层
  layering?: string;
  //所属部门
  department?: string;
  //数据连接
  dataConnection?: string;
  //创建时间
  dataCreateTime?: string;
  //更新时间
  dataUpdateTime?: string;
  //标签
  dataLabel?: string;
}
// 数据详细页面信息
export interface detailInfo {
  //名称
  tableName?: string;
  //资源类型
  tableType?: string;
  //数仓分层
  hierarchy?: string;
  //所属部门
  department?: string;
  //数据连接
  dataConnection?: string;
  //创建时间
  createTime?: string;
  //更新时间
  updateTime?: string;
  //标签
  label?: string;
  //审核状态
  auditStatus?: string;
  //描述
  description?: string;
  //表更新方式
  updateWay?: string;
  //更新周期
  updateCycle?: string;
  //数据量
  amount?: string;
  //数据增量
  totalSize?: string;
}

//新建表基本信息
export interface newdataBaseInfo {
  //名称
  tableName?: string;
  //生命周期
  lifeCycle?: string;
  //描述
  description?: string;
  //业务系统
  system?: string;
  //部门
  department?: string;
  //数仓数据源
  datasource?: string;
  //数仓层域
  hierarchy?: string;
  auditStatus?: string;
  dataConnection?: string;
  compressedFormat?: string;
  storageFormat?: string;
  label?: string;
  tableType?: string;
  creator?: string;
  ColumnTableReqs?: newDataListColumn[];
  ColumnTableReqs2?: newDataListColumn[];
}

//添加列信息
export interface newDataListColumn {
  columnName?: string;
  type?: string;
  length?: string;
  precision?: string;
  ifCanBeNull?: string;
  ifIsKey?: string;
  description?: string;
  ifIsPartitionKey?: string;
  remark?: string;
}
//详细字段分页
export interface fieldPageQuery extends PageQuery {
  tableId?: string;
  keywords?: string;
}
//详细操作字段信息
export interface fieldinfo {
  id?: number;
  columnName?: string;
  type?: string;
  description?: string;
  precision?: string;
  length?: string;
  ifCanBeNull?: string;
  ifIsKey?: string;
  ifIsPartitionKey?: string;
  remark?: string;
}
//数仓分页查询
export interface databasePageQuery extends PageQuery {
  keywords?: string;
  connection?: string;
  //数仓分层
  hierarchy?: string;
  //部门
  department?: string;
  //创始人
  creator?: string;
  //创立时间
  createTimeStart?: string;
  createTimeEnd?: string;
  //更新时间
  updateTimeStart?: string;
  updateTimeEnd?: string;
  //压缩格式
  compressedFormat?: string;
  //表类型
  tableType?: string;
  //存储格式
  storageFormat?: string;
}
export interface increasement {
  date?: string;
  increment?: number;
  total?: number;
}
