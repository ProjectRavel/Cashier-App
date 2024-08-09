import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { API_URL } from "../utils/constans";
import axios from "axios";


function ListCategories() {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios
      .get(API_URL + "categories")
      .then((response) => {
        const categories = response.data;
        setCategories(categories);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  console.log(categories);

  return (
    <Col md={2} mt="2">
      <h4>
        <strong>Daftar Kategori</strong>
      </h4>
    </Col>
  );
}

export default ListCategories;
