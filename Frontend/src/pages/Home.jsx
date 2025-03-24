import React from 'react';
import TaskList from '../components/TaskList';

const Home = () => (
  <div className="container">
    <header>
      <h1>Lista de Tareas</h1>
    </header>
    <TaskList />
  </div>
);

export default Home;