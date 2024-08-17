/* eslint-disable react/prop-types */
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { FormatIDR } from "../utils/utils"; // Mengimpor fungsi FormatIDR

function Menus({ menu, masukkanKeKeranjang }) {
  return (
    <Col md={4} xs={6}>
      <Card className="shadow-sm border-0 rounded-4" onClick={() => masukkanKeKeranjang(menu)}>
        <Card.Img
          variant="top"
          src={
            "/images/" + menu.category.nama.toLowerCase() + "/" + menu.gambar
          }
        />
        <Card.Body>
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

