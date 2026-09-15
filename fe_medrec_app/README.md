# Medical Record Frontend

Frontend aplikasi **Medical Record** menggunakan **React.js**, **Vite**, dan **Tailwind CSS**.

## Requirements

Pastikan perangkat sudah memiliki:

- Node.js
- npm
- Git

## Installation

### 1. Install Dependencies

Setelah project berhasil di-clone, masuk ke folder project kemudian jalankan:

```bash
npm install
```

### 2. Konfigurasi Environment

Buat file `.env` pada root project.

Contoh:

```env
VITE_BASE_URL=http://localhost:5000
```

Sesuaikan nilai `VITE_BASE_URL` dengan URL API backend yang digunakan.

Contoh struktur project:

```text
project-folder/
├── .env
├── package.json
├── vite.config.js
├── index.html
└── src/
```

> Jangan commit file `.env` ke repository jika file tersebut berisi konfigurasi yang bersifat rahasia.

### 3. Jalankan Project

Jalankan project dalam mode development:

```bash
npm run dev
```

Setelah berhasil dijalankan, Vite akan menampilkan alamat aplikasi pada terminal, biasanya:

```text
http://localhost:5173
```

Buka alamat tersebut melalui browser.

## Environment Variable

Variable environment yang digunakan:

| Variable | Keterangan |
|---|---|
| `VITE_BASE_URL` | URL utama API backend |

Contoh:

```env
VITE_BASE_URL=http://localhost:5000
```

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- React Router

## Quick Start

Untuk menjalankan project dari awal:

```bash
npm install
```

Buat file `.env`:

```env
VITE_BASE_URL=http://localhost:5000
```

Kemudian jalankan:

```bash
npm run dev
```

Project siap digunakan.