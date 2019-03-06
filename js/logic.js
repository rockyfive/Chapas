"use strict";
function loadGame(){
	//Llamamos esta función para iniciar el juego cuando ha cargado la imagen. (canvas.js)
    screenTitle();

	resetPos();
	goles = [0, 0];
    turno = 1;
}

function resetPos() {
    // Resetea la posición de las chapas y su velocidad.
    xs = [...XS];
    ys = [...YS];
    velx.fill(0);
    vely.fill(0);
}

function setTurno(equipo) {
    estado = 3;
    turno = equipo;
    drawResult();
}

function gol(equipo) {
    // Se ejecuta al marcar gol.
    goles[equipo % 2]++;
    drawResult();

    // Detecta si alguien ha ganado el partido.
    if (goles[equipo % 2] == GOLES_VICTORIA)
        return screenVictory(equipo % 2 + 1);
        
    drawGol();
    updateCanvas();

    setTimeout(() => {
        resetPos();
        setTurno(equipo);
        update();
    }, 1500);
}

function update() {
    // Esta funcion se llama a si misma, salvo si se marca gol.
    // gol() vuelve a llamarla tras la animacion.
    drawField();
    // Si el jugador está moviendo la chapa, dibuja el trayecto.
    if (isMoved) {
        drawPath();
    }

    let teamGol = solveSideCollision();

    if (teamGol) {
        return gol(teamGol);
    }

    solveUpperBottomCollision();
    solveBallCollision();
    solveTurnChange();

    updateCanvas();

    setTimeout(() => update(), 10);     
}