export default interface Building {
    id: number | undefined;
    name: string | undefined;
    nature: string | undefined;
    humidityRate: number | undefined;
    surface: number | undefined;
    temperature: number | undefined;
    state: string | undefined;
    breedingCenterId: number | undefined;
  }