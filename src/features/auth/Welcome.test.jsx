import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import useAuth from '../../hooks/useAuth'
import Welcome from './Welcome'

jest.mock('../../hooks/useAuth', () => jest.fn())
jest.mock('../../hooks/useTitle', () => jest.fn())

describe('Welcome page shortcuts', () => {
  beforeEach(() => {
    // Use a stable signed-in account for each role-based shortcut test.
    useAuth.mockReturnValue({ username: 'alex', isManager: false, isAdmin: false })
  })

  it('shows the notes shortcuts to an employee', () => {
    // Employees can access notes but should not see team-management shortcuts.
    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /service notes/i })).toHaveAttribute('href', '/dash/notes')
    expect(screen.getByRole('link', { name: /create a note/i })).toHaveAttribute('href', '/dash/notes/new')
    expect(screen.queryByRole('link', { name: /team members/i })).not.toBeInTheDocument()
  })

  it('shows team-management shortcuts to a manager', () => {
    // Managers get the additional shortcuts used to manage employee accounts.
    useAuth.mockReturnValue({ username: 'alex', isManager: true, isAdmin: false })

    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: /team members/i })).toHaveAttribute('href', '/dash/users')
    expect(screen.getByRole('link', { name: /add a team member/i })).toHaveAttribute('href', '/dash/users/new')
  })
})
