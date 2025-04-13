import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudytableLanding } from "./pages/StudytableLanding";
import { BlogPage } from "./pages/BlogPage";
import { NoticeBoard } from "./pages/NoticeBoard";
import { SignUp } from "./pages/Auth/Onboarding/SignUp";
import { SignIn } from "./pages/Auth/SignIn/SignIn";
import { Dashboard } from "./pages/Dashboard";
import { AuthMiddleware } from "./components/auth/AuthMiddleware";
import Footer from "./components/Footer/Footer";

const PublicRoute = ({ children }: { children: React.ReactNode }) => (
  <AuthMiddleware requireAuth={false}>
    {children}
  </AuthMiddleware>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => (
  <AuthMiddleware requireAuth={true}>
    {children}
  </AuthMiddleware>
);

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute><><StudytableLanding /><Footer /></></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><><SignUp /><Footer /></></PublicRoute>} />
        <Route path="/signin" element={<PublicRoute><><SignIn /><Footer /></></PublicRoute>} />
        <Route path="/blog" element={<PublicRoute><><BlogPage /><Footer /></></PublicRoute>} />
        <Route path="/notice" element={<PublicRoute><><NoticeBoard /><Footer /></></PublicRoute>} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  </StrictMode>
);
