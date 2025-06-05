import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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
}
