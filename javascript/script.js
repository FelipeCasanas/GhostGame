const body = document.getElementById('body');
const popUp = document.getElementById('popUp');
const nameInput = document.getElementById('nameInput');
const playButton = document.getElementById('playButton');

class Player {
    playerGhost = document.getElementById('playerGhost');
    spriteImgLeft = document.getElementById('spriteImgLeft');
    spriteImgRight = document.getElementById('spriteImgRight');
    screenHeight = body.clientHeight;
    screenWidth = body.clientWidth;

    constructor(name, score, positionX, positionY) {
        this.name = name;
        this.score = score;
        this.positionX = positionX;
        this.positionY = positionY
    }

    getName() {
        return this.name;
    }
    getScore() {
        return this.score;
    }
    getPositionX() {
        return this.positionX;
    }
    getPositionY() {
        return this.positionY;
    }

    setName(name) {
        this.name = name;
    }

    setScore(score) {
        this.score = score;
    }

    setPositionX(action, positionX) {
        if (action == 0) {
            if (this.positionX < this.screenWidth) {
                this.positionX += positionX;
                this.hideGhostLeft();
                this.showGhostRight();
                this.playerGhost.style.transform = `translate(${this.positionX}px, ${this.positionY}px)`;
            }
        } else if (action == 1) {
            if (this.positionX > 0) {
                this.positionX -= positionX;
                this.hideGhostRight();
                this.showGhostLeft();
                this.playerGhost.style.transform = `translate(${this.positionX}px, ${this.positionY}px)`;
            }
        }
    }

    setPositionY(action, positionY) {
        if (action == 0) {
            if (this.positionY < this.screenHeight) {
                this.positionY += positionY;
                this.playerGhost.style.transform = `translate(${this.positionX}px, ${this.positionY}px)`;
            }
        } else if (action == 1) {
            if (this.positionY > 0) {
                this.positionY -= positionY;
                this.playerGhost.style.transform = `translate(${this.positionX}px, ${this.positionY}px)`;
            }
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

const player1 = new Player("", 0, 1, 1);

playButton.addEventListener("click", function () {
    if (!nameInput.value == "") {
        player1.setName(nameInput.value);
        player1.showGhostRight();

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

body.addEventListener("keydown", function (e) {

    switch (e.key) {

        case 'd':
            player1.setPositionX(0, 6);
            break;

        case 'a':
            player1.setPositionX(1, 6);
            break;

        case 'w':
            player1.setPositionY(1, 6);
            break;

        case 's':
            player1.setPositionY(0, 6);
            break;

        case 'e':
            // console.log('digonal arriba-derecha');
            player1.setPositionX(0, 4);
            player1.setPositionY(1, 4);
            break;

        case 'x':
            // console.log('digonal abajo-derecha');
            player1.setPositionX(0, 4);
            player1.setPositionY(0, 4);
            break;

        case 'z':
            // console.log('digonal abajo-izquierda');
            player1.setPositionX(1, 4);
            player1.setPositionY(0, 4);
            break;

        case 'q':
            // console.log('digonal arriba-izquierda');
            player1.setPositionX(1, 4);
            player1.setPositionY(1, 4);
            break;
    }
});