import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from './authApiSlice'
import Login from './Login'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))
jest.mock('./authApiSlice', () => ({
  useLoginMutation: jest.fn(),
}))
jest.mock('../../hooks/usePersist', () => () => [false, jest.fn()])
jest.mock('../../hooks/useTitle', () => jest.fn())

describe('Login page', () => {
  const mockLogin = jest.fn()
  const mockDispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    useDispatch.mockReturnValue(mockDispatch)
    useLoginMutation.mockReturnValue([mockLogin, { isLoading: false }])
    mockLogin.mockReturnValue({
      unwrap: () => Promise.resolve({ accessToken: 'guest-token' }),
    })
  })

  it('signs in the HR/recruiter guest account with one click', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dash" element={<p>Dashboard</p>} />
        </Routes>
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: /hr \/ recruiter guest login/i }))

    expect(await screen.findByText('Dashboard')).toBeInTheDocument()
    expect(mockLogin).toHaveBeenCalledWith({ username: 'recruiter', password: '12345' })
    expect(mockDispatch).toHaveBeenCalled()
  })
})
