import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <p className="welcome__date">SERVICE TEAM WORKSPACE</p>
                <h1>Welcome to <span className="nowrap">Dan D. Repairs</span></h1>
            </header>
            <main className="public__main">
                <p>Our team is ready to help with your technology repair needs. Employees can sign in to manage service notes and keep work on track.</p>
                <address className="public__addr">
                    Dan D. Repairs<br />
                    For service information, contact the shop directly.
                </address>
            </main>
            <footer>
                <Link className="form__submit-button public__login-link" to="/login">Employee sign in</Link>
            </footer>
        </section>

    )
    return content
}
export default Public