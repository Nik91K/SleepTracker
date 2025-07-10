import { useEffect, useState } from 'react'
import { useAppDispatch } from '../api/hooks'
import { refreshToken } from '../api/slices/authSlice'
import Loader from '../components/common/Loader'

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    dispatch(refreshToken()).finally(() => setReady(true))
  }, [dispatch])

  if (!ready) return <Loader />

  return <>{children}</>
}

export default AppInitializer
