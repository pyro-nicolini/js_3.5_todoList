let listaTareas = [
  { name: "despertar", checked: false },
  { name: "desayunar", checked: false },
  { name: "estudiar", checked: false },
];
let lista = document.getElementById("lista");
let boton = document.getElementById("boton");
let input = document.getElementById("input");
let total = document.getElementById("total");
let realizadas = document.getElementById("realizadas");
let tareasTotal = 0;
let tareasListas = 0;

function actualizarIds() {
  listaTareas = listaTareas.map((tarea, index) => {
    return { ...tarea, id: index + 1, };
  });
}
function contadorTareas() {
  tareasTotal = listaTareas.length;
  total.innerText = tareasTotal;
  let cuantosChecked = listaTareas.filter((tareas) => tareas.checked == true);
  realizadas.innerText = cuantosChecked.length;
}
function cambiarEstado(id) {
  let estado = listaTareas.find((estado) => estado.id == id);
  estado.checked = !estado.checked;
  renderizarLista();
}
function renderizarLista() {
  actualizarIds();
  let template = ``;
  for (let task of listaTareas) {
    template += `<li>
          <div class="datos">
            <p id="${task.id}" class="${task.checked ? "tachado" : ""}">
              ${task.id}
            </p>
            <p id="${task.id}" class="${task.checked ? "tachado" : ""}">
              ${task.name}
            </p>
          </div>
          <div class="triggers">
            <input type="checkbox" onchange="cambiarEstado(${task.id})" ${
      task.checked ? "checked" : ""
    }>
            <a onclick="borrarPorId(${task.id})">X</a>
          </div>
        </li>`;
  }
  lista.innerHTML = template;
  contadorTareas();
}
function crearTarea(task) {
  let tarea = {
    name: `${task}`,
    checked: false,
  };
  listaTareas.push(tarea);
  renderizarLista();
}
function borrarPorId(id) {
  let indiceTask = listaTareas.findIndex((tarea) => tarea.id == id);
  listaTareas.splice(indiceTask, 1);
  renderizarLista();
}
boton.addEventListener("click", () => {
  let tarea = input.value;
  if (tarea.trim() != "") {
    crearTarea(tarea.trim());
    input.value = "";
  }
});
renderizarLista();
