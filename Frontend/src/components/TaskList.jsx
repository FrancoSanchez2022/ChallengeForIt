import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Obtener las tareas de la API
  useEffect(() => {
    console.log("Tareas actualizadas:", tasks);
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks`)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error:', error));
  }, []);

  // Función para agregar una nueva tarea
  const handleAddTask = (newTask) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Respuesta del backend:", data)
        setTasks([...tasks, data]); // Agrega la nueva tarea a la lista
      })
      .catch(error => console.error('Error:', error));
  };
// Función para eliminar una tarea
  const handleDeleteTask = (taskId) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTasks(tasks.filter(task => task.id !== taskId)); // Elimina la tarea de la lista
      })
      .catch(error => console.error('Error:', error));
  };
// Función para marcar una tarea como completada/pendiente
  const handleToggleComplete = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !task.completed }),
    })
      .then(response => response.json())
      .then(updatedTask => {
        setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <ul className="task-list">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </ul>
      <TaskForm onSubmit={handleAddTask} />
    </div>
  );
};

export default TaskList;