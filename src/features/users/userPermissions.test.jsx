import { describe, expect, test } from '@jest/globals'
import { canManageUser } from './userPermissions'

describe('canManageUser', () => {
    test('admins can manage managers and employees, but not admins', () => {
        expect(canManageUser(['Admin'], ['Manager'])).toBe(true)
        expect(canManageUser(['Admin'], ['Employee'])).toBe(true)
        expect(canManageUser(['Admin'], ['Admin'])).toBe(false)
    })

    test('managers can manage employees only', () => {
        expect(canManageUser(['Manager'], ['Employee'])).toBe(true)
        expect(canManageUser(['Manager'], ['Manager'])).toBe(false)
        expect(canManageUser(['Manager'], ['Admin'])).toBe(false)
        expect(canManageUser(['Manager'], ['Employee', 'Manager'])).toBe(false)
    })

    test('employees cannot manage users', () => {
        expect(canManageUser(['Employee'], ['Employee'])).toBe(false)
    })
})
