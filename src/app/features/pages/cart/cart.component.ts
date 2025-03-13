import { Component, inject, OnChanges, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { CartService } from '../../../core/service/cart/cart.service';
import { Icart } from '../../../shared/interface/cart/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [ CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService)

  cartDetails:Icart  = {} as Icart;


  ngOnInit(): void {
      this.getCartData();
  }

  // ngOnChanges(): void {
  //     this.getCartData();
  // }


  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartDetails = res ;
          localStorage.setItem('cartId', res.data.cartOwner);
      }
    })
  }


  removeItem(id:string):void{
    this.cartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        this.cartDetails = res;
        this.cartService.cartNumber.set(res.numOfCartItems);
      }
    })
  }

  updateCount(id:string , newCount:number):void{
    this.cartService.updateCartQuantity(id , newCount).subscribe({
      next:(res)=>{
        this.cartDetails = res;
      }
    })
  }

  clearItems():void{
    this.cartService.clearCart().subscribe({
      next:(res)=>{
        if(res.message === "success"){
          this.cartDetails.numOfCartItems = 0;
          this.getCartData();
        this.cartService.cartNumber.set(0);
        }
      }
    })
  }


}
