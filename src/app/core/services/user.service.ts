import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Any, JsonConvert } from 'json2typescript';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User, Wallet } from '../models/db.model'; 
import { DataResponse } from '../models/data-reponse.service';


@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService{
  constructor(protected override http : HttpClient) {
    super(http);
     const jsonConvert = new JsonConvert();
   
  }

getListUser(): Observable<DataResponse> {
  let url = `/admin/User`;
  return super.get(url).pipe(
         map((res) => {
           const dataRes: DataResponse = this.jsonConvert.deserializeObject(
             res,
             DataResponse
           );
           let value: Array<User> = this.jsonConvert.deserializeArray(
             dataRes.data,
             User
           );
           dataRes.data = value;
           return dataRes;
         })
       );
}

  createUser(formData: any): Observable<DataResponse> {
    let url = `/admin/User/`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        return res;
      })
    );
  }
    changepass(formData: any): Observable<DataResponse> {
    let url = `/api/profile/change-password`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        return res;
      })
    );
  }
    UpdateUser(formData: any,id: string): Observable<DataResponse> {
    let url = `/admin/User`;
    return super.putEntity(url,id,formData).pipe(
      map((res) => {
        return res;
      })
    );
  }
     updateProfile(formData: any,id: number ): Observable<DataResponse> {
    let url = `/admin/user/update/${id}`;
    return super.putEntityCustom(url,formData).pipe(
      map((res) => {
        return res;
      })
    );
  }
      updateDisplayname(displayname: any,id: number ): Observable<DataResponse> {
    let url = `/admin/User/update/displayname/${id}?displayName=${displayname}`;
    return super.putEntityCustom(url).pipe(
      map((res) => {
        return res;
      })
    );
  }
getUserById(id: any): Observable<DataResponse> {
  const url = `/admin/User/id/${id}`;
 return super.get(url).pipe(
        map((res) => {
          const odataRes: DataResponse = this.jsonConvert.deserializeObject(res, DataResponse);
  
          if (Array.isArray(odataRes.data)) {
            odataRes.data = this.jsonConvert.deserializeArray(odataRes.data, User);
          } else if (odataRes.data) {
            console.warn("odataRes.data không phải là mảng. Đang chuyển về dạng object của Staff.");
            odataRes.data = this.jsonConvert.deserializeObject(odataRes.data, User);
          } else {
            console.warn("odataRes.data không có dữ liệu.");
          }
          return odataRes;
        })
      );
}
wallet(): Observable<DataResponse> {
  const url = `/api/wallet`;
 return super.get(url).pipe(
        map((res) => {
          const odataRes: DataResponse = this.jsonConvert.deserializeObject(res, DataResponse);
  
          if (Array.isArray(odataRes.data)) {
            odataRes.data = this.jsonConvert.deserializeArray(odataRes.data, Wallet);
          } else if (odataRes.data) {
            console.warn("odataRes.data không phải là mảng. Đang chuyển về dạng object của Staff.");
            odataRes.data = this.jsonConvert.deserializeObject(odataRes.data, Wallet);
          } else {
            console.warn("odataRes.data không có dữ liệu.");
          }
          return odataRes;
        })
      );
}
}
