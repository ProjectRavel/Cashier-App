/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormatIDR } from "../utils/utils";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { API_URL } from "../utils/constans";

function TotalBayar({ totalBayar, keranjangs }) {
  const submitTotalBayar = async (totalBayarPembayaran, keranjangsItem) => {
  Swal.fire({
    title: "Konfirmasi Pembayaran",
    text: "Apakah anda yakin ingin melakukan pembayaran?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Tampilkan loading
        Swal.fire({
          title: "Memproses Pembayaran...",
          text: "Mohon tunggu beberapa saat.",
          icon: "info",
          allowOutsideClick: false,
          showConfirmButton: false,
        });

        // Dapatkan pesanan
        const response = await axios.get(API_URL + "pesanans");

        // Hapus setiap pesanan
        for (let i = 0; i < response.data.length; i++) {
          await axios.delete(API_URL + "pesanans/" + response.data[i].id);
        }

        // Buat pesanan baru
        const pesanan = {
          total_pembayaran: totalBayarPembayaran,
          menus: keranjangsItem,
        };

        await axios.post(API_URL + "pesanans", pesanan);

        // Hapus keranjang
        for (let keranjang of keranjangsItem) {
          await axios.delete(API_URL + "keranjangs/" + keranjang.id);
        }

        Swal.fire({
          title: "Pembayaran Sukses!",
          text: "Terima kasih atas pesanan anda!",
          icon: "success",
          confirmButtonText: "Lihat Pesanan",
        }).then(() => {
          window.location.href = "/sukses";
        });

      } catch (err) {
        Swal.fire({
          title: "Gagal Melakukan Pembayaran!",
          text: "Terdapat kesalahan saat melakukan pembayaran. Silahkan coba lagi.",
          icon: "error",
          confirmButtonText: "Coba Lagi",
        });
        console.log(err);
      }
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
