// 数据源管理页面api
import request from "@/utils/request";

const DATA_SOURCE_BASE_URL = "/api/v1/dataSource";

class DataSourceAPI {
  // 表格数据查询
  static getListData(queryListDataParams: ListDataPageQuery) {
    return request<any, PageResult<ListDataPageVO[]>>({
      url: `${DATA_SOURCE_BASE_URL}/listData/page`,
      method: "get",
      params: queryListDataParams,
    });
  }
  // 添加数据源
  static addDataSource(data: DataSourceForm) {
    return request({
      url: `${DATA_SOURCE_BASE_URL}/addDataSource/dataSource`,
      method: "post",
      data: data,
    });
  }
  // 获取添加数据源类型选项
  static getDataSourceType() {
    return request({
      url: `${DATA_SOURCE_BASE_URL}/getDataSourceType`,
      method: "get",
    });
  }
  static deleteDataList(ids: string) {
    return request({
      url: `${DATA_SOURCE_BASE_URL}/deleteDataList/${ids}`,
      method: "delete",
    });
  }
  static testDataSource(id: number) {
    return request({
      url: `${DATA_SOURCE_BASE_URL}/testDataSource/${id}`,
      method: "get",
    });
  }
}

export default DataSourceAPI;

// 数据源表格分页查询
export interface ListDataPageQuery extends PageQuery {
  keywords?: string;
}
// 规范数据源列表分页对象
export interface ListDataPageVO {
  // 数据连接名称
  dataConnectionName: string;
  // 创建者
  creator?: string;
  // 数据源类型
  dataSourceType?: string;
  // 服务地址
  address?: string;
  // 端口
  port?: string;
  // 数据库
  dataBase?: string;
  // 数据源用户名
  dataSourceUserName?: string;
  // 创建时间
  createDate?: string;
  // 描述信息
  description?: string;
}

// 数据源添加表单
export interface DataSourceForm {
  // 数据源连接类型
  dataSourceType?: string;
  // 连接名
  connectionName?: string;
  // 描述
  descriptions?: string;
  // 连接地址
  address?: string;
  // 端口
  port?: string;
  // 数据库名称
  dataBase?: string;
  // 用户名
  userName?: string;
  // 密码
  password?: string;
}
// 新建数据源类型列表
export interface NewDataSourceType {
  value?: string;
  label?: string;
}
