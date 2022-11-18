cargarPeliculas();
const pelicula = JSON.parse(localStorage.getItem("peli"));
const palabra = pelicula.titulo.toUpperCase();
var wordContainer = document.getElementById("word_container");
var usedLetters = document.getElementById("used_letters");
var letrasUsadas = [];
var letrasFalladas = [];
console.log(palabra);

var txtUsr = document.getElementById("textoUsr").value;
txtUsr = txtUsr.toUpperCase();

//vemos si el usuario ha usado alguna letra

// poner el array de la respuesta
var answerArray = [];
//Empezamos poniendo la palabra antes que nada con los guiones.
for(var i=0; i<palabra.length;i++) {
    answerArray[i]= "_";
}
wordContainer.innerHTML = answerArray.join(" ");
// Esta variable sirve para ver cuantas vidas tiene el usuario
var vidas = 7; //!decrementa cuando letrasFalladas aumenta

/**
 * Si la letra no está en la matriz, agréguela a la matriz y reste una de las vidas.
 * @param letra - La letra que el usuario ha escrito
 */
function letraPushEnArrays(letra) {
    if(!letrasFalladas.includes(letra) && !palabra.includes(letra) && !letrasUsadas.includes(letra)) {
        letrasFalladas.push(letra);
        letrasUsadas.push(letra);
        vidas--;
    } else {
        console.log("Esa letra se ha usado");
    }
}

function letraPushArrayVista() {
    for(var j=0; j < palabra.length; j++) {
        if(palabra[j]===txtUsr) { //!Hacer que el usuario no tenga que poner espacios
            answerArray[j] = txtUsr;
        }
        wordContainer.innerHTML = answerArray.join(" ");
    }
}

/**
 * Si la matriz incluye la letra, devuelve verdadero; de lo contrario, devuelve falso.
 * @param letra - la letra que el usuario ha escrito
 * @param array - la matriz para buscar
 * @returns un valor booleano.
 */
function arrayContieneLetra(letra, array) {
    return array.includes(letra);
}

/**
 * Si el número de vidas es mayor que cero, devuelve verdadero, de lo contrario, devuelve falso.
 * @returns el valor de las vidas.
 */
function vidasMayorQueCero() {
    return vidas > 0;
}

/**
 * Limpia el campo de entrada.
 */
function limpiarInput() {
    document.getElementById("textoUsr").value="";
    console.log(answerArray);
}
/**
 * Toma el valor de la entrada, lo convierte a mayúsculas y luego lo compara con las letras de la
 * palabra. Si coincide, reemplaza el guión bajo con la letra. Si no coincide, registra "Letra
 * incorrecta" y resta uno de la variable vidas.
 */
const jugar = () => {

    if(vidasMayorQueCero()) {
        //Se puede jugar porque las vidas son mayores a 0
        if(!arrayContieneLetra(txtUsr, letrasFalladas)) { //Si la letra no está en letras falladas, le hacemos un push
            
        } else if (!arrayContieneLetra(txtUsr, letrasUsadas)) {

        }
    } else {
        //No se puede jugar porque las vidas son menores a 0
    }
}


/**
 * Si la tecla presionada es la tecla enter, llama a la función jugar()
 * @param event - El objeto de evento es un objeto de JavaScript que contiene información sobre el
 * evento que ocurrió.
 */
function enterKeyPressed(event) {
    if (event.keyCode == 13) {
        console.log("La tecla enter ha sido presionada");
        //jugar();
    }
}