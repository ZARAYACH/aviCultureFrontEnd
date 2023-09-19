import Building from "../buildings/Building";

export default interface Block {
    id: number | undefined;
    dailyMortality: number | undefined;
    dailyGasCylinder: number | undefined;
    weightFirstWeek: number | undefined;
    weightEveryFeeding: number | undefined;
    weightByTheEnd: number | undefined;
    foodNature: string | undefined;
    foodQuantity: number | undefined;
    building: Building | undefined;
}