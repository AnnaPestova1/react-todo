import React from "react";
const todoList = [
  {
    id: 1,
    title: "Plan learning schedule",
  },
  {
    id: 2,
    title: "Read 'The road of React'",
  },
  {
    id: 3,
    title: "Complete assignments",
  },
];
function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function (task) {
          return <li key={task.id}>{task.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
