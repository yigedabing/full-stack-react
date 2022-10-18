import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import Root, { rootLoader, rootAction } from './routes/root'
import Index from './routes'
import ErrorPage from './error-page'
import Contact, { contactLoader, contactAction } from './routes/contact'
import EditContact, { editAction, destroyAction } from './routes/edit'

const User = lazy(() => import('./pages/user/User'))
const Order = lazy(() => import('./pages/order/Order'))

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
          { index: true, element: <Index /> },
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
          {
            path: 'user',
            element: (
              <Suspense>
                <User />
              </Suspense>
            ),
          },
          {
            path: 'order',
            element: (
              <Suspense>
                <Order />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
