// Librerias
const crypto = require("crypto-js"); //llaman a la libreria crypto js 
const fileSystem = require("fs"); //llaman a los metodos de file system
const Buffer = require('buffer/').Buffer; //traen el buffer para interpretar el binario
const express = require('express'); //traen express para levantar el servidor
const subirArchivos = require('express-fileupload'); //esto es para poder subir archivos
const Zip = require("adm-zip"); //lo traen para generar el zip

// Configuracion
const app = express();
const puerto = process.env.PORT || "8000";

//traemos los archivos y comprobamos que el puerto este abierto
app.use(subirArchivos());
app.listen(puerto, () => {
    console.log(`Listening to requests on http://localhost:${puerto}`);
});

// Para que se vea el index
app.use(express.static('./public'));
app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.post("/cifrar", (req, res) => {
    // Nombre de outputs
    let Llave = "llave.txt";
    let TEncriptado = "textoEncriptado.txt";
    // Generar clave
    let clave = generarClave();
    // Leer el archivo a encriptar
    let inputTexto = req.files.Texto.data.toString();
    // Encriptar
    let encriptado = crypto.DES.encrypt(inputTexto, clave).toString();
    // Guardar en un buffer
    encriptado = Buffer.from(encriptado);
    // Guardar el archivo encriptado
    fileSystem.writeFileSync(TEncriptado, encriptado);
    // Guardar la clave en un archivo
    fileSystem.writeFileSync(Llave, clave);
    //generamos un zip
    let zip = new Zip();
    zip.addLocalFile(TEncriptado);
    zip.addLocalFile(Llave);
    zip.writeZip("TEncYLlave.zip");
    res.download("TEncYLlave.zip");
});

app.post("/descifar", (req, res) => {
    // Nombre de outputs
    let Desencriptado = "desencriptado.txt";
    // Leer clave
    let clave = req.files.clave.data.toString();
    // Leer el archivo a desencriptar
    let inputTexto = req.files.Texto.data.toString();
    // Desencriptar
    let desencriptado = crypto.DES.decrypt(inputTexto.toString(), clave).toString(crypto.enc.Utf8);
    // Guardar en un archivo
    fileSystem.writeFileSync(Desencriptado, desencriptado);
    res.download(Desencriptado);
});

function generarClave() {
    const abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    let textoGenerador = "";
    //generamos la clave de 8
    for (let i = 0; i < 8; i++) {
        textoGenerador += abc[Math.floor(Math.random() * 27)];
    }
    //math random nos da un numero entre 0 y 1 
    //(0.56714) * 27 = 15.31278
    //floor nos Devuelve el máximo entero menor o igual a un número.
    //15.31278 = 15 = o
    //
    //01234567
    //oagrgrfh
    return textoGenerador;
}