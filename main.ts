'use strict';
import {Floorplan, shortestRoute} from "./src/day13/day13";

let floorplan = new Floorplan(1358);
let minMoves = shortestRoute({x:1, y:1}, {x:31, y:39}, floorplan, [], 0);

console.log(minMoves);
