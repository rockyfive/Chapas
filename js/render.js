"use strict";
// screen* and update* methods.

function screenTitle(){
	//Dibuja la pantalla de titulo.
    context1.drawImage(imageFondo,0, 0, CANVAS_WIDTH, RESULT_HEIGHT, 0, 0, CANVAS_WIDTH, RESULT_HEIGHT);

    context.drawImage(imageFondo, 0, RESULT_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0, canvas.width, canvas.height);
}

function screenSelectTeam(imagenNombreJugador, color1, color2){
	// Esta función da a elegir la chapa de un equipo al jugador.
	  context.rect(0, -50, canvas.width, canvas.height + 50);
	  context1.rect(0, 0, canvas.width, canvas.height + 50);
      const grd1 = context1.createLinearGradient(0, 0, canvas.width, canvas.height + RESULT_HEIGHT);
      
      grd1.addColorStop(0, color1);   
      
      grd1.addColorStop(1, color2);
      context1.fillStyle = grd1;
      context1.fill();
      
      const grd2 = context.createLinearGradient(0, - RESULT_HEIGHT, canvas.width, canvas.height);
      
      grd2.addColorStop(0, color1);   
      
      grd2.addColorStop(1, color2);
      context.fillStyle = grd2;
      context.fill();

	for (let i = 0; i < imageEquipo.length; i++) {
        context.drawImage(imageEquipo[i], posxs[i%5] - SEL_RADIO, posys[i%3] - SEL_RADIO, SEL_RADIO * 2, SEL_RADIO * 2);
    }
    context.drawImage(imagenNombreJugador, CANVAS_WIDTH / 2 - 200, 390, imagenNombreJugador.width, imagenNombreJugador.height);

		
}

function screenVictory(equipo) {
    // La función indica el ganador y vuelve a la pantalla de título al hacer clic.
    context.drawImage(imageGana,
        canvas.width / 2 - imageGana.width / 2,
        canvas.height / 3 - imageGana.height / 2
    );
    const winner = equipo==1?imageJugador1:imageJugador2;
    context.drawImage(winner, CANVAS_WIDTH / 2 - 200, 300, winner.width, winner.height);
    estado = 5;
}

function drawGol() {
    context.drawImage(imageGol, canvas.width / 2 - imageGol.width / 2, canvas.height / 2 - imageGol.height / 2);
}

function drawResult() {
    // Actualiza el resultado tras un gol y al inicio.
	context1.rect(0, 0, canvas.width, canvas.height);

	// Añade un degradado de fondo
    const grd = context1.createLinearGradient(0, 0, canvas.width, canvas.height);
    grd.addColorStop(0, '#4CB8C4');   
    grd.addColorStop(1, '#3CD3AD');
    context1.fillStyle = grd;
    context1.fill();

    // Añade el texto de los resultados, y en rojo el jugador al que le toca jugar.
 	context1.font = '30pt Calibri';
    context1.textAlign = 'center';
    context1.fillStyle = turno==1?"red":"white";
    context1.fillText('Jugador1 0' + goles[0], 200, 30);

    context1.fillStyle = turno==2?"red":"white";
    context1.fillText('0' + goles[1] + ' Jugador2', CANVAS_WIDTH - 200, 30);
}


function drawField() {
    	// Limpia el canvas y dibuja el campo.
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imageCampo, 0, 0, canvas.width, canvas.height);
    
        // Dibuja las imágenes de las chapas.
        for (let i = 0; i < xs.length; i++) {
            context.drawImage(imageChapa[Math.ceil(i / 5)], xs[i] - CHAPA_RADIO, ys[i] - CHAPA_RADIO, CHAPA_WIDTH, CHAPA_HEIGHT);
        }
    
        // Dibuja las porterias.
        context.beginPath();
        context.moveTo(0, canvas.height/2-EXTERIOR_PORTERIA);
        context.lineTo(0, canvas.height/2+EXTERIOR_PORTERIA);
        context.lineWidth = 15;
        context.strokeStyle ='#FFFFFF'
        context.stroke();
    
        context.beginPath();
        context.moveTo(0, canvas.height/2-INTERIOR_PORTERIA);
        context.lineTo(0, canvas.height/2+INTERIOR_PORTERIA);
        context.strokeStyle ='#004CB3';
        context.stroke();
    
        context.beginPath();
        context.moveTo(CANVAS_WIDTH, canvas.height/2-EXTERIOR_PORTERIA);
        context.lineTo(CANVAS_WIDTH, canvas.height/2+EXTERIOR_PORTERIA);
        context.strokeStyle ='#FFFFFF';
        context.stroke();
    
        context.beginPath();
        context.moveTo(CANVAS_WIDTH, canvas.height/2-INTERIOR_PORTERIA);
        context.lineTo(CANVAS_WIDTH, canvas.height/2+INTERIOR_PORTERIA);
        context.strokeStyle ='#004CB3';
        context.stroke();
}

// Si el jugador está moviendo la chapa, dibuja el trayecto.
function drawPath() {
    let clicToEndX = - xDist * 4;
    let clicToEndY = - yDist * 4;
    let endX = xs[numChapa] + clicToEndX;
    let endY = ys[numChapa] + clicToEndY;
    let midX;
    let midY;
    context.beginPath();
    context.moveTo(xs[numChapa], ys[numChapa]);
    if (endY < CHAPA_RADIO || endY > CANVAS_HEIGHT - CHAPA_RADIO) {
        const slope = (endX - xs[numChapa]) / (endY - ys[numChapa]);
        midY = endY<CHAPA_RADIO?CHAPA_RADIO:CANVAS_HEIGHT - CHAPA_RADIO;
        const clicToMidY = midY - ys[numChapa];
        const clicToMidX = clicToMidY * slope;
        midX = xs[numChapa] + clicToMidX;
        endX = midX + (clicToEndX - clicToMidX);
        endY = midY - (clicToEndY - clicToMidY);
        context.lineTo(midX, midY);
    }
    context.lineTo(endX, endY);
    context.lineWidth = 2;
    context.strokeStyle ='#000000';
    context.stroke();
    context.beginPath();
    context.moveTo(xs[numChapa], ys[numChapa]);
    context.lineTo(xDist * Math.min(dist, VEL_MAX * VEL_DIVISOR + CHAPA_RADIO) / dist + xs[numChapa], yDist * Math.min(dist, VEL_MAX * VEL_DIVISOR + CHAPA_RADIO) / dist + ys[numChapa]);
    context.strokeStyle = '#004CB3';
    context.stroke();
}