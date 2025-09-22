import { describe, it, expect } from 'vitest';

// Test for initSwipers function existence
import { initSwipers } from '../src/main.js';

describe('initSwipers', () => {
  it('should be a function', () => {
    expect(typeof initSwipers).toBe('function');
  });
});