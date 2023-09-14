import Building from "../../Breeding/buildings/Building";
import Product from "./Product";
import Block from "../../Breeding/Block/Block";
export default interface  ProductChicken extends Product{
    block : Block | undefined,
}