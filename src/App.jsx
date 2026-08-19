import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClientInstance } from '@/lib/query-client';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import Navbar from '@/components/landing/Navbar';
import Landing from '@/pages/Landing';
import Onboarding from '@/pages/Onboarding';
import Kundli from '@/pages/Kundli';
import Numerology from '@/pages/Numerology';
import GunMilan from '@/pages/GunMilan';
import Horoscope from '@/pages/Horoscope';
import Voice from '@/pages/Voice';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import ForgotPassword from '@/pages/ForgotPassword';
import PageNotFound from './lib/PageNotFound';

function MainApp() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />
        <Route
          path="/kundli"
          element={
            <ProtectedRoute>
              <Kundli />
            </ProtectedRoute>
          }
        />
        <Route
          path="/numerology"
          element={
            <ProtectedRoute>
              <Numerology />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gunmilan"
          element={
            <ProtectedRoute>
              <GunMilan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/horoscope"
          element={
            <ProtectedRoute>
              <Horoscope />
            </ProtectedRoute>
          }
        />
        <Route
          path="/voice"
          element={
            <ProtectedRoute>
              <Voice />
            </ProtectedRoute>
          }
        />

        {/* 404 Catch All */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <LanguageProvider>
          <Router>
            <ScrollToTop />
            <MainApp />
          </Router>
          <Toaster />
        </LanguageProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}