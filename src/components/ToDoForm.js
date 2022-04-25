import React, { useState } from "react";

function ToDoForm(props) {
  const [input, setInput] = useState("");

  const handleChange = e => {
    setInput(e.target.value);
  };

  // Para que la web no se actualice cuando le des al botton de añadir tarea
  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit({
      // Quizas sea buena idea buscar otra manera de generar el ID, improbable que haya conflicto con 2 IDs pero por buenas practicas y escalabilidad.
      id: Math.floor(Math.random() * 10000),
      text: input,
    })
    setInput('');
  };

  return (
    <div>
      <form className="to-do-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="add task"
          value={input}
          name="text"
          className="todo-input"
          onChange={handleChange}
        />
      <button className="todo-button">Add To-Do</button>
      </form>
    </div>
  );
}

export default ToDoForm;
