import Transactions from "./Transactions";
import {CounterParty} from "./CounterParty";
import TransactionProductDetail from "./TransactionProductDetail";

export interface Transaction {
    id : string | undefined,
    type : TransactionType ,
    counterParty : CounterParty |undefined,
    transactionProductsDetails : TransactionProductDetail[],
    timeStamp : Date | undefined
}

export enum TransactionType{
    PURCHASE = 'PURCHASE', SELES = 'SELES'
}