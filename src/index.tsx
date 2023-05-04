import React from 'react';
import ReactDOM from 'react-dom/client';
import BasicApp from './Routers/Basic_App';
import AdminRoutes from './Routers/AdminRoutes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {
      localStorage.getItem("is_admin") === "true" ? <AdminRoutes/> : <BasicApp />
    }
  </React.StrictMode>
);