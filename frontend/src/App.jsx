import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Positions from "./pages/Positions";
import CVs from "./pages/CVs";
import Templates from "./pages/Templates";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";

import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/cvs" element={<CVs />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
