let contadorTarjetas = 0;
let PrimerTarjeta = null;
let SegundaTarjeta = null;
let PrimerResultado = null
let SegundoResultado = null
let movimientos = 0;
let temporizador = false;
let aciertos = 0;
let timer =180
let timerInicial =180
let tiempo = null;

let movimientosEtiqueta = document.getElementById('contadorMovimientos')
let puntajeEtiqueta = document.getElementById('contadorPuntaje');
let tiempoEtiqueta = document.getElementById('contadorTiempo')

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6];
numeros.sort(() => Math.random()-0.5);
console.log(numeros)

function contarTiempo(){
    tiempo = setInterval(()=>{
        timer--;
        tiempoEtiqueta.innerHTML=timer;
        if (timer === 0) {
            clearInterval(tiempo);
            bloquearTarjetas()
            
        }
    },1000)
}
 function bloquearTarjetas(){
    for( let i=0; i<=12;i++){
        let tarjetaBloqueada = document.getElementById(i+1);
        tarjetaBloqueada.innerHTML= numeros[i];
        tarjetaBloqueada.disabled=true
    }
 }
function destapar(id){

    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
        
    }

    contadorTarjetas++;
    if (contadorTarjetas === 1) {
        PrimerTarjeta = document.getElementById(`${id}`)
        PrimerResultado=numeros[id-1];
        PrimerTarjeta.innerHTML= PrimerResultado
        PrimerTarjeta.disabled=true;
        console.log(PrimerTarjeta)
    }
    else if (contadorTarjetas === 2) {
        SegundaTarjeta = document.getElementById(`${id}`);
        SegundoResultado=numeros[id-1];
        SegundaTarjeta.innerHTML= SegundoResultado
        SegundaTarjeta.disabled=true;
        movimientos++;
        movimientosEtiqueta.innerHTML=movimientos;
        console.log(movimientos)

        if (PrimerResultado === SegundoResultado) {
            contadorTarjetas = 0
            aciertos++;
            puntajeEtiqueta.innerHTML=(aciertos * 100) / 2

            if(aciertos===6){
                clearInterval(tiempo)
                tiempoEtiqueta.innerHTML = `${timerInicial-timer}`
            }
            
        }
        else {
           setTimeout(()=>{
            PrimerTarjeta.innerHTML= ""
            PrimerTarjeta.disabled=false;
            SegundaTarjeta.innerHTML= ""
            SegundaTarjeta.disabled=false;
            contadorTarjetas = 0
           },750)
        }
        
    }

}