cargarPeliculas();
const pelicula = JSON.parse(localStorage.getItem("peli"));
var palabra = pelicula.titulo.toUpperCase();
var wordContainer = document.getElementById("word_container");
var usedLetters = document.getElementById("used_letters");
var letrasUsadas = [];
var letrasFalladas = [];
//Quitar los espacios los acentos y los dos puntos 
palabra = palabra.replace(/\s+/g, "");
palabra = palabra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
palabra = palabra.replace(/[.:]/g, "");
console.log(palabra);
let numeroImg = 0;


var txtUsr = document.getElementById("textoUsr").value;
txtUsr = txtUsr.toUpperCase();

//vemos si el usuario ha usado alguna letra

// poner el array de la respuesta
var answerArray = [];
//Empezamos poniendo la palabra antes que nada con los guiones.
for (var i = 0; i < palabra.length; i++) {
    answerArray[i] = "_";
}
wordContainer.innerHTML = answerArray.join(" ");
// Esta variable sirve para ver cuantas vidas tiene el usuario
var vidas = 6;
document.getElementById("vidas").innerHTML = vidas;

/**
 * Si la entrada del usuario coincide con una letra en la palabra, inserte esa letra en answerArray y
 * la muestra en wordContainer.
 */
function letraPushArrayVista() {
    var flag = false;
    for (var j = 0; j < palabra.length; j++) {
        if (palabra[j] === txtUsr) {
            answerArray[j] = txtUsr;
            if (!letrasUsadas.includes(txtUsr)) {
                letrasUsadas.push(txtUsr);
            }
            flag = true;
        }
        usedLetters.innerHTML = letrasUsadas.join(" ");
        wordContainer.innerHTML = answerArray.join(" ");
    }
    if (!flag) {
        vidas--;
        numeroImg++;
        setAhorcadoImg(numeroImg);
        document.getElementById("vidas").innerHTML = vidas;
        console.log("vidas: ", vidas);
    }
}

function setAhorcadoImg(numeroImg) {
    let ahorcadoImg = "../../assets/img/img"+numeroImg+".png";
    let img = document.getElementById("imagen");
    img.setAttribute("src",ahorcadoImg);
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
 * Si el flag es verdadero, establece el atributo de solo lectura del elemento textoUsr
 * @param flag - verdadero o falso
 */
function bloquearInput(flag) {
    if (flag) {
        document
            .getElementById("textoUsr")
            .setAttribute("readonly", "readonly");
    }
}

/**
 * Limpia el campo de entrada.
 */
function limpiarInput() {
    document.getElementById("textoUsr").value = "";
    console.log(answerArray);
}
function cambiarPlaceHolder(frase) {
    let placeholder = document.getElementById("textoUsr");
    placeholder.setAttribute("placeholder", frase);
}
function volverAjugar() {
    location.reload();
}

//Cuando el usuario gane o pierda se muestra este botón
function mostrarVolverAjugar(flag) {
    let boton = document.getElementById("volverajugar");
    if (flag) {
        boton.style.visibility = "visible";
    } else {
        boton.style.visibility = "hidden";
    }
}

/**Control del modal */
function activarModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "block";
}
//Cuando el usuario hace click en cerrar modal
cerrarModal = document.getElementById("cerrarModal");
cerrarModal.addEventListener("click", function () {
    document.getElementById("modal").style.display = "none";
});

//Introducir los datos de la película en el modal
function IntroducirDatosModal() {
    let link = "https://image.tmdb.org/t/p/w200"+pelicula.img;
    let tituloHtml = document.getElementById("tituloPelicula");
    let descripcionHtml = document.getElementById("descripcionPelicula");
    let imgHtml = document.getElementById("imagen");
    tituloHtml.innerHTML= pelicula.titulo;
    descripcionHtml.innerHTML = pelicula.descripcion;
    imgHtml.setAttribute("src", link);
}


/**
 * Toma el valor de la entrada, lo convierte a mayúsculas y luego lo compara con las letras de la
 * palabra. Si coincide, reemplaza el guión bajo con la letra. Si no coincide, registra "Letra
 * incorrecta" y resta uno de la variable vidas.
 */
const jugar = () => {
    txtUsr = document.getElementById("textoUsr").value;
    txtUsr = txtUsr.toUpperCase();
    mostrarVolverAjugar(false);

    if (vidasMayorQueCero()) {
        //Se puede jugar porque las vidas son mayores a 0
        if (!arrayContieneLetra(txtUsr, letrasFalladas)) {
            //Si la letra no está en letras falladas, le hacemos un push
            letraPushArrayVista();
        } else if (!arrayContieneLetra(txtUsr, letrasUsadas)) {
        }
    } else {
        cambiarPlaceHolder("Has perdido");
        mostrarVolverAjugar(true);
        limpiarInput();
        bloquearInput(true);
    }
    let flag = false;
    if (answerArray.join("") == palabra) {
        cambiarPlaceHolder("Has ganado!!");
        flag = true;
        IntroducirDatosModal();
        activarModal();
        mostrarVolverAjugar(true);
    }
    limpiarInput();
    bloquearInput(flag);    
};

/**
 * Si la tecla presionada es la tecla enter, llama a la función jugar()
 * @param event - El objeto de evento es un objeto de JavaScript que contiene información sobre el
 * evento que ocurrió.
 */

function enterKeyPressed(event) {
    if (event.keyCode == 13) {
        console.log("La tecla enter ha sido presionada");
        jugar();
    }
}
