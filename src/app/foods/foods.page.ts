import { Component } from '@angular/core';
import { FoodService } from '../service/food.service';

@Component({
  selector: 'foods-tab',
  templateUrl: 'foods.page.html',
  styleUrls: ['foods.page.scss']
})
export class FoodsPage {

  title = 'PHE Logs - Food List';
  public searchTerm: string = "";
  foods: object[] = [];

  constructor(private foodService : FoodService) { }

  ngOnInit() {
    this.setFilteredItems();
  }

  setFilteredItems() {
    this.foods = this.foodService.filterItems(this.searchTerm);
  }

}
