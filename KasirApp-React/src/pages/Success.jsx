import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function Success() {
  return (
    <Container fluid className="success-container">
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={6} lg={4} className="text-center">
          <img
            src="/images/success.png"
            alt="Success"
            className="w-50"
          />
          <h1 className="success-heading">Sukses!</h1>
          <p className="success-message">
            Anda telah berhasil melakukan tindakan.
          </p>
          <Button variant="primary" href="/">
            Kembali ke Beranda
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Success;
