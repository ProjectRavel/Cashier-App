import { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/constans"; // Ganti dengan URL API Anda

function Register() {
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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

        console.log("berhasil anjir");
      } else {
        setError("Nama sudah dipakai!!!");
        return;
      }

      // Mengirim data pendaftaran ke API
    } catch (err) {
      // Jika terjadi kesalahan
      setError("Terjadi kesalahan saat pendaftaran.");
      console.error("Error register: ", err);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
