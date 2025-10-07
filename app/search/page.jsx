import { SearchForm } from './search-form';
import { Markdown } from 'components/markdown';

export const metadata = {
    title: 'Search Event Test'
};

const explainer = `
Trang này mô phỏng chức năng tìm kiếm cơ bản và được thiết lập để gửi sự kiện **&apos;search&apos;** tới Data Layer.

**Mục đích kiểm tra chính:**
1. Sự kiện gửi 2 tham số: \`search_term\` và \`category\`.
2. Tham số \`category\` này **trùng tên** với tham số \`category\` trong sự kiện \`rental_button_click\`.

**Lý thuyết về Trùng Tên Tham số:**
Khi hai sự kiện khác nhau sử dụng cùng một tên tham số (\`category\`), GA4 sẽ xử lý chúng độc lập vì các tham số này có phạm vi **sự kiện (Event-scoped)**. Điều này có nghĩa là giá trị của \`category\` trong sự kiện &apos;search&apos; không ảnh hưởng đến giá trị của \`category\` trong sự kiện &apos;rental_click&apos;.
`;

export default function SearchPage() {
    return (
        <>
            <h1 className="mb-8">Kiểm tra Sự kiện Tìm kiếm (GA4)</h1>
            <Markdown content={explainer} className="mb-12" />
            <div className="flex justify-center">
                <SearchForm />
            </div>
        </>
    );
}
