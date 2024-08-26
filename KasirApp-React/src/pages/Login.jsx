import { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constans";
import "./login.css";

function Login() {
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Mengambil data dari JSONPlaceholder (ganti dengan URL API Anda)
      const response = await axios.get(API_URL + "user");
      const users = response.data;

      console.log(response.data);

      // Mengecek apakah pengguna ada dan password benar
      const user = users.find(
        (user) => user.nama === nama && user.password === password
      );

      if (user) {
        // Redirect atau simpan sesi pengguna di sini
        console.log(users);
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user.nama));
        window.location.href = "/Home";
      } else {
        // Gagal login
        setError("Nama atau password salah.");
      }
    } catch (err) {
      setError("Terjadi kesalahan.");
      console.error("Error login: ", err);
    }
  };

  const toRegister = () => {
    window.location.href = "/Register";
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-4 border-1 border p-4 rounded-2 shadow-lg">
        <img
          src="/logo.png"
          alt="Logo"
          className="mb-4 mx-auto d-flex"
          width={50}
        />
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={handleLogin}>
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
            Login
          </button>
          <p className="mt-3 text-center">
            Belum Punya akun?{" "}
            <span
              className="text-primary fw-bold register-button"
              onClick={toRegister}
            >
              Register
            </span>{" "}
            aja dulu!
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
