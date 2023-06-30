// VARIABLES
const formulario = document.querySelector('#formulario');
const listaTwits = document.querySelector('#lista-tweets');
let todosTwits = [];



// EVENT LISTENERS

eventListener();
function eventListener() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTwits);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () =>{
        todosTwits = JSON.parse(localStorage.getItem('todosTwits')) || [];

        crearHTML();
    })
}



// FUNCIONES
function agregarTwits(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validacion
    if (tweet === '') {
        mostraError('Un mensaje no puede ir vacio');

        return; // Evita que se siga ejecutando mas lineas de codigo
    }

    const tweetObj ={

        id: Date.now(),
        tweet: tweet
    }
    // Añadir al arreglo de twets
    todosTwits = [...todosTwits, tweetObj];

    // Una vez agregado vamos a crear el html
    crearHTML();

    // Una vez agregado vamos a crear el html
    formulario.reset();
}

// Mostrar mensaje de error
function mostraError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertando en el html del contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta despues de 3 segundos
    setTimeout(() =>{
        mensajeError.remove();
    }, 3000);
}

function crearHTML() {
    limpiarHTML();
    
    if (todosTwits.length > 0) {
        todosTwits.forEach( tweet =>{
            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir la funcion de eliminar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            // Crear el html
            const li = document.createElement('li');

            // Añadir el texto
            li.innerText = tweet.tweet;

            // Asignar el boton
            li.appendChild(btnEliminar);

            // Insertarlo en el html
            listaTwits.appendChild(li);

        })
    }
    sincronizarStorage();
}
// Agrega los twets actuales a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('todosTwits', JSON.stringify(todosTwits));
}

// Elimina un tweet
function borrarTweet(id) {
    todosTwits = todosTwits.filter( tweet => tweet.id !== id);

    crearHTML();
}

// Limpiar el html
function limpiarHTML() {
    while (listaTwits.firstChild) {
        listaTwits.removeChild(listaTwits.firstChild);
    }
}
