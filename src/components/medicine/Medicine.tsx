import {Product} from "../product/Product";

export interface Medicine extends Product{
    isVaccine : boolean,
    diseaseIds : number[] | undefined
}