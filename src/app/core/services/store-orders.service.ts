import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DataResponse } from '../models/data-reponse.service';
import { StoreOrder } from '../models/db.model';

@Injectable({
  providedIn: 'root'
})
export class StoreOrdersService extends ApiService{

  constructor(protected override http: HttpClient) {
    super(http);
   }
   
   getListOrder(): Observable<DataResponse> {
     let url = `/api/StoreOrder`;
      return super.get(url).pipe(
           map((res) => {
             const dataRes: DataResponse = this.jsonConvert.deserializeObject(
               res,
               DataResponse
             );
             let value: Array<StoreOrder> = this.jsonConvert.deserializeArray(
               dataRes.data,
               StoreOrder
             );
             dataRes.data = value;
             return dataRes;
           })
         );
     }
     OrderDetails(id : any): Observable<DataResponse> {
         const url = `/api/StoreOrder/${id}`;
      return super.get(url).pipe(
           map((res) => {
             const odataRes: DataResponse = this.jsonConvert.deserializeObject(res, DataResponse);
     
             if (Array.isArray(odataRes.data)) {
               odataRes.data = this.jsonConvert.deserializeArray(odataRes.data, StoreOrder);
             } else if (odataRes.data) {
               console.warn("odataRes.data không phải là mảng. Đang chuyển về dạng object của Staff.");
               odataRes.data = this.jsonConvert.deserializeObject(odataRes.data, StoreOrder);
             } else {
               console.warn("odataRes.data không có dữ liệu.");
             }
             return odataRes;
           })
         );
       }
        approvalGame(formData : any): Observable<any> {
    let url = `/api/admin/approval/game/${formData.id}`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
}
