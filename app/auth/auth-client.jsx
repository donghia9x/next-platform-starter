'use client';

import { useState, useEffect } from 'react';
import { Card } from 'components/card';
import { Alert } from 'components/alert';
import { getCurrentUser, loginUser, logoutUser, authenticateUser } from 'utils';

export function AuthClient() {
    const [currentUser, setCurrentUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Load session on initial mount
        setCurrentUser(getCurrentUser());
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const user = authenticateUser(username, password);

        if (user) {
            loginUser(user);
            setCurrentUser(user);
            setSuccess(`Đăng nhập thành công với User ID: ${user.id}. Kiểm tra console để xem sự kiện GA.`);
            setUsername('');
            setPassword('');
        } else {
            setError('Sai tên đăng nhập hoặc mật khẩu.');
        }
    };

    const handleLogout = () => {
        logoutUser();
        setCurrentUser(null);
        setSuccess('Đã đăng xuất thành công. Kiểm tra console để xem sự kiện GA.');
    };

    if (currentUser) {
        return (
            <div className="w-full md:max-w-md">
                <Card title={`Xin chào, ${currentUser.username}!`}>
                    {success && <Alert type="success">{success}</Alert>}
                    <p>User ID của bạn: <code>{currentUser.id}</code></p>
                    <p>Phương thức đăng nhập: <code>{currentUser.method}</code></p>
                    <button className="btn mt-4" onClick={handleLogout}>
                        Đăng Xuất
                    </button>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full md:max-w-md">
            <Card title="Đăng Nhập">
                {error && <Alert type="error">{error}</Alert>}
                {success && <Alert type="success">{success}</Alert>}

                <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <input
                        name="username"
                        type="text"
                        placeholder="Tên đăng nhập (ví dụ: testuser)"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Mật khẩu (ví dụ: password)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input"
                    />
                    <button className="btn" type="submit">
                        Đăng Nhập
                    </button>
                </form>
                
                <p className="mt-4 text-sm text-center text-neutral-600">
                    Sử dụng: <code>testuser</code> / <code>password</code> hoặc <code>admin</code> / <code>adminpassword</code>
                </p>
            </Card>
        </div>
    );
}
