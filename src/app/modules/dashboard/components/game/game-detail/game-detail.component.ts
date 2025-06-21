import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category, GameInfor } from 'src/app/core/models/db.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { GameService } from 'src/app/core/services/game.service';
import { GamecategoryService } from 'src/app/core/services/gamecategory.service';
import { UserLogged } from 'src/app/core/utils/userLogged';

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
    private categoryService : CategoryService,
    private toastService : ToastrService,
    private gameCategory : GamecategoryService
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
  onSave(){
    let userLogged = new UserLogged();
    if(this.idgame){
      // this.gameService.
    }else{
      let formData = {
        title: this.gameForm.get('Title')?.value,
        description: this.gameForm.get('Description')?.value,
        price: this.gameForm.get('Price')?.value,
        coverImagePath: this.gameForm.get('CoverImagePath')?.value,
        installerFilePath: this.gameForm.get('CoverImagePath')?.value,
        createdBy : userLogged.getCurrentUser().userId,
        status : "Active",
        genre: this.gameForm.get('Genre')?.value,
        developerId : userLogged.getCurrentUser().userId

      }
      this.gameService.createGame(formData).subscribe((data)=>{
          let formData2 = {
            gameID : data.data.id,
            categoryID : this.listCategory.find((category) => category.CategoryName === this.gameForm.get('Genre')?.value)?.Id,
            createdBy : userLogged.getCurrentUser().userId,
          }
         this.gameCategory.createGameCategory(formData2).subscribe((data)=>{
          this.toastService.success("Thêm mới thành công!");
          this.onGetData();
         })
      })
    }
  }
}
