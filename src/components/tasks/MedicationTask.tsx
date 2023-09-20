import Block from "../Breeding/Block/Block";
import Disease from "../health/Disease";

export default interface MedicationTask {
    id: number | undefined,
    block : Block | undefined,
    disease : Disease | undefined,
    date: Date | undefined
}