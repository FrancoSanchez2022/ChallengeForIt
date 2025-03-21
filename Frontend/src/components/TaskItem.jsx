import React from 'react';
import { FaCheck, FaTrash } from 'react-icons/fa';

const TaskItem = ({ task, onDelete, onToggleComplete }) => {
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
        <p>{task.description || "Sin descripción"}</p> {/* Mensaje alternativo */}
        <p>Creada el: {createdAt}</p>
        <p>Estado: {task.completed ? 'Completada' : 'Pendiente'}</p>
        <button onClick={() => onToggleComplete(task.id)}>
          <FaCheck /> {/* Ícono de check */}
          </button>
          <button onClick={() => onDelete(task.id)}>
          <FaTrash style={{ color: 'red' }} /> {/* Ícono de basura en rojo */}
          </button>
      </div>
    );
  };

export default TaskItem;