import './index.css'
import App from './App.tsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/Authentication/RegisterPage/RegisterPage'
import LoginPage from './pages/Authentication/LoginPage/loginPage.tsx'
import MainPage from './pages/SleepTracker/Main/MainPage.tsx'
import SleepTrackerStatistics from './pages/SleepTracker/Statistics/SleepTrackerStatistics.tsx'
import Settings from './pages/SleepTracker/Settings/Settings.tsx'
import PrivateRoute from './routes/PrivateRoute.tsx'
import PublicRoute from './routes/PublicRoute.tsx'
import { Provider } from 'react-redux'
import { store } from './api/store.ts'
import Sitebar from './components/Layout/Sitebar/Sitebar.tsx'
import BottomNavigation from './components/Layout/BottomNavigation/index.tsx'
import TokenLoader from './api/TokenLoader.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <TokenLoader>
      <Routes>
        <Route path='/' element={<PublicRoute><App /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path='/sleeptracker' element={
          <PrivateRoute>
            <Sitebar />
            <BottomNavigation />
          </PrivateRoute>
        }>
          <Route index element={<MainPage />} />
          <Route path='settings' element={<Settings />} />
          <Route path='statistics' element={<SleepTrackerStatistics />}/>
        </Route>
      </Routes>
      </TokenLoader>
    </BrowserRouter>
  </Provider>
)
