// src/routes/AppRoutes.tsx
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'))
const UserDetails = lazy(() => import("../pages/UserDetails"))

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading…</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path='/dashboard/users' element={<Dashboard />} />
          <Route path="/dashboard/users/:id" element={<UserDetails />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
