import { Car } from "./car.js";
import { Row } from "./row.js";

export class Game
{
    constructor()
    {
        this.state = {
            map: [],
            car: new Car(),
            score: 0,
            paused: false,
            collided: false,
            speed: 200,
            delay: 200
        }

        this.current = 0.45;

        this.initializeState();
    }

    addRow()
    {
        let low = this.current - 0.05;
        let high = this.current + 0.05;

        this.current = Math.random() * (high - low) + low;

        this.state.map.push(new Row(this.current));

        if (this.state.map.length > Game.MAP_ROWS)
            this.state.map.splice(0, 1);
    }

    initializeState()
    {
        for (let i = 0; i < Game.MAP_ROWS; i++)
            this.addRow();
    }
}

Game.MAP_ROWS = 15;