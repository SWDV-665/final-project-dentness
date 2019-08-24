import { Component } from '@angular/core';
import {FoodItem, FoodService} from '../service/food.service';
import { NavController } from "@ionic/angular";

@Component({
  selector: 'foods-tab',
  templateUrl: 'foods.page.html',
  styleUrls: ['foods.page.scss']
})
export class FoodsPage {

  title = 'PHE Logs - Food List';
  public searchTerm: string = "";
  private foods: FoodItem[];

  constructor(private foodService : FoodService, public navCtrl: NavController) {
    foodService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.setFilteredItems();
    });
  }

  ngOnInit() {
    this.setFilteredItems();
  }

  setFilteredItems() {
    this.foods = this.foodService.foods.filter(food => {
      return food.description.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    });
  }

}
