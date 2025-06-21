import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { DataResponse } from '../models/data-reponse.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Category } from '../models/db.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService{
  constructor(protected override http : HttpClient) {
    super(http);
     const jsonConvert = new JsonConvert();
   
  }

getListCategory(): Observable<DataResponse> {
  let url = `/admin/SystemCategory`;
  return super.get(url).pipe(
      map((res) => {
        const dataRes: DataResponse = this.jsonConvert.deserializeObject(
          res,
          DataResponse
        );
        let value: Array<Category> = this.jsonConvert.deserializeArray(
          dataRes.data,
          Category
        );
        dataRes.data = value;
        return dataRes;
      })
    );
}
 addCategory(formData : any): Observable<any> {
    let url = `/admin/SystemCategory`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
  GetCategoryId(id : any): Observable<DataResponse> {
      const url = `/admin/SystemCategory/id/${id}`;
   return super.get(url).pipe(
        map((res) => {
          const odataRes: DataResponse = this.jsonConvert.deserializeObject(res, DataResponse);
  
          if (Array.isArray(odataRes.data)) {
            odataRes.data = this.jsonConvert.deserializeArray(odataRes.data, Category);
          } else if (odataRes.data) {
            console.warn("odataRes.data không phải là mảng. Đang chuyển về dạng object của Staff.");
            odataRes.data = this.jsonConvert.deserializeObject(odataRes.data, Category);
          } else {
            console.warn("odataRes.data không có dữ liệu.");
          }
          return odataRes;
        })
      );
    }
      updateCategory(formData: any,id : number): Observable<DataResponse> {
    let url = `/admin/SystemCategory`;
    return super.putEntity(url,id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
}
 DeleteCategory(id: any): Observable<DataResponse> {
    let url = `/admin/SystemCategory`;
    return super.deleteEntity(url,id).pipe(
      map((res) => {
        return res;
      })
    );
  }
}