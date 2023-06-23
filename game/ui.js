import { Game } from "./game.js";

const rowHeight = window.innerHeight / Game.MAP_ROWS;

export function UI(paused = false, scoreValue)
{
    const overlay = document.createElement("div");
    const title = document.createElement("h1");
    const score = document.createElement("h6");
    const restart = document.createElement("button");

    overlay.className = "overlay";
    restart.className = "restart";

    title.innerHTML = paused ? "Game Paused" : "Game Over";
    title.style.color = paused ? "green" : "red";

    score.innerHTML = "Score: " + scoreValue;
    score.style.color = "white";

    restart.innerHTML = "Restart";

    overlay.appendChild(title);
    overlay.appendChild(score);
    overlay.appendChild(restart);

    return overlay;
}

export function addUICar(size, position)
{
    const car = document.createElement("img");

    car.className = "car";

    car.setAttribute("src", "images/car.png");
    car.style.height = rowHeight + "px";
    car.style.width = (size * 100) + 'px';
    car.style.right = position + "%";

    return car;
}

export function addUIRow(row)
{
    const rowDiv = document.createElement('div');
    const leftDiv = document.createElement('div');
    const rightDiv = document.createElement('div');
    const roadDiv = document.createElement('div');

    rowDiv.className = "road-row";
    leftDiv.className = "leftEdge";
    rightDiv.className = "rightEdge";
    roadDiv.className = "road";

    leftDiv.style.height = rowHeight + "px";
    rightDiv.style.height = rowHeight + "px";
    roadDiv.style.height = rowHeight + "px";

    leftDiv.style.width = (row.leftEdge * 100) + '%';
    roadDiv.style.width = (row.rightEdge - row.leftEdge) * 100 + '%';
    rightDiv.style.width = (1 - row.rightEdge) * 100 + '%';

    rowDiv.appendChild(leftDiv);
    rowDiv.appendChild(roadDiv);
    rowDiv.appendChild(rightDiv);

    return rowDiv;
}