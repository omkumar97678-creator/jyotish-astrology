import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--col-midnight, #0D0F2B)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--col-copper, #C8822A)',
          fontFamily: 'Yatra One, serif',
          fontSize: '1.5rem',
        }}
      >
        <LoadingSpinner text="✦ Loading your cosmic profile..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
