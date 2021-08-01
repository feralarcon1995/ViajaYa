//DARK MODE
$('.modeBtn').click(function () {
    if ($('.modeBtn').prop('checked')) {
        $('#tema').attr('href', './css/estilo.css');
        console.log('se activo el lightmode');
    } else {
        $('#tema').attr('href', './css/dark.css');
        console.log('se activo el dark mode');
    }
});
//SCROLL DEL NAV CAMBIA DE COLOR
$(window).on("scroll", function () {
    if ($(window).scrollTop() > $("#usuario").offset().top - 150) {
        $("nav").addClass("navegador__activo");
    } else {
        $("nav").removeClass("navegador__activo");
    };
});

//MENU MOBILE DESPLEGLABLE
const hamburguesa = document.querySelector('.nav__hamburguesa');
const enlaces = document.querySelector('.nav__menu');
const barras = document.querySelectorAll('.nav__hamburguesa span')

hamburguesa.addEventListener('click', () => {
    enlaces.classList.toggle('activado');
    barras.forEach(child => {
        child.classList.toggle('animado')
    });
});
// ARRAY DE DESTINOS
const destinos = [{
        lugar: "Miami",
        precio: 700000,
        precioDia: 220000
    },
    {
        lugar: "Las Vegas",
        precio: 600000,
        precioDia: 210000
    },
    {
        lugar: "Rio de janeiro",
        precio: 120000,
        precioDia: 42000
    },
    {
        lugar: "Buzios",
        precio: 100000,
        precioDia: 35000
    },
    {
        lugar: "Viña del mar",
        precio: 80000,
        precioDia: 28000
    },
    {
        lugar: "Bariloche",
        precio: 90000,
        precioDia: 31500
    },
    {
        lugar: "Maldivias",
        precio: 290000,
        precioDia: 96000
    },
    {
        lugar: "Cancun",
        precio: 150000,
        precioDia: 50000
    },
    {
        lugar: "Marbella",
        precio: 200000,
        precioDia: 66000
    }
];

//ARREGLOS- DE RESERVAS
const reservaciones = [];
class Reservacion {
    constructor(cliente, nombre, apellido, destino, precio) {
        this.cliente = cliente;
        this.nombre = nombre;
        this.apellido = apellido;
        this.destino = destino;
        this.precio = precio;
    }
};


//FUNCION PARA MOSTRAR INFO DEL DESTINO AL APRETAR BOTON

function tomarValor(valor) {

    let inputValor1 = document.querySelector(".input1").value;
    let inputValor2 = document.querySelector(".input2").value;
    let inputValor3 = document.querySelector(".input3").value;
    let inputValor4 = document.querySelector(".select1").value;
    let inputValor5 = document.querySelector(".select2").value;
    let inputValor6 = document.querySelector(".select3").value;

    //GENERANDO ID RAMDON DEL CLIENTE Y GUARDANDOLO EN SESSION STORAGE    
    const numRamdom = parseInt(Math.random() * 1000 + 100);

    //APLICACION DE DESCUENTO DESPUES DE LOS 10 DIAS
    let descuento = 1;
    inputValor6 >= 10 ? descuento *= 0.30 : null;
    let precioTotal = destinos[valor].precioDia * inputValor6 * descuento;

    //APENDEANDO LOS VALORES AL HTML
    document.querySelector("#destino__seleccionado").innerHTML =
        `  
            <div class="reservas">
              <h2 class="reservas__titulo"> Checkeando datos ingresados </h2>
            </div>
           <div class="destino__check">
           <div class="destino__cheackDatos">
           <p>Cliente N°:<span> ${numRamdom}</span> </p>
           <p>Nombre:<span> ${inputValor1}</span> </p>
           <p>Apellido:<span> ${inputValor2}</span></p>
           <p>Edad:<span> ${inputValor3} años</span></p>
           <p>Boleto:<span> ${inputValor4}</span></p>
           <p>Tipo de menu:<span>  ${inputValor5}</span></p>
           <p>Destino: <span>${destinos[valor].lugar}</span></p>
           <p>Estadia:<span>  ${inputValor6} días</span></p>
           <b>Este viaje sale $ <span> ${Math.round(precioTotal)}</span></b> 
           <button class="btn__reserva" id='btn__reserva'>Reservar <i class="ri-checkbox-circle-fill " ></i> </button>
           </div>
           </div>
           
          `;

    //BOTON PARA GUARDAR
    let botonGuardar = document.querySelector('#btn__reserva');
    botonGuardar.addEventListener('click', guardarReserva);

    function guardarReserva() {
        //PUSHEO LOS DATOS DENTRO DEL ARRAY
        reservaciones.push(new Reservacion(
            `${numRamdom}`,
            `${inputValor1}`,
            `${inputValor2}`,
            `${destinos[valor].lugar}`
        ));

        //GUARDO LOS DATOS EN LOCALSTORAGE
        localStorage.setItem('lista__reservas', JSON.stringify(reservaciones));
        console.table(reservaciones);
    }

    //BOTON PARA BORRAR

    $("#btn__quitar").click(function (e) {
        $(e.target).parent().remove('.destino__cotizacion');
    });
}

//EVENTO Y FUNCION PARA MOSTRAR LOS VALORES ANTERIORMENTE SELECCIONADOS
const listaDestinos = document.querySelector('.destino__lista');

listaDestinos.addEventListener('click', mostrar);

function mostrar(ev) {
    if ((ev.target.className).includes('destino__btn')) {
        tomarValor(ev.target.value);
    }
};

//FUNCION QUE MUESTRA RESERVA
$(document).ready(function () {

    $('#reservas__btn').click(function () {

        for (reserva of reservaciones) {
            $('#reservas__hechas').append(
                `<div class="reservacionHecha">
                <p class="reservas__titulo">Cliente N°: ${reserva.cliente}</p>
                <p>Nombre:<span> ${reserva.nombre}</span> </p>
                <p>Apellido:<span> ${reserva.apellido}</span></p>
                <p>Destino:<span> ${reserva.destino}</span></p>
                <button class="borrar">X</button>
                </div>
            `
            );
        };

        $(".borrar").click(function (e) {
            $(e.target).parent().remove();
        });
        console.table(reservaciones);
    });
});


// OBTENCION DEl DOLAR AJAX

//URL PARA EXTRAER COTIZACIONES DEL DOLAR
const URL = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"

//INICIO DE FUNCION DE TIPO DE CAMBIOS

$(document).ready(function(){
 
    function tipoDeDolar(tipodedolar){
               //LLAMADO AL URL DE LA API Y COMIENZO DE FUNCION DE LA MISMA
        $.get(URL, function(datos) {

            for(dato of datos) {
                //DOLAR OFICIAL
                if(dato.casa.nombre === 'Dolar Oficial'){
                    $('#lista__dolares').append(
                        `
                        <div class="d-contenedor">
                        <div class="d-contenedor__tituloFondo">
                        <h3 class="d-contenedor__titulo">  ${dato.casa.nombre}</h3>
                        </div>
                        <p clas="d-contenedor__info">Compra: <i class="ri-money-dollar-circle-fill"></i> ${dato.casa.compra}</p>
                        <p clas="d-contenedor__info">Venta: <i class="ri-money-dollar-circle-fill"></i> ${dato.casa.venta}</p>
                        </div>
    
                        `
                    )
                } 
                /// DOLAR BLUE
                else if (dato.casa.nombre === 'Dolar Blue'){
                    $('#lista__dolares').append(
                        `
                        <div class="d-contenedor">
                        <div class="d-contenedor__tituloFondo">
                        <h3 class="d-contenedor__titulo"> ${dato.casa.nombre}</h3>
                        </div>
                        <p clas="d-contenedor__info">Compra: <i class="ri-money-dollar-circle-fill"></i> ${dato.casa.compra}</p>
                        <p clas="d-contenedor__info">Venta: <i class="ri-money-dollar-circle-fill"></i> ${dato.casa.venta}</p>
                        </div>
    
                        `
                    )
                }
                // DOLAR BOLSA
                else if (dato.casa.nombre === 'Dolar Bolsa'){
                    $('#lista__dolares').append(
                        `
                        <div class="d-contenedor">
                        <div class="d-contenedor__tituloFondo">
                        <h3 class="d-contenedor__titulo">${dato.casa.nombre}</h3>
                        </div>
                        <p clas="d-contenedor__info">Compra: <i class="ri-money-dollar-circle-fill"></i> ${dato.casa.compra}</p>
                        <p clas="d-contenedor__info">Venta: <i class="ri-money-dollar-circle-fill"></i> ${dato.casa.venta}</p>
                        </div>
    
                        `
                    )
                }

                else{
                    console.log('no funca');
                }
                
            }
        });
    }
   
    tipoDeDolar();
})
