/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormatIDR } from "../utils/utils";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../utils/constans";

function TotalBayar({ totalBayar, keranjangs }) {
  const submitTotalBayar = (totalBayarPembayaran, keranjangsItem) => {
    Swal.fire({
      title: "Konfirmasi Pembayaran",
      text: "Apakah anda yakin ingin melakukan pembayaran?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get(API_URL + "pesanans").then((response) => {
          for (var i = 0; i < response.data.length; i++) {
            axios
              .delete(API_URL + "pesanans/" + response.data[i].id)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                Swal.fire({
                  title: "Gagal Melakukan Pembayaran!",
                  text: "Terdapat kesalahan saat melakukan pembayaran. Silahkan coba lagi.",
                  icon: "error",
                  confirmButtonText: "Coba Lagi",
                });
                console.log(err);
              });
          }
        });
        const pesanan = {
          total_pembayaran: totalBayarPembayaran,
          menus: keranjangsItem,
        };

        axios
          .post(API_URL + "pesanans", pesanan)
          .then(() => {
            Swal.fire({
              title: "Pembayaran Sukses!",
              text: "Terima kasih atas pesanan anda!",
              icon: "success",
              confirmButtonText: "Lihat Pesanan",
            }).then(() => {
              window.location.href = "/sukses";

              keranjangsItem.map((keranjang) => {
                return axios
                  .delete(API_URL + "keranjangs/" + keranjang.id)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              });
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Gagal Melakukan Pembayaran!",
              text: "Terdapat kesalahan saat melakukan pembayaran. Silahkan coba lagi.",
              icon: "error",
              confirmButtonText: "Coba Lagi",
            });
            console.log(err)
          });
      }
    });
  };

  return (
    <div>
      <h4>
        Total Bayar: <span className="fs-2">Rp{FormatIDR(totalBayar)}</span>
      </h4>
      <button
        className="bg-white rounded-3 fw-medium w-100 hover-opacity py-2 fw-bold my-2"
        onClick={() => submitTotalBayar(totalBayar, keranjangs)}
      >
        <FontAwesomeIcon icon={faCartShopping} />
        BAYAR
      </button>
    </div>
  );
}

export default TotalBayar;
