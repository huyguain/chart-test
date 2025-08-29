# TSLA Stock Chart

Ứng dụng web hiển thị biểu đồ giá cổ phiếu Tesla (TSLA) theo thời gian thực, xây dựng với Next.js, React và Recharts.

## Mục đích dự án

- Giúp người dùng theo dõi biến động giá cổ phiếu TSLA trực quan, dễ sử dụng.
- Thực hành xây dựng ứng dụng với Next.js, React, TypeScript và thư viện vẽ biểu đồ.

## Tính năng

- Hiển thị biểu đồ giá TSLA với các khung thời gian: giờ, ngày, tuần, tháng.
- Cập nhật dữ liệu giá theo thời gian thực (nếu API hỗ trợ).
- Hiển thị thông tin tổng quan: giá hiện tại, số lượng điểm dữ liệu, khung thời gian, biến động giá.
- Xử lý trạng thái tải dữ liệu, lỗi API.
- Giao diện responsive, tối ưu cho cả desktop và mobile.
- Sử dụng font Geist hiện đại.

## Công nghệ sử dụng

- [Next.js](https://nextjs.org/) (React framework)
- [TypeScript](https://www.typescriptlang.org/)
- [Recharts](https://recharts.org/) (vẽ biểu đồ)
- [Tailwind CSS](https://tailwindcss.com/) (styling)
- [Geist Font](https://vercel.com/font/geist)

## Cài đặt & chạy dự án

1. **Clone repo:**
   ```
   git clone <repo-url>
   cd chart-test
   ```

2. **Cài đặt dependencies:**
   ```
   npm install
   ```

3. **Chạy development server:**
   ```
   npm run dev
   ```
   Truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## Cấu trúc thư mục

- `src/app/page.tsx`: Trang chính hiển thị biểu đồ.
- `src/components/`: Các component React dùng cho giao diện và biểu đồ.
- `src/utils/`: Hàm tiện ích xử lý dữ liệu.
- `public/`: Tài nguyên tĩnh (ảnh, favicon...).

## Tùy chỉnh

- Để chỉnh sửa trang chính, sửa file [`src/app/page.tsx`](src/app/page.tsx).
- Có thể thay đổi font hoặc màu sắc trong file cấu hình Tailwind.

## Triển khai

- Có thể deploy lên [Vercel](https://vercel.com/) miễn phí.
- Xem hướng dẫn tại [Next.js Deployment Documentation](https://nextjs.org/docs/deployment).

## Tài liệu tham khảo

- [Next.js Documentation](https://nextjs.org/docs)
- [Recharts Documentation](https://recharts.org/en-US/examples)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---