
/*

Code documentation:

1. HTML get zone elements
2. Entity class
3. Player class
4. EnemyGenerator class
5. Enemy class
6. Key down listener (Sprite translate functions)
7. Start game function
8. Objects instancement

*/

const body = document.getElementById('body');
const popUp = document.getElementById('popUp');
const nameInput = document.getElementById('nameInput');
const playButton = document.getElementById('playButton');
const counter = document.getElementById('counter');

class Entity {
    constructor(type, health, size, speed, positionX, positionY) {
        this.type = type;
        this.health = health;
        this.size = size;
        this.speed = speed;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    getType() {
        return this.type;
    }

    getHealth() {
        return this.health;
    }

    getSize() {
        return this.size;
    }

    getSpeed() {
        return this.speed;
    }

    getPositionX() {
        return this.positionX;
    }

    getPositionY() {
        return this.positionY;
    }

    setHealth(health) {
        this.health = health;
    }

    setPositionX(action, positionX) {
        if (action == 0) {
            if (this.positionX < this.screenWidth) {
                this.positionX += positionX;
            }
        } else if (action == 1) {
            if (this.positionX > 0) {
                this.positionX -= positionX;
            }
        }
    }

    setPositionY(action, positionY) {
        if (action == 0) {
            if (this.positionY < this.screenHeight) {
                this.positionY += positionY;
            }
        } else if (action == 1) {
            if (this.positionY > 0) {
                this.positionY -= positionY;
            }
        }
    }
}

class Player extends Entity {
    spriteImgLeft = document.getElementById('spriteImgLeft');
    spriteImgRight = document.getElementById('spriteImgRight');
    playerGhost = document.getElementById('playerGhost');
    screenHeight = body.clientHeight;
    screenWidth = body.clientWidth;

    constructor(name, score, type, health, size, speed, positionX, positionY) {
        super(type, health, size, speed, positionX, positionY);
        this.name = name;
        this.score = score;
    }

    getName() {
        return this.name;
    }

    getScore() {
        return this.score;
    }

    setScore() {
        this.score++;
        counter.textContent = `PUNTAJE: ${this.score}`;
    }

    setName(name) {
        this.name = name;
    }

    setScore(score) {
        this.score = score;
    }

    moveX(action) {
        if (action == 0) {
            this.hideGhostLeft();
            this.showGhostRight();
            this.playerGhost.style.transform = `translate(${this.positionX}px, ${this.positionY}px)`;
        } else if (action == 1) {
            this.hideGhostRight();
            this.showGhostLeft();
            this.playerGhost.style.transform = `translate(${this.positionX}px, ${this.positionY}px)`;
        }
    }

    moveY(action) {
        if (action == 0) {
            this.playerGhost.style.transform = `translate(${this.positionX}px, ${this.positionY}px)`;
        } else if (action == 1) {
            this.playerGhost.style.transform = `translate(${this.positionX}px, ${this.positionY}px)`;
        }
    }

    showGhostLeft() {
        spriteImgLeft.removeAttribute('left_player_ghost_no_display');
        spriteImgLeft.setAttribute('class', 'left_player_ghost');
    }

    showGhostRight() {
        spriteImgRight.removeAttribute('right_player_ghost_no_display');
        spriteImgRight.setAttribute('class', 'right_player_ghost');
    }

    hideGhostLeft() {
        spriteImgLeft.removeAttribute('left_player_ghost');
        spriteImgLeft.setAttribute('class', 'left_player_ghost_no_display');
    }

    hideGhostRight() {
        spriteImgRight.removeAttribute('right_player_ghost');
        spriteImgRight.setAttribute('class', 'right_player_ghost_no_display');
    }
}

class EnemyGenerator extends Entity {
    constructor(type, health, size, speed, positionX, positionY) {
        super(type, health, size, speed, positionX, positionY);
    }
}

class Enemy extends EnemyGenerator {
    constructor(type, health, size, speed, positionX, positionY) {
        super(type, health, size, speed, positionX, positionY);
    }
}

body.addEventListener("keydown", function (e) {
    switch (e.key) {

        case 'd':
            player.setPositionX(0, speed);
            player.moveX(0);
            break;

        case 'a':
            player.setPositionX(1, speed);
            player.moveX(1);
            break;

        case 'w':
            player.setPositionY(1, speed);
            player.moveY(1);
            break;

        case 's':
            player.setPositionY(0, speed);
            player.moveY(0);
            break;

        case 'e':
            // console.log('digonal arriba-derecha');
            player.setPositionX(0, (speed * 60) / 100);
            player.setPositionY(1, (speed * 60) / 100);
            player.moveX(0);
            player.moveY(1);
            break;

        case 'x':
            // console.log('digonal abajo-derecha');
            player.setPositionX(0, (speed * 60) / 100);
            player.setPositionY(0, (speed * 60) / 100);
            player.moveX(0);
            player.moveY(0);
            break;

        case 'z':
            // console.log('digonal abajo-izquierda');
            player.setPositionX(1, (speed * 60) / 100);
            player.setPositionY(0, (speed * 60) / 100);
            player.moveX(1);
            player.moveY(0);
            break;

        case 'q':
            // console.log('digonal arriba-izquierda');
            player.setPositionX(1, (speed * 60) / 100);
            player.setPositionY(1, (speed * 60) / 100);
            player.moveX(1);
            player.moveY(1);
            break;
    }
});

playButton.addEventListener("click", function () {
    if (!nameInput.value == "") {
        player.showGhostRight();

        const fragment = document.createDocumentFragment();
        const counterDiv = document.createElement('div');
        counterDiv.setAttribute('class', 'counter_div');

        const counter = document.createElement('p');
        counter.setAttribute('class', 'counter');
        counter.setAttribute('id', 'counter');
        counter.textContent = `PUNTAJE: `;

        counterDiv.appendChild(counter);
        fragment.appendChild(counterDiv);
        body.appendChild(fragment);

        popUp.removeAttribute('pop_up');
        popUp.setAttribute('class', 'pop_up_hidden');
    } else {
        alert('El campo esta vacio');
    }
});

const player = new Player(nameInput.value, 0, 'ghost', 100, 1, 8, 0, 0);
let speed = player.getSpeed();