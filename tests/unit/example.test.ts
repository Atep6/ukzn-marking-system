import { describe, it, expect } from '@jest/globals';

describe('Example Test Suite', () => {
    it('should return true for true', () => {
        expect(true).toBe(true);
    });

    it('should return false for false', () => {
        expect(false).toBe(false);
    });
});