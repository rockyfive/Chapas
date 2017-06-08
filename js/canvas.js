var canvas1 = document.getElementById('resultado');
var context1 = canvas1.getContext('2d');
canvas1.width = RESULT_WIDTH;
canvas1.height = RESULT_HEIGHT;


var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var imageCampo = new Image();
imageCampo.src = 'images/campo-de-futbol-15.jpg';

var imageChapa = new Array();
for (i = 0; i < 3; i++)
    imageChapa[i] = new Image();

imageChapa[0].src = 'images/pelota.png';
imageChapa[1].src = 'images/equipos/zaragoza.png';

//imageChapa[2].onload = function(){update()};
imageChapa[2].src = 'images/equipos/atletico.png';

var imageFondo = new Image();
imageFondo.src="images/titulo800.jpg";

var equipoString = new Array();
equipoString[0] = 'images/equipos/atletico.png';
equipoString[1] = 'images/equipos/barcelona.png';
equipoString[2] = 'images/equipos/betis.png';
equipoString[3] = 'images/equipos/bilbao.png';
equipoString[4] = 'images/equipos/espanyol.png';
equipoString[5] = 'images/equipos/levante.png';
equipoString[6] = 'images/equipos/madrid.png';
equipoString[7] = 'images/equipos/malaga.png';
equipoString[8] = 'images/equipos/mallorca.png';
equipoString[9] = 'images/equipos/osasuna.png';
equipoString[10] = 'images/equipos/sevilla.png';
equipoString[11] = 'images/equipos/sociedad.png';
equipoString[12] = 'images/equipos/valencia.png';
equipoString[13] = 'images/equipos/villarreal.png';
equipoString[14] = 'images/equipos/zaragoza.png';

var imageEquipo= new Array();
for(var i=0; i<equipoString.length;i++){
	imageEquipo[i]=new Image();
	imageEquipo[i].src=equipoString[i];
	//imageEquipo[i].onload=function(){equipo()};
}

var imageLogo=new Image();
//imageLogo.onload=function(){equipo()};
imageLogo.src="images/logo_chapas.png";


var imageJugador1=new Image();
imageJugador1.src="images/jugador1.png";
imageJugador1.width = 403;
imageJugador1.height = 66;

var imageJugador2=new Image();
imageJugador2.src="images/jugador2.png";
imageJugador2.width = 432;
imageJugador2.height = 75;

var imageGol = new Image();
imageGol.src = "images/gol.png"
imageGol.width = 284;
imageGol.height = 74;

var imageGana = new Image();
imageGana.src = "images/gana.png"
imageGana.width = 240;
imageGana.height = 74;

imageLogo.onload=function(){titulo()};