import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';

const route :  Routes = [
    {
        path:'',
        component:CartComponent
    }
]


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route)

  ]
})
export class CartModule { }
