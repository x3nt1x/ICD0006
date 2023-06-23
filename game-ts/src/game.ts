import { Car } from "./car";
import { Row } from "./row";

export class Game
{
    static MAP_ROWS: number = 15;

    state: { map: Row[]; car: Car; score: number; paused: boolean; collided: boolean; speed: NodeJS.Timer | undefined; delay: number; };
    current: number;

    constructor()
    {
        this.state = {
            map: [],
            car: new Car(),
            score: 0,
            paused: false,
            collided: false,
            speed: undefined,
            delay: 200
        }

        this.current = 0.45;

        this.initializeState();
    }

    addRow(): void
    {
        let low = this.current - 0.05;
        let high = this.current + 0.05;

        this.current = Math.random() * (high - low) + low;

        this.state.map.push(new Row(this.current));

        if (this.state.map.length > Game.MAP_ROWS)
            this.state.map.splice(0, 1);
    }

    initializeState(): void
    {
        for (let i = 0; i < Game.MAP_ROWS; i++)
            this.addRow();
    }
}