'use client';

import { Card } from 'components/card';
import { executeRentalBtnGATag, randomInt, GENRE_LARGE, GENRE_MID, CATEGORY } from 'utils'; 
import { useState } from 'react';

// Hàm lấy giá trị ngẫu nhiên từ một mảng
const getRandomValue = (arr) => arr[randomInt(0, arr.length - 1)];

export function GATestButton() {
    const [lastEvent, setLastEvent] = useState(null);

    const handleButtonClick = () => {
        // TẠO CÁC GIÁ TRỊ NGẪU NHIÊN Ở ĐÂY
        const data = {
            event: 'rental_button_click',
            category: getRandomValue(CATEGORY), // Chọn ngẫu nhiên category
            genre_large: getRandomValue(GENRE_LARGE), // Chọn ngẫu nhiên genre_large
            genre_mid: getRandomValue(GENRE_MID), // Chọn ngẫu nhiên genre_mid
            genre_min: `Min-${randomInt(1, 10)}`, // Tạo genre_min ngẫu nhiên
            titleid: `TID${randomInt(1000, 9999)}` // Tạo Title ID ngẫu nhiên
        };

        // Kích hoạt tag
        executeRentalBtnGATag(data);

        // Cập nhật trạng thái hiển thị
        setLastEvent({
            time: new Date().toLocaleTimeString(),
            data: data
        });
    };

    return (
        <Card title="Kích hoạt Data Layer Event (Random)">
            <button className="btn btn-lg" onClick={handleButtonClick}>
                Thuê một đĩa ngẫu nhiên
            </button>
            {lastEvent && (
                <div className="mt-4 p-4 bg-neutral-100 text-neutral-900 rounded-sm">
                    <h4 className="font-bold">Lần gửi cuối: {lastEvent.time}</h4>
                    <pre className="mt-2 text-sm whitespace-pre-wrap">
                        {JSON.stringify(lastEvent.data, null, 2)}
                    </pre>
                    <p className="mt-2 text-sm italic">Kiểm tra Console để thấy log xác nhận.</p>
                </div>
            )}
        </Card>
    );
}
