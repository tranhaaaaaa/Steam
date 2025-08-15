import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { DataResponse } from '../models/data-reponse.service';
import { map, Observable } from 'rxjs';
import { User } from '../models/db.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService extends ApiService{

  constructor(protected override http: HttpClient) { 
    super(http);
  }
  getWishList(): Observable<DataResponse> {
    let url = `/admin/User/with-library`;
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
          addGameTowishlist(userid : any,gameid : any): Observable<any> {
      let url = `/api/GamesInfo/${gameid}/wishlist/toggle?userId=${userid}`;
      return super.postEntity(url).pipe(
        map((res) => {
          if (res === undefined) {
            throw new Error('Invalid response from server');
          }
          return res;
        })
      );
    }
}
