# Hướng dẫn đóng góp (Contributing Guidelines)

Cảm ơn bạn đã quan tâm đến dự án Library Management System. Để đảm bảo chất lượng code và lịch sử dự án rõ ràng, vui lòng tuân thủ các quy tắc dưới đây.

## 1. Quy tắc Commit Message (Commit Convention)

Chúng tôi tuân thủ chuẩn **Conventional Commits**. Mỗi commit message cần có cấu trúc sau:

`<type>[optional scope]: <description>`

Trong đó:

### **Type (Loại commit):**
* **`feat`**: Một tính năng mới (VD: thêm chức năng tìm kiếm sách).
* **`fix`**: Sửa lỗi (VD: sửa lỗi không đăng nhập được).
* **`docs`**: Chỉ thay đổi tài liệu (README, hướng dẫn).
* **`style`**: Thay đổi định dạng, không ảnh hưởng logic (space, format, semi-colons).
* **`refactor`**: Sửa code nhưng không sửa lỗi hay thêm tính năng (tối ưu code).
* **`chore`**: Các việc lặt vặt (cập nhật build tasks, package manager configs, setup).

### **Scope (Phạm vi - Bắt buộc với code):**
Vì dự án là Monorepo, bạn **cần** chỉ định rõ phạm vi thay đổi:
* **`client`**: Code ReactJS.
* **`server`**: Code NodeJS/Express.
* **`docs`**: Tài liệu.
* **`repo`**: Cấu hình chung (.gitignore, CI/CD).

### **Description (Mô tả):**
* Sử dụng tiếng Anh hoặc tiếng Việt (thống nhất 1 ngôn ngữ).
* Viết ở thể mệnh lệnh (imperative mood). Ví dụ: "Thêm nút..." thay vì "Đã thêm nút...".
* Không có dấu chấm ở cuối câu.

### **Ví dụ mẫu:**
* ✅ `feat(client): create book list component` (Rõ ràng là làm frontend)
* ✅ `fix(server): handle null exception in borrow api` (Rõ ràng là sửa backend)
* ✅ `chore(repo): update readme file`
* ❌ `Fixed bug` (Quá chung chung)
* ❌ `update code` (Không rõ ràng)

---

## 2. Quy trình làm việc (Workflow)

1.  Không bao giờ push trực tiếp lên nhánh `main`.
2.  Tạo nhánh mới từ `main` với tên mô tả công việc: `feat/ten-tinh-nang` hoặc `fix/ten-loi`.
3.  Tạo Pull Request và chờ review trước khi merge.