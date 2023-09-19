import Buildings from "../Breeding/buildings/Buildings";
import Building from "../Breeding/buildings/Building";

export default interface BulbsReplacementTask {
    id : number | undefined,
    building : Building | undefined,
    replacedBulbCount : number | undefined,
    date : Date | undefined
}
