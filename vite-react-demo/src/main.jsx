import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import {
  contactLoader,
  contactAction,
  editAction,
  destroyAction,
  rootLoader,
  rootAction,
} from './routes/loader-action'

// lazy
const Contact = lazy(() => import('./routes/contact'))
const EditContact = lazy(() => import('./routes/edit'))
const Default = lazy(() => import('./routes/default'))
const ErrorPage = lazy(() => import('./error-page'))
const Root = lazy(() => import('./routes/root'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    // action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        action: rootAction,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Default /> },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
)
