import './App.css';
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import StudentLogin from './components/studentLogin/StudentLogin';
import AdminLogin from './components/adminLogin/AdminLogin';
import { useSelector, useDispatch } from 'react-redux';
import { clearLoginStatus } from './slices/StudentSlice';
import StudentDashboard, { studentDashboard } from './components/studentDashboard/StudentDashboard';
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogout = () => {
    localStorage.clear();
    dispatch(clearLoginStatus());
    navigate("/");
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#">MyApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {localStorage.getItem("loginToken") == null ? (
              <Nav className='ms-auto pe-4'>
                <NavLink className="nav-link" to="">Student Login</NavLink>

              </Nav>) : (
              <Button className='m-2' variant="outline-primary" onClick={userLogout}>
                Logout
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<StudentLogin />}></Route>
        <Route path='/studentDashboard' element={<StudentDashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
