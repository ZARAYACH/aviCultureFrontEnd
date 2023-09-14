import Building from "../../Breeding/buildings/Building";
import Product from "./Product";
import Block from "../../Breeding/Block/Block";
import FoodCategory from "./FoodCategory";
export default interface ProductFood extends Product{
    foodCategory : FoodCategory | undefined,
    remarks : string | undefined
}