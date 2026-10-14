import useAuth from '../hooks/useAuth'

const DashFooter = () => {

    const { username, status } = useAuth()

    const content = (
        <footer className="dash-footer">
            <p>Current User: {username}</p>
            <p>Status: {status}</p>
        </footer>
    )

    return content
}

export default DashFooter
