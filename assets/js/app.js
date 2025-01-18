let listaTareas = [{
    id: 1,
    name: "despertar",
    checked: false
},{
    id: 2,
    name: "comer",
    checked: false
},{
    id: 3,
    name: "ducharse",
    checked: false
},];

let lista = document.getElementById('lista');
let boton = document.getElementById('boton');
let input = document.getElementById('input');
let total = document.getElementById('total');
let realizadas = document.getElementById('realizadas');
let tareasTotal = 0;
let tareasListas = 0;


function contadorTareas() {
    tareasTotal = listaTareas.length;
    total.innerText = `${tareasTotal}`
    let tareasCheck = 0;
    for (let task of listaTareas){
        if (task.checked){
            tareasCheck ++;
        }
    }
    realizadas.innerText = `${tareasCheck}`;
}

let checkTrue = (id) => `
<input checked type="checkbox" onchange="cambiarEstado(${id})">
`
let checkFalse = (id) => `
<input type="checkbox" onchange="cambiarEstado(${id})">
`
function cambiarEstado(id) {
    let estado = listaTareas.find(estado => estado.id == id);
    if (estado) {
        estado.checked = !estado.checked;
    }
    renderizarLista();
}


function renderizarLista(){
    actualizarIds();
    let template= ``
    for(let task of listaTareas) {
        template +=`<li>
        <div class="datos">
        <p id="${task.id}" class="${task.checked?'tachado':''}">${task.id}</p>
        <p id="${task.id}" class="${task.checked?'tachado':''}">${task.name}</p>
        </div><div class="triggers">
        ${task.checked?checkTrue(task.id):checkFalse(task.id)}
        <a onclick="borrarPorId(${task.id})">X</a></div>
        </li>`
    }
    lista.innerHTML = template;
    contadorTareas()
}

function crearTarea(task) {
    let tarea = {};
    tarea.id = listaTareas.length + 1;
    tarea.name = `${task}`;
    tarea.checked = false,
    listaTareas.push(tarea)
    renderizarLista()
}

function actualizarIds() {
    listaTareas = listaTareas.map((tarea, index) => {
        return {...tarea, id: index + 1}
    });
}

function borrarPorId(id){
    let indiceTask = listaTareas.findIndex((tarea) => tarea.id == id);
    if (indiceTask != -1) {
        listaTareas.splice(indiceTask, 1)
    }
    renderizarLista()
}

boton.addEventListener('click', () => {
    let tarea = input.value;
    if (tarea.trim() != "") {
        crearTarea(tarea.trim());
        input.value="";
    }
})

renderizarLista();