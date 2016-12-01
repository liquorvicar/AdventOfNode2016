'use strict';

import * as __ from "lodash";

const directions = ['N', 'E', 'S', 'W'];

export class Person {
    private direction: string;
    private x: number;
    private y: number;
    private visited: string[];
    private hasVisitedSameLocationTwice: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.direction = 'N';
        this.hasVisitedSameLocationTwice = false;
        this.visited = [];
    }

    public turn(direction: string): Person {
        let currentDirection = directions.indexOf(this.direction);
        let newDirection: number;
        if (direction ===  'R') {
            newDirection = (currentDirection + 1) % 4;
        } else {
            newDirection = (currentDirection + 3) % 4;
        }
        this.direction = directions[newDirection];
        return this;
    }

    private N() {
        this.y += 1;
    }

    private S() {
        this.y -= 1;
    }

    private E() {
        this.x += 1;
    }

    private W() {
        this.x -= 1;
    }

    public move(distance: number): Person {
        if (this.hasVisitedSameLocationTwice) {
            return this;
        }
        for (let i = 1; i <= distance; i++) {
            this[this.direction]();
            if (this.visited.indexOf(this.x + ':' + this.y) > -1) {
                this.hasVisitedSameLocationTwice = true;
                break;
            }
            this.visited.push(this.x + ':' + this.y);
        }
        return this;
    }

    public hasTravelled(): number {
        return Math.abs(this.x) + Math.abs(this.y);
    }

    public hasVisitedSameLocation(): boolean {
        return this.hasVisitedSameLocationTwice;
    }
}

export function movePerson(rawDirections: string): number {
    let person = new Person(0, 0);
    const directions = rawDirections.split(',');
    directions.forEach((direction: string) => {
        direction = __.trim(direction);
        let distance: number = parseInt(direction.substring(1), 10);
        person.turn(direction[0]).move(distance);
        if (person.hasVisitedSameLocation()) {
            return;
        }
    });
    return person.hasTravelled();
}