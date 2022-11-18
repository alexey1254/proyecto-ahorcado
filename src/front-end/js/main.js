cargarPeliculas();
const pelicula = JSON.parse(localStorage.getItem("peli"));
const palabra = pelicula.titulo.toUpperCase();
var wordContainer = document.getElementById("word_container");
var usedLetters = document.getElementById("used_letters");
var letrasUsadas = [];
console.log(palabra);


function letrasUsadasPush(letra) {
    letrasUsadas.push(letra);
}

//vemos si el usuario ha usado alguna letra

function seHaUsado(letra) {
    for(let i=0;i<letrasUsadas.length;i++) {
        if(letrasUsadas[i] === letra) {
            return true;
        }
    }
    return false;
}
// poner el array de la respuesta
var answerArray = [];
//Empezamos poniendo la palabra antes que nada con los guiones.
for(var i=0; i<palabra.length;i++) {
    answerArray[i]= "_";
}
wordContainer.innerHTML = answerArray.join(" ");
// Esta variable sirve para ver cuantas vidas tiene el usuario
var vidas = 7;

/**
 * Toma el valor de la entrada, lo convierte a mayúsculas y luego lo compara con las letras de la
 * palabra. Si coincide, reemplaza el guión bajo con la letra. Si no coincide, registra "Letra
 * incorrecta" y resta uno de la variable vidas.
 */
function buscarLetra() {
    var txtUsr = document.getElementById("textoUsr").value;
    txtUsr = txtUsr.toUpperCase();
    if(seHaUsado(txtUsr)) {
        console.log("Esa letra ya se ha usado!");
    } else { 
        for(var j=0; j < palabra.length; j++) {
            if(palabra[j]===txtUsr) { //TODO:Hacer que el usuario no tenga que poner espacios
                answerArray[j] = txtUsr;
            } else {
                console.log("Letra incorrecta");
                vidas--;
            }
            wordContainer.innerHTML = answerArray.join(" ");
            
        }
        letrasUsadasPush(txtUsr);
        usedLetters.innerHTML = letrasUsadas.join(" ");
    }
    //hacemos que el input quede vacío
    document.getElementById("textoUsr").value="";
    console.log(answerArray);
}

function enterKeyPressed(event) {
    if (event.keyCode == 13) {
        console.log("La tecla enter ha sido presionada");
        buscarLetra();
    }
}