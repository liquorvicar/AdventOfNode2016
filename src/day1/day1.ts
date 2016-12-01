'use strict';

import * as __ from "lodash";

const directions = ['N', 'E', 'S', 'W'];

export class Person {
    private direction: string;
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.direction = 'N';
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

    public move(distance: number): Person {
        switch (this.direction) {
            case 'N':
                this.y += distance;
                break;
            case 'S':
                this.y -= distance;
                break;
            case 'W':
                this.x -= distance;
                break;
            case 'E':
                this.x += distance;
                break;
        }
        return this;
    }

    public hasTravelled(): number {
        return Math.abs(this.x) + Math.abs(this.y);
    }
}

export function movePerson(rawDirections: string): number {
    let person = new Person(0, 0);
    const directions = rawDirections.split(',');
    directions.forEach((direction: string) => {
        direction = __.trim(direction);
        let distance: number = parseInt(direction.substring(1), 10);
        person.turn(direction[0]).move(distance);
    });
    return person.hasTravelled();
}