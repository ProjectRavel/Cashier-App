import { Col, ListGroup, Row, Card } from "react-bootstrap";
import { FormatIDR } from "../utils/utils";
import "./Hasil.css"; // Pastikan menambahkan file CSS untuk styling tambahan
import TotalBayar from "./TotalBayar";

function Hasil({ keranjangs }) {
  const totalHarga = keranjangs.reduce(
    (total, keranjang) => total + keranjang.total_harga,
    0
  );

  return (
    <Col md={3} className="mt-2">
      <Card>
        <Card.Header>
          <h4>
            <strong>Keranjang</strong>
          </h4>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {keranjangs.length !== 0 ? (
              keranjangs.map((keranjang) => (
                <ListGroup.Item
                  key={keranjang.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <Row className="w-100">
                    <Col xs={3}>
                      <strong>{keranjang.jumlah}x</strong>
                    </Col>
                    <Col xs={9}>
                      <h5 className="mb-1">{keranjang.product.nama}</h5>
                      <div>Rp. {FormatIDR(keranjang.total_harga)}</div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item className="text-center">
                Keranjang kosong
              </ListGroup.Item>
            )}
          </ListGroup>
        </Card.Body>
        <Card.Footer className="text-right bg-primary text-white">
          <TotalBayar totalBayar={totalHarga}/>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default Hasil;
