import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { DataResponse } from '../models/data-reponse.service';
import { map, Observable } from 'rxjs';
import { Category } from '../models/db.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService{
  constructor(protected override http : HttpClient) {
    super(http);
     const jsonConvert = new JsonConvert();
   
  }

getListCategory(): Observable<DataResponse> {
  let url = `/admin/SystemCategory`;
  return super.get(url).pipe(
      map((res) => {
        const dataRes: DataResponse = this.jsonConvert.deserializeObject(
          res,
          DataResponse
        );
        let value: Array<Category> = this.jsonConvert.deserializeArray(
          dataRes.data,
          Category
        );
        dataRes.data = value;
        return dataRes;
      })
    );
}
}
