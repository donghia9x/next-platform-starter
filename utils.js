import { uniqueNamesGenerator, adjectives, animals, NumberDictionary } from 'unique-names-generator';

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

/*
    Hàm đẩy sự kiện vào Google Tag Manager Data Layer.
    Cần đảm bảo file app/layout.jsx đã setup Google Tag Manager.
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
        console.log('DataLayer Push Executed:', obj);
    } else {
        console.warn('DataLayer is not available.');
    }
}

export const uploadDisabled = process.env.NEXT_PUBLIC_DISABLE_UPLOADS?.toLowerCase() === "true";
