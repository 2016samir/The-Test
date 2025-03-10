import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../core/service/orders/orders.service';
import { Iallorders } from '../../../shared/interface/allorders/iallorders';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {


  private readonly orderService = inject(OrdersService);

cartId:string = ""
cartItem:Iallorders[] = []

ngOnInit(): void {
  this.getCartId();
}


getAllUserData(cartId:string):void{
  this.orderService.getAllUserOrders(this.cartId).subscribe({
    next:(res)=>{
      this.cartItem = res[res.length - 1].cartItems;
    }
  })
}

getCartId():void{
  if(localStorage.getItem('cartId')){
    this.cartId = localStorage.getItem('cartId')!;
    this.getAllUserData(this.cartId)
  }

}

}