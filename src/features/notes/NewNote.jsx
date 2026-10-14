import NewNoteForm from './NewNoteForm.jsx'
import { useGetUsersQuery } from '../users/usersApiSlice.js'
import { PulseLoader } from 'react-spinners'
import useTitle from '../../hooks/useTitle'

const NewNote = () => {

    useTitle('techNotes: New Note')
    
    const { users, isLoading, isError, error } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data, isLoading, isError, error }) => ({
            users: data?.ids.map(id => data?.entities[id]),
            isLoading,
            isError,
            error
        }),
    })

    if (isLoading) return <PulseLoader color="#0d9488" />
    if (isError) return <p className="errmsg">{error?.data?.message || "Unable to load users."}</p>
    if (!users?.length) return <p className="errmsg">No users are available to assign this note.</p>
    
    const content = <NewNoteForm users={users} />

    return content
}
export default NewNote