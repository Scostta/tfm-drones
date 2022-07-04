import React from 'react';
import { useAdmin } from './hooks/ManagerContract/useAdmin';
import { Routes } from './routes';

const App: React.FC = () => {
  useAdmin(true);
  return (
    <>
      <Routes />
    </>
  );
};

export default App;
