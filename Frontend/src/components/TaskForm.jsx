import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  // Estados para manejar los valores del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Función que se ejecuta cuando el usuario envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario se recargue

    // Crea un objeto con los datos de la nueva tarea
    const newTask = {
      title,
      description,
      completed: false, // Por defecto, la tarea no está completada
    };

    // Llama a la función `onSubmit` que recibe como prop
    onSubmit(newTask);
    // Limpia los campos del formulario después de enviar
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Actualiza el estado `title`
        required 
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Actualiza el estado `description`
        required 
      />
       <button type="submit">➕ Agregar tarea</button>
    </form>
  );
};

export default TaskForm;