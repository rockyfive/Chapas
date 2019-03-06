"use strict";

function startup() {
    gameCanvas.addEventListener("touchstart", handleStart, false);
    gameCanvas.addEventListener("touchend", handleEnd, false);
    gameCanvas.addEventListener("touchmove", handleMove, false);
    gameCanvas.addEventListener("touchcancel", handleEnd, false);

    gameCanvas.addEventListener("mousedown", handleStart, false);
    gameCanvas.addEventListener("mousemove", handleMove, false);
    gameCanvas.addEventListener("mouseup", handleEnd, false);

    loadGame();
  }

  function handleStart(e) {
    e.preventDefault();
    //console.log(e.type);
    /* Esta función reacciona al hacer clic, dependiendo del estado del juego:
     *
     * Estado 0: Pantalla de título
     * Estado 1: Pantalla de elección de equipo del jugador 1.
     * Estado 2: Pantalla de elección de equipo del jugador 2:
     * Estado 3: La partida ha comenzado y es el momento de que un jugador mueva.
     * Estado 4: Las chapas están en movimiento. No se puede interactuar.
     * Estado 5: La partida ha terminado, hacer clic vuelve a la pantalla de título.
    */
    switch (estado) {
        case 0:
            screenSelectTeam(imageJugador1, '#8ED6FF', '#004CB3');
            estado++;
            //openFullscreen(gameCanvas);
            break;            
        case 1:
            numChapa = checkClickBall(e, posxs, posys, equipoString.length, SEL_RADIO);
            if (numChapa != null) {
                imageChapa[1].src = equipoString[numChapa];
                screenSelectTeam(imageJugador2, '#403B4A', '#E7E9BB');
                estado++;
            }
            break;
        case 2:
            numChapa = checkClickBall(e, posxs, posys, equipoString.length, SEL_RADIO);
            if (numChapa != null) {
                imageChapa[2].src = equipoString[numChapa];
                update();
                setTurno(1); // estado = 3
            }
            break;
        case 3:
            numChapa = checkClickBall(e, xs, ys, xs.length, CHAPA_RADIO);
            if (numChapa != 0 && Math.ceil(numChapa / 5) == turno) {
                console.log('seleccionada:' + numChapa);
                isClicked = true;
                isMoved = false;
            }
            break;
        case 4:
            break;
        case 5:
            loadGame();
            estado = 0;
            break;
    }
}

  function handleMove(e) {
    e.preventDefault();
    //console.log(e.type);
    // Esta función se ejecuta mientras el jugador 
    // está clicando una de sus chapas en su turno,
    // para cada evento de movimiento de ratón.
    if (isClicked) {
        //console.log("moviendo...");
        isMoved = true;
        [xDist, yDist, dist] = getDistance(e, numChapa, numChapa, xs, ys);
    }

 }

 function handleEnd(e) {
    e.preventDefault();
    //console.log(e.type);
    // Este código se ejecuta én el momento que el jugador termina de lanzar la chapa.
    if (isClicked) {
        //console.log('soltando');
        isClicked = false;
        if (dist > CHAPA_RADIO && isMoved) {
            velx[numChapa] = - xDist * Math.min((dist - CHAPA_RADIO) / VEL_DIVISOR, VEL_MAX) / dist;
            vely[numChapa] = - yDist * Math.min((dist - CHAPA_RADIO) / VEL_DIVISOR, VEL_MAX) / dist;
            estado = 4;
        }
        isMoved = false;
        
    }
}


function checkClickBall(e, x, y, len, radio) {
    // La función comprueba si el ratón está encima de una chapa y devuelve el número de la chapa.
	const rect = gameCanvas.getBoundingClientRect();
    for (let i = 0; i < len; i++) {
        let distance;
        //xDist = e.pageX - rect.left - x[i%x.length] - window.scrollX;
        //yDist = e.pageY - rect.top - y[i%y.length] - window.scrollY - resCanvas.height;
        //const distance = Math.sqrt(xDist * xDist + yDist * yDist);
        [xDist, yDist, distance] = getDistance(e, i%x.length, i%y.length, x, y);
        if (distance < radio) {
            return i;
        }
    }
    return null;
}

function getDistance(e, ix, iy, x, y) {
    let rectLeft = 0;
    let rectTop = 0;
    if (e.touches) {
        let rect = gameCanvas.getBoundingClientRect();
        e.offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft;     
        e.offsetY = e.touches[0].pageY - e.touches[0].target.offsetTop;
        rectLeft = rect.left;
        rectTop = rect.top;
    }
    let xDist = (e.offsetX / gameCanvas.clientWidth) * gameWidth - x[ix] + fsMarginLeft - rectLeft - window.scrollX;
    let yDist = (e.offsetY / gameCanvas.clientHeight) * gameHeight - resCanvas.height - y[iy] + fsMarginTop -rectTop - window.scrollY;
    let dist = Math.sqrt(xDist * xDist + yDist * yDist);

    return [xDist, yDist, dist];
}

