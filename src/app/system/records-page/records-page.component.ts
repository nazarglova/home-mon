import {Component, OnInit} from '@angular/core';

import {Category} from '../shared/models/category.model';
import {CategoriesService} from 'app/system/shared/services/categories.service';

@Component({
  selector: 'wfm-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  categories: Category[];
  isLoaded: Boolean = false;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  newCategoryAdded(category: Category) {
    // add to array
    this.categories.push(category);
    console.log(category);
  }
  categoryEdited(){

  }
}
