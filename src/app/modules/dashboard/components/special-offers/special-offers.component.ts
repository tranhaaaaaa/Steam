import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameService } from 'src/app/core/services/game.service';
import { GameInfor } from 'src/app/core/models/db.model';

@Component({
  selector: 'app-special-offers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './special-offers.component.html',
  styleUrls: ['./special-offers.component.css']
})
export class SpecialOffersComponent implements OnInit{
  constructor(private service : GameService){}
  public listGame : GameInfor[]=[];
  ngOnInit(): void {
 this.service.getListGame().subscribe((data)=>{
  this.listGame = data.data.filter((x:any) => x.IsActive == true);
  console.log(this.listGame);
 })
  }
  @Input() games: any[] = [];

}