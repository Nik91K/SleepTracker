import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import RegisterPage from './pages/Authentication/RegisterPage/RegisterPage'
import LoginPage from './pages/Authentication/LoginPage/loginPage.tsx'
import MainPage from './pages/Main/MainPage.tsx'
import PrivateRoute from './pages/Authentication/PrivateRoute/PrivateRoute.tsx'
import { Provider } from 'react-redux'
import { store } from './api/store.ts'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/sleeptracker' element={<PrivateRoute><MainPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  </Provider>
)
