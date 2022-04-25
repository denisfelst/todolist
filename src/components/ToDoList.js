import React, { useState } from "react";
import ToDoForm from "./ToDoForm";

function ToDoList() {
  // Los ToDos se almacenan en un array
  const [toDos, setToDos] = useState([]);

  const addToDo = toDo => {

      // Uso de REGEX que previene que se añada un exceso de espacios al añadir una tarea
      if(!toDo.text || /^\s*$/.test(toDo.text)){
          return;
      }

      // Añade el nuevo toDo que se pasa como argumento y los anteriores que ya estaban en el array
      const newToDos = [toDo, ...toDos]

      setToDos(newToDos);

      // Las tareas añadidas ahora aparecen en la consola
      console.log(...toDos);
  }

  return (
    <div>
      <h1>ToDoList</h1>
      <ToDoForm onSubmit={addToDo}/>
    </div>
  );
}

export default ToDoList;
