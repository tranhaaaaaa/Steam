import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { DataResponse } from '../models/data-reponse.service';
import { map, Observable } from 'rxjs';
import { GameCategory } from '../models/db.model';

@Injectable({
  providedIn: 'root'
})
export class GamecategoryService extends ApiService{
  constructor(protected override http : HttpClient) {
    super(http);
     const jsonConvert = new JsonConvert();
   
  }

getListGameCategory(): Observable<DataResponse> {
  let url = `/api/GamesCategory`;
   return super.get(url).pipe(
        map((res) => {
          const dataRes: DataResponse = this.jsonConvert.deserializeObject(
            res,
            DataResponse
          );
          let value: Array<GameCategory> = this.jsonConvert.deserializeArray(
            dataRes.data,
            GameCategory
          );
          dataRes.data = value;
          return dataRes;
        })
      );
  }
     createGameCategory(formData : any): Observable<any> {
    let url = `/api/gamescategory`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
       Update(formData : any, id: any): Observable<any> {
    let url = `/api/gamescategory`;
    return super.putEntity(url,id, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
}