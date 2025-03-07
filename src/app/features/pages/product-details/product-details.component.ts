import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/service/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProductDetails } from '../../../shared/interface/productDetails/iproduct-details';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductsService);

  productData:IProductDetails | null = null;

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe({
        next:(p)=>{
          let idProduct =  p.get('id');
  
  
    this.productService.getSpecificProducts(idProduct).subscribe({
      next:(res)=>{
        this.productData = res.data;
      }
    })

        }
      })
  }



  
  

}
