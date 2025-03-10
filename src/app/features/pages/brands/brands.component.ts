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
  specificBrand : IBrands = {} as IBrands ;


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

  showSpecificBrand(id:string):void{
    this.brandService.getSpecificBrand(id).subscribe({
      next:(res)=>{        
        this.specificBrand = res.data;
      }
    })
  }
  
  openModal(id:string) {
    const modal = document.getElementById('defaultModal');
    if (modal) {
      modal.classList.remove('hidden');
      this.showSpecificBrand(id);
    }
  }

  closeModal() {
    const modal = document.getElementById('defaultModal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }


}
