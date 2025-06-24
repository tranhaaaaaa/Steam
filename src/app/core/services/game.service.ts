import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { map, Observable } from 'rxjs';
import { GameInfor } from '../models/db.model';
import { DataResponse } from '../models/data-reponse.service';

@Injectable({
  providedIn: 'root'
})
export class GameService extends ApiService{
  constructor(protected override http : HttpClient) {
    super(http);
     const jsonConvert = new JsonConvert();
   
  }

getListGame(): Observable<DataResponse> {
  let url = `/api/GamesInfo/model`;
  return super.get(url).pipe(
      map((res) => {
        const dataRes: DataResponse = this.jsonConvert.deserializeObject(
          res,
          DataResponse
        );
        let value: Array<GameInfor> = this.jsonConvert.deserializeArray(
          dataRes.data,
          GameInfor
        );
        dataRes.data = value;
        return dataRes;
      })
    );
}
getGameDetail(id : any): Observable<DataResponse> {
    const url = `/api/GamesInfo/model/${id}`;
 return super.get(url).pipe(
      map((res) => {
        const odataRes: DataResponse = this.jsonConvert.deserializeObject(res, DataResponse);

        if (Array.isArray(odataRes.data)) {
          odataRes.data = this.jsonConvert.deserializeArray(odataRes.data, GameInfor);
        } else if (odataRes.data) {
          console.warn("odataRes.data không phải là mảng. Đang chuyển về dạng object của Staff.");
          odataRes.data = this.jsonConvert.deserializeObject(odataRes.data, GameInfor);
        } else {
          console.warn("odataRes.data không có dữ liệu.");
        }
        return odataRes;
      })
    );
  }
   createGame(formData : any): Observable<any> {
    let url = `/api/gamesinfo`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
      UpdateGame(formData: any,id: string): Observable<DataResponse> {
      let url = `/api/gamesinfo`;
      return super.putEntity(url,parseInt(id),formData).pipe(
        map((res) => {
          return res;
        })
      );
    }
}