/* tslint:disable */
export interface ApiGoodsIdPutParams {
  name: string;

  /**
   * 分类id
   */
  type_id: number;
}
export interface ApiGoodsTypeIdPutParams {
  name: string;
}
export interface ResGetApiGoodsList {
  items: Array<{id: number, name: string, type_name: string, type_id: number}>;
  total: number;
}
export interface ResGetApiGoodsTypeList {
  items: Array<{id: number, name: string}>;
  total: number;
}
export interface ApiGoodsPostParams {

  /**
   * 商品名称
   */
  name: string;

  /**
   * 商品分类id
   */
  type_id: number;
}
export interface ApiGoodsTypePostParams {

  /**
   * 商品名称
   */
  name: string;
}
