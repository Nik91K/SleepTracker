import { Navigate } from 'react-router-dom';
import type { JSX } from 'react';
import { useSelector } from "react-redux";
import type { RootState } from '../api/store';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useSelector((state: RootState) => state.auth)

  if (user) {
    return <Navigate to="/sleeptracker" replace />
  }

  return children
}

export default PublicRoute
