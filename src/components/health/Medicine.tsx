import {Product} from "../product/Product";

export default interface Medicine extends Product{
    isVaccine : boolean,
    diseaseIds : number[] | undefined
}