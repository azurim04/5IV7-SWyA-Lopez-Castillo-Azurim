const abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
    'w', 'x', 'y', 'z'];

let key = "";

$(document).ready(function() {
    $('#cifrar').click(function() {
        //aquí vamos a cifrar
        key = document.getElementById('llave').value;
        key = key.replace(/ /g, '');
        let mensaje = document.getElementById('mensaje').value;
        mensaje = mensaje.replace(/ /g, '');
        let mensaje2 = "";
        let keyComplete = "";
        //Aquí empieza el algoritmo
        if (revision(mensaje, key)) {
            for (var i = 0; i < mensaje.length; i++) {
                //miau holamundofeliz
                //0123 miaumiaumiaumi
                keyComplete += key.charAt(i % Number(key.length));
            }
            for (var i = 0; i < mensaje.length; i++) {
                //obtener la posicion de la letra por letra del mensaje
                let caracter = mensaje.charAt(i);
                let PosicionMensaje = posicion(caracter);
                caracter = keyComplete.charAt(i);
                let PosicionLlave = posicion(caracter);
                let nuevoValor = cambio(PosicionMensaje, PosicionLlave);
                mensaje2 += abc[nuevoValor];
            }
            document.getElementById('resultado').value = mensaje2;
        }
    });

    $('#descifrar').click(function() {
        //para cifrar vamos a usar la funcion
        // y = (x+z)mod27 pq estamos usando la ñ
        //vamos a traer los datos de los campos de texto
        key = document.getElementById('llave').value;
        //vamos a verificar los datos
        key = key.replace(/ /g, '');
        //obtener el mensaje
        let mensaje = document.getElementById('mensaje').value;
        mensaje = mensaje.replace(/ /g, '');
        let mensaje2 = "";
        let keyComplete = "";
        //algoritmo
        if (revision(mensaje, key)) {
            for (var i = 0; i < mensaje.length; i++) {
                keyComplete += key.charAt((i % Number(key.length)));
            }
            for (var i = 0; i < mensaje.length; i++) {
                //obtener la poscion de la letra por letra del mensaje
                let caracter = mensaje.charAt(i);
                let PosicionMensaje = posicion(caracter);
                caracter = keyComplete.charAt(i);
                let PosicionLlave = posicion(caracter);
                //ejecutamos el algoritmo
                let nuevoValor = intercambio(PosicionMensaje, PosicionLlave);
                mensaje2 += abc[nuevoValor]; //mensaje decifrado
            }
            //imprimir el resultado
            document.getElementById('resultado').value = mensaje2;
        }
    });

    $('#borrar').click(function() {
            document.getElementById('mensaje').value="";
            document.getElementById('llave').value="";
            document.getElementById('resultado').value="";
    })
});

function cambio(PosicionMensaje, PosicionLlave) {
    // y = (x + z)mod27
    let y = (PosicionMensaje + PosicionLlave) % 27;
    return y;
}

function intercambio(PosicionMensaje, PosicionLlave) {
    let valor = 0;
    if ((PosicionMensaje - PosicionLlave) >= 0) {
        valor = (PosicionMensaje - PosicionLlave) % 27;
    } else {
        valor = (PosicionMensaje - PosicionLlave + 27) % 27;
    }
    return valor;
}

function posicion(caracter) {
    let position = abc.indexOf(caracter);
    return position;
}

function revision(mensaje, key) {
    const re = /^([a-zñ?]+([]*[a-zñ?]?['-]?[a-zñ?]+)*)$/

    var acc = true;

    if (!re.test(mensaje)) {
        ErrorMensaje();
        acc = false;
    }
    if (!re.test(key)) {
        ErrorClave();
        acc = false;
    }
    if (key.length > mensaje.length) {
        ErrorT();
        acc = false;
    }
    return acc;
}

function ErrorMensaje() {
    alert("El texto ingreso no ha sido aceptado, ingrese solo minuscilas y evite numeros y simbolos");
    //alert para decir que el texto no ha sido aceptado
    /*Swal.fire({
        title: "Error",
        text: "El texto ingreso no ha sido aceptado, ingrese solo minuscilas y evite numeros y simbolos",
        icon: 'error'
    });*/
}


function ErrorClave() {
    alert("La clave ingresa es incorrecta, no cumple con las normas de solo minusculas y no usar numeros y/o simbolos");
    //alert para decir que el texto no ha sido aceptado
    /*Swal.fire({
        title: "Error",
        text: "La clave ingresa es incorrecta, no cumple con las normas de solo minusculas y no usar numeros y/o simbolos",
        icon: 'error'
    });*/
}

function ErrorT() {
    alert("La clave no puede ser mayor que el mensaje");
    //alert para decir que el texto no ha sido aceptado
    /*Swal.fire({
        title: "Error",
        text: "La clave no puede ser mayor que el mensaje",
        icon: 'error'
    });*/
}