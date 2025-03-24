import React from 'react';
import { FaCheck, FaTrash, FaEdit } from 'react-icons/fa';

const TaskItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const createdAt = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : "Fecha no disponible";

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description || "Sin descripción"}</p>
      <p>Creada el: {createdAt}</p>
      <p>Estado: {task.completed ? 'Completada' : 'Pendiente'}</p>
      <div className="task-actions">
        <button onClick={() => onToggleComplete(task.id)}>
          <FaCheck />
        </button>
        <button onClick={() => onEdit(task)}>
          <FaEdit style={{ color: '#FFA500' }} />
        </button>
        <button onClick={() => onDelete(task.id)}>
          <FaTrash style={{ color: 'red' }} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;