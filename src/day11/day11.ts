'use strict';

const getPossibleElevators = (floorContents: string[], elevator: string[], possibleElevators: string[]): string[] => {
    if (floorContents.length == 0) {
        if (elevator.length === 1 || elevator.length === 2) {
            let thisElevator = JSON.parse(JSON.stringify(elevator));
            thisElevator.push('E');
            let elevatorKey = thisElevator.sort().join('-');
            if (possibleElevators.indexOf(elevatorKey) < 0) {
                possibleElevators.push(elevatorKey);
            }
        }
        return possibleElevators;
    }
    floorContents.forEach((floorItem) => {
        if (floorItem === 'E') {
            return;
        }
        let newFloorContents = floorContents.filter((newFloorItem) => {
            return newFloorItem !== floorItem && newFloorItem !== 'E';
        });
        possibleElevators = getPossibleElevators(newFloorContents, elevator, possibleElevators);
        if (elevator.length < 2) {
            let newElevator = JSON.parse(JSON.stringify(elevator));
            newElevator.push(floorItem);
            possibleElevators = getPossibleElevators(newFloorContents, newElevator, possibleElevators);
        }
    });
    return possibleElevators;
};

const getMoves = (positions: string[][], currentFloor: number, nextFloor: number): string[][][] => {
    let moves: string[][][] = [];
    let possibleElevators = getPossibleElevators(positions[currentFloor], [], []);
    let optimalMoves: string[];
    if (currentFloor < nextFloor) {
        optimalMoves = possibleElevators.filter((elevator) => elevator.length === 3);
    } else {
        optimalMoves = possibleElevators.filter((elevator) => elevator.length === 2);
    }
    possibleElevators = optimalMoves.length > 0 ? optimalMoves : possibleElevators;
    possibleElevators.forEach((possibleElevatorKey) => {
        let possibleElevator = possibleElevatorKey.split('-');
        let thisMove = JSON.parse(JSON.stringify(positions));
        thisMove[currentFloor] = thisMove[currentFloor].filter((floorItem) => {
            return (possibleElevator.indexOf(floorItem) < 0);
        });
        thisMove[nextFloor] = thisMove[nextFloor].concat(possibleElevator).sort();
        if (validateMove(thisMove)) {
            moves.push(thisMove);
        }
    });
    return moves;
};

export const getNextMoves = (positions: string[][]): string[][][] => {
    let moves: string[][][] = [];
    let currentFloor = 0;
    positions.forEach((floor, floorNum) => {
        if (floor.indexOf('E') >= 0) {
            currentFloor = floorNum;
        }
    });
    if (currentFloor < 4) {
        moves = moves.concat(getMoves(positions, currentFloor, currentFloor+1));
    }
    if (currentFloor > 1) {
        moves = moves.concat(getMoves(positions, currentFloor, currentFloor-1));
    }
    return moves;
};

export const validateMove = (positions: string[][]): boolean => {
    let valid = true;
    positions.forEach((floor) => {
        let chips = floor.filter((floorItem) => floorItem.indexOf('M') >= 0);
        let unguardedChips = chips.some((chip) => {
            let generator = chip[0] + 'G';
            return floor.indexOf(generator) < 0;
        });
        let hasGenerators = floor.some((floorItem) => floorItem.indexOf('G') >= 0);
        if (unguardedChips && hasGenerators) {
            valid = false;
        }
    });
    return valid;
};

const finished = (positions: string[][]): boolean => {
    return ((positions[0].length + positions[1].length + positions[2].length + positions[3].length) === 0);
};

const normalizePositions = (positions: string[][]): string => {
    let floors = positions.map((floor) => {
        let chips = floor.filter((floorItem) => {
            return floorItem[1] === 'M';
        });
        let generators = floor.filter((floorItem) => {
            return floorItem[1] === 'G';
        });
        let pairs = chips.filter((chip) => {
            return generators.indexOf(chip[0] + 'G') >= 0;
        }).map((pair) => 'P');
        let floorKey = pairs.join('');
        for (let i = pairs.length; i < chips.length; i++) {
            floorKey += 'C';
        }
        for (let i = pairs.length; i < generators.length; i++) {
            floorKey += 'G';
        }
        return floorKey;
    });
    return floors.join('-');
};

export const calcMinMoves = (positions: string[][], moves: number, minMoves: number, previousMoves: string[]): number => {
    if ((minMoves && moves >= minMoves)) {
        return minMoves;
    }
    if (finished(positions)) {
        if (!minMoves || moves < minMoves) {
            return moves;
        } else {
            return minMoves;
        }
    }
    let possibleMoves = getNextMoves(positions);
    possibleMoves.forEach((possibleMove) => {
        let moveKey = normalizePositions(possibleMove);
        console.log(moveKey, moves, minMoves);
        if (previousMoves.indexOf(moveKey) < 0) {
            let thesePreviousMoves = JSON.parse(JSON.stringify(previousMoves));
            thesePreviousMoves.push(moveKey);
            minMoves = calcMinMoves(possibleMove, moves+1, minMoves, thesePreviousMoves);
        }
    });
    return minMoves;
};
