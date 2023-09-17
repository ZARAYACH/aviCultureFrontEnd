
export interface CounterParty {
    id : number | undefined,
    emailAddress : string | undefined,
    name : string | undefined,
    address : string | undefined,
    phoneNumber: string | undefined,
    type : CounterPartyType | undefined,
    suppliesType : string[]
}
export enum CounterPartyType {
    CUSTOMER = 'CUSTOMER', SUPPLIER = 'SUPPLIER'
}

