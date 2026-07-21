import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Positions from "./pages/Positions";
import CVs from "./pages/CVs";
import Templates from "./pages/Templates";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<MainLayout />}>
          {/* Admin + Recruiter + Candidate */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["admin", "recruiter", "candidate"]}
              />
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cvs" element={<CVs />} />
            <Route path="/about" element={<About />} />
          </Route>

          {/* Admin + Recruiter */}
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "recruiter"]} />}
          >
            <Route path="/positions" element={<Positions />} />
          </Route>

          {/* Admin only */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/templates" element={<Templates />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
