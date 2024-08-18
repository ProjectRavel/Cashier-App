/* eslint-disable react/prop-types */
import { Col, ListGroup, Row, Card } from "react-bootstrap";
import { FormatIDR } from "../utils/utils";
import "./Hasil.css"; // Make sure to add the CSS file for additional styling
import TotalBayar from "./TotalBayar";
import { useState } from "react";
import ModalKeranjang from "./ModalKeranjang";
import { API_URL } from "../utils/constans";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function Hasil({ keranjangs, setKeranjangs }) {
  console.log(keranjangs);
  const [show, setShow] = useState(false);
  const [keranjangDetail, setKeranjangsDetail] = useState({
    id: "",
    jumlah: 0,
    total_harga: 0,
    keterangan: "",
    product: {
      id: "",
      kode: "",
      harga: 0,
      is_ready: true,
      gambar: "",
      nama: "", // Add missing nama field
      category: {
        id: "",
        nama: "",
      },
    },
  });

  const handleClose = () => setShow(false);
  const handleShow = (menukeranjang) => {
    setShow(true);
    setKeranjangsDetail({
      ...menukeranjang, // Directly set all fields from the selected item
    });
  };

  const tambah = () => {
    setKeranjangsDetail((prevState) => {
      const newJumlah = prevState.jumlah + 1;
      const newTotalHarga = newJumlah * prevState.product.harga;

      return {
        ...prevState,
        jumlah: newJumlah,
        total_harga: newTotalHarga,
      };
    });
  };

  const kurang = () => {
    if (keranjangDetail.jumlah > 1) {
      setKeranjangsDetail((prevState) => {
        const newJumlah = prevState.jumlah - 1;
        const newTotalHarga = newJumlah * prevState.product.harga;

        return {
          ...prevState,
          jumlah: newJumlah,
          total_harga: newTotalHarga,
        };
      });
    }
  };

  const changeHandler = (event) => {
    setKeranjangsDetail((prevState) => ({
      ...prevState,
      keterangan: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(keranjangDetail);

    const data = {
      id: keranjangDetail.id,
      jumlah: keranjangDetail.jumlah,
      total_harga: keranjangDetail.total_harga,
      product: keranjangDetail.product,
      keterangan: keranjangDetail.keterangan,
    };

    axios
      .put(API_URL + "keranjangs/" + keranjangDetail.id, data)
      .then((res) => {
        Swal.fire({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
        });

        const updatedKeranjangs = keranjangs.map((keranjang) =>
          keranjang.id === keranjangDetail.id ? { ...res.data } : keranjang
        );

        setKeranjangs(updatedKeranjangs);

        handleClose();
      });
  };

  const removeItem = (keranjang) => {
    axios
      .delete(API_URL + "keranjangs/" + keranjang.id)
      .then(() => {
        Swal.fire({
          title: "Item Berhasil Dihapus",
          text: "You clicked the button!",
          icon: "success",
        });

        const updatedKeranjangs = keranjangs.filter(
          (item) => item.id !== keranjang.id
        );
        setKeranjangs(updatedKeranjangs);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const totalHarga = keranjangs.reduce(
    (total, keranjang) => total + (keranjang.total_harga || 0),
    0
  );

  return (
    <Col sm={12} xl={3} className="mt-2">
      <Card>
        <Card.Header>
          <h4>
            <strong>Keranjang</strong>
          </h4>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush" className="keranjang-list">
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
                      {keranjang.keterangan && (
                        <div className="mb-1">
                          <span className="opacity-100">Keterangan:</span>{" "}
                          <span className="opacity-75">
                            {keranjang.keterangan}
                          </span>
                        </div>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      xs={12}
                      className="d-flex justify-content-around gap-2"
                    >
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleShow(keranjang)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>{" "}
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeItem(keranjang)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item className="text-center">
                Keranjang kosong
              </ListGroup.Item>
            )}
            <ModalKeranjang
              show={show}
              handleClose={handleClose}
              keranjangDetails={keranjangDetail}
              tambah={tambah}
              kurang={kurang}
              changeHandler={changeHandler}
              handleSubmit={handleSubmit}
            />
          </ListGroup>
        </Card.Body>
        {keranjangs.length > 0 && (
          <Card.Footer className="text-right bg-primary text-white">
            <TotalBayar totalBayar={totalHarga} keranjangs={keranjangs} />
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
}

export default Hasil;
