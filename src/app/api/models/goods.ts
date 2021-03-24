/* tslint:disable */
export interface ApiGoodsIdPutParams {
  name: string;
}
export interface ResGetApiGoodsList {
  items: Array<{id: number, name: string}>;
  total: number;
}
export interface ApiGoodsPostParams {

  /**
   * 商品名称
   */
  name: string;
}
