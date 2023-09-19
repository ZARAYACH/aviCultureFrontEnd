import Block from "../Breeding/Block/Block";
import Disease from "../health/Disease";

export default interface VaccinationTask {
    id: number | undefined,
    type: VaccinationTaskType | undefined,
    block: Block | undefined,
    disease: Disease | undefined,
    date: Date | undefined
}

export enum VaccinationTaskType {
    PRINCIPAL = 'PRINCIPAL', RAPPEL = 'RAPPEL'

}