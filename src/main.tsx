import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/Authentication/RegisterPage/RegisterPage'
import LoginPage from './pages/Authentication/LoginPage/loginPage.tsx'
import MainPage from './pages/SleepTracker/Main/MainPage.tsx'
import Settings from './pages/SleepTracker/Settings/Settings.tsx'
import PrivateRoute from './pages/Authentication/PrivateRoute/PrivateRoute.tsx'
import { Provider } from 'react-redux'
import { store } from './api/store.ts'
import Sitebar from './components/Layout/Sitebar/Sitebar.tsx'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />

        <Route path='/sleeptracker' element={
          <PrivateRoute>
            <Sitebar />
          </PrivateRoute>
        }>
          <Route index element={<MainPage />} />
          <Route path='settings' element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
