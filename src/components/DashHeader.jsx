import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faRightFromBracket,
    faMoon,
    faSun,
    faFileLines,
    faFileCirclePlus,
    faUserPlus,
    faUsersGear,
    faHouse,
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/           // matches /dash or /dash/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/   // matches /dash/notes or /dash/notes/
const USERS_REGEX = /^\/dash\/users(\/)?$/   // matches /dash/users or /dash/users/

const DashHeader = () => {
    const { isManager, isAdmin } = useAuth()
    const [theme, setTheme] = useState(
        document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
    )

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isError,
        error
    }] = useSendLogoutMutation()

    const handleLogout = async () => {
        try {
            await sendLogout().unwrap()
            navigate('/login')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => navigate('/dash/notes')
    const onUsersClicked = () => navigate('/dash/users')
    const onGoHomeClicked = () => navigate('/dash')
    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark'
        document.documentElement.dataset.theme = nextTheme
        localStorage.setItem('theme', nextTheme)
        setTheme(nextTheme)
    }

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button
                className="icon-button"
                title="New Note"
                aria-label="Create a new note"
                onClick={onNewNoteClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                aria-label="Add a user"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    aria-label="View users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUsersGear} />
                </button>
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <button
                className="icon-button"
                title="Notes"
                aria-label="View notes"
                onClick={onNotesClicked}
            >
                <FontAwesomeIcon icon={faFileLines} />
            </button>
        )
    }

    const homeButton = pathname !== '/dash' ? (
        <button
            className="icon-button"
            title="Home"
            aria-label="Go to dashboard home"
            onClick={onGoHomeClicked}
        >
            <FontAwesomeIcon icon={faHouse} />
        </button>
    ) : null

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            aria-label="Log out"
            disabled={isLoading}
            onClick={handleLogout}
        >
            {isLoading ? <span className="dash-header__logout-loading">Logging out…</span> : <FontAwesomeIcon icon={faRightFromBracket} />}
        </button>
    )

    const themeButton = (
        <button
            className="icon-button dash-header__theme-toggle"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-pressed={theme === 'dark'}
            onClick={toggleTheme}
        >
            <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
        </button>
    )

    const errClass = isError ? "errmsg" : "offscreen"

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <header className="dash-header">
                <div className={`dash-header__container ${dashClass}`}>
                    <Link to="/dash">
                        <h1 className="dash-header__title">
                            <FontAwesomeIcon className="dash-header__brand-icon" icon={faFileLines} aria-hidden="true" />
                            techNotes
                        </h1>
                    </Link>
                    <nav className="dash-header__nav">
                        {homeButton}
                        {newNoteButton}
                        {newUserButton}
                        {notesButton}
                        {userButton}
                    </nav>
                    <div className="dash-header__actions">
                        {themeButton}
                        {logoutButton}
                    </div>
                </div>
            </header>
        </>
    )

    return content
}
export default DashHeader