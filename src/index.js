import './style.scss'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import BlogpostCreatePage from './pages/BlogpostCreatePage'
import BlogpostFullPage from './pages/BlogpostFullPage'
import BloglistPage from './pages/BloglistPage';
import ErrorPage from './pages/ErrorPage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <BloglistPage />
      },
      {
        path: "/create",
        element: <BlogpostCreatePage />
      },
      {
        path: "/post/:id",
        element: <BlogpostFullPage />
      }
    ]
  },
]);


const el = document.getElementById('root')
const root = ReactDOM.createRoot(el)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)