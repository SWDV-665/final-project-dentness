import { Component, OnInit } from '@angular/core';
import {FoodItem, FoodService, NullFoodItem} from "../service/food.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

  private current_phe: Number = 0.0;
  private weight: Number = 0.0;
  private foodItem: FoodItem = NullFoodItem;
  constructor(private foodSvc: FoodService, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  calculatePhe( ) {
    this.current_phe = this.foodItem.phe_multiplier * +this.weight;
  }

  ionViewWillEnter(){
    let foodId = this.route.snapshot.paramMap.get('id');
    this.foodItem = this.foodSvc.getFoodItemById(foodId);
  }

}
