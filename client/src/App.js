import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import CityWeather from './pages/CityWeather';
// Import the Navbar, Nav and Container components from Bootstrap for a nice layout
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">Know Your City</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* <Nav className="me-auto">
            <Nav.Link href="/posts/new">New</Nav.Link>
          </Nav> */}
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<CityWeather />} />
      </Routes>
    </>
  );
}

export default App;
