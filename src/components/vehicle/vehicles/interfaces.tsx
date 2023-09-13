export default interface VehicleIntervention {
  // Define properties of the VehicleIntervention interface if not already defined elsewhere
}
export default interface User {
  // Define properties of the User interface if not already defined elsewhere
}

export default interface Document {
  // Define properties of the Document interface if not already defined elsewhere
}


export default interface Vehicle {
  id: number| undefined;
  type: string| undefined;
  marque: string| undefined;
  module: number| undefined;
  licencePlate: string| undefined;
  firstRollingDate: string| undefined; // Assuming you represent LocalDate as a string
}
