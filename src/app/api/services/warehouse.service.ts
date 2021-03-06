/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICommonResponse } from '../strict-http-response';
import { ApiBaseService } from '../base-service';

import { ResGetApiWarehouseInList, ResGetApiWarehouseInDownload, ResGetApiWarehouseOutBatch, ApiWarehouseInPostParams, ApiWarehouseOutPostParams, ResGetApiWarehouseOutList, ResGetApiWarehouseOutDownload, ResGetApiWarehouseList, ResGetApiWarehouseBatch, ResGetApiWarehouseHistory, ResGetApiWarehouseHistoryDownload } from '../models/warehouse';
@Injectable({
  providedIn: 'root',
})
export class WarehouseService extends ApiBaseService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  /**
   * 入库列表
   * @param params The `WarehouseService.GetApiWarehouseInListParams` containing the following parameters:
   *
   * - `word`: 商品名
   *
   * - `type_id`: 商品分类
   *
   * - `start_date`: 开始时间
   *
   * - `page_size`: 每页行数
   *
   * - `page_index`: 第几页
   *
   * - `in_type`: 入库类型。0:采购入库，1:盘盈入库，2:赠送入库
   *
   * - `end_date`: 结束时间
   *
   * @return successful operation
   */
  getApiWarehouseInList(params: WarehouseService.GetApiWarehouseInListParams): Observable<ICommonResponse<ResGetApiWarehouseInList>> {
    return this.http.get<ICommonResponse<ResGetApiWarehouseInList>>(`api/warehouse/in/list`, { params: this.getHttpParams(params) })
  }

  /**
   * 入库列表下载excel文件
   * @param params The `WarehouseService.GetApiWarehouseInDownloadParams` containing the following parameters:
   *
   * - `word`:
   *
   * - `start_date`:
   *
   * - `page_size`:
   *
   * - `page_index`:
   *
   * - `in_type`:
   *
   * - `end_date`:
   *
   * - `type_id`:
   *
   * @return successful operation
   */
  getApiWarehouseInDownload(params: WarehouseService.GetApiWarehouseInDownloadParams): Observable<ICommonResponse<ResGetApiWarehouseInDownload>> {
    return this.http.get<ICommonResponse<ResGetApiWarehouseInDownload>>(`api/warehouse/in/download`, { params: this.getHttpParams(params) })
  }

  /**
   * 删除入库信息
   * @param id
   * @return successful operation
   */
  deleteApiWarehouseInId(id: string): Observable<ICommonResponse<null>> {
    return this.http.delete<ICommonResponse<null>>(`api/warehouse/in/${id}`)
  }

  /**
   * 删除出库信息
   * @param params The `WarehouseService.DeleteApiWarehouseOutIdParams` containing the following parameters:
   *
   * - `word`: 类目名称
   *
   * - `start_date`:
   *
   * - `page_size`:
   *
   * - `page_index`:
   *
   * - `id`:
   *
   * - `end_date`:
   *
   * @return successful operation
   */
  deleteApiWarehouseOutId(params: WarehouseService.DeleteApiWarehouseOutIdParams): Observable<ICommonResponse<null>> {
    return this.http.delete<ICommonResponse<null>>(`api/warehouse/out/${params.id}`, { params: this.getHttpParams(params) })
  }

  /**
   * 出库批次详情
   * @param params The `WarehouseService.GetApiWarehouseOutBatchParams` containing the following parameters:
   *
   * - `page_size`:
   *
   * - `page_index`:
   *
   * - `out_code`: 出库单号
   *
   * - `goods_id`: 类目id
   *
   * @return successful operation
   */
  getApiWarehouseOutBatch(params: WarehouseService.GetApiWarehouseOutBatchParams): Observable<ICommonResponse<ResGetApiWarehouseOutBatch>> {
    return this.http.get<ICommonResponse<ResGetApiWarehouseOutBatch>>(`api/warehouse/out/batch`, { params: this.getHttpParams(params) })
  }

  /**
   * 入库
   * @param params undefined
   * @return successful operation
   */
  postApiWarehouseIn(params?: ApiWarehouseInPostParams): Observable<ICommonResponse<null>> {
    return this.http.post<ICommonResponse<null>>(`api/warehouse/in`, params)
  }

  /**
   * 出库
   * @param params undefined
   * @return successful operation
   */
  postApiWarehouseOut(params?: ApiWarehouseOutPostParams): Observable<ICommonResponse<null>> {
    return this.http.post<ICommonResponse<null>>(`api/warehouse/out`, params)
  }

  /**
   * 出库列表
   * @param params The `WarehouseService.GetApiWarehouseOutListParams` containing the following parameters:
   *
   * - `word`: 类目名称
   *
   * - `type_id`: 分类id
   *
   * - `start_date`:
   *
   * - `page_size`:
   *
   * - `page_index`:
   *
   * - `end_date`:
   *
   * @return successful operation
   */
  getApiWarehouseOutList(params: WarehouseService.GetApiWarehouseOutListParams): Observable<ICommonResponse<ResGetApiWarehouseOutList>> {
    return this.http.get<ICommonResponse<ResGetApiWarehouseOutList>>(`api/warehouse/out/list`, { params: this.getHttpParams(params) })
  }

  /**
   * 出库列表下载excel文件
   * @param params The `WarehouseService.GetApiWarehouseOutDownloadParams` containing the following parameters:
   *
   * - `word`:
   *
   * - `start_date`:
   *
   * - `page_size`:
   *
   * - `page_index`:
   *
   * - `end_date`:
   *
   * - `type_id`: 商品分类id
   *
   * @return successful operation
   */
  getApiWarehouseOutDownload(params: WarehouseService.GetApiWarehouseOutDownloadParams): Observable<ICommonResponse<ResGetApiWarehouseOutDownload>> {
    return this.http.get<ICommonResponse<ResGetApiWarehouseOutDownload>>(`api/warehouse/out/download`, { params: this.getHttpParams(params) })
  }

  /**
   * 库存表
   * @param params The `WarehouseService.GetApiWarehouseListParams` containing the following parameters:
   *
   * - `word`: 类目名
   *
   * - `type_id`: 分类id
   *
   * - `page_size`:
   *
   * - `page_index`:
   *
   * @return successful operation
   */
  getApiWarehouseList(params: WarehouseService.GetApiWarehouseListParams): Observable<ICommonResponse<ResGetApiWarehouseList>> {
    return this.http.get<ICommonResponse<ResGetApiWarehouseList>>(`api/warehouse/list`, { params: this.getHttpParams(params) })
  }

  /**
   * 库存剩余批次详情
   * @param params The `WarehouseService.GetApiWarehouseBatchParams` containing the following parameters:
   *
   * - `page_size`:
   *
   * - `page_index`:
   *
   * - `goods_id`: 类目id
   *
   * @return successful operation
   */
  getApiWarehouseBatch(params: WarehouseService.GetApiWarehouseBatchParams): Observable<ICommonResponse<ResGetApiWarehouseBatch>> {
    return this.http.get<ICommonResponse<ResGetApiWarehouseBatch>>(`api/warehouse/batch`, { params: this.getHttpParams(params) })
  }

  /**
   * 明细表
   * @param params The `WarehouseService.GetApiWarehouseHistoryParams` containing the following parameters:
   *
   * - `word`: 类目名称
   *
   * - `type_id`: 分类id
   *
   * - `type`: 操作类型，0:采购入库，1:赠送入库，2:盘盈入库，3:出库
   *
   * - `start_date`:
   *
   * - `page_size`:
   *
   * - `page_index`:
   *
   * - `end_date`:
   *
   * @return successful operation
   */
  getApiWarehouseHistory(params: WarehouseService.GetApiWarehouseHistoryParams): Observable<ICommonResponse<ResGetApiWarehouseHistory>> {
    return this.http.get<ICommonResponse<ResGetApiWarehouseHistory>>(`api/warehouse/history`, { params: this.getHttpParams(params) })
  }

  /**
   * 明细列表下载excel文件
   * @param params The `WarehouseService.GetApiWarehouseHistoryDownloadParams` containing the following parameters:
   *
   * - `word`:
   *
   * - `type`:
   *
   * - `start_date`:
   *
   * - `page_size`:
   *
   * - `page_index`:
   *
   * - `end_date`:
   *
   * - `type_id`:
   *
   * @return successful operation
   */
  getApiWarehouseHistoryDownload(params: WarehouseService.GetApiWarehouseHistoryDownloadParams): Observable<ICommonResponse<ResGetApiWarehouseHistoryDownload>> {
    return this.http.get<ICommonResponse<ResGetApiWarehouseHistoryDownload>>(`api/warehouse/history/download`, { params: this.getHttpParams(params) })
  }
}

export module WarehouseService {

  /**
   * Parameters for getApiWarehouseInList
   */
  export interface GetApiWarehouseInListParams {

    /**
     * 商品名
     */
    word: string;

    /**
     * 商品分类
     */
    type_id: string;

    /**
     * 开始时间
     */
    start_date: string;

    /**
     * 每页行数
     */
    page_size: string;

    /**
     * 第几页
     */
    page_index: string;

    /**
     * 入库类型。0:采购入库，1:盘盈入库，2:赠送入库
     */
    in_type: string;

    /**
     * 结束时间
     */
    end_date: string;
  }

  /**
   * Parameters for getApiWarehouseInDownload
   */
  export interface GetApiWarehouseInDownloadParams {
    word: string;
    start_date: string;
    page_size: string;
    page_index: string;
    in_type: string;
    end_date: string;
    type_id?: string;
  }

  /**
   * Parameters for deleteApiWarehouseOutId
   */
  export interface DeleteApiWarehouseOutIdParams {

    /**
     * 类目名称
     */
    word: string;
    start_date: string;
    page_size: string;
    page_index: string;
    id: string;
    end_date: string;
  }

  /**
   * Parameters for getApiWarehouseOutBatch
   */
  export interface GetApiWarehouseOutBatchParams {
    page_size: string;
    page_index: string;

    /**
     * 出库单号
     */
    out_code: string;

    /**
     * 类目id
     */
    goods_id: string;
  }

  /**
   * Parameters for getApiWarehouseOutList
   */
  export interface GetApiWarehouseOutListParams {

    /**
     * 类目名称
     */
    word: string;

    /**
     * 分类id
     */
    type_id: string;
    start_date: string;
    page_size: string;
    page_index: string;
    end_date: string;
  }

  /**
   * Parameters for getApiWarehouseOutDownload
   */
  export interface GetApiWarehouseOutDownloadParams {
    word: string;
    start_date: string;
    page_size: string;
    page_index: string;
    end_date: string;

    /**
     * 商品分类id
     */
    type_id?: string;
  }

  /**
   * Parameters for getApiWarehouseList
   */
  export interface GetApiWarehouseListParams {

    /**
     * 类目名
     */
    word: string;

    /**
     * 分类id
     */
    type_id: string;
    page_size: string;
    page_index: string;
  }

  /**
   * Parameters for getApiWarehouseBatch
   */
  export interface GetApiWarehouseBatchParams {
    page_size: string;
    page_index: string;

    /**
     * 类目id
     */
    goods_id: string;
  }

  /**
   * Parameters for getApiWarehouseHistory
   */
  export interface GetApiWarehouseHistoryParams {

    /**
     * 类目名称
     */
    word: string;

    /**
     * 分类id
     */
    type_id: string;

    /**
     * 操作类型，0:采购入库，1:赠送入库，2:盘盈入库，3:出库
     */
    type: string;
    start_date: string;
    page_size: string;
    page_index: string;
    end_date: string;
  }

  /**
   * Parameters for getApiWarehouseHistoryDownload
   */
  export interface GetApiWarehouseHistoryDownloadParams {
    word: string;
    type: string;
    start_date: string;
    page_size: string;
    page_index: string;
    end_date: string;
    type_id?: string;
  }
}
