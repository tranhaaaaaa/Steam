import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Any, JsonConvert } from 'json2typescript';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../models/db.model'; 
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
getUserById(id: any): Observable<User> {
  const url = `/admin/User/${id}`;
  return super.get(url).pipe(
    map((res) => this.jsonConvert.deserializeObject(res, User))
  );
}

}
