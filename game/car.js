export class Car
{
    constructor()
    {
        this.size = 0.64;
        this.position = 45;
    }

    moveLeft()
    {
        if (this.position < 97)
            this.position += 1;
    }

    moveRight()
    {
        if (this.position > 0)
            this.position -= 1;
    }
}