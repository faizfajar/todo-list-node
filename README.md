# [Nama Proyek Anda]

Simple Todo List

---

### Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone https://github.com/faizfajar/todo-list-node.git
    ```

2.  **Masuk ke direktori proyek:**
    ```bash
    cd todo-list-node
    ```

3.  **Instal dependensi proyek:**
    ```bash
    npm install
    ```

    **Koneksi ke database (postgre):**
    ```bash
    cp env.example .env
    * sesuaikan dengan username & password database local 
    DB_NAME = database utama aplikasi
    DB_NAME_TEST = database untuk unit test ( integration test) aplikasi
    ```

4.  **Jalankan migrasi database:**
    ```bash
    npm run db:migrate
    ```

5.  **Isi database dengan data awal (opsional):**
    * Perintah ini akan mengisi database dengan satu pengguna default untuk pengujian.
    ```bash
    npm run db:seed
    ```

### Menjalankan Aplikasi

```bash
npm run dev ( testing )