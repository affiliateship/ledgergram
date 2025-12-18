import { initializePostgres } from "./database";
import { initFireFly } from "./firefly";

export function load() {
    initializePostgres();
    initFireFly();
}
