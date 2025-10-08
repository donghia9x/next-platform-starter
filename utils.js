import { uniqueNamesGenerator, adjectives, animals, NumberDictionary } from 'unique-names-generator';

/* Hardcoded user database for simple authentication */
const USERS = [
    { id: 'user123', username: 'testuser', password: 'password', method: 'standard' },
    { id: 'user001', username: 'testuser1', password: 'password', method: 'standard' },
    { id: 'user002', username: 'testuser2', password: 'password', method: 'standard' },
    { id: 'admin001', username: 'admin', password: 'adminpassword', method: 'standard' },
];

/* Keys for storing session data in sessionStorage */
const AUTH_KEY = 'user-session';
const GA_TRACKED_KEY = 'ga-login-tracked'; // Key để theo dõi xem sự kiện login đã được gửi trong phiên này chưa

/* Constants for Search/Rental Events */
export const GENRE_LARGE = ['Film', 'Series', 'Documentary', 'Anime'];
export const GENRE_MID = ['Action', 'Comedy', 'Horror', 'Romance', 'Sci-Fi'];
export const CATEGORY = ['UI_Interaction', 'Deep_Conversion'];

// ------------------- GA TAGGING UTILITIES -------------------

// Đặt giá trị User ID vào Data Layer (Không kèm event)
function setUserIdInDatalayer(userId) {
    if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
            'uid': userId
        });
        console.log('DataLayer Push (User ID Value Set):', userId);
    }
}

/*
    Hàm đẩy sự kiện Data Layer cho Rental (đã tạo ở bước trước).
*/
export function executeRentalBtnGATag(obj) {
    if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
            'event': obj.event,
            'category': obj.category,
            'genre_large': obj.genre_large,
            'genre_mid': obj.genre_mid,
            'genre_min': obj.genre_min,
            'titleid': obj.titleid
        });
        console.log('DataLayer Push (Rental) Executed:', obj);
    } else {
        console.warn('DataLayer is not available for Rental event.');
    }
}

// Login completed - Gửi sự kiện chỉ một lần cho mỗi phiên đăng nhập
export function executeLoginGATag({ method, userId }) {
    if (typeof window !== 'undefined' && window.dataLayer) {
        // Kiểm tra xem sự kiện login đã được gửi trong phiên này chưa
        if (!sessionStorage.getItem(GA_TRACKED_KEY)) {
            window.dataLayer.push({
                'event': 'login',
                'method': method,
                // user_id ĐÃ BỊ LOẠI BỎ khỏi event payload
                'test_custom_param': 'initialized'
            });
            // Đánh dấu rằng sự kiện đã được gửi
            sessionStorage.setItem(GA_TRACKED_KEY, 'true');
            console.log('DataLayer Push (Login) Executed:', { method, userId });
            return true;
        } else {
            console.log('DataLayer Push (Login) SKIPPED: Already tracked in this session.');
            return false;
        }
    } else {
        console.warn('DataLayer is not available for Login event.');
        return false;
    }
}

// Logout completed
export function executeLogoutGATag() {
    if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
            'event': 'logout',
            'uid': null
        });
        // Xóa cờ theo dõi GA khi logout
        sessionStorage.removeItem(GA_TRACKED_KEY);
        console.log('DataLayer Push (Logout) Executed.');
    } else {
        console.warn('DataLayer is not available for Logout event.');
    }
}

// Search event
export function executeSearchGATag({ searchTerm, category }) {
    if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
            'event': 'search',
            'search_term': searchTerm,
            'category': category, // Param trùng tên để test scope
        });
        console.log('DataLayer Push (Search) Executed:', { searchTerm, category });
    } else {
        console.warn('DataLayer is not available for Search event.');
    }
}


// ------------------- AUTH UTILITIES -------------------

export function authenticateUser(username, password) {
    return USERS.find(user => user.username === username && user.password === password);
}

export function getCurrentUser() {
    if (typeof window === 'undefined') return null;
    const user = sessionStorage.getItem(AUTH_KEY);
    
    // Đảm bảo User ID được set lại trên Data Layer sau khi reload
    if (user) {
        const parsedUser = JSON.parse(user);
        setUserIdInDatalayer(parsedUser.id);
        return parsedUser;
    } else {
        return null;
    }
}

export function loginUser(user) {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem(AUTH_KEY, JSON.stringify(user));
        // Kích hoạt sự kiện GA ngay sau khi lưu session
        executeLoginGATag({ method: user.method, userId: user.id });
    }
}

export function logoutUser() {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem(AUTH_KEY);
        // Kích hoạt sự kiện GA khi logout
        executeLogoutGATag();
    }
}


// ------------------- EXISTING UTILITIES -------------------

/*
Get the actual size of a resource downloaded by the browser (e.g. an image) in bytes.
This is supported in recent versions of all major browsers, with some caveats.
See https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/encodedBodySize
*/
export function getResourceSize(url) {
    const entry = window?.performance?.getEntriesByName(url)?.[0];
    if (entry) {
        const size = entry?.encodedBodySize;
        return size || undefined;
    } else {
        return undefined;
    }
}

// Note: this only works on the server side
export function getNetlifyContext() {
    return process.env.CONTEXT;
}

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const uniqueNamesConfig = {
    dictionaries: [adjectives, animals],
    separator: '-',
    length: 2
};

export function uniqueName() {
    return uniqueNamesGenerator(uniqueNamesConfig) + "-" + randomInt(100, 999);
}

export const uploadDisabled = process.env.NEXT_PUBLIC_DISABLE_UPLOADS?.toLowerCase() === "true";

