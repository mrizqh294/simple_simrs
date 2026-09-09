# Medical Record

Aplikasi **Medical Record** terdiri dari frontend dan backend untuk mengelola data rekam medis.

- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Express.js, Prisma ORM, MySQL

## Requirements

Pastikan perangkat sudah memiliki:

- Node.js
- npm
- MySQL
- Git

## Project Structure

```text
medical-record/
├── backend/
│   ├── .env
│   ├── package.json
│   ├── prisma/
│   └── src/
│
└── frontend/
    ├── .env
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
```

> Nama folder `backend` dan `frontend` dapat disesuaikan dengan struktur project.

---

# Backend

REST API untuk aplikasi **Medical Record** menggunakan **Express.js**, **Prisma ORM**, dan **MySQL**.

## Installation

Masuk ke folder backend:

```bash
cd be_medrec_app
```

### 1. Install Dependencies

```bash
npm install
```

### 2. Buat Database

Buat database MySQL secara lokal.

Contoh:

```sql
CREATE DATABASE medrec_app;
```

Nama database dapat disesuaikan dengan kebutuhan project.

### 3. Konfigurasi Environment

Buat file `.env` pada root folder backend.

Contoh:

```env
DATABASE_URL="mysql://root:@localhost:3306/medrec_app"

DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD=""
DB_NAME="medrec_app"
DB_PORT="3306"

JWT_SECRET="secret-key-development"
```

Sesuaikan konfigurasi database dengan MySQL yang digunakan.

### Environment Variable Backend

| Variable | Keterangan |
|---|---|
| `DATABASE_URL` | URL koneksi database Prisma |
| `DB_HOST` | Host database |
| `DB_USER` | Username MySQL |
| `DB_PASSWORD` | Password MySQL |
| `DB_NAME` | Nama database |
| `DB_PORT` | Port MySQL |
| `JWT_SECRET` | Secret key untuk autentikasi JWT |

> Jangan membagikan atau meng-commit file `.env` ke repository.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Jalankan Database Migration

Jalankan migration untuk membuat struktur tabel pada database:

```bash
npx prisma migrate dev
```

Jika Prisma meminta nama migration, gunakan:

```text
init
```

### 6. Jalankan Database Seeder

```bash
npx prisma db seed
```

Seeder akan membuat data awal yang diperlukan oleh aplikasi.

### 7. Jalankan Backend

```bash
npm run dev
```

Jika server berhasil dijalankan, API dapat diakses melalui:

```text
http://localhost:5000
```

> Port dapat berbeda tergantung konfigurasi project.

## Akun Login

Setelah menjalankan `npx prisma db seed`, gunakan akun berikut untuk login:

| Role | Email | Password |
|---|---|---|
| Pendaftaran | `pendaftaran1@gmail.com` | `12345678` |
| Admin | `admin1@gmail.com` | `12345678` |

## Prisma Commands

Generate Prisma Client:

```bash
npx prisma generate
```

Menjalankan migration:

```bash
npx prisma migrate dev
```

Menjalankan seeder:

```bash
npx prisma db seed
```

Membuka Prisma Studio:

```bash
npx prisma studio
```

## Tech Stack Backend

- Node.js
- Express.js
- Prisma ORM
- MySQL
- JWT
- Zod
- bcrypt

---

# Frontend

Frontend aplikasi **Medical Record** menggunakan **React.js**, **Vite**, dan **Tailwind CSS**.

## Installation

Masuk ke folder frontend:

```bash
cd fe_medrec_app
```

### 1. Install Dependencies

```bash
npm install
```

### 2. Konfigurasi Environment

Buat file `.env` pada root folder frontend.

Contoh:

```env
VITE_BASE_URL=http://localhost:5000
```

`VITE_BASE_URL` harus mengarah ke URL API backend.

### Environment Variable Frontend

| Variable | Keterangan |
|---|---|
| `VITE_BASE_URL` | URL utama API backend |

### 3. Jalankan Frontend

```bash
npm run dev
```

Setelah berhasil dijalankan, Vite akan menampilkan alamat aplikasi pada terminal, biasanya:

```text
http://localhost:5173
```

Buka alamat tersebut melalui browser.

## Tech Stack Frontend

- React.js
- Vite
- Tailwind CSS
- React Router

---

# Quick Start

Untuk menjalankan aplikasi dari awal, jalankan backend dan frontend pada terminal yang berbeda.

## 1. Backend

```bash
cd backend
npm install
```

Buat database MySQL, kemudian buat file `.env`:

```env
DATABASE_URL="mysql://root:@localhost:3306/medrec_app"

DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD=""
DB_NAME="medrec_app"
DB_PORT="3306"

JWT_SECRET="secret-key-development"
```

Kemudian jalankan:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Backend berjalan pada:

```text
http://localhost:5000
```

## 2. Frontend

Buka terminal baru:

```bash
cd frontend
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

Frontend berjalan pada:

```text
http://localhost:5173
```

## Environment File

Pastikan file `.env` tidak di-commit ke repository.

Tambahkan ke `.gitignore`:

```text
.env
```

---

# Development

Untuk menghentikan server yang sedang berjalan, tekan:

```text
Ctrl + C
```

Project siap digunakan setelah backend dan frontend berhasil dijalankan.
