import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import SharedForm from './pages/SharedForm.jsx';
import EditForm from './pages/EditForm.jsx';
import FormResponses from './pages/FormResponses.jsx';
import FormPage from './pages/FormPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'forms/:id',
        element: <FormPage />,
        children: [
          {
            index: true,
            element: <SharedForm />,
          },
          {
            path: 'share',
            element: <SharedForm />,
          },
          {
            path: 'edit',
            element: <EditForm />,
          },
          {
            path: 'responses',
            element: <FormResponses />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
