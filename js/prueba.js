let contadorTarjetas = 0;
let PrimerTarjeta = null;
let SegundaTarjeta = null;
let MostrarPrimerTarjeta = null;
let MostrarSegundaTarjeta = null;
let PrimerResultado = null
let SegundoResultado = null;
let movidas = 0;
let aciertos = 0



let timer =120;
let timerInicial =120;
let tiempo = null;
let temporizador = false;


let movidasEtiqueta = document.getElementById('contadorMovimientos')
let puntajeEtiqueta = document.getElementById('contadorAciertos');
let tiempoEtiqueta = document.getElementById('contadorTiempo');

let tarjetas = [1,2,4,5,7,8,10,11,13,14,16,17];

tarjetas.sort(() => Math.random()-0.5);
document.getElementById('container-game').classList.add('animate__animated', 'animate__zoomInUp');

function formatearTiempo(tiempo) {
    let minutos = Math.floor(tiempo / 60);
    let segundos = tiempo % 60;
  
    minutos = minutos < 10 ? '0' + minutos : minutos;
    segundos = segundos < 10 ? '0' + segundos : segundos;
  
    return minutos + ':' + segundos;
  }

const swalButtons = Swal.mixin({
    customClass: {
      popup: 'popup',
      confirmButton:'btn-confirm',
    },
    buttonsStyling: false
  })

function contarTiempo(){
    tiempo = setInterval(()=>{
        timer--;
        tiempoEtiqueta.innerHTML=formatearTiempo(timer);
        if (timer === 0) {
            clearInterval(tiempo);
            bloquearTarjetas()
            
        }
    },1000)
}

function bloquearTarjetas(){
    
    document.getElementById('container-game').classList.remove('animate__animated', 'animate__zoomInUp');
    
    for( let i=0; i<12;i++){
        
        let tarjetaBloqueada = document.getElementById(i+1);
        tarjetaBloqueada.style.backgroundColor="#ffffff"
        document.getElementById('container-game').classList.add('animate__animated', 'animate__fadeIn');
        tarjetaBloqueada.innerHTML=`<img class="tapa animate__animated animate__fadeIn" src="img/Tarjetas/${tarjetas[i]}.png" alt="Tapa">`;
        tarjetaBloqueada.disabled=true
    }
    swalButtons.fire({
        width: '40%',
        imageUrl:'img/GIF/incorrecto_1.gif',
        imageHeight: 300,
        background:'linear-gradient(45deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6))',
        backdrop:false,
        html:
        `<h3 class="header-text-alert"><span>!</span><span>T</span><span>i</span><span>e</span><span>m</span><span>p</span><span>o</span><span> </span><span>a</span><span>g</span><span>o</span><span>t</span><span>a</span><span>d</span><span>o</span><span>!</h3>`,
        confirmButtonText: 'Continuar',
        showClass: {
            popup: 'animate__animated animate__fadeIn'
        },
    }).then((result) => {
        document.getElementById('container-game').classList.add('animate__animated', 'animate__fadeOut');
        if (result.isConfirmed) {
            const puntajeN1=aciertos*5;
            const tiempoN1 =timer;
            const movidasN1 = movidas
            setTimeout(()=>{
                localStorage.setItem("puntaje", puntajeN1);
                localStorage.setItem("tiempo", tiempoN1);
                localStorage.setItem("movidas", movidasN1);
                window.location.href = "pruebaN2.html";
            },1000)
        }
      })
 }

const destapar = (id)=>{
    document.getElementById('container-game').classList.remove('animate__animated', 'animate__zoomInUp');
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }
    contadorTarjetas++;

    if (contadorTarjetas === 1) {

        PrimerTarjeta = document.getElementById(`${id}`)
        MostrarPrimerTarjeta=tarjetas[id-1]
        PrimerTarjeta.innerHTML=  `<img class="tapa" src="img/Tarjetas/${MostrarPrimerTarjeta}.png" alt="Tapa">`
        PrimerTarjeta.disabled=true;

    } else if (contadorTarjetas === 2) {
        SegundaTarjeta = document.getElementById(`${id}`);
        MostrarSegundaTarjeta=tarjetas[id-1]
        SegundaTarjeta.innerHTML= `<img class="tapa" src="img/Tarjetas/${MostrarSegundaTarjeta}.png" alt="Tapa">`
        SegundaTarjeta.disabled=true;
        movidas++;
        movidasEtiqueta.innerHTML=movidas;
        
        if (MostrarPrimerTarjeta-1 === MostrarSegundaTarjeta || MostrarPrimerTarjeta === MostrarSegundaTarjeta-1) {
            contadorTarjetas = 0
            aciertos++;
            puntajeEtiqueta.innerHTML=(aciertos * 5);

            if(aciertos === 6){
                clearInterval(tiempo)
                tiempoEtiqueta.innerHTML = `${formatearTiempo(timer)}`;
                swalButtons.fire({
                    width: '40%',
                    imageUrl:'img/GIF/Cultix-juntos.gif',
                    imageHeight: 300,
                    background:'linear-gradient(45deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6))',
                    backdrop:false,
                    html:
                    '<h3 class="header-text-alert"><span>!</span><span>E</span><span>s</span><span>p</span><span>e</span><span>c</span><span>t</span><span>a</span><span>c</span><span>u</span><span>l</span><span>a</span><span>r</span><span>!</span></h3>',
                    confirmButtonText: 'Siguiente nivel',
                    showClass: {
                        popup: 'animate__animated animate__fadeIn'
                    },
                }).then((result) => {
                    
                    document.getElementById('container-game').classList.add('animate__animated', 'animate__fadeOut');
                    if (result.isConfirmed) {
                        const puntajeN1=aciertos*5;
                        const tiempoN1 = timerInicial-timer;
                        const movidasN1 = movidas
                        setTimeout(()=>{
                            localStorage.setItem("puntaje", puntajeN1);
                            localStorage.setItem("tiempo", tiempoN1);
                            localStorage.setItem("movidas", movidasN1);
                            window.location.href = "pruebaN2.html";
                          
                        },1500)
                    }
                  })
            }

            contadorTarjetas = 0
        } else {
            setTimeout(()=>{
             PrimerTarjeta.innerHTML= `<img class="tapa" src="img/tapa2.png" alt="Tapa">`
             PrimerTarjeta.disabled=false;
             SegundaTarjeta.innerHTML= `<img class="tapa" src="img/tapa2.png" alt="Tapa">`
             SegundaTarjeta.disabled=false;
             contadorTarjetas = 0
            },2000)
          }
    }

}