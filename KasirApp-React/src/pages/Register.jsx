import { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constans"; // Ganti dengan URL API Anda
import Swal from "sweetalert2";

function Register() {
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setSuccess] = useState("");
  const [keranjangs] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const validation = await axios.get(API_URL + "user");
      const validationResult = validation.data;

      console.log(validationResult);
      console.log(nama);

      const result = validationResult.find((validation) => {
        return validation.nama === nama;
      });

      console.log(result);

      if (!result) {
        await axios.post(API_URL + "user", {
          nama,
          password,
          keranjangs,
        });

        // Jika pendaftaran berhasil
        setSuccess("Pendaftaran berhasil! Silakan login.");
        setError("");
        setNama("");
        setPassword("");

        Swal.fire({
          title: "Pendaftaran Berhasil!",
          text: "Tinggal Login deh!",
          icon: "success",
        });

        console.log("berhasil anjir");
      } else {
        setError("Nama dah dipake!");
        return;
      }
    } catch (err) {
      Swal.fire({
        title: "Nama Sudah Pernah Terpakai",
        text: "Namanya cari yang lain gih!",
        icon: "error",
      });
      setError("Terjadi kesalahan saat pendaftaran.");
      console.error("Error register: ", err);
    }
  };

  const toLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="col-md-4 border-1 border p-4 rounded-2 shadow-lg p-3"
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="mb-4 mx-auto d-flex"
          width={50}
        />
        <h1 className="text-center mb-4">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group mb-3">
            <label htmlFor="nama">Nama:</label>
            <input
              type="text"
              id="nama"
              className="form-control"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
          <p className="text-center mt-3">
            Udeh punya akun?{" "}
            <span
              className="text-primary fw-bold register-button"
              onClick={toLogin}
            >
              Login
            </span>{" "}
            Ayo Sini!
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
