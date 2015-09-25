var diccionario = ['otorrinolaringologia',
                'schwarzenegger',
                'supercalifragilisticoespialidoso',
                'parangaricutirimicuaro']

var l

// Función aleatorio
function aleatorio(minimo, maximo)
{
    var numero = Math.floor( Math.random() * (maximo - minimo + 1) + minimo );
    return numero;
}

// Definimos una clase para el juego
var Ahorcado = function() {
  var p = diccionario[ aleatorio(0,  diccionario.length - 1 ) ];
  this.palabra = p.toUpperCase().split('');
  this.letras = this.palabra.map(function(){ return false; });
  this.fallas = 0;
  this.gano = false;
  this.perdio = false;

  var pista = document.getElementById("pista");
  var c = document.getElementById("canvas");
  c.width  = 500;
  c.height = 400;
  lienzo = c.getContext("2d");

  this.dibujar();

}

Ahorcado.prototype.dibujar = function(){
  if ( this.fallas == 0 ) {
    //Dibujando el poste
    lienzo.beginPath();
    lienzo.moveTo(150,100);
    lienzo.lineTo(150,50);
    lienzo.lineTo(400,50);
    lienzo.lineTo(400,350);
    lienzo.moveTo(300,360);
    lienzo.lineTo(500,360);
    lienzo.lineWidth = 20;
    lienzo.strokeStyle = "#000";
    lienzo.stroke();
    lienzo.closePath();
  }

  if ( this.fallas == 1 ){
    // Dibujamos la Cabeza
    lienzo.beginPath();
    lienzo.arc(150, 140, 40, 0, Math.PI * 2, false);
    lienzo.strokeStyle = "red";
    lienzo.lineWidth = 5;
    lienzo.stroke();
    lienzo.closePath();
  }

  if ( this.fallas == 2 ){
    // Dibujamos el torso
    lienzo.beginPath();
    lienzo.moveTo(150,180);
    lienzo.lineTo(150,250);
    lienzo.strokeStyle = "red";
    lienzo.lineWidth = 5;
    lienzo.stroke();
    lienzo.closePath();
  }

  if ( this.fallas == 3 ){
    // dibujamos los brazos
    lienzo.beginPath();
    lienzo.moveTo(120,220);
    lienzo.lineTo(150,180);
    lienzo.lineTo(180,220);
    lienzo.strokeStyle = "red";
    lienzo.lineWidth = 5;
    lienzo.stroke();
    lienzo.closePath();
  }

  if ( this.fallas == 4 ){
    // Dibujamos las piernas
    lienzo.beginPath();
    lienzo.moveTo(120,290);
    lienzo.lineTo(150,250);
    lienzo.lineTo(180,290);
    lienzo.strokeStyle = "red";
    lienzo.lineWidth = 5;
    lienzo.stroke();
    lienzo.closePath();
  }

  if ( this.fallas == 5 ){
    // Dibujamos ojos muertos
    lienzo.beginPath();
    //Ojo izquierdo
    lienzo.moveTo(125,120);
    lienzo.lineTo(145,145);
    lienzo.moveTo(145,120);
    lienzo.lineTo(125,145);

    //Ojo derecho
    lienzo.moveTo(155,120);
    lienzo.lineTo(175,145);
    lienzo.moveTo(175,120);
    lienzo.lineTo(155,145);

    lienzo.strokeStyle = "blue";
    lienzo.lineWidth = 5;
    lienzo.stroke();
    lienzo.closePath();
  }
}

Ahorcado.prototype.validaJuego = function() {
  if ( this.fallas == 5 ) {
    this.perdio = true;
  } else if ( this.letras.indexOf(false) < 0 ) {
    this.gano = true;
  }

  if ( this.perdio ){
    this.muestraPalabra();
    alert("!! PERDISTE !!\n Recarga la página para comezar nuevamente.");
    return false;
  }

  if ( this.gano ) {
    alert("!! GANASTE !!\n Recarga la página para comezar nuevamente.");
    return false;
  }

  return true;

}

Ahorcado.prototype.muestraPalabra = function(){
  str = "";
  miPalabra = this.palabra;
  var perdio = this.perdio;
  this.letras.forEach( function( item, idx ){
    str += ( (item || perdio) ? miPalabra[idx] : "_" ) + " ";
  });
  pista.innerHTML = str;
}

Ahorcado.prototype.evaluaLetra = function() {
  if ( ! this.validaJuego() ) {
    return;
  }
  letra = l.value.toUpperCase();
  l.value = "";
  encontro = false;
  misLetras = this.letras;
  this.palabra.forEach( function(item, idx) {
    if ( item == letra ){
      misLetras[idx] = true;
      encontro = true;
    }
  });
  this.letras = misLetras;
  if ( encontro ) {
    this.muestraPalabra();
  } else {
    this.fallas++;
    this.dibujar();
  }
  this.validaJuego();
}


function iniciar(){

  l = document.getElementById("letra");

  ahorcado = new Ahorcado();
  ahorcado.muestraPalabra();

  b = document.getElementById("boton");
  b.addEventListener("click", function(){ ahorcado.evaluaLetra(); } );

}
