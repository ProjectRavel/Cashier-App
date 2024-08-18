/* eslint-disable react/prop-types */
import "./Menus.css";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { FormatIDR } from "../utils/utils"; // Mengimpor fungsi FormatIDR

function Menus({ menu, masukkanKeKeranjang }) {
  return (
    <Col sm={12} md={6} lg={4} xl={4}>
      <Card
        className="shadow-sm border-0 rounded-4 menu-card"
        onClick={() => masukkanKeKeranjang(menu)}
      >
        <Card.Img
          variant="top"
          src={
            "/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar
          }
        />
        <Card.Body className="menu-card-body">
          <Card.Title>
            {menu.nama} <strong>{`${menu.kode}`}</strong>
          </Card.Title>
          <Card.Text>Rp. {FormatIDR(menu.harga)}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Menus;
