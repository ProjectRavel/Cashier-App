import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { Hasil, ListCategories, NavbarComponents } from "./components";
import { useEffect, useState } from "react";
import { API_URL } from "./utils/constans";
import axios from "axios";
import Menus from "./components/Menus";

function App() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + "products")
      .then((response) => {
        const menus = response.data;
        setMenus(menus);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

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
              <Row>
                {menus && menus.map(menu => (
                  <Menus key={menu.id} menu={menu}/>
                ))}
              </Row>
            </Col>
            <Hasil />
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;
