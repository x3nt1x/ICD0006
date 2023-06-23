import { Game } from "./game.js";
import { UI, addUICar, addUIRow } from "./ui.js";

const gameBoard = document.querySelector('#app');

let game;

initilize();

function initilize()
{
    gameBoard.innerHTML = "";

    if (game)
    {
        clearInterval(game.state.speed);
        clearInterval(game.state.delay);
    }

    game = new Game();

    for (let i = Game.MAP_ROWS - 1; i >= 0; i--)
        gameBoard.appendChild(addUIRow(game.state.map[i]));

    run()
}

function run()
{
    if (game.state.paused || game.state.collided)
        return;

    game.state.score++;

    game.addRow();

    gameBoard.lastChild.remove();

    gameBoard.prepend(addUIRow(game.state.map[Game.MAP_ROWS - 1]));

    clearInterval(game.state.speed);

    game.state.speed = setInterval(run, game.state.delay > 70 ? game.state.delay -= 0.5 : game.state.delay);
}

function didCollide()
{
    const car = document.querySelector(".car");
    const road = document.querySelectorAll(".road")[Game.MAP_ROWS - 1];

    const carBounds = car.getBoundingClientRect();
    const roadBounds = road.getBoundingClientRect();

    const collided = ((carBounds.left - roadBounds.left) < -10 || (roadBounds.right - carBounds.right) < -10);

    if (collided)
    {
        gameBoard.prepend(UI(false, game.state.score));
        return true;
    }

    return false;
}

document.onkeydown = function (event)
{
    switch (event.key)
    {
        case "ArrowLeft":
            game.state.car.moveLeft();
            break;
        case "ArrowRight":
            game.state.car.moveRight();
            break;
        case "Escape":
            if (!game.state.collided)
            {
                if (game.state.paused)
                    gameBoard.firstChild.remove();
                else
                    gameBoard.prepend(UI(true, game.state.score));

                game.state.paused = !game.state.paused;
            }
            break;
    }
};

setInterval(() =>
{
    if (game.state.paused || game.state.collided)
        return;

    document.querySelectorAll(".car").forEach(el => el.remove());

    gameBoard.lastChild.appendChild(addUICar(game.state.car.size, game.state.car.position));

    game.state.collided = didCollide();
});

document.addEventListener("click", (event) =>
{
    if (event.target && event.target.matches(".restart"))
        initilize();
});