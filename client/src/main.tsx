import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider ,createRoutesFromElements, Route} from 'react-router-dom'
import Layout from './Layout'
import Landing from './pages/Landing'
import Home from './pages/Home'
import Search from './pages/Search'

const router = createBrowserRouter (
  createRoutesFromElements(
    <>
    <Route path="/" element={<Layout />}> 
      <Route path="" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<Search />} />
    </Route>
    </>
  )
)


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
