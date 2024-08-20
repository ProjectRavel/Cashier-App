import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBarComponents.css";
import { Button } from "react-bootstrap";

function NavbarComponents() {
  const userName = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    window.location.href = "/login";
    localStorage.removeItem("user");
  }

  return (
    <Navbar variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <strong>Vels</strong>Kasir
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav
            className="mx-auto my-2 my-lg-0 d-flex align-items-center"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <span className="navbar-user-name mx-3">{userName}</span>
          </Nav>
          <Nav>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponents;
