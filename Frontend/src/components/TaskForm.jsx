import React, { useState } from 'react';

const TaskForm = ({ onSubmit, initialTask, onCancel }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...(initialTask || {}),
      title,
      description,
      completed: initialTask?.completed || false
    });
    
    if (!initialTask) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="form-actions">
        {initialTask && (
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
        <button type="submit">
          {initialTask ? 'Actualizar tarea' : '➕ Agregar tarea'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;