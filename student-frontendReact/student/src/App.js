import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import Home from "./Home";
import StudentsView from "./components/student/StudentsView";
import NavBar from "./components/common/NavBar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AddStudent from "./components/student/AddStudent";
import EditStudent from "./components/student/EditStudent";
import StudentProfile from "./components/student/StudentProfile";

function App() {
  return (
    <main className="container mt-5">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/view-students" element={<StudentsView />} />
          <Route exact path="/add-students" element={<AddStudent />} />
          <Route exact path="/edit-student/:id" element={<EditStudent />} />
          <Route exact path="/student-profile/:id" element={<StudentProfile />} />
        </Routes>
        <footer className="text-center mt-5 mb-3">
          <p>© {new Date().getFullYear()} Shubham Saini</p>
        </footer>
      </Router>
    </main>
  );
}

export default App;
