import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { AddUser, User } from '../models/db.model';
import * as jwt_decode from 'jwt-decode';
import { DataResponse } from '../models/data-reponse.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService{

  constructor(protected override http: HttpClient) { 
    super(http);
  }
   login(formData : any): Observable<any> {
    let url = `/api/auth/login`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
     register(formData : any): Observable<any> {
    let url = `/api/auth/register`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }

      verify(formData : any): Observable<any> {
    let url = `/api/auth/verify-register-otp`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
    verifyLogin(formData : any): Observable<DataResponse> {
    let url = `/api/Auth/verify-login-otp`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
      forgotPass(formData : any): Observable<DataResponse> {
    let url = `/api/Auth/forgot-password`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
        verifypass(formData : any): Observable<DataResponse> {
    let url = `/api/Auth/reset-password`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
          changePass(formData : any): Observable<DataResponse> {
    let url = `/api/profile/change-password`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
getUserByUsername(email: string): Observable<DataResponse> {
    const url = `/admin/User/name/${email}`;
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

  decodeToken(token: string): any {
    try {
      return jwt_decode.jwtDecode(token); 
    } catch (error) {
      console.error('Token decode error:', error);
      return null;
    }
  }
   private notificationActionSource = new Subject<void>();
  notificationAction$ = this.notificationActionSource.asObservable();

  triggerNotificationAction() {
    this.notificationActionSource.next(); 
  }
}
