import { describe, it, expect, afterEach } from 'vitest';
import { sortArray, detectBrowser } from '../src/helper-functions.js';
import { detectEnvironment } from '../src/helper-functions.js';

describe('sortArray', () => {
    it('sorts an array of positive numbers', () => {
        expect(sortArray([5, 3, 8, 1, 2])).toEqual([1, 2, 3, 5, 8]);
    });

    it('sorts an array with negative numbers', () => {
        expect(sortArray([10, -1, 2, 0])).toEqual([-1, 0, 2, 10]);
    });

    it('returns an empty array when input is empty', () => {
        expect(sortArray([])).toEqual([]);
    });

    it('sorts an array with duplicate numbers', () => {
        expect(sortArray([2, 2, 1, 3, 1])).toEqual([1, 1, 2, 2, 3]);
    });

    it('sorts an array with a single element', () => {
        expect(sortArray([42])).toEqual([42]);
    });

    it('sorts an array with all identical elements', () => {
        expect(sortArray([7, 7, 7])).toEqual([7, 7, 7]);
    });
});

describe('detectBrowser', () => {
    it('detects Chrome', () => {
        expect(detectBrowser('Mozilla/5.0 Chrome/90.0')).toBe('Chrome');
    });

    it('detects Firefox', () => {
        expect(detectBrowser('Mozilla/5.0 Firefox/88.0')).toBe('Firefox');
    });

    it('detects Safari', () => {
        expect(detectBrowser('Mozilla/5.0 Safari/604.1')).toBe('Safari');
    });

    it('detects Edge', () => {
        expect(detectBrowser('Mozilla/5.0 Edge/18.18362')).toBe('Edge');
    });

    it('returns Unknown for unrecognized user agent', () => {
        expect(detectBrowser('Mozilla/5.0 CustomBrowser/1.0')).toBe('Unknown');
    });

    describe('detectEnvironment', () => {
        const originalNavigator = globalThis.navigator;
        const originalWindow = globalThis.window;

        afterEach(() => {
            globalThis.navigator = originalNavigator;
            globalThis.window = originalWindow;
        });

        function mockUserAgent(ua) {
            globalThis.navigator = { userAgent: ua, vendor: '', };
            globalThis.window = { opera: '' };
        }

        it('detects iOS WebView', () => {
            mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)');
            expect(detectEnvironment()).toBe('webview');
        });

        it('detects Android WebView with ; wv', () => {
            mockUserAgent('Mozilla/5.0 (Linux; Android 10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 Mobile Safari/537.36');
            expect(detectEnvironment()).toBe('webview');
        });

        it('detects Android WebView with Version/', () => {
            mockUserAgent('Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36');
            expect(detectEnvironment()).toBe('webview');
        });

        it('detects iOS browser (Safari)', () => {
            mockUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1');
            expect(detectEnvironment()).toBe('browser');
        });

        it('detects Android browser', () => {
            mockUserAgent('Mozilla/5.0 (Linux; Android 10; SM-G970F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Mobile Safari/537.36');
            expect(detectEnvironment()).toBe('browser');
        });

        it('detects desktop browser', () => {
            mockUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
            expect(detectEnvironment()).toBe('browser');
        });
    });
});

// We recommend installing an extension to run vitest tests.