/* tslint:disable */
export interface ResGetApiWarehouseInList {
  items: Array<{goods_name: string, id: number, price: number, in_num: number, in_type: 0 | 1 | 2, in_code: string, in_date: string, goods_id: number}>;
  total: number;
}
export interface ResGetApiWarehouseInDownload {
  url: string;
}
export interface ResGetApiWarehouseOutBatch {
  items: Array<{price: number, out_num: number, in_type: number, in_code: string, in_date: string}>;
  total: number;
}
export interface ApiWarehouseInPostParams {
  fields?: Array<{goods_id: number, price: number, in_num: number, in_type: number}>;
}
export interface ApiWarehouseOutPostParams {
  out_list: Array<{goods_id?: number, num?: number}>;
}
export interface ResGetApiWarehouseOutList {
  items: Array<{goods_id: number, goods_name: string, out_num: number, out_code: string, out_date: string, id: number, out_cost: number}>;
  total: number;
}
export interface ResGetApiWarehouseOutDownload {
  url: string;
}
export interface ResGetApiWarehouseList {
  items: Array<{goods_id: number, id: number, goods_name: string, cost: number, num: number}>;
  total: number;
}
export interface ResGetApiWarehouseBatch {
  items: Array<{price: number, exit_num: number, in_type: 0 | 1 | 2, in_code: string, in_date: string}>;
  total: number;
}
export interface ResGetApiWarehouseHistory {
  items: Array<{goods_id: number, goods_name: string, operation: 0 | 1 | 2 | 3, date: string, num: number}>;
  total: number;
}
export interface ResGetApiWarehouseHistoryDownload {
  url: string;
}
