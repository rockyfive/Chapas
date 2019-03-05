"use strict";
const resCanvas = document.createElement('canvas');
const resContext = resCanvas.getContext('2d');
resCanvas.width = RESULT_WIDTH;
resCanvas.height = RESULT_HEIGHT;


const fieldCanvas = document.createElement('canvas');
const fieldContext = fieldCanvas.getContext('2d');
fieldCanvas.width = CANVAS_WIDTH;
fieldCanvas.height = CANVAS_HEIGHT;

const gameCanvas = document.getElementById('myGame');
const gameContext = gameCanvas.getContext('2d');
gameCanvas.width = CANVAS_WIDTH;
gameCanvas.height = CANVAS_HEIGHT + RESULT_HEIGHT;