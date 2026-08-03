import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Positions from "./pages/Positions";
import CVs from "./pages/CVs";
import Templates from "./pages/Templates";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Attributes from "./pages/Attributes";
import MainLayout from "./layout/MainLayout";
import AuthInitializer from "./components/AuthInitializer";

function App() {
  return (
    <BrowserRouter>
      <AuthInitializer>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route element={<MainLayout />}>
            {}
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

            {}
            <Route
              element={<ProtectedRoute allowedRoles={["admin", "recruiter"]} />}
            >
              <Route path="/positions" element={<Positions />} />
            </Route>

            {}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/templates" element={<Templates />} />
              <Route path="/attributes" element={<Attributes />} />
              <Route path="/users" element={<Users />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthInitializer>
    </BrowserRouter>
  );
}

export default App;
