import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines, faFileCirclePlus, faUsersGear, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'

const Welcome = () => {
    const { username, isManager, isAdmin } = useAuth()

    useTitle(`techNotes: ${username}`)

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">
            <p className="welcome__date">{today}</p>
            <h1>Welcome back, {username}</h1>
            <p className="welcome__intro">Keep service work moving with notes and team tools.</p>
            <nav className="welcome__links" aria-label="Workspace shortcuts">
                <Link className="welcome__card" to="/dash/notes">
                    <span className="welcome__card-icon" aria-hidden="true">
                        <FontAwesomeIcon icon={faFileLines} />
                    </span>
                    <span className="welcome__card-title">Service notes</span>
                    <span className="welcome__card-description">Review and update your team's work.</span>
                </Link>
                <Link className="welcome__card" to="/dash/notes/new">
                    <span className="welcome__card-icon" aria-hidden="true">
                        <FontAwesomeIcon icon={faFileCirclePlus} />
                    </span>
                    <span className="welcome__card-title">Create a note</span>
                    <span className="welcome__card-description">Record a new service task.</span>
                </Link>
                {(isManager || isAdmin) && (
                    <Link className="welcome__card" to="/dash/users">
                        <span className="welcome__card-icon" aria-hidden="true">
                            <FontAwesomeIcon icon={faUsersGear} />
                        </span>
                        <span className="welcome__card-title">Team members</span>
                        <span className="welcome__card-description">Manage employee accounts and roles.</span>
                    </Link>
                )}
                {(isManager || isAdmin) && (
                    <Link className="welcome__card" to="/dash/users/new">
                        <span className="welcome__card-icon" aria-hidden="true">
                            <FontAwesomeIcon icon={faUserPlus} />
                        </span>
                        <span className="welcome__card-title">Add a team member</span>
                        <span className="welcome__card-description">Set up access for a new employee.</span>
                    </Link>
                )}
            </nav>
        </section>
    )

    return content
}

export default Welcome
