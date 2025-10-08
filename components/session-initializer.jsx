// next-platform-starter-main/components/session-initializer.jsx (File mới)
'use client';

import { useEffect } from 'react';
import { getCurrentUser } from 'utils';

// Component này chỉ có nhiệm vụ chạy getCurrentUser() trên client
// để đảm bảo User ID được đẩy lại vào Data Layer sau mỗi lần tải trang
export function SessionInitializer({ children }) {
    useEffect(() => {
        // Gọi hàm để kiểm tra sessionStorage và đẩy lại user_id vào DataLayer
        getCurrentUser(); 
        
        // Lưu ý: Không cần dependency array vì chỉ cần chạy 1 lần khi mount.
    }, []);

    return <>{children}</>;
}
