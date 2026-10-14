import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import useAuth from "../../hooks/useAuth"
import { PulseLoader } from 'react-spinners'
import useTitle from '../../hooks/useTitle'

const NotesList = () => {
    useTitle('techNotes: Notes List')

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = (
        <div className="page-loader" role="status" aria-label="Loading service notes">
            <PulseLoader color="var(--color-primary)" />
        </div>
    )

    if (isError) content = <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message || "Error occurred"}</p>

    if (isSuccess) {
        const { ids, entities } = notes

        let filteredIds = ids
        if (!isManager && !isAdmin) {
            filteredIds = ids.filter(noteId => entities[noteId].username === username)
        }

        content = filteredIds.length ? (
            <div className="table-wrap">
                <table className="table table--notes">
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th note__status">Status</th>
                            <th scope="col" className="table__th note__created">Created</th>
                            <th scope="col" className="table__th note__updated">Updated</th>
                            <th scope="col" className="table__th note__title">Title</th>
                            <th scope="col" className="table__th note__username">Owner</th>
                            <th scope="col" className="table__th note__edit">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredIds.map(noteId => <Note key={noteId} noteId={noteId} />)}
                    </tbody>
                </table>
            </div>
        ) : <p>No notes to show.</p>
    }

    return (
        <section className="list-page">
            <header><h1>Service notes</h1></header>
            {content}
        </section>
    )
}
export default NotesList