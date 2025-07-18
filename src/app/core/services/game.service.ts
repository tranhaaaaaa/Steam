import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { catchError, map, Observable, of } from 'rxjs';
import { Discount, GameInfor } from '../models/db.model';
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
  let url = `/api/GamesInfo/dto`;
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
getListDiscount(): Observable<Discount[]> {
  let url = `/api/GamesDiscount`;
  return super.get(url).pipe(
    map((res) => {
      // Log dữ liệu trả về từ API để kiểm tra kiểu dữ liệu
      console.log('API response:', res);

      // Kiểm tra xem res có phải là một mảng không
      if (!Array.isArray(res)) {
        throw new Error('Dữ liệu không phải là mảng hợp lệ');
      }

      return res as Discount[];
    }),
    catchError((error) => {
      // Xử lý lỗi nếu có
      console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
      return of([]); // Trả về mảng trống nếu có lỗi
    })
  );
}


getGameDetail(id : any): Observable<DataResponse> {
    const url = `/api/GamesInfo/dto/${id}`;
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

  getGameDiscountId(id : any): Observable<DataResponse> {
    const url = `/api/GamesDiscount/${id}`;
 return super.get(url).pipe(
      map((res) => {
        const odataRes: DataResponse = this.jsonConvert.deserializeObject(res, DataResponse);

        if (Array.isArray(odataRes.data)) {
          odataRes.data = this.jsonConvert.deserializeArray(odataRes.data, Discount);
        } else if (odataRes.data) {
          console.warn("odataRes.data không phải là mảng. Đang chuyển về dạng object của Staff.");
          odataRes.data = this.jsonConvert.deserializeObject(odataRes.data, Discount);
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
     active(formData : any,id:any): Observable<any> {
    let url = `/api/gamesinfo/${id}/active`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
   inactive(formData : any,id:any): Observable<any> {
    let url = `/api/gamesinfo/${id}/deactive`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
     addDiscount(formData : any): Observable<any> {
    let url = `/api/GamesDiscount`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
     createGameMedia(formData : any,id:any): Observable<any> {
    let url = `/api/games/${id}/media`;
    return super.postEntity(url, formData).pipe(
      map((res) => {
        if (res === undefined) {
          throw new Error('Invalid response from server');
        }
        return res;
      })
    );
  }
     createGameDiscount(id:any,idDiscount:any): Observable<any> {
    let url = `/api/gamesdiscount/assign/${id}/${idDiscount}`;
    return super.postEntity(url).pipe(
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

      updateDiscount(formData: any,id: any): Observable<DataResponse> {
      let url = `/api/GamesDiscount`;
      return super.putEntity(url,parseInt(id),formData).pipe(
        map((res) => {
          return res;
        })
      );
    }
        deleteDiscount(id: any): Observable<DataResponse> {
    let url = `/api/GamesDiscount`;
    return super.deleteEntity(url,id).pipe(
      map((res) => {
        return res;
      })
    );
  }
         deleteGameMedia(idgame: any,idmedia: any): Observable<DataResponse> {
    let url = `/api/games/${idgame}/media`;
    return super.deleteEntity(url,idmedia).pipe(
      map((res) => {
        return res;
      })
    );
  }
}