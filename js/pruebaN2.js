let contadorTarjetas = 0;
let PrimerTarjeta = null;
let SegundaTarjeta = null;
let MostrarPrimerTarjeta = null;
let MostrarSegundaTarjeta = null;
let PrimerResultado = null
let SegundoResultado = null;
let movidas = 0;
let aciertos = 0



let timer =120
let timerInicial =120
let tiempo = null;
let temporizador = false;

let movidasEtiqueta = document.getElementById('contadorMovimientos')
let puntajeEtiqueta = document.getElementById('contadorAciertos');
let tiempoEtiqueta = document.getElementById('contadorTiempo');

let tarjetas = [19,20,22,23,25,26,28,29,31,32,34,35];

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
    // document.getElementById('container-game').classList.add('animate__animated', 'animate__fadeIn');

    document.getElementById('container-game').classList.remove('animate__animated', 'animate__zoomInUp', 'animate__fadeIn', 'animate__fadeIn','animate__animated','animate__bounce');
 
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
        confirmButtonText: 'Puntaje final',
        showClass: {
            popup: 'animate__animated animate__fadeIn'
        },
    }).then((result) => {
        // document.getElementById('container-game').classList.add('animate__animated', 'animate__fadeOut');
        
        if (result.isConfirmed) {
            const movidasFinales = Number(localStorage.getItem("movidas")) + (movidas);
            const tiempoFinal = Number(localStorage.getItem("tiempo")) + (timer)
            const puntajeFinal = Number(localStorage.getItem("puntaje")) + (aciertos*5);
          
                
            swalButtons.fire({
                width: '40%',
                imageUrl:'img/GIF/holi.gif',
                imageHeight: 200,
                background:'linear-gradient(45deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75))',
                backdrop:false,
                html:
                `<h3 class="header-text-alert" ><span>P</span><span>u</span><span>n</span><span>t</span><span>a</span><span>j</span><span>e</span><span>:</span><span> </span><span>${puntajeFinal}</span></h3>
                <h3 class="header-text-alert" ><span>T</span><span>i</span><span>e</span><span>m</span><span>p</span><span>o</span><span>:</span><span> </span><span>${formatearTiempo(tiempoFinal)}</span></h3>
                <h3 class="header-text-alert" ><span>M</span><span>o</span><span>v</span><span>i</span><span>d</span><span>a</span><span>s</span><span>:</span><span> </span><span>${movidasFinales}</span></h3>`,
                
                confirmButtonText: 'Jugar otra vez',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
            }).then((confirm)=>{
                if (confirm.isConfirmed) {
                    document.body.classList.add('animate__animated', 'animate__fadeOut');
                    setTimeout(()=>{
                        window.location.href = "index.html";
            
                    },1000)
                    
                }
            })
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

            if(aciertos===6){

                document.body.classList.remove('animate__animated', 'animate__fadeOut');
                clearInterval(tiempo)
                tiempoEtiqueta.innerHTML = `${formatearTiempo(timer)}`;

                swalButtons.fire({
                    width: '40%',
                    imageUrl:'img/GIF/presentador-2.gif',
                    imageHeight: 300,
                    background:'linear-gradient(45deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75))',
                    backdrop:false,
                    html:
                    '<h3 class="header-text-alert" ><span>F</span><span>e</span><span>l</span><span>i</span><span>c</span><span>i</span><span>d</span><span>a</span><span>d</span><span>e</span><span>s</span><span>!</span></h3>',
                    confirmButtonText: 'Puntaje Final',
                    showClass: {
                        popup: 'animate__animated animate__fadeIn'
                    },
                }).then((result) => {
                    // document.getElementById('container-game').classList.add('animate__animated', 'animate__fadeOut');
                    console.log(Number(localStorage.getItem("tiempo"))+" : " + (timerInicial-timer))
                    if (result.isConfirmed) {
                        const movidasFinales = Number(localStorage.getItem("movidas")) + (movidas);
                        const tiempoFinal = Number(localStorage.getItem("tiempo")) + (timerInicial-timer)
                        const puntajeFinal = Number(localStorage.getItem("puntaje")) + (aciertos*5);
                            
                        swalButtons.fire({
                            width: '40%',
                            imageUrl:'img/GIF/holi.gif',
                            imageHeight: 200,
                            background:'linear-gradient(45deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75))',
                            backdrop:false,
                            html:
                            `<h3 class="header-text-alert" ><span>P</span><span>u</span><span>n</span><span>t</span><span>a</span><span>j</span><span>e</span><span>:</span><span> </span><span>${puntajeFinal}</span></h3>
                            <h3 class="header-text-alert" ><span>T</span><span>i</span><span>e</span><span>m</span><span>p</span><span>o</span><span>:</span><span> </span><span>${formatearTiempo(tiempoFinal)}</span></h3>
                            <h3 class="header-text-alert" ><span>M</span><span>o</span><span>v</span><span>i</span><span>d</span><span>a</span><span>s</span><span>:</span><span> </span><span>${movidasFinales}</span></h3>`,
                            
                            confirmButtonText: 'Jugar otra vez',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                        }).then((confirm)=>{
                            if (confirm.isConfirmed) {
                                document.body.classList.add('animate__animated', 'animate__fadeOut');
                                setTimeout(()=>{
                                    window.location.href = "index.html";
                        
                                },1000)
                                
                            }
                        })
                       
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