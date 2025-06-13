import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { DataResponse } from '../models/data-reponse.service';
import { Cart } from '../models/db.model';

@Injectable({
  providedIn: 'root'
})
export class CartService extends ApiService{

  constructor(protected override http: HttpClient) { 
    super(http);
  }
   addToCart(formData : any): Observable<any> {
    let url = `/api/Cart`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
  getListCart(): Observable<DataResponse> {
    let url = `/api/Cart`;
    return super.get(url).pipe(
        map((res) => {
          const dataRes: DataResponse = this.jsonConvert.deserializeObject(
            res,
            DataResponse
          );
          let value: Array<Cart> = this.jsonConvert.deserializeArray(
            dataRes.data,
            Cart
          );
          dataRes.data = value;
          return dataRes;
        })
      );
  }
    DeleteCart(id: any): Observable<DataResponse> {
    let url = `/api/cart`;
    return super.deleteEntity(url,id).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
