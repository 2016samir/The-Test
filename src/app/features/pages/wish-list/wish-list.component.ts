import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/service/wishList/wishlist.service';
import { Iwishlist } from '../../../shared/interface/wishlist/iwishlist';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  imports: [ CurrencyPipe ],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {

  private readonly wishlist = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  wishListData:Iwishlist[] = [];


  ngOnInit(): void {
      this.getWishlistData();
  }

  getWishlistData():void{
    this.wishlist.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.wishListData = res.data;
      }
    })
  }

  removeItem(id:string):void{
    this.wishlist.RemoveItemFromWishlist(id).subscribe({
      next:(res)=>{
        this.getWishlistData();
      }
    })
  }

  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this.toastrService.success(res.message)
        this.cartService.cartNumber.next( res.numOfCartItems )
      }
    })
  }



}
