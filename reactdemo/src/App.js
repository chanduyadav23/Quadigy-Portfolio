// src/App.js
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import DetailPage from './pages/DetailPage';
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './context/AuthContext';

const Admin = React.lazy(() => import('./pages/Admin'));
const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Suspense fallback={<div style={{ padding: 16 }}>Loading...</div>}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/portfolio/:id" element={<DetailPage />} />
          <Route path="/login" element={<AdminLogin />} />

          {/* Protected */}
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/:secret"
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
