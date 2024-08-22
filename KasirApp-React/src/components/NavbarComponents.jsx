import { Container, Nav, Navbar, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../utils/constans";

function NavbarComponents() {
  const userName = JSON.parse(localStorage.getItem("user")) || "Guest";

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Yakin nih mau logout?",
        text: "Kalau nanti logout kamu perlu login lagi",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, logout!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        // Menampilkan loading alert
        Swal.fire({
          title: "Menghapus data...",
          text: "Mohon tunggu beberapa saat.",
          icon: "info",
          allowOutsideClick: false,
        });

        // Mendapatkan semua item keranjang
        const response = await axios.get(`${API_URL}keranjangs`);
        const keranjangs = response.data;

        // Menghapus setiap item keranjang
        await Promise.all(
          keranjangs.map((keranjang) =>
            axios.delete(`${API_URL}keranjangs/${keranjang.id}`)
          )
        );

        // Menghapus data pengguna dari localStorage
        localStorage.removeItem("user");

        // Mengarahkan ke halaman login
        window.location.href = "/login";
      }
    } catch (error) {
      Swal.fire({
        title: "Gagal Logout!",
        text: "Terdapat kesalahan saat logout. Silahkan coba lagi.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
      console.error("Error logout: ", error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand href="" className="fw-bold">
          Comm<strong>IT</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {/* Add more Nav.Links here if needed */}
          </Nav>
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Item className="d-flex align-items-center">
              <span className="navbar-user-name text-light me-3">
                {userName}
              </span>
            </Nav.Item>
            <Nav.Item>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponents;
