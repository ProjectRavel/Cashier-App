import { useEffect, useState } from "react";
import { Col, ListGroup } from "react-bootstrap";
import { API_URL } from "../utils/constans";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensilSpoon,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensilSpoon} className="mx-2" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="mx-2" />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mx-2" />;

  return <FontAwesomeIcon icon={faUtensilSpoon} className="mx-2" />;
};

function ListCategories() {
  const [categories, setCategories] = useState([]);

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

  return (
    <Col md={2} mt="2">
      <h4 className="mb-4">
        <strong>Daftar Kategori</strong>
      </h4>
      <ListGroup>
        {categories &&
          categories.map((category) => (
            <ListGroup.Item key={category.id}>
              <h5>
                <Icon nama={category.nama} />
                {category.nama}
              </h5>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Col>
  );
}

export default ListCategories;
