// Selectores de elementos del DOM
const input = document.querySelector('#inputTarea');
const btnAgregar = document.querySelector('#btnAgregar');
const listaTareas = document.querySelector('#listaTareas');
const inputBuscar = document.querySelector('#inputBuscar');

// localStorage
const guardarStorage = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
};

const leerStorage = () => {
    const datos = localStorage.getItem('tareas');
    return datos ? JSON.parse(datos) : [];
};

// Array para almacenar las tareas
let tareas = leerStorage();

// Función para mostrar tareas
const mostrarTareas = (array = tareas) => {
    listaTareas.innerHTML = '';

    for (let i = 0; i < array.length; i++) {
        const tarea = array[i];

        const li = document.createElement('li');
        li.classList.add('list-group-item', 'tarea-item');

        if (tarea.completada) {
            li.classList.add('completada');
        }

        const span = document.createElement('span');
        span.innerText = tarea.texto;

        const contenedorBotones = document.createElement('div');

        const btnCompletar = document.createElement('button');
        btnCompletar.innerText = tarea.completada ? 'Pendiente' : 'Completar';
        btnCompletar.classList.add('btn', 'btn-success', 'btn-sm', 'me-2');

        btnCompletar.addEventListener('click', () => {
            tarea.completada = !tarea.completada;
            guardarStorage();
            mostrarTareas();
        });

        const btnEliminar = document.createElement('button');
        btnEliminar.innerText = 'Eliminar';
        btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm');

        btnEliminar.addEventListener('click', () => {
            eliminarTarea(tarea);
        });

        contenedorBotones.appendChild(btnCompletar);
        contenedorBotones.appendChild(btnEliminar);

        li.appendChild(span);
        li.appendChild(contenedorBotones);

        listaTareas.appendChild(li);
    }
};

// Función para eliminar tarea
const eliminarTarea = (tareaEliminar) => {
    tareas = tareas.filter(t => t !== tareaEliminar);
    guardarStorage();
    mostrarTareas();
};

// Evento para agregar tarea
btnAgregar.addEventListener('click', () => {
    const textoTarea = input.value.trim();

    if (textoTarea === '') {
        return;
    }

    const existe = tareas.some(t =>
        t.texto.toLowerCase() === textoTarea.toLowerCase()
    );

    if (existe) {
        alert('La tarea ya existe');
        return;
    }

    tareas.push({
        texto: textoTarea,
        completada: false
    });

    guardarStorage();
    input.value = '';
    inputBuscar.value = '';

    mostrarTareas();
});

// Evento para agregar tarea con Enter
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        btnAgregar.click();
    }
});

// Evento para filtrar tarea
inputBuscar.addEventListener('input', () => {
    const textoBuscar = inputBuscar.value.toLowerCase();

    const tareasFiltradas = tareas.filter(t =>
        t.texto.toLowerCase().includes(textoBuscar)
    );

    mostrarTareas(tareasFiltradas);
});

// Mostrar tareas al cargar la página
mostrarTareas();