import { AuthClient } from './auth-client';
import { Markdown } from 'components/markdown';

export const metadata = {
    title: 'Login & Logout'
};

const explainer = `
Đây là trang mô phỏng chức năng đăng nhập và đăng xuất đơn giản (không dùng database).

**Mô tả chức năng:**
1. **Xác thực:** Dùng danh sách tài khoản cố định trong \`utils.js\`.
2. **Quản lý phiên:** Sử dụng \`sessionStorage\` của trình duyệt.
3. **Tracking GA:** Khi đăng nhập thành công: \`executeLoginGATag\` được gọi **chỉ một lần** trong phiên đó. Khi đăng xuất: \`executeLogoutGATag\` được gọi.
`;

export default function AuthPage() {
    return (
        <>
            <h1 className="mb-8">Đăng Nhập & Đăng Xuất</h1>
            <Markdown content={explainer} className="mb-12" />
            <div className="flex justify-center">
                <AuthClient />
            </div>
        </>
    );
}
