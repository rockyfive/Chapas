"use strict";
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const RESULT_WIDTH = CANVAS_WIDTH;
const RESULT_HEIGHT = 40;
const FRICTION = 0.05;
const VEL_MAX = 10;
const VEL_DIVISOR = 8;
const CHAPA_RADIO = 25;
const SEL_RADIO = 45;
const CHAPA_WIDTH = 2 * CHAPA_RADIO;
const CHAPA_HEIGHT = CHAPA_WIDTH;
const INTERIOR_PORTERIA = 55;
const EXTERIOR_PORTERIA = 80;
const GOLES_VICTORIA = 3;
const XS = [CANVAS_WIDTH / 2, 90, 175, 175, 300, 300, CANVAS_WIDTH - 90, CANVAS_WIDTH - 175, CANVAS_WIDTH - 175, CANVAS_WIDTH - 300, CANVAS_WIDTH - 300];
const YS = [CANVAS_HEIGHT / 2, 250, 350, 150, 80, 420, CANVAS_HEIGHT - 250, CANVAS_HEIGHT - 350, CANVAS_HEIGHT - 150, CANVAS_HEIGHT - 80, CANVAS_HEIGHT - 420];


const posxs = [1/6*CANVAS_WIDTH,2/6*CANVAS_WIDTH,3/6*CANVAS_WIDTH,4/6*CANVAS_WIDTH,5/6*CANVAS_WIDTH];
const posys = [1/4*CANVAS_HEIGHT - CHAPA_RADIO*2, 2/4*CANVAS_HEIGHT - CHAPA_RADIO*2, 3/4*CANVAS_HEIGHT - CHAPA_RADIO*2];