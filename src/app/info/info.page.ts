import { Component } from '@angular/core';
import { FoodService } from '../service/food.service';


@Component({
  selector: 'info-tab',
  templateUrl: 'info.page.html',
  styleUrls: ['info.page.scss']
})
export class InfoPage {

  constructor(public foodService: FoodService) {}

  refreshData() {
    this.foodService.refreshFoods();
  }

}
