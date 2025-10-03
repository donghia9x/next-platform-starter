import { Card } from 'components/card';
import { Markdown } from 'components/markdown';
import { GATestButton } from './ga-test-button';

export const metadata = {
    title: 'GA Tag Test'
};

const explainer = `
Trang này được tạo ra để kiểm tra việc kích hoạt tag tùy chỉnh và đẩy dữ liệu vào Data Layer (sử dụng hàm \`executeRentalBtnGATag\` từ \`utils.js\`).

Khi bạn nhấn nút bên dưới:
1. Hàm \`executeRentalBtnGATag\` sẽ được gọi.
2. Một đối tượng dữ liệu sẽ được đẩy vào \`window.dataLayer\`.
3. Bạn có thể kiểm tra tab Console (log thành công) và tab Network (sự kiện GTM được gửi đi) để xác nhận.

Lưu ý: Bạn phải chạy trang này trên trình duyệt có cài đặt Google Tag Manager để sự kiện được gửi đi thực sự.
`;  

export default function GATestPage() {
    return (
        <>
            <h1 className="mb-8">Kiểm tra Tag Tùy chỉnh (GA)</h1>
            <Markdown content={explainer} className="mb-12" />
            <div className="flex justify-center">
                <GATestButton />
            </div>
        </>
    );
}
