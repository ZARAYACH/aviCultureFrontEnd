import Building from "../../Breeding/buildings/Building";
import Product from "./Product";
import Block from "../../Breeding/Block/Block";
import FoodCategory from "./FoodCategory";
import ToolCategory from "./ToolCategory";
export default interface ProductTool extends Product{
    usedFor : string | undefined,
    toolCategorie : ToolCategory | undefined
}