import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from '@jest/globals'
import Public from './Public'

describe('Public page', () => {
  it('shows the service information and employee sign-in link', () => {
    // The public page should explain the service and offer a route to sign in.
    render(
      <MemoryRouter>
        <Public />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /welcome to dan d\. repairs/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /employee sign in/i })).toHaveAttribute('href', '/login')
  })
})
