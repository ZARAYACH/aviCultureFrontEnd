import Building from "../Breeding/buildings/Building";
export interface Product {
    id: string | undefined,
    name: string | undefined,
    description : string | undefined,
    storageBuilding : Building | undefined
    unitaryPrice : number | undefined,
    quantity : number | undefined,
}