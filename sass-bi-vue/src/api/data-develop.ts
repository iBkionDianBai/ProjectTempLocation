import request from "@/utils/request";

const Develop_DATA_BASE_URL = "/api/v1/datadevelop";

class developAPI {
  // static getcleanInfo(Id: number) {
  //   return request({
  //     url: `${data_develope__URL}/cleanRules/${Id}/Info`,
  //     method: "get",
  //   });
  // }
  static getnewtable(Id: number) {
    return request({
      url: `${Develop_DATA_BASE_URL}/${Id}/page`,
      method: "get",
    });
  }
  static submmitnewtable(data: newdataBaseInfo) {
    return request({
      url: `${Develop_DATA_BASE_URL}/add/newdatabaseinfo`,
      method: "post",
      data: data,
    });
  }
  //添加列
  static addnewcolumns(data: newDataListQuery[]) {
    return request({
      url: `${Develop_DATA_BASE_URL}/addcolumns/newDataListQuery`,
      method: "post",
      data: data,
    });
  }
  //清洗配置
  static cleanRules(data: cleanRulesList[]) {
    return request({
      url: `${Develop_DATA_BASE_URL}/add/cleanRules/page`,
      method: "post",
      data: data,
    });
  }
  static cleanrefpost(data: cleanRulesList) {
    return request({
      url: `${Develop_DATA_BASE_URL}/add/cleanQuery/page`,
      method: "post",
      data: data,
    });
  }
  static getcleanRulesList(id: number) {
    return request({
      url: `${Develop_DATA_BASE_URL}/cleanRulesList/${id}/page`,
      method: "get",
    });
  }
  static getmaskRulesList(maskid: number) {
    return request({
      url: `${Develop_DATA_BASE_URL}/maskRulesList/${maskid}/page`,
      method: "get",
    });
  }
  static maskRulesListpost(data: maskRulesList[]) {
    return request({
      url: `${Develop_DATA_BASE_URL}/add/maskRulesListRules/page`,
      method: "post",
      data: data,
    });
  }
  static maskrefpost(data: maskRulesList) {
    return request({
      url: `${Develop_DATA_BASE_URL}/maskRulesQuery/page`,
      method: "post",
      data: data,
    });
  }
  //standardRulesQuery
  static getstandardRulesList(id: number) {
    return request({
      url: `${Develop_DATA_BASE_URL}/standardRulesQuery/${id}/page`,
      method: "get",
    });
  }
  static standardRulesListpost(data: standardRulesList[]) {
    return request({
      url: `${Develop_DATA_BASE_URL}/add/standardRulesList/page`,
      method: "post",
      data: data,
    });
  }
  static standardrefpost(data: standardRulesList) {
    return request({
      url: `${Develop_DATA_BASE_URL}/standardRulesQuery/page`,
      method: "post",
      data: data,
    });
  }
  //错误表
  static getwronTableQuery(id: number) {
    return request({
      url: `${Develop_DATA_BASE_URL}/wronTableQueryList/${id}/page2`,
      method: "get",
    });
  }
  static wronTablepost(data: wronList) {
    return request({
      url: `${Develop_DATA_BASE_URL}/add/wronList/page`,
      method: "post",
      data: data,
    });
  }
  //目标表
  static gettargetTableQuery(Id: number) {
    return request({
      url: `${Develop_DATA_BASE_URL}/targetTableQueryList/${Id}/page`,
      method: "get",
    });
  }
  static targetTablepost(data: wronList) {
    return request({
      url: `${Develop_DATA_BASE_URL}/add/targetList/page`,
      method: "post",
      data: data,
    });
  }
}
export default developAPI;
export interface cleanRulesQuery {
  tableName?: string;
  //表名称
  tabledescription?: string;
}
export interface cleanRulesList {
  //运算因子
  operationalFactor: string;
  //数据任务名称选项
  taskName?: string;
  //原表配置描述
  //tableConfiguration?: string;
  //设置分区
  partitions1?: string;
  partitions2?: string;
  //列名
  name?: string;
  //空格移除
  spaceRemove?: boolean;
  //空值处理
  isEmpty?: boolean;
  //全半角转换
  fullhalf?: boolean;
  //大小写转换
  caseConversion?: boolean;
  //去除特定字符
  specificCharacters?: boolean;
  //字符串截取
  stringTruncation?: boolean;
  //正则校验
  regexCheck?: boolean;
  //长度校验与处理
  lengthCheck?: boolean;
  //数据类型校验
  dataTypeCheck?: boolean;
  //日期格式校验
  dateCheck?: boolean;
  //值域校验
  RangeCheck?: boolean;
  //命名的实体识别
  nameRecognition?: boolean;
  //引用标准规则
  standardRules?: boolean;
  //添加自定义规则
  customRules?: boolean;
}
export interface maskRulesQuery {
  tableName?: string;
  //表名称
  tabledescription?: string;
  operationalFactorOptions?: any[];
  taskNameOptions?: any[];
  partitionsOptions?: any[];
  nameOptions?: any[];
}
//脱敏
export interface maskRulesList {
  //运算因子
  operationalFactor: string;
  //任务名称选项
  taskName?: string;
  //原表配置描述
  //tableConfiguration?: string;
  //设置分区
  partitions1?: string;
  partitions2?: string;
  //列名
  name?: string;
  //无效化处理
  neutralization?: boolean;
  //随机值替换
  randomSitution?: boolean;
  //对称加密
  encryption?: boolean;
  //数据取整
  dataRouding?: boolean;
  //同分布随机值替换
  sameDistribution?: boolean;
  //引用标准规则
  standardrules?: boolean;
  //添加自定义规则
  customRules?: boolean;
}
export interface standardRulesQuery {
  tableName?: string;
  //表名称
  tabledescription?: string;
}

export interface standardRulesList {
  operationalFactor: string;
  //任务名称选项
  taskName?: string;
  //原表配置描述
  //tableConfiguration?: string;
  //设置分区
  partitions1?: string;
  partitions2?: string;
  //列名
  name?: string;
  //数据元
  dataElement?: string;
  //数据元类目
  category?: string;
  //数据元类别
  meteData?: string;
}
export interface wronTableListQuery {
  datasourceOptions?: any[];
  wronTableOptions?: any[];
  pationsOptions?: any[];
  operationalFactorOptions?: any[];
}
export interface wronList {
  datasource?: string;
  wrongTable?: string;
  rules?: string;
  pations?: string;
  operationalFactor?: string;
}
//目标表
export interface targetTableListQuery {
  datasourceOptions?: any[];
  TableOptions?: any[];
  pationsOptions?: any[];
  operationalFactorOptions?: any[];
}
export interface targetList {
  datasource?: string;
  wrongTable?: string;
  rules?: string;
  pations?: string;
  operationalFactor?: string;
  storageFormat?: string;
}
export interface newdataBaseInfo {
  //名称
  tableName?: string;
  //生命周期
  lifeCycle?: string;
  //描述
  description?: string;
  //业务系统
  sysetem?: string;
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
}

//新建列表信息
export interface newDataListQuery {
  name?: string;
  type?: number;
  length?: string;
  precision?: string;
  isnull?: number;
  key?: number;
  description?: string;
}
