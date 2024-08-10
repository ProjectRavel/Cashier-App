import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { Hasil, ListCategories, NavbarComponents } from "./components";
import { useEffect, useState } from "react";
import { API_URL } from "./utils/constans";
import axios from "axios";
import Menus from "./components/Menus";

function App() {
  const [menus, setMenus] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState("Makanan");

  useEffect(() => {
    axios
      .get(API_URL + "products")
      .then((response) => {
        const menus = response.data;
        setMenus(menus);
        console.log("test");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const filterMenusByCategory = (category) => {
    setCategoriesSelected(category);
    // Filter menus by category using the API_URL and the selected category name.
    axios
      .get(API_URL + "products?category.nama=" + category)
      .then((response) => {
        const menus = response.data;
        setMenus(menus);
        console.log("test");
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  return (
    <>
      <NavbarComponents />
      <div className="mt-3  ">
        <Container fluid>
          <Row>
            <ListCategories filterMenusByCategory={filterMenusByCategory} categoriesSelected={categoriesSelected} />
            <Col>
              <div className="kasir-app">
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
              </div>
              <Row>
                {menus &&
                  menus.map((menu) => <Menus key={menu.id} menu={menu} />)}
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
