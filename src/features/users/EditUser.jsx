import { useParams } from 'react-router-dom'
import EditUserForm from './EditUserForm.jsx'
import { useGetUsersQuery } from './usersApiSlice'
import { PulseLoader } from 'react-spinners'
import useTitle from '../../hooks/useTitle'
import useAuth from '../../hooks/useAuth'
import { canManageUser } from './userPermissions'

const EditUser = () => {
    useTitle('techNotes: Edit User')

    const { id } = useParams()
    const { roles } = useAuth()

    const { user } = useGetUsersQuery("usersList", {
            selectFromResult: ({ data }) => ({
                user: data?.entities[id]
            }),
        })

    if(!user) return <PulseLoader color={"#FFF"}/>
    if (!canManageUser(roles, user.roles)) return <p className="errmsg">You are not authorized to manage this user.</p>

    const content = <EditUserForm user={user} />
    return content
}
export default EditUser