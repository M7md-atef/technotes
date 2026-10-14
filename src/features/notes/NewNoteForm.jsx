import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewNoteForm = ({ users }) => {

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)
    const [touchedFields, setTouchedFields] = useState({})

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => {
        setTitle(e.target.value)
        setTouchedFields(fields => ({ ...fields, title: true }))
    }
    const onTextChanged = e => {
        setText(e.target.value)
        setTouchedFields(fields => ({ ...fields, text: true }))
    }
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title.trim(), text.trim(), userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewNote({ user: userId, title, text })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const titleInvalid = !title.trim()
    const textInvalid = !text.trim()
    const showTitleError = touchedFields.title && titleInvalid
    const showTextError = touchedFields.text && textInvalid

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form form--centered" onSubmit={onSaveNoteClicked}>
                <div className="form__title-row">
                    <h2>New Note</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            aria-label="Save note"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="title">
                    Title:</label>
                <input
                    className={`form__input ${showTitleError ? "form__input--incomplete" : ""}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                    onBlur={() => setTouchedFields(fields => ({ ...fields, title: true }))}
                    aria-invalid={showTitleError}
                    aria-describedby={showTitleError ? "title-error" : undefined}
                />
                {showTitleError && <span className="form__field-error" id="title-error">Enter a title.</span>}

                <label className="form__label" htmlFor="text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${showTextError ? "form__input--incomplete" : ""}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                    onBlur={() => setTouchedFields(fields => ({ ...fields, text: true }))}
                    aria-invalid={showTextError}
                    aria-describedby={showTextError ? "text-error" : undefined}
                />
                {showTextError && <span className="form__field-error" id="text-error">Enter note details.</span>}

                <label className="form__label form__checkbox-container" htmlFor="username">
                    ASSIGNED TO:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}

export default NewNoteForm