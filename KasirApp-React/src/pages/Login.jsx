import { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constans";

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
        console.log(users)
        console.log(user)
        localStorage.setItem("user", JSON.stringify(user.nama));
        window.location.href = "/";
      } else {
        // Gagal login
        setError("Nama atau password salah.");
      }
    } catch (err) {
      setError("Terjadi kesalahan.");
      console.error("Error login: ", err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Nama:</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
