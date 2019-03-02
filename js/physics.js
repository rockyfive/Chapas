"use strict";
function solveSideCollision() {
        // Calcula si una chapa ha chocado contra el lado derecho o izquierdo y rebota.
        for (let i = 0; i < xs.length; i++) {
            if ((xs[i] <= CHAPA_RADIO - velx[i] && velx[i] < 0) || (xs[i] >= CANVAS_WIDTH - CHAPA_RADIO - velx[i] && velx[i] > 0)) {
    
                //calcula si se ha marcado gol y si es el caso para la función y llama a gol().
                if (i == 0 && ys[0] >= CANVAS_HEIGHT / 2 - INTERIOR_PORTERIA && ys[0] <= CANVAS_HEIGHT / 2 + INTERIOR_PORTERIA) {
                    if (velx[i] < 0) {
                        return 1;
                    }
    
                    else {
                        return 2;
                    }
                }
    
                const veli = Math.sqrt(velx[i] * velx[i] + vely[i] * vely[i]);
                const cosA = vely[i] / veli;
                velx[i] = - velx[i] * Math.max(0.2, Math.abs(cosA));
                if (xs[i] <= CHAPA_RADIO - velx[i])
                    xs[i] = CHAPA_RADIO + 1;
                if (xs[i] >= CANVAS_WIDTH - velx[i])
                    xs[i] = CANVAS_WIDTH - 1;
            }
            xs[i] += velx[i];
            if (Math.abs(velx[i]) > FRICTION) {
                const signx = velx[i]<0?-1:1;
                velx[i] = velx[i] - ((FRICTION / (Math.abs(velx[i]) + Math.abs(vely[i])) * Math.abs(velx[i])) * signx);
            }
            else
                velx[i] = 0;
        }
        return 0;
}

function solveUpperBottomCollision() {
        // Calcula si una chapa ha chocado arriba o abajo y rebota.
        for (let i = 0; i < ys.length; i++) {
            if (Math.abs(vely[i]) > FRICTION) {
                if ((ys[i] <= CHAPA_RADIO -vely[i] && vely[i] < 0) || (ys[i] >= CANVAS_HEIGHT - CHAPA_RADIO -vely[i] && vely[i] > 0)) {
                    const veli = Math.sqrt(velx[i] * velx[i] + vely[i] * vely[i]);
                    const cosA = velx[i] / veli;
                    vely[i] = - vely[i] * Math.max(0.2, Math.abs(cosA));
                    if (ys[i] <= CHAPA_RADIO - vely[i])
                        ys[i] = CHAPA_RADIO + 1;
                    if (ys[i] >= CANVAS_HEIGHT - vely[i])
                        ys[i] = CANVAS_HEIGHT - 1;
                }
                ys[i] += vely[i];
                const signy = vely[i]<0?-1:1;
                vely[i] = vely[i] - ((FRICTION / (Math.abs(velx[i]) + Math.abs(vely[i])) * Math.abs(vely[i])) * signy);
            }
            else
                vely[i] = 0;
        }
}

function solveBallCollision() {
    // Este bucle comprueba si dos chapas han chocado y asigna las nuevas velocidades.
    for (let i = 0; i < xs.length; i++) {

        for (let j = i + 1; j < xs.length; j++) 
        {
            const diffx = xs[j] - xs[i];
            const diffy = ys[j] - ys[i];
            const distance = Math.sqrt(diffx*diffx + diffy*diffy);
            if (distance < CHAPA_RADIO * 2) {
                
                const diffVelx = velx[j] - velx[i];
                const diffVely = vely[j] - vely[i];
                const ex = diffx / distance;
                const ey = diffy / distance;

            
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
    }
}

function solveTurnChange() {
    // Este código comprueba si las bolas han parado y cambia el turno en una décima de segundo.
    let vel0 = true;
    for (let i = 0; i < velx.length; i++) {
        if (velx[i] != 0 || vely[i] != 0) {
            vel0 = false;
            turnCount = 0;
            break;
        }
    }
    if (vel0 == true && estado == 4) {
        turnCount++;
        if (turnCount >= 10) {
            setTurno(turno == 1 ? 2 : 1);
        } 	
    }
}