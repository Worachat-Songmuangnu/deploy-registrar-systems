import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/NavBar";
import Student from "./pages/Student";
import StudentDashboard from "./pages/StudentDashboard";
import Teacher from "./pages/Teacher";
import TeacherDashboard from "./pages/TeacherDashboard";
import SignIn from "./pages/SignIn";
import { AuthProvider } from "./context/useAuth";
import { ProtectedStudentRoute } from "./context/ProtectedStudentRoute";
import { ProtectedTeacherRoute } from "./context/ProtectedTeacherRoute";
import Annoucement from "./pages/Annoucement";
import CreateAnnouncement from "./pages/CreateAnnouncement";

function App() {
  return (
    <>
      <AuthProvider>
        <NavigationBar />
        <Routes element={<NavigationBar />}>
          <Route path="/" element={<Home />} />

          {/* Student */}
          <Route
            path="/student"
            element={
              <ProtectedStudentRoute>
                <Student />
              </ProtectedStudentRoute>
            }
          />
          <Route
            path="/student/dashboard"
            element={
              <ProtectedStudentRoute>
                <StudentDashboard />
              </ProtectedStudentRoute>
            }
          />

          {/* Teacher */}
          <Route
            path="/teacher"
            element={
              <ProtectedTeacherRoute>
                <Teacher />
              </ProtectedTeacherRoute>
            }
          />
          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedTeacherRoute>
                <TeacherDashboard />
              </ProtectedTeacherRoute>
            }
          />
          <Route
            path="/teacher/announcement"
            element={
              <ProtectedTeacherRoute>
                <CreateAnnouncement />
              </ProtectedTeacherRoute>
            }
          />
          <Route
            path="/teacher/announcement/:announcementId"
            element={
              <ProtectedTeacherRoute>
                <Annoucement />
              </ProtectedTeacherRoute>
            }
          />
          {/* SignIn */}
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
