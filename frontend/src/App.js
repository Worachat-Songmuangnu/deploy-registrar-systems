import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/NavBar";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import SignIn from "./pages/SignIn";
import { AuthProvider } from "./context/useAuth";
import { ProtectedStudentRoute } from "./context/ProtectedStudentRoute";
import { ProtectedTeacherRoute } from "./context/ProtectedTeacherRoute";
import Annoucement from "./pages/Annoucement";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import Addsubject from "./pages/AddSubject";
import TeacherSubject from "./pages/TeacherSubject";

function App() {
  return (
    <>
      <AuthProvider>
        <NavigationBar />
        <Routes element={<NavigationBar />}>
          <Route path="/" element={<Home />} />

          {/* Student */}
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
          <Route
            path="/teacher/subject"
            element={
              <ProtectedTeacherRoute>
                <TeacherSubject />
              </ProtectedTeacherRoute>
            }
          />
          <Route
            path="/teacher/addsubject"
            element={
              <ProtectedTeacherRoute>
                <Addsubject />
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
