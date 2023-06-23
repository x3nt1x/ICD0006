export class Row
{
    constructor(leftEdge)
    {
        this.leftEdge = leftEdge;
        this.rightEdge = leftEdge + Row.WIDTH;
    }
}

Row.WIDTH = 0.2;