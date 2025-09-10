import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login  from "../pages/Login";
import Register from "../pages/Register";
import PersonalityForm from "../pages/PersonalityForm";
import ProtectedRoute  from "../../components/ProtectedRoute";
import ChatPage from "../pages/Chatpage";
import "./index.css";
import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
        
        {/* Protected Routes */}
        <Route
          path="/personality"
          element={
            <ProtectedRoute>
              <PersonalityForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/personality/chatpage"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
