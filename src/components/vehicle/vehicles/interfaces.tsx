export interface VehicleIntervention {
  id : number | undefined,
  nature : string | undefined,
  description : string | undefined,
  kilometerage : string | undefined,
  date : Date | undefined,
  price : number | undefined,
  mechanicName : string | undefined,
  vehicleId : number | undefined
}
export interface User {
  // Define properties of the User interface if not already defined elsewhere
}

export interface Document {
  // Define properties of the Document interface if not already defined elsewhere
}


export interface Vehicle {
  id: number| undefined;
  type: string| undefined;
  marque: string| undefined;
  module: number| undefined;
  licencePlate: string| undefined;
  firstRollingDate: string| undefined; // Assuming you represent LocalDate as a string
}
