import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreOrder } from 'src/app/core/models/db.model';
import { StoreOrdersService } from 'src/app/core/services/store-orders.service';

@Component({
  selector: 'app-order-detail',
  imports: [CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit{
  public listOrders = new StoreOrder();
  public idOrder : any;
  constructor(private storeService : StoreOrdersService,
    private route : ActivatedRoute
  ){
    this.idOrder = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
   this.onGetData();
  }
  onGetData(){
    this.storeService.OrderDetails(this.idOrder).subscribe((data) => {
      this.listOrders = data.data
    })
  }
}
