/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICommonResponse } from '../strict-http-response';
import { ApiBaseService } from '../base-service';

import { ApiGoodsIdPutParams, ApiGoodsTypeIdPutParams, ResGetApiGoodsList, ResGetApiGoodsTypeList, ApiGoodsPostParams, ApiGoodsTypePostParams } from '../models/goods';
@Injectable({
  providedIn: 'root',
})
export class GoodsService extends ApiBaseService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  /**
   * 删除商品
   * @param id
   * @return successful operation
   */
  deleteApiGoodsId(id: string): Observable<ICommonResponse<null>> {
    return this.http.delete<ICommonResponse<null>>(`api/goods/${id}`)
  }

  /**
   * 编辑商品
   * @param params The `GoodsService.PutApiGoodsIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `params`:
   *
   * @return successful operation
   */
  putApiGoodsId(params: GoodsService.PutApiGoodsIdParams): Observable<ICommonResponse<null>> {
    return this.http.put<ICommonResponse<null>>(`api/goods/${params.id}`, params.params)
  }

  /**
   * 删除商品类别
   * @param id
   * @return successful operation
   */
  deleteApiGoodsTypeId(id: string): Observable<ICommonResponse<null>> {
    return this.http.delete<ICommonResponse<null>>(`api/goods/type/${id}`)
  }

  /**
   * 编辑商品类别
   * @param params The `GoodsService.PutApiGoodsTypeIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `params`:
   *
   * @return successful operation
   */
  putApiGoodsTypeId(params: GoodsService.PutApiGoodsTypeIdParams): Observable<ICommonResponse<null>> {
    return this.http.put<ICommonResponse<null>>(`api/goods/type/${params.id}`, params.params)
  }

  /**
   * 商品列表
   * @param params The `GoodsService.GetApiGoodsListParams` containing the following parameters:
   *
   * - `word`:
   *
   * - `page_size`:
   *
   * - `page_index`:
   *
   * - `type_id`: 商品类别id
   *
   * @return successful operation
   */
  getApiGoodsList(params: GoodsService.GetApiGoodsListParams): Observable<ICommonResponse<ResGetApiGoodsList>> {
    return this.http.get<ICommonResponse<ResGetApiGoodsList>>(`api/goods/list`, { params: this.getHttpParams(params) })
  }

  /**
   * 商品类别列表
   * @param params The `GoodsService.GetApiGoodsTypeListParams` containing the following parameters:
   *
   * - `word`:
   *
   * - `page_size`:
   *
   * - `page_index`:
   *
   * @return successful operation
   */
  getApiGoodsTypeList(params: GoodsService.GetApiGoodsTypeListParams): Observable<ICommonResponse<ResGetApiGoodsTypeList>> {
    return this.http.get<ICommonResponse<ResGetApiGoodsTypeList>>(`api/goods/type/list`, { params: this.getHttpParams(params) })
  }

  /**
   * 新增商品
   * @param params undefined
   * @return successful operation
   */
  postApiGoods(params?: ApiGoodsPostParams): Observable<ICommonResponse<null>> {
    return this.http.post<ICommonResponse<null>>(`api/goods`, params)
  }

  /**
   * 新增商品类别
   * @param params undefined
   * @return successful operation
   */
  postApiGoodsType(params?: ApiGoodsTypePostParams): Observable<ICommonResponse<null>> {
    return this.http.post<ICommonResponse<null>>(`api/goods/type`, params)
  }
}

export module GoodsService {

  /**
   * Parameters for putApiGoodsId
   */
  export interface PutApiGoodsIdParams {
    id: string;
    params?: ApiGoodsIdPutParams;
  }

  /**
   * Parameters for putApiGoodsTypeId
   */
  export interface PutApiGoodsTypeIdParams {
    id: string;
    params?: ApiGoodsTypeIdPutParams;
  }

  /**
   * Parameters for getApiGoodsList
   */
  export interface GetApiGoodsListParams {
    word: string;
    page_size: string;
    page_index: string;

    /**
     * 商品类别id
     */
    type_id?: string;
  }

  /**
   * Parameters for getApiGoodsTypeList
   */
  export interface GetApiGoodsTypeListParams {
    word: string;
    page_size: string;
    page_index: string;
  }
}
