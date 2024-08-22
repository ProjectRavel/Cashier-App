import { Col, Container, Row } from "react-bootstrap";
import { Hasil, ListCategories, NavbarComponents } from "../components";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constans";
import axios from "axios";
import Menus from "../components/Menus";
import Swal from "sweetalert2";
import "./Home.css";

function Home() {
  const [menus, setMenus] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState("All");
  const [keranjangs, setKeranjangs] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + "products")
      .then((response) => {
        const menus = response.data;
        setMenus(menus);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    console.log("test");
    axios
      .get(API_URL + "keranjangs")
      .then((response) => {
        const keranjang = response.data;
        setKeranjangs(keranjang);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const filterMenusByCategory = (category) => {
    setCategoriesSelected(category);
    if (category == "All") {
      axios
        .get(API_URL + "products")
        .then((response) => {
          const menus = response.data;
          setMenus(menus);
          console.log(menus);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    } else {
      axios
        .get(API_URL + "products?category.nama=" + category)
        .then((response) => {
          const menus = response.data;
          setMenus(menus);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  };

  //Keranjangs

  const updateKeranjangs = () => {
    axios
      .get(API_URL + "keranjangs") //API_URL + "user?nama=" + username + ".keranjangs"
      .then((response) => {
        const keranjang = response.data;
        setKeranjangs(keranjang);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  // Di dalam masukkanKeKeranjang
  const masukkanKeKeranjang = async (value) => {
    try {
      Swal.fire({
        title: "Menambahkan ke Keranjang...",
        text: "Mohon tunggu beberapa saat.",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      const response = await axios.get(
        API_URL + "keranjangs?product.id=" + value.id
      ); //API_URL + "user?nama=" + username + ".keranjangs", keranjang
      if (response.data.length === 0) {
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };

        await axios.post(API_URL + "keranjangs", keranjang); //API_URL + "user?nama=" + username + ".keranjangs", keranjang
        Swal.fire({
          title: "Sukses Masuk Keranjang!",
          text: `${keranjang.product.nama} Berhasil Ditambahkan!`,
          icon: "success",
        });
      } else {
        const keranjang = {
          jumlah: response.data[0].jumlah + 1,
          total_harga: response.data[0].total_harga + value.harga,
          product: value,
        };

        await axios.put(
          API_URL + "keranjangs/" + response.data[0].id,
          keranjang
        );

        Swal.fire({
          title: "Sukses Masuk Keranjang!",
          text: `${keranjang.product.nama} Berhasil Ditambahkan!`,
          icon: "success",
        });
      }
      updateKeranjangs();
    } catch (e) {
      Swal.fire({
        title: "Gagal Menambahkan ke Keranjang!",
        text: "Terdapat kesalahan saat menambahkan produk ke keranjang. Silahkan coba lagi.",
        icon: "error",
        confirmButtonText: "Coba Lagi",
      });
      console.error("Error fetching data: ", e);
    }
  };
  return (
    <>
      <NavbarComponents />;
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              filterMenusByCategory={filterMenusByCategory}
              categoriesSelected={categoriesSelected}
            />
            <Col>
              <div className="kasir-Home">
                <h4>
                  <strong>Daftar Produk</strong>
                </h4>
              </div>
              <Row className="testajah">
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukkanKeKeranjang={masukkanKeKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} setKeranjangs={setKeranjangs} />
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
