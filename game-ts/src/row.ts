export class Row
{
    static WIDTH: number = 0.2;

    leftEdge: number;
    rightEdge: number;

    constructor(leftEdge: number)
    {
        this.leftEdge = leftEdge;
        this.rightEdge = leftEdge + Row.WIDTH;
    }
}