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

getListUser(): Observable<User[]> {
  let url = `/admin/User`;
  return super.get(url).pipe(
    map((res) => {
      const arrayRes = res as any[]; 
      let value: Array<User> = this.jsonConvert.deserializeArray(
        arrayRes, 
        User
      );
      return value;
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


}
