/**
 * Toma una matriz como argumento y devuelve un índice aleatorio de esa matriz.
 * @param array - La matriz de la que desea obtener un elemento aleatorio.
 * @returns El índice aleatorio de la matriz.
 */
function getRandomFilm(array) {
    let index = Math.floor(Math.random() * array.length);
    return index;
}

/**
 * Es una función que devuelve un array de cadena de caracteres, cada indice es un div con un título de película,
 * una identificación de película, una imagen de película y una descripción de película.
 * @returns Un array de cadena de caracteres.
 */
function cargarPeliculas(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "../js/peliculas.json", true); //Ojo con esta linea, si es una ruta relativa hay que ponerla desde donde se está ejecutando el html >:(
    xhttp.send();
    var listaPeliculas = [];
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            let datos = JSON.parse(this.responseText); 
            for (let peli in datos["results"]) {
                var pelicula = new Pelicula(datos["results"][peli]["title"],datos["results"][peli]["id"],datos["results"][peli]["overview"], datos["results"][peli]["poster_path"]);
                listaPeliculas.push(pelicula);
            }
        }
        var index = getRandomFilm(listaPeliculas);
        const peliculaSeleccionada = listaPeliculas[index];
        //console.log(peliculaSeleccionada);
        localStorage.setItem("peli", JSON.stringify(peliculaSeleccionada));
    }
}

