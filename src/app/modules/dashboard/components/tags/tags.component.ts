import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tag } from 'src/app/core/models/db.model';
import { TagsService } from 'src/app/core/services/tags.service';

@Component({
  selector: 'app-tags',
  imports: [FormsModule,CommonModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit{
  public listTag : Tag[]=[];
  ngOnInit(): void {
    this.onGetData();
  }
constructor(private tagService : TagsService) {}

onGetData(){
  this.tagService.getListTag().subscribe(data => {
    this.listTag = data;
  })
}
}
