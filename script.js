// limpiar siempre el campo input en 0 (no palabras o letras)  cuando abro la pagina o recargo
document.querySelector('#letra').value = "";

// define lista de palabra disponibles
const palabras = ['dormitorio', 'armario', 'tortuga']

// escoge una palabra al azar dentro de la lista de palabras
const palabra = palabras[Math.floor(Math.random() * palabras.length)]

// imprimir en la consola en browser la palabra escogida
console.log(palabra);

// utlizando regular expresions reemplazo cada una de las letras en la palabra selecionada por un guión
let palabraConGuiones = palabra.replace(/./g, "_ ");

// escribo dentro de mi output p la palabra con guiones
document.querySelector('#output').innerHTML = palabraConGuiones;

//Después de recoger la letra introducida por el usuario, iremos comparando con las letras que tiene 
// la palabra secreta utilizando un bucle for. En caso de coincidencia utilizaremos la siguiente función 
// no nativa para hacer el remplazo (debe estar definida al principio del script)
String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};


// funcion para chequear que el input del usuario sea solo letras del abecedario (enie no incluida)
function chequeoLetra(item) {
    if (item.match(/[a-z]/gi)) {
        return true;
    } else {
        // informo al usuario sobre el problema
        window.alert('Solo se puede introducir letras del abecedario espanol. Tampoco numeros o caracteres. Intente nuevamente');
        // pongo el campo de ingreso nuevamente en blanco
        document.querySelector('#letra').value = "";
        return;
    }

}

// defino variable para guardar letras que el usurio da. esta variable se reseat cada vez que se 
// recarga la pagina
let letrasUsuario = "";

// chequeo si la letra ya fue asignada por el usuario
function chequearLetrasExistentes(item) {

    if (letrasUsuario.includes(item) === true) {
        window.alert("Esta letra ya fue asignada, intente con otra letra");
        document.querySelector('#letra').value = "";

        return;
    } else {
        return true;
    }

}

// cuando hago click en mi elemento calcular:
document.querySelector('#calcular').addEventListener('click', () => {

    // 1. obtengo el valor de la letra
    const letra = document.querySelector('#letra').value;


    // 2. creo una variable con un valor booleano true para 
    let haFallado = true;


    // 3. si input es una letra chequear con palabra, caso contrario alert al usuatio
    if (chequeoLetra(letra) !== true) {
        return
    }



    if (palabra.includes(letra) === true) {
        // en caso de que el gif error este prendido, aqui lo apago
        document.getElementById('error').style.display = "none";

        // chequeo si letra ya existe, caso contrario continuo con el script
        if (chequearLetrasExistentes(letra) === true) {

            // guardo (apendo +=) nueva letra en variable
            letrasUsuario += letra;

            // loop a travez de la palabra selecionada
            for (const i in palabra) {
                // operador logico de tres iguales para confirmar caracter y tipo
                if (letra === palabra[i]) {
                    // remplazo el guion por letra en el indice i
                    palabraConGuiones = palabraConGuiones.replaceAt(i * 2, letra);
                    // escribo en el html la letra
                    document.querySelector('#output').innerHTML = palabraConGuiones;
                    // borro nuevamente el valor input del usuario
                    document.querySelector('#letra').value = "";

                    
                }
            }
        }

        console.log(palabraConGuiones);
        if (palabraConGuiones.match(/_*/) !== true) {
            if (palabraConGuiones === "d o r m i t o r i o ") {
                
                document.getElementById('dormitorio').style.display = "block";
                // resetear el juego con un alert
            
            } else if (palabraConGuiones === "a r m a r i o ") {
            
                document.getElementById('armario').style.display = "block";
                // resetear el juego con un alert

                
            } else if (palabraConGuiones === "t o r t u g a ")  {                
            
                document.getElementById('tortuga').style.display = "block";
                // resetear el juego con un alert

                
            } 
            
            
        }

    } else {
        // guardo (apendo +=) nueva letra en variable
        letrasUsuario += letra;
        // display error como block 
        document.getElementById('error').style.display = "block";
        // borro valor de usario nuevamenbte
        document.querySelector('#letra').value = "";


    }



});

