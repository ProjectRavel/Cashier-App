# Cashier-App

Cashier-App adalah aplikasi kasir berbasis web yang dibangun menggunakan React dan beberapa teknologi lainnya seperti API dan JSONPlaceholder. Aplikasi ini dirancang untuk membantu mengelola transaksi penjualan dengan mudah dan efisien.

## Fitur

- **ReactJS**: Dibangun menggunakan React untuk UI yang responsif dan interaktif.
- **API Integration**: Menggunakan API untuk mendapatkan dan mengelola data produk dan transaksi.
- **JSONPlaceholder**: Menyediakan data dummy untuk pengujian dan pengembangan.
- **Dynamic UI**: Tampilan yang dapat diperbarui secara dinamis sesuai dengan data yang diambil dari API.

## Instalasi

Pastikan Anda sudah menginstall [Node.js](https://nodejs.org/) dan [npm](https://www.npmjs.com/) di sistem Anda.

1. **Clone repository ini:**

```bash
git clone https://github.com/ProjectRavel/Cashier-App.git
```

2. **Masuk ke direktori frontend:**

```bash
cd KasirApp-react
```

3. **Install dependencies:**

```bash
npm install
```

4. **Jalankan aplikasi:**

```bash
npm run dev
```

Aplikasi ini akan berjalan pada `http://localhost:5173` atau port lain yang ditentukan oleh Vite.

5. **Jalankan JSONPlaceholder (Backend):**
   Buka terminal baru dan masuk ke direktori backend:

```bash
cd ../kasirapp-backend
```

Setelah itu, jalankan placeholder:

```bash
json-server --watch db.json --port 5000
```

JSONPlaceholder akan berjalan pada `http://localhost:5000`.

## Penggunaan

1. **Akses Aplikasi:**
   Buka browser dan akses `http://localhost:5173` untuk membuka aplikasi kasir.

2. **Interaksi dengan Backend:**
   Semua data produk dan transaksi akan diambil dari API yang disediakan oleh JSONPlaceholder di `http://localhost:5000`.

## Struktur Proyek

- **KasirApp-react**: Direktori untuk kode frontend (React).
- **kasirapp-backend**: Direktori untuk JSONPlaceholder backend.

## Kontribusi

Kontribusi sangat diterima! Silakan fork repository ini dan buat pull request untuk perbaikan atau penambahan fitur.
