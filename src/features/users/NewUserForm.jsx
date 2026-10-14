import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import useTitle from "../../hooks/useTitle"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {

    useTitle('techNotes: New User')

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [roles, setRoles] = useState(["Employee"])
    const [touchedFields, setTouchedFields] = useState({})
    const validUsername = USER_REGEX.test(username)
    const validPassword = PWD_REGEX.test(password)

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => {
        setUsername(e.target.value)
        setTouchedFields(fields => ({ ...fields, username: true }))
    }
    const onPasswordChanged = e => {
        setPassword(e.target.value)
        setTouchedFields(fields => ({ ...fields, password: true }))
    }

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
        setTouchedFields(fields => ({ ...fields, roles: true }))
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option key={role} value={role}> 
                {role}
            </option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const showUsernameError = touchedFields.username && !validUsername
    const showPasswordError = touchedFields.password && !validPassword
    const showRolesError = touchedFields.roles && !roles.length


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form form--centered" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>New User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            aria-label="Save user"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${showUsernameError ? 'form__input--incomplete' : ''}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                    onBlur={() => setTouchedFields(fields => ({ ...fields, username: true }))}
                    aria-invalid={showUsernameError}
                    aria-describedby={showUsernameError ? "username-error" : undefined}
                />
                {showUsernameError && <span className="form__field-error" id="username-error">Use 3–20 letters.</span>}

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${showPasswordError ? 'form__input--incomplete' : ''}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                    onBlur={() => setTouchedFields(fields => ({ ...fields, password: true }))}
                    aria-invalid={showPasswordError}
                    aria-describedby={showPasswordError ? "password-error" : undefined}
                />
                {showPasswordError && <span className="form__field-error" id="password-error">Use 4–12 characters: letters, numbers, or !@#$%.</span>}

                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${showRolesError ? 'form__input--incomplete' : ''}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                    onBlur={() => setTouchedFields(fields => ({ ...fields, roles: true }))}
                    aria-invalid={showRolesError}
                    aria-describedby={showRolesError ? "roles-error" : undefined}
                >
                    {options}
                </select>
                {showRolesError && <span className="form__field-error" id="roles-error">Select at least one role.</span>}

            </form>
        </>
    )

    return content
}
export default NewUserForm