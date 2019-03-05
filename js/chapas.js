"use strict";
let xs;
let ys;

const velx = new Array(XS.length);
const vely = new Array(XS.length);

let gameWidth = gameCanvas.width;
let gameHeight = gameCanvas.height;
let fsMarginLeft = 0;
let fsMarginTop = 0;

let isClicked = false;
let isMoved = false;
let turno;
let goles;

let numChapa;
let xDist = 0;
let yDist = 0;
let dist;
let turnCount = 0;
let estado = 0;

imageLogo.onload=function(){loadGame()};



