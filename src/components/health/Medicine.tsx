import Product from '../product/modal/Product';

export default interface Medicine extends Product{
    isVaccine : boolean,
    diseaseIds : number[] | undefined
}