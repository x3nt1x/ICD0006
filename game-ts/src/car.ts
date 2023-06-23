export class Car
{
    size: number = 0.64;
    position: number = 45;

    moveLeft(): void
    {
        if (this.position < 97)
            this.position += 1;
    }

    moveRight(): void
    {
        if (this.position > 0)
            this.position -= 1;
    }
}