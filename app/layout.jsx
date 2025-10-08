import '../styles/globals.css';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

export const metadata = {
    title: {
        template: '%s | Netlify',
        default: 'Netlify Starter'
    }
};

const preGtmUserIdScript = `
(function() {
    // Lấy AUTH_KEY từ code utils.js gốc: 'user-session'
    const AUTH_KEY = 'user-session';
    const userString = sessionStorage.getItem(AUTH_KEY);
    
    if (userString) {
        try {
            const user = JSON.parse(userString);
            const userId = user.id; // Lấy ID người dùng

            if (userId) {
                window.dataLayer = window.dataLayer || [];
                // Đẩy giá trị user_id lên Data Layer (không kèm event)
                window.dataLayer.push({ 'user_id': userId });
            }
        } catch (e) {
            console.error('Error parsing user session for GA:', e);
        }
    } 
    // Nếu không đăng nhập, giá trị user_id sẽ là null/undefined, 
    // được xử lý khi GTM chạy.
})();
`;

const gtmScript = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W9W2L7N5');
`;

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* Google Tag Manager */}
                <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
                {/* End Google Tag Manager */}
                <link rel="icon" href="/favicon.svg" sizes="any" />
            </head>
            <body className="antialiased text-white bg-blue-900">
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe 
                        src="https://www.googletagmanager.com/ns.html?id=GTM-W9W2L7N5"
                        height="0" 
                        width="0" 
                        style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>
                {/* End Google Tag Manager (noscript) */}

                <div className="flex flex-col min-h-screen px-6 bg-noise sm:px-12">
                    <div className="flex flex-col w-full max-w-5xl mx-auto grow">
                        <Header />
                        <main className="grow">{children}</main>
                        <Footer />
                    </div>
                </div>
            </body>
        </html>
    );
}
