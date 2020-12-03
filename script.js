let ultimoTiempo = 0;

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

    console.table(matriz);

    return matriz;
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
    dibujar()
    requestAnimationFrame(update);
}

update();