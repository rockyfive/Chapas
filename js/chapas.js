CANVAS_WIDTH = 800;
CANVAS_HEIGHT = 500;
RESULT_WIDTH = CANVAS_WIDTH;
RESULT_HEIGHT = 50;
FRICTION = 0.05;
VEL_MAX = 10;
VEL_DIVISOR = 8;
CHAPA_RADIO = 25;
SEL_RADIO = 45;
CHAPA_WIDTH = 2 * CHAPA_RADIO;
CHAPA_HEIGHT = CHAPA_WIDTH;
INTERIOR_PORTERIA = 55;
EXTERIOR_PORTERIA = 80;
GOLES_VICTORIA = 3;
var XS = [CANVAS_WIDTH / 2, 90, 175, 175, 300, 300, CANVAS_WIDTH - 90, CANVAS_WIDTH - 175, CANVAS_WIDTH - 175, CANVAS_WIDTH - 300, CANVAS_WIDTH - 300];
var YS = [CANVAS_HEIGHT / 2, 250, 350, 150, 80, 420, CANVAS_HEIGHT - 250, CANVAS_HEIGHT - 350, CANVAS_HEIGHT - 150, CANVAS_HEIGHT - 80, CANVAS_HEIGHT - 420];

xs = new Array();
ys = new Array();


var posxs = [1/6*CANVAS_WIDTH,2/6*CANVAS_WIDTH,3/6*CANVAS_WIDTH,4/6*CANVAS_WIDTH,5/6*CANVAS_WIDTH];

var posys = [1/4*CANVAS_HEIGHT - CHAPA_RADIO*2, 2/4*CANVAS_HEIGHT - CHAPA_RADIO*2, 3/4*CANVAS_HEIGHT - CHAPA_RADIO*2];

var velx = [];
var vely = [];

var isClicked = false;
var isMoved = false;
var turno;
var goles;

var numChapa;
var xDist = 0;
var yDist = 0;
var dist;
var turnCount = 0;
function titulo(){
	//Llamamos esta función al cargar el juego.
    context1.drawImage(imageFondo,0, 0, CANVAS_WIDTH, RESULT_HEIGHT, 0, 0, CANVAS_WIDTH, RESULT_HEIGHT);

	context.drawImage(imageFondo, 0, RESULT_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT, 0, 0, canvas.width, canvas.height);
	resetPos();
	goles = [0, 0];
	turno = 1;
}

function equipo(imagenNombreJugador, color1, color2){
	// Esta función da a elegir la chapa de un equipo al jugador.
	  context.rect(0, -50, canvas.width, canvas.height + 50);
	  context1.rect(0, 0, canvas.width, canvas.height + 50);
      var grd = context1.createLinearGradient(0, 0, canvas.width, canvas.height + RESULT_HEIGHT);
      
      grd.addColorStop(0, color1);   
      
      grd.addColorStop(1, color2);
      context1.fillStyle = grd;
      context1.fill();
      
      var grd = context.createLinearGradient(0, - RESULT_HEIGHT, canvas.width, canvas.height);
      
      grd.addColorStop(0, color1);   
      
      grd.addColorStop(1, color2);
      context.fillStyle = grd;
      context.fill();

	for (var i = 0; i < imageEquipo.length; i++) {
        context.drawImage(imageEquipo[i], posxs[i%5] - SEL_RADIO, posys[i%3] - SEL_RADIO, SEL_RADIO * 2, SEL_RADIO * 2);
    }
    context.drawImage(imagenNombreJugador, CANVAS_WIDTH / 2 - 200, 390, imagenNombreJugador.width, imagenNombreJugador.height);

		
}

function updateResultado() {
	context1.rect(0, 0, canvas.width, canvas.height);

	// Añade un degradado de fondo
    var grd = context1.createLinearGradient(0, 0, canvas.width, canvas.height);
    grd.addColorStop(0, '#4CB8C4');   
    grd.addColorStop(1, '#3CD3AD');
    context1.fillStyle = grd;
    context1.fill();

    // Añade el texto de los resultados, y en rojo el jugador al que le toca jugar.
 	context1.font = '30pt Calibri';
    context1.textAlign = 'center';
    context1.fillStyle = turno==1?"red":"white";
    context1.fillText('Jugador1 0' + goles[0], 200, 35);

    context1.fillStyle = turno==2?"red":"white";
    context1.fillText('0' + goles[1] + ' Jugador2', CANVAS_WIDTH - 200, 35);
}

function resetPos() {
    // Resetea la posición de las chapas y su velocidad.
	for (i = 0; i < XS.length; i++) {
		xs[i] = XS[i];
		ys[i] = YS[i];
		velx[i] = 0;
    	vely[i] = 0;
	}
}

function gol(equipo) {
    // Se ejecuta al marcar gol.
    goles[equipo % 2]++;
    updateResultado();
    if (goles[equipo % 2] == GOLES_VICTORIA)
    	return victory(equipo % 2 + 1);
    context.drawImage(imageGol,
        canvas.width / 2 - imageGol.width / 2,
        canvas.height / 2 - imageGol.height / 2
	);

    setTimeout(function() {
    	resetPos();
    	estado = 3;
    	turno = equipo;
    	updateResultado();
    	update();
    	
    }, 1500);

}

function victory(equipo) {
	// La función indica el ganador y vuelve a la pantalla de título al hacer clic.
	context.drawImage(imageGana,
        canvas.width / 2 - imageGana.width / 2,
        canvas.height / 3 - imageGana.height / 2
    );
	ganador = equipo==1?imageJugador1:imageJugador2;
    context.drawImage(ganador, CANVAS_WIDTH / 2 - 200, 300, ganador.width, ganador.height);
	estado = 5;
}

function update() {

	// Limpia el canvas y dibuja el campo.
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(imageCampo, 0, 0, canvas.width, canvas.height);

    // Dibuja las imágenes de las chapas.
    for (var i = 0; i < xs.length; i++) {
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


    // Si el jugador está moviendo la chapa, dibuja el trayecto.
    if (isMoved) {
        clicToEndX = - xDist * 4;
        clicToEndY = - yDist * 4;
        endX = xs[numChapa] + clicToEndX;
        endY = ys[numChapa] + clicToEndY;
        var midX;
        var midY;

        context.beginPath();
        context.moveTo(xs[numChapa], ys[numChapa]);

        if (endY < CHAPA_RADIO || endY > CANVAS_HEIGHT - CHAPA_RADIO) {
            slope = (endX - xs[numChapa]) / (endY - ys[numChapa]);
            midY = endY<CHAPA_RADIO?CHAPA_RADIO:CANVAS_HEIGHT - CHAPA_RADIO;
            clicToMidY = midY - ys[numChapa];
            clicToMidX = clicToMidY * slope;
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

    setTimeout(function() {

    	// Calcula si una chapa ha chocado contra el lado derecho o izquierdo y rebota.
        for (var i = 0; i < xs.length; i++) {
            if ((xs[i] <= CHAPA_RADIO - velx[i] && velx[i] < 0) || (xs[i] >= CANVAS_WIDTH - CHAPA_RADIO - velx[i] && velx[i] > 0)) {

            	//calcula si se ha marcado gol y si es el caso para la función y llama a gol().
            	if (i == 0 && ys[0] >= CANVAS_HEIGHT / 2 - INTERIOR_PORTERIA && ys[0] <= CANVAS_HEIGHT / 2 + INTERIOR_PORTERIA) {
            		if (velx[i] < 0) {
            			return gol(1);
            		}

            		else {
            			return gol(2);
            		}
            	}

                veli = Math.sqrt(velx[i] * velx[i] + vely[i] * vely[i]);
                cosA = vely[i] / veli;
                velx[i] = - velx[i] * Math.max(0.2, Math.abs(cosA));
                if (xs[i] <= CHAPA_RADIO - velx[i])
                    xs[i] = CHAPA_RADIO + 1;
                if (xs[i] >= CANVAS_WIDTH - velx[i])
                    xs[i] = CANVAS_WIDTH - 1;
            }
            xs[i] += velx[i];
            if (Math.abs(velx[i]) > FRICTION) {
                signx = velx[i]<0?-1:1;
                velx[i] = velx[i] - ((FRICTION / (Math.abs(velx[i]) + Math.abs(vely[i])) * Math.abs(velx[i])) * signx);
            }
            else
                velx[i] = 0;
        }

        // Calcula si una chapa ha chocado arriba o abajo y rebota.
        for (var i = 0; i < ys.length; i++) {
            if (Math.abs(vely[i]) > FRICTION) {
                if ((ys[i] <= CHAPA_RADIO -vely[i] && vely[i] < 0) || (ys[i] >= CANVAS_HEIGHT - CHAPA_RADIO -vely[i] && vely[i] > 0)) {
                    veli = Math.sqrt(velx[i] * velx[i] + vely[i] * vely[i]);
                    cosA = velx[i] / veli;
                    vely[i] = - vely[i] * Math.max(0.2, Math.abs(cosA));
                    if (ys[i] <= CHAPA_RADIO - vely[i])
                        ys[i] = CHAPA_RADIO + 1;
                    if (ys[i] >= CANVAS_HEIGHT - vely[i])
                        ys[i] = CANVAS_HEIGHT - 1;
                }
                ys[i] += vely[i];
                signy = vely[i]<0?-1:1;
                vely[i] = vely[i] - ((FRICTION / (Math.abs(velx[i]) + Math.abs(vely[i])) * Math.abs(vely[i])) * signy);
            }
            else
                vely[i] = 0;
        }


        // Este bucle comprueba si dos chapas han chocado y asigna las nuevas velocidades.
        for (var i = 0; i < xs.length; i++) 

            for (var j = i + 1; j < xs.length; j++) 
                {
                    diffx = xs[j] - xs[i];
                    diffy = ys[j] - ys[i];
                    distance = Math.sqrt(diffx*diffx + diffy*diffy);
                    if (distance < CHAPA_RADIO * 2) {
                        
                        diffVelx = velx[j] - velx[i];
                        diffVely = vely[j] - vely[i];
                        ex = diffx / distance;
                        ey = diffy / distance;

                      
                        velx[i] += ex * (diffVelx * ex + diffVely * ey);
                        vely[i] += ey * (diffVelx * ex + diffVely * ey);
                    
                        velx[j] -= ex * (diffVelx * ex + diffVely * ey);
                        vely[j] -= ey * (diffVelx * ex + diffVely * ey);
                        
                        while (Math.pow(xs[i] - xs[j], 2) + Math.pow(ys[i] - ys[j], 2) < Math.pow(CHAPA_RADIO * 2, 2)) {
                            xs[i] += velx[i];
                            ys[i] += vely[i];
                            xs[j] += velx[j];
                            ys[j] += vely[j];
                        }
                        
                    }
                }

    // Este código comprueba si las bolas han parado y cambia el turno en una décima de segundo.
    vel0 = true;
    for (i = 0; i < velx.length; i++) 
    	if (velx[i] != 0 || vely[i] != 0) {
    		vel0 = false;
    		turnCount = 0;
    		break;
    	}
    if (vel0 == true && estado == 4) {
    	turnCount++;
    	if (turnCount >= 10) {
        	if (turno == 1)
            	turno = 2;
        	else
            	turno = 1;
        	updateResultado();
        	estado = 3;  
        } 	
    }
   
    //la función update se llama a si misma cada 10 milisegundos.
        update();
    }, 10);
}

var estado=0;

$(document).ready(function(){   


    $("#myCanvas").mousedown(function(e) {
        /* Esta función reacciona al hacer clic, dependiendo del estado del juego:
         *
         * Estado 0: Pantalla de título
         * Estado 1: Pantalla de elección de equipo del jugador 1.
         * Estado 2: Pantalla de elección de equipo del jugador 2:
         * Estado 3: La partida ha comenzado y es el momento de que un jugador mueva.
         * Estado 4: Las chapas están en movimiento. No se puede interactuar.
         * Estado 5: La partida ha terminado, hacer clic vuelve a la pantalla de título.
        */
    	if(estado==0){
			equipo(imageJugador1, '#8ED6FF', '#004CB3');
			estado++;
		}else if(estado==1){
			numChapa = checkClickBall(e, posxs, posys, equipoString.length, SEL_RADIO);
			if (numChapa != null) {
				imageChapa[1].src = equipoString[numChapa];
				equipo(imageJugador2, '#403B4A', '#E7E9BB');
				estado++;
			}
		}else if(estado==2){
			numChapa = checkClickBall(e, posxs, posys, equipoString.length, SEL_RADIO);
			if (numChapa != null) {
				imageChapa[2].src = equipoString[numChapa];
				update();
				updateResultado();
				estado++;
				turno = 1;
			}
		}
    	else if (estado == 3) {
    		numChapa = checkClickBall(e, xs, ys, xs.length, CHAPA_RADIO);
        	if (numChapa != 0 && Math.ceil(numChapa / 5) == turno) {
        		isClicked = true;
        		isMoved = false;
        	}
    	}
    	else if (estado == 5) {
    		titulo();
    		estado = 0;
    	}
    })



    $(document).mousemove(function(e) {
        // Esta función se ejecuta mientras el jugador 
        // está clicando una de sus chapas en su turno,
        // para cada evento de movimiento de ratón.
        if (isClicked) {
        	isMoved = true;
            var rect = canvas.getBoundingClientRect();
            xDist = e.pageX - rect.left - xs[numChapa] - window.scrollX;
            yDist = e.pageY - rect.top - ys[numChapa] - window.scrollY;
            dist = Math.sqrt(xDist * xDist + yDist * yDist);
        }

 	})


    $(document).mouseup(function() {
        // Este código se ejecuta én el momento que el jugador termina de lanzar la chapa.
        if (isClicked) {
            isClicked = false;
            if (dist > CHAPA_RADIO && isMoved) {
        		velx[numChapa] = - xDist * Math.min((dist - CHAPA_RADIO) / VEL_DIVISOR, VEL_MAX) / dist;
        		vely[numChapa] = - yDist * Math.min((dist - CHAPA_RADIO) / VEL_DIVISOR, VEL_MAX) / dist;
        		estado = 4;
        	}
        	isMoved = false;
        	
        }
    });	
}); 


function checkClickBall(e, x, y, len, radio) {
    // La función comprueba si el ratón está encima de una chapa y devuelve el número de la chapa.
	var rect = canvas.getBoundingClientRect();
    for (var i = 0; i < len; i++) {
        xDist = e.pageX - rect.left - x[i%x.length] - window.scrollX;
        yDist = e.pageY - rect.top - y[i%y.length] - window.scrollY;
        distance = Math.sqrt(xDist * xDist + yDist * yDist);
        if (distance < radio) {
            return i;
        }
    }
    return null;
}