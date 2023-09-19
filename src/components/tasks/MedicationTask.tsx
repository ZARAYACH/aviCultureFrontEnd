import Block from "../Breeding/Block/Block";
import Disease from "../health/Disease";

export default interface MedicationTask {
    id: number,
    block : Block,
    disease : Disease,
    date: Date
}