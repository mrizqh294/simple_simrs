# Medical Record API

REST API untuk aplikasi **Medical Record** menggunakan **Express.js**, **Prisma ORM**, dan **MySQL**.

## Requirements

Pastikan perangkat sudah memiliki:

- Node.js
- npm
- MySQL
- Git

## Installation

### 1. Install Dependencies

Setelah project berhasil di-clone, masuk ke folder project kemudian jalankan:

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

Buat file `.env` pada root project.

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

Keterangan:

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

Generate Prisma Client berdasarkan schema yang terdapat pada project.

```bash
npx prisma generate
```

### 5. Jalankan Database Migration

Jalankan migration untuk membuat struktur tabel pada database.

```bash
npx prisma migrate dev
```

Jika Prisma meminta nama migration, gunakan nama:

```text
init
```

### 6. Jalankan Database Seeder

Jalankan seeder untuk memasukkan data awal ke database.

```bash
npx prisma db seed
```

Seeder akan membuat data awal yang diperlukan oleh aplikasi.

### 7. Jalankan Project

Jalankan server dalam mode development:

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

## Urutan Setup

Berikut urutan lengkap untuk menjalankan project dari awal:

```bash
npm install
```

Buat database MySQL terlebih dahulu, kemudian konfigurasi `.env`.

Setelah itu jalankan:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## Development

Untuk menjalankan project dalam mode development:

```bash
npm run dev
```

Untuk menghentikan server, tekan:

```text
Ctrl + C
```

## Prisma

Beberapa perintah Prisma yang digunakan dalam project:

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

## Environment File

Struktur file environment:

```text
.env
```

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

Pastikan `.env` sudah masuk ke `.gitignore`:

```text
.env
```

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- MySQL
- JWT
- Zod
- bcrypt