import React, { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks`)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleAddTask = (newTask) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    })
      .then(response => response.json())
      .then(data => setTasks([...tasks, data]))
      .catch(error => console.error('Error:', error));
  };

  const handleDeleteTask = (taskId) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`, {
      method: 'DELETE'
    })
      .then(() => setTasks(tasks.filter(task => task.id !== taskId)))
      .catch(error => console.error('Error:', error));
  };

  const handleToggleComplete = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        ...task,
        completed: !task.completed
      })
    })
      .then(response => response.json())
      .then(updatedTask => {
        setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
      })
      .catch(error => console.error('Error:', error));
  };

  const handleUpdateTask = (updatedTask) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })
      .then(response => response.json())
      .then(data => {
        setTasks(tasks.map(task => task.id === data.id ? data : task));
        setEditingTask(null);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      {editingTask ? (
        <TaskForm 
          onSubmit={handleUpdateTask}
          initialTask={editingTask}
          onCancel={() => setEditingTask(null)}
        />
      ) : (
        <>
          <TaskForm onSubmit={handleAddTask} />
          <div className="task-list">
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
                onEdit={setEditingTask}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;