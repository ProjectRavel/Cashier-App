import { Container, Row, Col, Button } from 'react-bootstrap';

function Error() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <Row className="text-center">
        <Col>
          <h1 className="display-1 fw-bold">Oops!</h1>
          <p className="lead">Sorry, an unexpected 404 has occurred.</p>
          <p className="display-4">404</p>
          <Button variant="primary" href="/" className="mt-3">Go Back to Home</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Error;
