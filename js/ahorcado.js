// Definimos una clase para palabra
var Palabra = function( p ) {
  this.palabra = p.toUpperCase().split('');
  this.letras = this.palabra.map(function(){ return false; });
  this.pista = document.getElementById("pista");

}

Palabra.prototype.muestra = function(){
  str = "";
  miPalabra = this.palabra ;
  this.letras.forEach( function( item, idx ){
    // indx = Number.parseInt(idx);
    if (item) {
      str += miPalabra[idx];
    } else {
      str += "_"
    }
    str += " ";
  });
  this.pista.innerHTML = str;
}
