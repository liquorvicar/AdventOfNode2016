'use strict';

import {calcMinMoves} from "./src/day11/day11";

const positions = [
    [],
    ['E', 'OG', 'TG', 'TM', 'PG', 'RG', 'RM', 'CG', 'CM'],
    ['OM', 'PM'],
    [],
    [],
];

console.log(calcMinMoves(positions, 0, undefined, []));