import type { ReactNode } from "react";
import { Navigate } from "react-router";
import type { RootState } from "../api/store";
import { useSelector } from "react-redux";
import Loader from '../components/common/Loader'

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useSelector((state: RootState) => state.auth)

  if (loading) {
    return <Loader />
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

export default PrivateRoute
