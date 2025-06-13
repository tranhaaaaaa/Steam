import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { Tag } from '../models/db.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService extends ApiService{
  constructor(protected override http : HttpClient) {
    super(http);
     const jsonConvert = new JsonConvert();
   
  }

getListTag(): Observable<Tag[]> {
  let url = `/api/GamesTags`;
  return super.get(url).pipe(
    map((res) => {
      const arrayRes = res as any[]; 
      let value: Array<Tag> = this.jsonConvert.deserializeArray(
        arrayRes, 
        Tag
      );
      return value;
    })
  );
}
}