import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DataResponse } from '../models/data-reponse.service';
import { MyWallet, StoreRefundRequest } from '../models/db.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService extends ApiService {

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
   }

    storerefundRequest(formData : any): Observable<any> {
       let url = `/api/storerefundRequest`;
       return super.postEntity(url, formData).pipe(
         map((res) => {
           if (res === undefined) {
             throw new Error('Invalid response from server');
           }
           return res;
         })
       );
     }
       createRequest(formData : any): Observable<any> {
       let url = `/api/wallet/transactions`;
       return super.postEntity(url, formData).pipe(
         map((res) => {
           if (res === undefined) {
             throw new Error('Invalid response from server');
           }
           return res;
         })
       );
     }
         approve(formData : any): Observable<any> {
       let url = `/api/wallet/transactions/approve`;
       return super.postEntity(url, formData).pipe(
         map((res) => {
           if (res === undefined) {
             throw new Error('Invalid response from server');
           }
           return res;
         })
       );
     }
         paymentWallet(formData : any): Observable<any> {
       let url = `/api/wallet/wallet-pay`;
       return super.postEntity(url, formData).pipe(
         map((res) => {
           if (res === undefined) {
             throw new Error('Invalid response from server');
           }
           return res;
         })
       );
     }
             approveRefund(formData : any): Observable<any> {
       let url = `/api/wallet/wallet-pay`;
       return super.postEntity(url, formData).pipe(
         map((res) => {
           if (res === undefined) {
             throw new Error('Invalid response from server');
           }
           return res;
         })
       );
     }
walletTransaction(): Observable<DataResponse> {
       let url = `/api/wallet/transactions/my`;
       return super.get(url).pipe(
              map((res) => {
                const dataRes: DataResponse = this.jsonConvert.deserializeObject(
                  res,
                  DataResponse
                );
                let value: Array<MyWallet> = this.jsonConvert.deserializeArray(
                  dataRes.data,
                  MyWallet
                );
                dataRes.data = value;
                return dataRes;
              })
            );
     }
     walletTransactionAdmin(): Observable<DataResponse> {
       let url = `/api/wallet/transactions/pending?page=1&size=200`;
       return super.get(url).pipe(
              map((res) => {
                const dataRes: DataResponse = this.jsonConvert.deserializeObject(
                  res,
                  DataResponse
                );
                let value: Array<MyWallet> = this.jsonConvert.deserializeArray(
                  dataRes.data.items,
                  MyWallet
                );
                dataRes.data.items = value;
                return dataRes;
              })
            );
     }
            approvalRefund(formData : any,id:any): Observable<any> {
    let url = `/api/admin/approval/refund/${id}`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
          StoreRefundRequest(): Observable<DataResponse> {
       let url = `/api/StoreRefundRequest`;
        return super.get(url).pipe(
                  map((res) => {
                    const dataRes: DataResponse = this.jsonConvert.deserializeObject(
                      res,
                      DataResponse
                    );
                    let value: Array<StoreRefundRequest> = this.jsonConvert.deserializeArray(
                      dataRes.data,
                      StoreRefundRequest
                    );
                    dataRes.data = value;
                    return dataRes;
                  })
                );
     }
}
