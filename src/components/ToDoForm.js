import React, { useState } from "react";

function ToDoForm() {
    const [input, setInput] = useState('');
  return (
    <div>
      <form>
        <input type="text" placeholder="add task" value={input} name='text' className="todo-input" />
      </form>
      <button className="todo-button">Add To-Do</button>
    </div>
  );
}

export default ToDoForm;
