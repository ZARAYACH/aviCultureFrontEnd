import Building from "../../Breeding/buildings/Building";
import Product from "./Product";
export default interface ProductBulb extends Product{
    marque : string | undefined,
    powerInWatt : number | undefined
}