import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../../core/service/Brands/brands.service';
import { IBrands } from '../../../shared/interface/Brands/ibrands';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private readonly brandService = inject(BrandsService);

  brandList:IBrands[] = [];


  ngOnInit(): void {
      this.getAllBrandData();
  }

  getAllBrandData(){
    this.brandService.getAllBrands().subscribe({
      next:(res)=>{
        this.brandList = res.data;
      }
    })
  }

  

}
