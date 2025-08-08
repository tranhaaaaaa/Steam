import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DataResponse } from '../models/data-reponse.service';
import { Review, Thread, ThreadReply } from '../models/db.model';

@Injectable({
  providedIn: 'root'
})
export class ThreadService extends ApiService{

  constructor(protected override http: HttpClient) { 
    super(http);

  }
  getListThread(): Observable<DataResponse> {
    let url = `/api/StoreThread`;
     return super.get(url).pipe(
          map((res) => {
            const dataRes: DataResponse = this.jsonConvert.deserializeObject(
              res,
              DataResponse
            );
            let value: Array<Thread> = this.jsonConvert.deserializeArray(
              dataRes.data,
              Thread
            );
            dataRes.data = value;
            return dataRes;
          })
        );
    }
      getListReviewByGameId(gameId: any): Observable<DataResponse> {
    let url = `/api/games/reviews/by-game/${gameId}`;
     return super.get(url).pipe(
          map((res) => {
            const dataRes: DataResponse = this.jsonConvert.deserializeObject(
              res,
              DataResponse
            );
            let value: Array<Review> = this.jsonConvert.deserializeArray(
              dataRes.data,
              Review
            );
            dataRes.data = value;
            return dataRes;
          })
        );
    }
     GetThreadId(id : any): Observable<DataResponse> {
          const url = `/api/StoreThread/${id}`;
       return super.get(url).pipe(
            map((res) => {
              const odataRes: DataResponse = this.jsonConvert.deserializeObject(res, DataResponse);
      
              if (Array.isArray(odataRes.data)) {
                odataRes.data = this.jsonConvert.deserializeArray(odataRes.data, Thread);
              } else if (odataRes.data) {
                console.warn("odataRes.data không phải là mảng. Đang chuyển về dạng object của Staff.");
                odataRes.data = this.jsonConvert.deserializeObject(odataRes.data, Thread);
              } else {
                console.warn("odataRes.data không có dữ liệu.");
              }
              return odataRes;
            })
          );
        }

          getListThreadReply(id: any): Observable<DataResponse> {
    let url = `/api/StoreThreadReply/thread/${id}`;
     return super.get(url).pipe(
          map((res) => {
            const dataRes: DataResponse = this.jsonConvert.deserializeObject(
              res,
              DataResponse
            );
            let value: Array<ThreadReply> = this.jsonConvert.deserializeArray(
              dataRes.data,
              ThreadReply
            );
            dataRes.data = value;
            return dataRes;
          })
        );
    }
     addThreadReply(formData : any): Observable<any> {
    let url = `/api/StoreThreadReply`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
   addReview(formData : any): Observable<any> {
    let url = `/api/games/reviews`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
      addThreadUpvote(formData : any): Observable<any> {
    let url = `/api/StoreThread/upvote`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
    addThread(formData : any): Observable<any> {
    let url = `/api/StoreThread`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
    oreder(formData : any): Observable<any> {
    let url = `/api/StoreOrder`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
      orederdetail(formData : any): Observable<any> {
    let url = `/api/StoreOrderDetail`;
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
