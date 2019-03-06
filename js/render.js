"use strict";
// screen* and update* methods.

function screenTitle(){
	//Dibuja la pantalla de titulo.
    resContext.drawImage(imageFondo,0, 0, CANVAS_WIDTH, RESULT_HEIGHT, 0, 0, CANVAS_WIDTH, RESULT_HEIGHT);

    fieldContext.drawImage(imageFondo, 0, RESULT_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0, fieldCanvas.width, fieldCanvas.height);
    updateCanvas();
}

function screenSelectTeam(imagenNombreJugador, color1, color2){
	// Esta función da a elegir la chapa de un equipo al jugador.
	  fieldContext.rect(0, -50, fieldCanvas.width, fieldCanvas.height + 50);
	  resContext.rect(0, 0, fieldCanvas.width, fieldCanvas.height + 50);
      const grd1 = resContext.createLinearGradient(0, 0, fieldCanvas.width, fieldCanvas.height + RESULT_HEIGHT);
      
      grd1.addColorStop(0, color1);   
      
      grd1.addColorStop(1, color2);
      resContext.fillStyle = grd1;
      resContext.fill();
      
      const grd2 = fieldContext.createLinearGradient(0, - RESULT_HEIGHT, fieldCanvas.width, fieldCanvas.height);
      
      grd2.addColorStop(0, color1);   
      
      grd2.addColorStop(1, color2);
      fieldContext.fillStyle = grd2;
      fieldContext.fill();

	for (let i = 0; i < imageEquipo.length; i++) {
        fieldContext.drawImage(imageEquipo[i], posxs[i%5] - SEL_RADIO, posys[i%3] - SEL_RADIO, SEL_RADIO * 2, SEL_RADIO * 2);
    }
    fieldContext.drawImage(imagenNombreJugador, CANVAS_WIDTH / 2 - 200, 390, imagenNombreJugador.width, imagenNombreJugador.height);

	updateCanvas();	
}

function screenVictory(equipo) {
    // La función indica el ganador y vuelve a la pantalla de título al hacer clic.
    fieldContext.drawImage(imageGana,
        fieldCanvas.width / 2 - imageGana.width / 2,
        fieldCanvas.height / 3 - imageGana.height / 2
    );
    const winner = equipo==1?imageJugador1:imageJugador2;
    fieldContext.drawImage(winner, CANVAS_WIDTH / 2 - 200, 300, winner.width, winner.height);
    estado = 5;
    updateCanvas();
}

function drawGol() {
    fieldContext.drawImage(imageGol, fieldCanvas.width / 2 - imageGol.width / 2, fieldCanvas.height / 2 - imageGol.height / 2);
}

function drawResult() {
    // Actualiza el resultado tras un gol y al inicio.
	resContext.rect(0, 0, fieldCanvas.width, fieldCanvas.height);

	// Añade un degradado de fondo
    const grd = resContext.createLinearGradient(0, 0, fieldCanvas.width, fieldCanvas.height);
    grd.addColorStop(0, '#4CB8C4');   
    grd.addColorStop(1, '#3CD3AD');
    resContext.fillStyle = grd;
    resContext.fill();

    // Añade el texto de los resultados, y en rojo el jugador al que le toca jugar.
 	resContext.font = '30pt Calibri';
    resContext.textAlign = 'center';
    resContext.fillStyle = turno==1?"red":"white";
    resContext.fillText('Jugador1 0' + goles[0], 200, 30);

    resContext.fillStyle = turno==2?"red":"white";
    resContext.fillText('0' + goles[1] + ' Jugador2', CANVAS_WIDTH - 200, 30);
}


function drawField() {
    	// Limpia el canvas y dibuja el campo.
        fieldContext.clearRect(0, 0, fieldCanvas.width, fieldCanvas.height);
        fieldContext.drawImage(imageCampo, 0, 0, fieldCanvas.width, fieldCanvas.height);
    
        // Dibuja las imágenes de las chapas.
        for (let i = 0; i < xs.length; i++) {
            fieldContext.drawImage(imageChapa[Math.ceil(i / 5)], xs[i] - CHAPA_RADIO, ys[i] - CHAPA_RADIO, CHAPA_WIDTH, CHAPA_HEIGHT);
        }
    
        // Dibuja las porterias.
        fieldContext.beginPath();
        fieldContext.moveTo(0, fieldCanvas.height/2-EXTERIOR_PORTERIA);
        fieldContext.lineTo(0, fieldCanvas.height/2+EXTERIOR_PORTERIA);
        fieldContext.lineWidth = 15;
        fieldContext.strokeStyle ='#FFFFFF'
        fieldContext.stroke();
    
        fieldContext.beginPath();
        fieldContext.moveTo(0, fieldCanvas.height/2-INTERIOR_PORTERIA);
        fieldContext.lineTo(0, fieldCanvas.height/2+INTERIOR_PORTERIA);
        fieldContext.strokeStyle ='#004CB3';
        fieldContext.stroke();
    
        fieldContext.beginPath();
        fieldContext.moveTo(CANVAS_WIDTH, fieldCanvas.height/2-EXTERIOR_PORTERIA);
        fieldContext.lineTo(CANVAS_WIDTH, fieldCanvas.height/2+EXTERIOR_PORTERIA);
        fieldContext.strokeStyle ='#FFFFFF';
        fieldContext.stroke();
    
        fieldContext.beginPath();
        fieldContext.moveTo(CANVAS_WIDTH, fieldCanvas.height/2-INTERIOR_PORTERIA);
        fieldContext.lineTo(CANVAS_WIDTH, fieldCanvas.height/2+INTERIOR_PORTERIA);
        fieldContext.strokeStyle ='#004CB3';
        fieldContext.stroke();
}

// Si el jugador está moviendo la chapa, dibuja el trayecto.
function drawPath() {
    let length = Math.min(dist, VEL_MAX * VEL_DIVISOR + CHAPA_RADIO);
    let clicToEndX = - xDist * 4;
    let clicToEndY = - yDist * 4;
    let endX = xs[numChapa] + clicToEndX;
    let endY = ys[numChapa] + clicToEndY;
    let midX;
    let midY;
    fieldContext.beginPath();
    fieldContext.moveTo(xs[numChapa], ys[numChapa]);
    if (endY < CHAPA_RADIO || endY > CANVAS_HEIGHT - CHAPA_RADIO) {
        const slope = (endX - xs[numChapa]) / (endY - ys[numChapa]);
        midY = endY<CHAPA_RADIO?CHAPA_RADIO:CANVAS_HEIGHT - CHAPA_RADIO;
        const clicToMidY = midY - ys[numChapa];
        const clicToMidX = clicToMidY * slope;
        midX = xs[numChapa] + clicToMidX;
        endX = midX + (clicToEndX - clicToMidX);
        endY = midY - (clicToEndY - clicToMidY);
        fieldContext.lineTo(midX, midY);
    }
    fieldContext.lineTo(endX, endY);
    fieldContext.lineWidth = 2;
    fieldContext.strokeStyle ='#000000';
    fieldContext.stroke();
    fieldContext.beginPath();
    fieldContext.moveTo(xs[numChapa], ys[numChapa]);
    fieldContext.lineTo(xDist * length / dist + xs[numChapa], yDist * length / dist + ys[numChapa]);
    fieldContext.strokeStyle = '#004CB3';
    fieldContext.stroke();
}

function updateCanvas() {
    gameContext.drawImage(resCanvas, 0, 0);
    gameContext.drawImage(fieldCanvas, 0, resCanvas.height);
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen().then(correctProportion);
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen().then(correctProportion);
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen().then(correctProportion);
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen().then(correctProportion);
    }
    
    function correctProportion() {
        
        const PROPORTION = elem.clientWidth / elem.clientHeight;
        const fullscreenProp = elem.width / elem.height;
        console.log(PROPORTION);
        console.log(fullscreenProp);
        if (PROPORTION < fullscreenProp) {
            marginTop = (elem.width - elem.width * elem.clientHeight / elem.clientWidth) / 2;
            gameHeight = elem.width * elem.clientHeight / elem.clientWidth;
        } else {
            marginLeft = (elem.width - PROPORTION * elem.height) / 2;
            gameWidth = PROPORTION * elem.height;
        }

        elem.addEventListener("fullscreenchange", exitHandler, false);
    }

  }
function exitHandler(e) {

    if (document.fullscreenElement == null) {
    gameHeight = e.target.height;
    gameWidth = e.target.width;
    marginLeft = 0;
    marginTop = 0;
    e.target.removeEventListener("fullscreenchange", exitHandler);
}
}
