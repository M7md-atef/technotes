import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist.js'
import { PulseLoader } from 'react-spinners'
import useTitle from '../../hooks/useTitle'

const Login = () => {
    useTitle('Employee Login')

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()
    const [isNavigating, setIsNavigating] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleLogin = async (credentials) => {
        try {
            const { accessToken } = await login(credentials).unwrap()
            setIsNavigating(true)
            dispatch(setCredentials({ accessToken }))
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Wrong Username or Password, please try again');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleLogin({ username, password })
    }

    const handleGuestLogin = () => {
        handleLogin({ username: 'recruiter', password: '12345' })
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput  = (e) => setPassword(e.target.value)
    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading || isNavigating) return (
        <div className="page-loader" role="status" aria-label="Signing in">
            <PulseLoader color="var(--color-primary)" />
        </div>
    )

    const content = (
        <section className="public">
            <header>
                <h1>Employee Login</h1>
            </header>
            <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="username"
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        autoComplete="current-password"
                        required
                    />
                    <button className="form__submit-button" disabled={isLoading}>Sign In</button>
                    <button
                        className="form__submit-button form__submit-button--secondary"
                        type="button"
                        onClick={handleGuestLogin}
                        disabled={isLoading}
                    >
                        HR / Recruiter Guest Login
                    </button>

                    <label htmlFor="persist" className="form__persist">
                        <input
                            type="checkbox"
                            className="form__checkbox"
                            id="persist"
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </label>
                </form>
            </main>
            <footer>
                <Link to="/">Back to Home</Link>
            </footer>
        </section>
    )

    return content
}
export default Login