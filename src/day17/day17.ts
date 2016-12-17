'use strict';

import * as crypto from "crypto";

export interface Room {
    x: number;
    y: number;
}

export const findOpenDoors = (room: Room, passcode: string, route: string): string[] => {
    let hashInput = passcode + route;
    let hash = crypto.createHash('md5').update(hashInput).digest("hex");
    let openDoors = [];
    let openCodes = 'bcdef';
    if (room.y > 0 && openCodes.indexOf(hash[0]) >= 0) {
        openDoors.push('U');
    }
    if (room.y < 3 && openCodes.indexOf(hash[1]) >= 0) {
        openDoors.push('D');
    }
    if (room.x > 0 && openCodes.indexOf(hash[2]) >= 0) {
        openDoors.push('L');
    }
    if (room.x < 3 && openCodes.indexOf(hash[3]) >= 0) {
        openDoors.push('R');
    }
    return openDoors;
};

export const findPath = (passcode: string): number => {
    return longestPath({ x:0, y:0 }, passcode, '', 0);
};

export const shortestPath = (room: Room, passcode: string, route: string, currentShortest: string): string => {
    if (currentShortest.length > 0 && route.length > currentShortest.length) {
        return currentShortest;
    }
    if (room.x === 3 && room.y === 3) {
        return route;
    }
    let doors = findOpenDoors(room, passcode, route);
    doors.forEach((door) => {
        let newRoom = JSON.parse(JSON.stringify(room));
        switch (door) {
            case 'U':
                newRoom.y -= 1;
                break;
            case 'D':
                newRoom.y += 1;
                break;
            case 'L':
                newRoom.x -= 1;
                break;
            case 'R':
                newRoom.x += 1;
                break;
        }
        currentShortest = shortestPath(newRoom, passcode, route + door, currentShortest);
    });
    return currentShortest;
};

export const longestPath = (room: Room, passcode: string, route: string, currentLongest: number): number => {
    if (room.x === 3 && room.y === 3) {
        return route.length > currentLongest ? route.length : currentLongest;
    }
    let doors = findOpenDoors(room, passcode, route);
    doors.forEach((door) => {
        let newRoom = JSON.parse(JSON.stringify(room));
        switch (door) {
            case 'U':
                newRoom.y -= 1;
                break;
            case 'D':
                newRoom.y += 1;
                break;
            case 'L':
                newRoom.x -= 1;
                break;
            case 'R':
                newRoom.x += 1;
                break;
        }
        currentLongest = longestPath(newRoom, passcode, route + door, currentLongest);
    });
    return currentLongest;
};
