'use strict';
import {Floorplan, distinctLocations} from "./src/day13/day13";

let floorplan = new Floorplan(1358);
let locations = distinctLocations({x:1, y:1}, floorplan, [], []);

console.log(locations.length);
