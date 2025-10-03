'use client';

import { Card } from 'components/card';
import { executeRentalBtnGATag } from 'utils';
import { useState } from 'react';

export function GATestButton() {
    const [lastEvent, setLastEvent] = useState(null);

    const handleButtonClick = () => {
        const data = {
            event: 'rental_button_click',
            category: 'UI_Interaction',
            genre_large: 'Movie',
            genre_mid: 'Action',
            genre_min: 'Sci-Fi',
            titleid: 'TID1024'
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
        <Card title="Kích hoạt Data Layer Event">
            <button className="btn btn-lg" onClick={handleButtonClick}>
                Click để Gửi Data Layer Event
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
