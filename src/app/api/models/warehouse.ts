/* tslint:disable */
export interface ResGetApiWarehouseInList {
  items: Array<{name: string, price: number, num: number, in_type: 0 | 1 | 2, in_code: string, in_date: string, id: number}>;
  total: string;
}
export interface WarehouseInPostParams {
  fields?: Array<{id: number, price: number, num: number, in_type: number}>;
}
export interface WarehouseOutPostParams {

  /**
   * 类目id
   */
  goods_id: number;

  /**
   * 出库数量
   */
  num: string;
}
export interface ResGetWarehouseOutList {
  items: Array<{goods_id: number, goods_name: string, out_num: string, out_code: string, out_date: string}>;
  total: string;
}
export interface ResGetWarehouseList {
  items: Array<{goods_id: number, goods_name: string, cost: string}>;
  total: number;
}
export interface ResGetWarehouseBatch {
  items: Array<{price: number, in_num: number, in_type: number, in_code: string, in_date: string}>;
}
export interface ResGetWarehouseHistory {
  items: Array<{goods_id: number, goods_name: string, operation: number, date: string}>;
  total: number;
}
