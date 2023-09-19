export default interface Building {
    id: number | undefined;
    name: string | undefined;
    nature : string | undefined;
    surface : number | undefined;
    temperature: number | undefined ;
    state: string | undefined;
    breedingCenterId: number | undefined;
    humidityRate: number | undefined
}