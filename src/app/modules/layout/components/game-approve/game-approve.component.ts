import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GameInfor } from 'src/app/core/models/db.model';
import { GameService } from 'src/app/core/services/game.service';

@Component({
  selector: 'app-game-approve',
  imports: [CommonModule,FormsModule],
  templateUrl: './game-approve.component.html',
  styleUrl: './game-approve.component.css'
})
export class GameApproveComponent implements OnInit{
  public listGame : GameInfor[] = []
  constructor(private gameService : GameService,
    private toastService : ToastrService
  ){}
  ngOnInit(): void {
    this.OnGetData();
  }
 OnGetData(){
   this.gameService.getListGame().subscribe(res => {
     this.listGame = res.data.filter((x: any) => x.Status == "Pending");
     console.log(this.listGame);
   })
 }
     deleteGame(account: any) {
      this.gameService.deleteGame(account.Id).subscribe(res => {
        this.toastService.success("Xóa game thành công!");
        this.OnGetData();
      })
  
  }
  onApproveGame(account: any) {
    let formData = {
      status : "active",
      note: '',
    }
    this.gameService.gameApproved(formData,account.Id).subscribe(res => {
      this.toastService.success("Duyệt game thành cong!");
      this.OnGetData();
    })
  }
}
