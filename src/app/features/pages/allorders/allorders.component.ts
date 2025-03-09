import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../../core/service/orders/orders.service';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {


  private readonly orderService = inject(OrdersService);

cartId:string = ""
cartItem:object[] = []

ngOnInit(): void {
  this.getCartId();
}



getAllUserData(cartId:string):void{
  this.orderService.getAllUserOrders(this.cartId).subscribe({
    next:(res)=>{
      console.log(res);
      this.cartItem = res[0].cartItems;
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