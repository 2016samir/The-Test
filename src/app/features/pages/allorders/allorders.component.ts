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

ngOnInit(): void {
  this.getCartId();
}



getAllUserData(cartId:string):void{
  this.orderService.getAllUserOrders(this.cartId).subscribe({
    next:(res)=>{
      console.log(res);
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