/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICommonResponse } from '../strict-http-response';
import { ApiBaseService } from '../base-service';

import { ResGetApiGoodsList, ApiGoodsPostParams, GoodsIdPutParams } from '../models/goods';
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
  deleteGoods(id: string): Observable<ICommonResponse<null>> {
    return this.http.delete<ICommonResponse<null>>(`goods`, { params: { id } })
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
   * @return successful operation
   */
  getApiGoodsList(params: GoodsService.GetApiGoodsListParams): Observable<ICommonResponse<ResGetApiGoodsList>> {
    return this.http.get<ICommonResponse<ResGetApiGoodsList>>(`api/goods/list`, { params: this.getHttpParams(params) })
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
   * 编辑商品
   * @param params The `GoodsService.PutGoodsIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `params`:
   *
   * @return successful operation
   */
  putGoodsId(params: GoodsService.PutGoodsIdParams): Observable<ICommonResponse<null>> {
    return this.http.put<ICommonResponse<null>>(`goods/${params.id}`, params.params)
  }
}

export module GoodsService {

  /**
   * Parameters for getApiGoodsList
   */
  export interface GetApiGoodsListParams {
    word: string;
    page_size: string;
    page_index: string;
  }

  /**
   * Parameters for putGoodsId
   */
  export interface PutGoodsIdParams {
    id: string;
    params?: GoodsIdPutParams;
  }
}
