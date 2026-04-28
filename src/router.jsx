// src/router.jsx
import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import SnippetsHub from './pages/SnippetsHub'
import SnippetDetail from './pages/SnippetDetail'
import Playground from './pages/Playground'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'snippets',
        element: <SnippetsHub />,
      },
      {
        path: 'snippets/:id',
        element: <SnippetDetail />,
      },
      {
        path: 'playground',
        element: <Playground />,
      },
    ],
  },
])
