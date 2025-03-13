import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/service/products/products.service';
import { Iproducts } from '../../../shared/interface/products/iproducts';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TermtextPipe } from '../../../shared/pipe/termtext.pipe';
import { SearchPipe } from '../../../shared/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/service/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../core/service/wishList/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink , FormsModule , CurrencyPipe , TermtextPipe , SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly productService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlist = inject(WishlistService);
  

  products:Iproducts[] = [];
  text:string = "";
  
  
ngOnInit(): void {
      this.getProductsData();
  }
  
  getProductsData(){
    this.productService.getAllProducts().subscribe({
      next:(res)=>{        
        this.products = res.data;
      }
    })
  }


  addToCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this.toastrService.success(res.message , 'FreshCart')
        this.cartService.cartNumber.set( res.numOfCartItems )
      }
    })
  }


  addToWishlist(id:string):void{
    this.wishlist.addProductToWishlist(id).subscribe({
      next:(res)=>{        
        this.toastrService.success(res.message)
      }
    })
  }

  
  

}
