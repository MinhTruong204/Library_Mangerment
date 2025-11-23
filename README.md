# 📚 Hệ thống Quản lý Thư viện (Library Management System)

![React](https://img.shields.io/badge/Frontend-ReactJS-blue?style=flat-square&logo=react)
![Express](https://img.shields.io/badge/Backend-ExpressJS-black?style=flat-square&logo=express)
![Node](https://img.shields.io/badge/Runtime-Node.js-green?style=flat-square&logo=nodedotjs)

## 📖 Giới thiệu

Đây là ứng dụng web quản lý thư viện toàn diện, được xây dựng theo mô hình **Client-Server**. Ứng dụng giúp quản lý sách, độc giả và quy trình mượn trả một cách trực quan và hiệu quả.

Dự án sử dụng **ReactJS** để xây dựng giao diện người dùng tương tác cao và **ExpressJS** để xử lý logic nghiệp vụ API.

## 🚀 Tính năng chính

* **Quản lý sách:** CRUD (Thêm, Xem, Sửa, Xóa) sách, phân loại theo danh mục, tác giả.
* **Quản lý mượn/trả:** Theo dõi trạng thái mượn, tự động tính ngày quá hạn.
* **Dashboard thống kê:** Biểu đồ số lượng sách, độc giả mới, sách đang được mượn nhiều nhất.
* **Tìm kiếm:** Tìm kiếm realtime sách và độc giả.
* **Phân quyền:** Đăng nhập/Đăng ký, phân quyền Admin và User (Độc giả).

## 🛠 Tech Stack

### Frontend (Client)
* **Core:** ReactJS (Hooks, Context API)
* **Routing:** React Router DOM
* **HTTP Client:** Axios

### Backend (Server)
* **Core:** Node.js, ExpressJS
* **Database:** PostgreSQL
* **Authentication:** JWT (JSON Web Token), Bcrypt

### ⚙️ Các bước cài đặt chi tiết

1.  **Clone repository này về máy:**
    ```bash
    git clone https://github.com/username/repo-quan-ly-thu-vien.git
    cd repo-quan-ly-thu-vien
    ```

2.  **Cài đặt các thư viện phụ thuộc (Dependencies):**
    Vì dự án có cả Client và Server, bạn cần cài đặt cho cả hai thư mục:
    ```bash
    # Cài đặt cho Backend
    cd server
    npm install

    # Cài đặt cho Frontend (Mở terminal mới)
    cd ../client
    npm install
    ```

3.  **Cấu hình Cơ sở dữ liệu & Môi trường:**
    * Đổi tên file `.env.example` thành `.env` trong thư mục `server`.
    * Cập nhật thông tin kết nối (MongoDB URI hoặc MySQL Host) trong file `.env`.
    * Nếu dùng SQL, hãy import file `database.sql` (trong thư mục `/database`) vào CSDL của bạn.

4.  **Chạy ứng dụng:**
    Bạn cần chạy cả 2 terminal:
    ```bash
    # Terminal 1: Chạy Server
    cd server
    npm start

    # Terminal 2: Chạy Client
    cd client
    npm start
    ```

5.  **Truy cập:**
    * Mở trình duyệt và vào địa chỉ: `http://localhost:3000`
    * Tài khoản Admin mặc định: `admin` / `123456`

## 📂 Cấu trúc thư mục

```bash
Library_Mangerment/
│
├── client/             # Source code ReactJS
│   ├── public/
│   └── src/
├── server/             # Source code ExpressJS
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
├── docs/               # Project Document
├── .gitignore
├── CONTRIBUTING.md
└── README.md