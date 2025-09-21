import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StoreOrder } from 'src/app/core/models/db.model';
import { StoreOrdersService } from 'src/app/core/services/store-orders.service';

@Component({
  selector: 'app-messagess',
  imports: [CommonModule,RouterLink],
  templateUrl: './messagess.component.html',
  styleUrl: './messagess.component.css'
})
export class MessagessComponent implements OnInit {
  id: any;
  message: string | null = null;
  public storeOrder: StoreOrder = new StoreOrder();
  isSuccess : boolean = false;
  constructor(private route: ActivatedRoute,
    private router : Router,
    private storeService : StoreOrdersService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.onGetData();
      this.message = params.get('message');
     
    });
  }
onGetData() {
  const x = parseInt(this.id, 10);

  this.storeService.getListOrder().subscribe((data) => {
    // Tìm order theo Id
    const order = data.data.find((r: any) => r.Id === x);

    if (order) {
      const createdAt = new Date(order.OrderDate); 
      const now = new Date();

      const diffMinutes = (now.getTime() - createdAt.getTime()) / 1000 / 60;
      
      if (diffMinutes < 5) {
    if(this.message == "success"){
      if(order.Status == "Success"){
          this.isSuccess = true;
      }else{
         this.router.navigate(['/hihi']);
      }
      }else if(this.message == "failed"){
         if(order.Status == "failed" || order.Status == "failed"){
          this.isSuccess = false;
      }else{
         this.router.navigate(['/hihi']);
      }
      }else{
        this.router.navigate(['/hihi']);

      }
      }
      else{
          this.router.navigate(['/hihi']);

      }

    } else {
        this.router.navigate(['/hihi']);

    }
  });
}

}
