import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { GameTag, Tag } from '../models/db.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DataResponse } from '../models/data-reponse.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService extends ApiService{
  constructor(protected override http : HttpClient) {
    super(http);
     const jsonConvert = new JsonConvert();
   
  }

getListTag(): Observable<DataResponse> {
  let url = `/admin/SystemTag`;
   return super.get(url).pipe(
        map((res) => {
          const dataRes: DataResponse = this.jsonConvert.deserializeObject(
            res,
            DataResponse
          );
          let value: Array<Tag> = this.jsonConvert.deserializeArray(
            dataRes.data,
            Tag
          );
          dataRes.data = value;
          return dataRes;
        })
      );
  }
  getListGameTag(): Observable<DataResponse> {
  let url = `/api/gamestag`;
   return super.get(url).pipe(
        map((res) => {
          const dataRes: DataResponse = this.jsonConvert.deserializeObject(
            res,
            DataResponse
          );
          let value: Array<GameTag> = this.jsonConvert.deserializeArray(
            dataRes.data,
            GameTag
          );
          dataRes.data = value;
          return dataRes;
        })
      );
  }
 addTag(formData : any): Observable<any> {
    let url = `/admin/SystemTag`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
   addgameTag(formData : any): Observable<any> {
    let url = `/api/gamestag`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
  GetTagId(id : any): Observable<DataResponse> {
      const url = `/admin/SystemTag/id/${id}`;
   return super.get(url).pipe(
        map((res) => {
          const odataRes: DataResponse = this.jsonConvert.deserializeObject(res, DataResponse);
  
          if (Array.isArray(odataRes.data)) {
            odataRes.data = this.jsonConvert.deserializeArray(odataRes.data, Tag);
          } else if (odataRes.data) {
            console.warn("odataRes.data không phải là mảng. Đang chuyển về dạng object của Staff.");
            odataRes.data = this.jsonConvert.deserializeObject(odataRes.data, Tag);
          } else {
            console.warn("odataRes.data không có dữ liệu.");
          }
          return odataRes;
        })
      );
    }
      updateTag(formData: any,id : number): Observable<DataResponse> {
    let url = `/admin/SystemTag`;
    return super.putEntity(url,id, formData).pipe(
    catchError((err) => throwError(() => new Error(err))),
    map((res) => {
      return res;
    })
  );
}
 DeleteTag(id: any): Observable<DataResponse> {
    let url = `/admin/SystemTag`;
    return super.deleteEntity(url,id).pipe(
      map((res) => {
        return res;
      })
    );
  }
   DeleteGameTag(id: any): Observable<DataResponse> {
    let url = `/api/gamestag`;
    return super.deleteEntity(url,id).pipe(
      map((res) => {
        return res;
      })
    );
  }
}