/* eslint-disable react/prop-types */

import { Button, Form, Modal } from "react-bootstrap";
import { FormatIDR } from "../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

function ModalKeranjang({
  show,
  handleClose,
  keranjangDetails,
  tambah,
  kurang,
  keterangan,
  changeHandler,
  handleSubmit,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {keranjangDetails.product.nama}{" "}
          <strong>(Rp.{FormatIDR(keranjangDetails.harga)})</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Total Harga : </Form.Label>
            <p>
              <strong>Rp.{FormatIDR(keranjangDetails.total_harga)}</strong>
            </p>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Jumlah : </Form.Label> <br />
            <Button
              variant="primary"
              size="sm"
              className="mx-2"
              onClick={kurang}
            >
              <FontAwesomeIcon icon={faMinus} />
            </Button>
            <strong className="">{keranjangDetails.jumlah}</strong>
            <Button
              variant="primary"
              size="sm"
              className="mx-2"
              onClick={tambah}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Keterangan</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="keterangan"
              placeholder="Contoh : Pedas, Nasi Setengah"
              value={keterangan}
              onChange={changeHandler}
            />
            <Button
              variant="primary"
              type="submit"
              onClick={handleClose}
              className="mt-3"
            >
              Simpan
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Kembali
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalKeranjang;
