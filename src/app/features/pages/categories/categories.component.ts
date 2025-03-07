import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/service/category/category.service';
import { ICategory } from '../../../shared/interface/categories/Icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{


  private readonly categoryService = inject(CategoryService)

  categoriesList:ICategory[] = [];

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
}
