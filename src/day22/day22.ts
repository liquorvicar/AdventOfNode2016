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
                console.log(diskA, diskB);
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
