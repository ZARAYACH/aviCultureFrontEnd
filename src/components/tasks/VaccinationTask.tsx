import Block from "../Breeding/Block/Block";
import Disease from "../health/Disease";

export default interface VaccinationTask {
    id: number,
    type: VaccinationTaskType,
    block: Block,
    disease: Disease,
    date: Date
}

export enum VaccinationTaskType {
    PRINCIPAL = 'PRINCIPAL', RAPPEL = 'RAPPEL'

}