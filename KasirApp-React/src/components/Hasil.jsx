import { Col, ListGroup, Row } from "react-bootstrap";

function Hasil({ keranjangs }) {
  return (
    <Col md={2} mt="2">
      <h4>
        <strong>Hasil</strong>
      </h4>
      <ListGroup variant="flush">
        {keranjangs.length !== 0 &&
          keranjangs.map((keranjang) => (
            <ListGroup.Item key={keranjang.id}>
              <Row>
                <Col md={4}>{keranjang.product.nama}</Col>
                <Col md={4}>{keranjang.jumlah}</Col>
                <Col md={4}>Rp. {keranjang.totalHarga}</Col>
              </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Col>
  );
}

export default Hasil;
