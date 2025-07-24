import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DataResponse } from '../models/data-reponse.service';
import { JsonConvert } from 'json2typescript';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends ApiService{
  constructor(protected override http : HttpClient) {
    super(http);
     const jsonConvert = new JsonConvert();
   
  }
          paymentCreate(formData : any): Observable<any> {
    let url = `/api/payment/create`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
       paymentMomo(formData : any): Observable<any> {
    let url = `/api/payment/momo-create`;
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
