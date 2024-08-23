import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { Hasil, ListCategories, NavbarComponents } from "../components";
import { API_URL } from "../utils/constans";
import axios from "axios";
import Menus from "../components/Menus";
import Swal from "sweetalert2";
import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState("All");
  const [keranjangs, setKeranjangs] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get(API_URL + "products")
      .then((response) => {
        const menus = response.data;
        setMenus(menus);
        setFilteredMenus(menus)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
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
    if (category === "All") {
      setFilteredMenus(menus); // Reset ke semua menu jika kategori adalah "All"
    } else {
      const filtered = menus.filter((menu) => menu.category.nama === category);
      setFilteredMenus(filtered);
    }
  };

  const handleSearchBarChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchBar = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      const filtered = menus.filter((menu) =>
        menu.nama.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMenus(filtered);
    } else {
      setFilteredMenus(menus); // Tampilkan semua menu jika query kosong
    }
  };

  // Fungsi masukkanKeKeranjang tidak berubah
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
      );

      if (response.data.length === 0) {
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };

        await axios.post(API_URL + "keranjangs", keranjang);
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

  const updateKeranjangs = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((response) => {
        const keranjang = response.data;
        setKeranjangs(keranjang);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
console.log("daftar filteredMenus nya:", filteredMenus);
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
              <Form className="d-flex mb-3" onSubmit={handleSearchBar}>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={query}
                  onChange={handleSearchBarChange}
                />
                <Button variant="outline-success" type="submit">
                  Search
                </Button>
              </Form>
              <Row className="testajah">
                {filteredMenus &&
                  filteredMenus.map((menu) => (
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
