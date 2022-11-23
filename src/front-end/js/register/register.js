function checkPasswords() {
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    
    return password === password2 && password.length > 2;
}

function getElements() {
    let nombre = document.getElementById("nombre");
    let apellido1 = document.getElementById("apellido1");
    let apellido2 = document.getElementById("apellido2");
    let email = document.getElementById("email");
    let userName = document.getElementById("userName");
    let password = document.getElementById("password");
    let password2 = document.getElementById("password2");

    if(nombre.value == "" || apellido1 == "" || apellido2.value =="" || email.value =="" || userName.value=="" || password.value=="" || password2.value=="") {
        return false;
    } else {
        return {
            "nombre":nombre.value,
            "apellido1":apellido1.value,
            "apellido2":apellido2.value,
            "email":email.value,
            "userName":userName.value,
            "password":password.value,
            "password2":password2.value
        }
    }
}


function getUrl(obj) {
    let url = "http://alu7203.arkania.es:8080/api/registro.php?";
    return urlCompleta = url + "nombre=" + obj.nombre + "&apellido1=" + obj.apellido1 + "&apellido2=" + obj.apellido2 + "&email=" + obj.email + "&usuario=" + obj.userName + "&password=" + obj.password + "&repetir=" + obj.password2;
}


function registrarse() {
    if(!checkPasswords) {
        console.log("Las contraseñas no coinciden o los caracteres son menores a dos.");
        return false;
    }
    let elementos = getElements();
    if(elementos != false) { //Si el usuario rellena todos los campos
        let url = getUrl(elementos);
        resultado(url);
    }


    
}
function resultado(url) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url , true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        let datos = JSON.parse(this.responseText); 
        if(datos.code == 200) {
            alert(datos.body);
        } else if(datos.code == 409) {
            console.log(datos.body);
            alert(datos.body);
        }
    }
}