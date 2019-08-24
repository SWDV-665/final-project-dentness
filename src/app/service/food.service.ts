import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from "rxjs";
import {catchError} from "rxjs/operators";

//import {File} from '@ionic-native/file/ngx';

export interface FoodItem {
    _id: String,
    public: boolean,
    description: String,
    phe_multiplier: number,
    source_user: String,
    __v: number
}

export const NullFoodItem: FoodItem = {
    _id: "",
    description: "",
    phe_multiplier: 0.0,
    public: false,
    __v: 0,
    source_user: ""
};

@Injectable({
    providedIn: 'root'
})
export class FoodService {
    public foods: FoodItem[] = [];
    private _localFileName = 'phelogs.data';
    private baseUrl = 'http://localhost:8080';
    public dataChanged$: Observable<boolean>;
    private dataChangeSubject: Subject<boolean>;

    constructor(public http: HttpClient /*, private file: File*/) {
        this.dataChangeSubject = new Subject<boolean>();
        this.dataChanged$ = this.dataChangeSubject.asObservable();
        this.loadFoodsLocally()
    }

    getFoodItemById(id) {
        return this.foods.find(x => {
            return x._id === id;
        });
    }

    refreshFoods() {
        this.getFoodsFromAPI();
        this.storeFoodsLocally(this.foods);
        this.loadFoodsLocally();
    }

    private loadFoodsLocally() {
        console.log('loading foods...');
        this.getFoodsFromAPI();
        // this.file.readAsText(this.file.dataDirectory, 'phelogs.data').then(r => {
        //     this.foods = <FoodItem[]>JSON.parse(r) || [];
        // }).catch(err =>{
        //     console.log(err);
        // })
    }

    private storeFoodsLocally(foods) {
        console.log('Not implemented...');
        this.dataChangeSubject.next(true);
        // this.file.writeExistingFile(this.file.dataDirectory, this._localFileName, JSON.stringify(this.foods)).then(r => {
        //     console.log('saved...')
        // });
    }

    private getFoodsFromAPI()  {
        console.log('Getting foods from API... ' + this.baseUrl + '/foods');
        this.http.get<FoodItem[]>(this.baseUrl + '/foods').subscribe(
            foods => {
                console.log('made it here with ' + foods.length + ' records.');
                this.foods = foods;
                this.dataChangeSubject.next(true);
            },
            error => console.log(error)
        );
    }

    private bypassAPI() {
        this.foods = <FoodItem[]>JSON.parse(JSON.stringify([{
            "_id": "5d5f518c2bd1232c168f9d9e",
            "public": true,
            "description": "Apples, dried, sulfured, stewed, with added sugar",
            "phe_multiplier": 0.006,
            "source_user": "5d5329d520e3363a08501a00",
            "__v": 0
        },
            {
                "_id": "5d5f518c2bd1232c168f9d9f",
                "public": true,
                "description": "Apples, dried, sulfured, stewed, without added sugar",
                "phe_multiplier": 0.006,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9da0",
                "public": true,
                "description": "Apples, dried, sulfured, uncooked",
                "phe_multiplier": 0.026,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9da1",
                "public": true,
                "description": "Apples, frozen, unsweetened, heated (Includes foods for USDA's Food Distribution Program)",
                "phe_multiplier": 0.008,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9da2",
                "public": true,
                "description": "Apples, frozen, unsweetened, unheated (Includes foods for USDA's Food Distribution Program)",
                "phe_multiplier": 0.008,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9da3",
                "public": true,
                "description": "Apples, raw, fuji, with skin (Includes foods for USDA's Food Distribution Program)",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9da4",
                "public": true,
                "description": "Apples, raw, gala, with skin (Includes foods for USDA's Food Distribution Program)",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9da5",
                "public": true,
                "description": "Apples, raw, golden delicious, with skin",
                "phe_multiplier": 0.007,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9da6",
                "public": true,
                "description": "Apples, raw, granny smith, with skin (Includes foods for USDA's Food Distribution Program)",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9da7",
                "public": true,
                "description": "Apples, raw, red delicious, with skin (Includes foods for USDA's Food Distribution Program)",
                "phe_multiplier": 0.007,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9da8",
                "public": true,
                "description": "Apples, raw, with skin (Includes foods for USDA's Food Distribution Program)",
                "phe_multiplier": 0.006,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9da9",
                "public": true,
                "description": "Apples, raw, without skin",
                "phe_multiplier": 0.007,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9daa",
                "public": true,
                "description": "Apples, raw, without skin, cooked, boiled",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dab",
                "public": true,
                "description": "Apples, raw, without skin, cooked, microwave",
                "phe_multiplier": 0.008,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dac",
                "public": true,
                "description": "Applesauce, canned, sweetened, with salt",
                "phe_multiplier": 0.005,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dad",
                "public": true,
                "description": "Applesauce, canned, sweetened, without salt",
                "phe_multiplier": 0.005,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dae",
                "public": true,
                "description": "Applesauce, canned, unsweetened, with added ascorbic acid",
                "phe_multiplier": 0.005,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9daf",
                "public": true,
                "description": "Applesauce, canned, unsweetened, without added ascorbic acid (Includes foods for USDA's Food Distribution Program)",
                "phe_multiplier": 0.005,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9db0",
                "public": true,
                "description": "Apricot nectar, canned, with added ascorbic acid",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9db1",
                "public": true,
                "description": "Apricots, canned, extra heavy syrup pack, without skin, solids and liquids",
                "phe_multiplier": 0.023,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9db2",
                "public": true,
                "description": "Apricots, canned, extra light syrup pack, with skin, solids and liquids (Includes foods for USDA's Food Distribution Program)",
                "phe_multiplier": 0.025,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9db3",
                "public": true,
                "description": "Apricots, canned, heavy syrup pack, with skin, solids and liquids",
                "phe_multiplier": 0.022,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9db4",
                "public": true,
                "description": "Apricots, canned, heavy syrup pack, without skin, solids and liquids",
                "phe_multiplier": 0.021,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9db5",
                "public": true,
                "description": "Apricots, canned, heavy syrup, drained",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9db6",
                "public": true,
                "description": "Apricots, canned, juice pack, with skin, solids and liquids",
                "phe_multiplier": 0.026,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9db7",
                "public": true,
                "description": "Apricots, canned, light syrup pack, with skin, solids and liquids",
                "phe_multiplier": 0.022,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9db8",
                "public": true,
                "description": "Apricots, canned, water pack, with skin, solids and liquids",
                "phe_multiplier": 0.03,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9db9",
                "public": true,
                "description": "Apricots, canned, water pack, without skin, solids and liquids",
                "phe_multiplier": 0.028,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dba",
                "public": true,
                "description": "Apricots, dehydrated (low-moisture), sulfured, stewed",
                "phe_multiplier": 0.08,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dbb",
                "public": true,
                "description": "Apricots, dehydrated (low-moisture), sulfured, uncooked",
                "phe_multiplier": 0.203,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dbc",
                "public": true,
                "description": "Apricots, dried, sulfured, stewed, with added sugar",
                "phe_multiplier": 0.049,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dbd",
                "public": true,
                "description": "Apricots, dried, sulfured, stewed, without added sugar",
                "phe_multiplier": 0.022,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dbe",
                "public": true,
                "description": "Apricots, dried, sulfured, uncooked",
                "phe_multiplier": 0.062,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dbf",
                "public": true,
                "description": "Apricots, frozen, sweetened",
                "phe_multiplier": 0.026,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dc0",
                "public": true,
                "description": "Apricots, raw",
                "phe_multiplier": 0.052,
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dc1",
                "public": true,
                "description": "ARBY'S, roast beef sandwich, classic",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dc2",
                "public": true,
                "description": "Archway Home Style Cookies, Chocolate Chip Ice Box",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dc3",
                "public": true,
                "description": "Archway Home Style Cookies, Coconut Macaroon",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dc4",
                "public": true,
                "description": "Archway Home Style Cookies, Date Filled Oatmeal",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dc5",
                "public": true,
                "description": "Archway Home Style Cookies, Dutch Cocoa",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dc6",
                "public": true,
                "description": "Archway Home Style Cookies, Frosty Lemon",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dc7",
                "public": true,
                "description": "Archway Home Style Cookies, Iced Molasses",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dc8",
                "public": true,
                "description": "Archway Home Style Cookies, Iced Oatmeal",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dc9",
                "public": true,
                "description": "Archway Home Style Cookies, Molasses",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dca",
                "public": true,
                "description": "Archway Home Style Cookies, Oatmeal",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dcb",
                "public": true,
                "description": "Archway Home Style Cookies, Oatmeal Raisin",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dcc",
                "public": true,
                "description": "Archway Home Style Cookies, Old Fashioned Molasses",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dcd",
                "public": true,
                "description": "Archway Home Style Cookies, Old Fashioned Windmill Cookies",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dce",
                "public": true,
                "description": "Archway Home Style Cookies, Peanut Butter",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            },
            {
                "_id": "5d5f518c2bd1232c168f9dcf",
                "public": true,
                "description": "Archway Home Style Cookies, Raspberry Filled",
                "phe_multiplier": "1.0",
                "source_user": "5d5329d520e3363a08501a00",
                "__v": 0
            }
        ]));
    }
}
