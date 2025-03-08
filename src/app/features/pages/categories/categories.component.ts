import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/service/category/category.service';
import { ICategory } from '../../../shared/interface/categories/Icategory';
import { FlowbiteService } from '../../../core/service/flowbite/flowbite.service';
import { IspecificCat } from '../../../shared/interface/specificCatgory/ispecific-cat';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  private readonly categoryService = inject(CategoryService)

  categoriesList : ICategory[] = [];
  specificCat : IspecificCat = {} as IspecificCat ;

ngOnInit(): void {
    this.showCategory();
}

  showCategory(){
    this.categoryService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoriesList = res.data;
      }
    })
  }

  showSpecificCategory(id:string):void{
    this.categoryService.getSpecificCategories(id).subscribe({
      next:(res)=>{
        
        this.specificCat = res.data;
        
      }
    })
  }


  openModal(id:string) {
    const modal = document.getElementById('defaultModal');
    if (modal) {
      modal.classList.remove('hidden');
      this.showSpecificCategory(id);
    }
  }

  closeModal() {
    const modal = document.getElementById('defaultModal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }


  
    
}
