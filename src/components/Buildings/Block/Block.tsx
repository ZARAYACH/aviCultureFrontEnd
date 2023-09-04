export default interface Block {
    id: number;
    dailyMortality: number;
    dailyGasCylinder: number;
    weightFirstWeek: number;
    weightEveryFeeding: number;
    weightByTheEnd: number;
    foodNature: string;
    foodQuantity: number;
    buildingId: number|any;
}