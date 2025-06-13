import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category, GameInfor } from 'src/app/core/models/db.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-game-detail',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent implements OnInit{
  public game : GameInfor = new GameInfor();
  public idgame : any;
  gameForm!: FormGroup;
  public listCategory : Category[]=[];
  constructor(private gameService : GameService,
     private fb: FormBuilder,
    private route : ActivatedRoute,
    private categoryService : CategoryService
  ){
      this.gameForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      CoverImagePath: ['', Validators.required],
      Genre: ['', Validators.required],
    });
  }
  ngOnInit(): void {
       this.idgame = this.route.snapshot.paramMap.get('id');
       this.onGetData();
  }
  onGetData(){
    this.categoryService.getListCategory().subscribe((data)=>{
      this.listCategory = data.data;
    })
    if(this.idgame){
      this.gameService.getGameDetail(this.idgame).subscribe((data)=>{
        this.game = data.data;
        this.gameForm.patchValue({
          Title: this.game.Title,
          Description: this.game.Description,
          Price: this.game.Price,
          CoverImagePath: this.game.CoverImagePath,
          Genre: this.game.Genre,
        });
        console.log("aaaaa",this.game)
      })
    }
    else{
      this.game = new GameInfor();
    }
  }
}
