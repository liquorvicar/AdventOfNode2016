'use strict';

export interface Disk {
    x: number;
    y: number;
    capacity: number;
    used: number;
    avail: number;
}

export const parseInput = (rawInput: string[]): Disk[] => {
    let re = new RegExp(/x([\d]+)-y([\d]+)[\W]+([\d]+)T\W+([\d]+)T\W+([\d]+)T\W+[0-9]+%$/);
    let disks: Disk[] = [];
    rawInput.forEach((rawDisk) => {
        let parts = rawDisk.match(re);
        disks.push(<Disk>{
            x: parseInt(parts[1], 10),
            y: parseInt(parts[2], 10),
            capacity: parseInt(parts[3], 10),
            used: parseInt(parts[4], 10),
            avail: parseInt(parts[5], 10)
        });
    });
    disks = disks.sort((diskA, diskB) => {
        if (diskA.avail > diskB.avail) {
            return -1;
        } else {
            return 1;
        }
    });
    return disks;
};

export const findPairs = (disks: Disk[]): Disk[][] => {
    let pairs: Disk[][] = [];
    for (let diskA of disks) {
        for (let diskB of disks) {
            if (diskA.used > 0 && diskA.used <= diskB.avail && (diskA.x != diskB.x || diskA.y != diskB.y)) {
                pairs.push([
                    diskA,
                    diskB
                ]);
            }
            if (diskA.used > diskB.avail) {
                break;
            }
        }
    }
    return pairs;
};

export const findShortestWayToGetData = (source: Disk, target: Disk, disks: Disk[]): number => {
    let minSteps = 0;
    let emptyDisk = findEmptyDisk(disks);
    minSteps += moveEmptyNextToDisk(disks, emptyDisk, target);
    minSteps += moveTargetDataNextToSource(disks, target, source);
    minSteps += moveEmptyNextToDisk(disks, emptyDisk, source);
    return minSteps + 1;
};

const findEmptyDisk = (disks: Disk[]): Disk => {
    return this.disks.find((disk) => disk.used === 0);
};

const moveEmptyNextToDisk = (disks: Disk[], emptyDisk: Disk, target: Disk, moves: string[], minSteps: number): number => {
    if ((emptyDisk.x === target.x && Math.abs(emptyDisk.y - target.y) === 1)
        || (emptyDisk.y === target.y && Math.abs(emptyDisk.x - target.x) === 1)) {
        return (minSteps > moves.length || minSteps === 0) ? moves.length : minSteps;
    }
    if (minSteps > 0 && moves.length > minSteps) {
        return minSteps;
    }
    let possibleMoves = findPossibleMoves(emptyDisk, target);
    possibleMoves.forEach((possibleMove) => {
        if (moves.indexOf(`${possibleMove.x}+${possibleMove.y}`) >= 0) {
            return;
        }
        let newMoves = JSON.parse(JSON.stringify(moves));
        newMoves.push(`${possibleMove.x}+${possibleMove.y}`);
        emptyDisk.used += possibleMove.used;
        emptyDisk.avail -= possibleMove.used;
        possibleMove.used = 0;
        minSteps = this.moveEmptyNextToDisk()
    });
    return 0;
};

const moveTargetDataNextToSource = (target: Disk, source: Disk): number => {
    return 0;
};

const findPossibleMoves = (current: Disk, target: Disk): Disk[] => {
    let possibleMoves = [];
    let left = this.findDisk(current.x - 1, current.y);
    if (left && left.avail <= current.used) {
        possibleMoves.push(left);
    }
    let right = this.findDisk(current.x + 1, current.y);
    if (right && right.avail <= current.used) {
        possibleMoves.push(right);
    }
    let up = this.findDisk(current.x, current.y - 1);
    if (up && up.avail <= current.used) {
        possibleMoves.push(up);
    }
    let down = this.findDisk(current.x, current.y + 1);
    if (down && down.avail <= current.used) {
        possibleMoves.push(down);
    }
    return possibleMoves.sort((diskA, diskB) => {
        let distanceA = Math.abs(diskA.x - target.x) + Math.abs(diskA.y - target.y);
        let distanceB = Math.abs(diskB.x - target.x) + Math.abs(diskB.y - target.y);
        if (distanceA < distanceB) {
            return -1;
        } else {
            return 1;
        }
    });
};

const findDisk = (x: number, y: number): Disk => {
    return this.disks.find(disk => disk.x === x && disk.y === y);
}