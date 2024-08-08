import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { Hasil, ListCategories, NavbarComponents } from "./components"

function App() {
  return (
    <>
      <NavbarComponents />
      <div className="mt-3  ">
        <Container fluid>
          <Row>
            <ListCategories />
            <Col>
              <div className="kasir-app">
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
              </div>
            </Col>
            <Hasil />
          </Row>  
        </Container>
      </div>
    </>
  );
}

export default App;
