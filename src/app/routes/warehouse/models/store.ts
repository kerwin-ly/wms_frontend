export interface IStoreItem {
  cost: number;
  num: number;
  goods_id: number;
  goods_name: string;
  price?: number;
  id?: number;
}

export interface IStoreInItem {
  in_num: number;
  in_type: number;
  price: number;
  in_code?: string;
  in_date?: string;
  goods_id: number;
  goods_name?: string;
  id?: number;
  exit_num?: number;
}

export interface IStoreOutBatchItem {
  out_num: number;
  in_type: number;
  price: number;
  in_code?: string;
  in_date?: string;
  goods_id: number;
  goods_name?: string;
  id?: number;
}

export enum EStoreIn {
  Purchase,
  Gift,
  Surplus
}

export interface IStoreOutItem {
  goods_id: number;
  goods_name?: string;
  out_num: number;
  out_date: string;
  out_code: string;
  id?: number;
}

export enum EOperation {
  Purchase,
  Gift,
  Surplus,
  Out
}

export const MOperation = {
  0: '采购入库',
  1: '赠送入库',
  2: '盘盈入库',
  3: '出库'
};
