'use client';

import { useState } from 'react';
import { Card } from 'components/card';
import { executeSearchGATag, GENRE_LARGE } from 'utils';

export function SearchForm() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState(GENRE_LARGE[0]);
    const [lastSearch, setLastSearch] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!searchTerm) return;

        const data = {
            searchTerm: searchTerm,
            category: searchCategory // Param này trùng tên với param của rental
        };

        // Kích hoạt sự kiện Search
        executeSearchGATag(data);

        // Cập nhật trạng thái hiển thị
        setLastSearch({
            time: new Date().toLocaleTimeString(),
            data: data
        });
    };

    return (
        <Card title="Tìm kiếm Giả định (GA4 Search Event)">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                        type="text"
                        placeholder="Nhập từ khóa tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                        className="input sm:w-2/3"
                    />
                    <select
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                        className="input sm:w-1/3"
                        required
                    >
                        {GENRE_LARGE.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn">
                    Search & Gửi Event
                </button>
            </form>

            {lastSearch && (
                <div className="mt-6 p-4 bg-neutral-100 text-neutral-900 rounded-sm">
                    <h4 className="font-bold">Kết quả Tìm kiếm Giả định</h4>
                    <p className="mt-2">
                        **Từ khóa:** <code>{lastSearch.data.searchTerm}</code>
                    </p>
                    <p>
                        **Danh mục:** <code>{lastSearch.data.category}</code>
                    </p>
                    <h4 className="mt-4 font-bold">Data Layer Payload:</h4>
                    <pre className="mt-2 text-sm whitespace-pre-wrap">
                        {JSON.stringify({ event: 'search', search_term: lastSearch.data.searchTerm, category: lastSearch.data.category }, null, 2)}
                    </pre>
                    <p className="mt-2 text-sm italic">Kiểm tra GTM Preview Mode để thấy sự kiện &apos;search&apos; được kích hoạt.</p>
                </div>
            )}
        </Card>
    );
}
