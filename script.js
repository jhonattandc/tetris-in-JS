let ultimoTiempo = 0;
let tiempoDeCaida = 1000;
let contenedorDeCaida = 0;

const tableroDeTetris = document.getElementById("tableroDeTetris");
const espacio = tableroDeTetris.getContext("2d");
const cuadricula = creacionDeMatriz(10, 20);
const jugador = {
    pos: {x:0 , y:0},
    matriz: [
        [0,0,0],
        [1,1,1],
        [0,1,0]
    ]
}
espacio.scale(20, 20);

function creacionDeMatriz(width, height){
    const matriz = []

    while(height--) {
        matriz.push(new Array(width).fill(0));
    }

    return matriz;
}

function limites(cuadricula, jugador){
    const matriz = jugador.matriz;
    const offset = jugador.pos;

    for(let y = 0; y<matriz.length; y++){
        for(let x = 0; x<matriz[y].length; x++){
            if(matriz[y][x] !== 0 && (cuadricula[y + offset.y] && cuadricula[y + offset.y][x + offset.x]) !== 0) {
                return true;
            }
        }
    }
}

function unir(cuadricula, jugador){
    jugador.matriz.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !==0){
                cuadricula[y + jugador.pos.y][x + jugador.pos.x] = value;
            }
        });
    });
}

function dibujarMatriz(matriz, offset){
    matriz.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !==0){
                espacio.fillStyle = "red";
                espacio.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
    }


function dibujar(){
    espacio.fillStyle = "#000";
    espacio.fillRect(0, 0, tableroDeTetris.width, tableroDeTetris.height);
    dibujarMatriz(cuadricula, {x: 0, Y: 0});
    dibujarMatriz(jugador.matriz, jugador.pos);
}

function update(time = 0){
    const deltaTime = time - ultimoTiempo;
    ultimoTiempo = time;
    contenedorDeCaida += deltaTime;
    if(contenedorDeCaida > tiempoDeCaida){
        caidaDelJugador();
    }
    dibujar()
    requestAnimationFrame(update);
}

update();

function movimientosDelJugador(direccion){
    jugador.pos.x += direccion;
    if(limites(cuadricula, jugador)){
        jugador.pos.x -= direccion;
    }
}

function rotacionDelJugador(){
    const pos = jugador.pos.x;
    rotacion(jugador, matriz);
}

function rotacion(matriz){
    for(let y = 0; y<matriz.length; ++y){
        for(let x = 0; x<y; ++x){
            [matriz[x][y], matriz[y][x]] = [matriz[y][x], matriz[x][y]];
        }
    }

    matriz.forEach(row => row.reverse());
}

function jugadorReset(){
    jugador.pos.x= 0;
    jugador.pos.y= 0;
}

document.addEventListener("keydown", event =>{
    if(event.keyCode===40){
        caidaDelJugador();
    } else if (event.keyCode===39){
         movimientosDelJugador(+1);
    } else if (event.keyCode===37){
         movimientosDelJugador(-1);
    } else if (event.keyCode===32){
        rotacionDelJugador();
    }
    /*else if (event.keyCode===32){ ||
        jugador.pos.y++;            ||  Boton para dejar caer la pieza 
        contenedorDeCaida = 19;     ||    
    }*/

})

function caidaDelJugador() {
    jugador.pos.y++;
    if(limites(cuadricula, jugador)){
        jugador.pos.y--;
        unir(cuadricula, jugador);
    jugadorReset();
   console.table(cuadricula);
    }
    contenedorDeCaida =0;
}


// min 37:05