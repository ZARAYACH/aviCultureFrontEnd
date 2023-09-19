import Buildings from "../Breeding/buildings/Buildings";
import Building from "../Breeding/buildings/Building";

export default interface BulbsReplacementTask {
    id : number,
    building : Building,
    replacedBulbCount : number,
    date : Date
}
