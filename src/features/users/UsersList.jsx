import { useGetUsersQuery } from './usersApiSlice'
import User from './User.jsx'
import { PulseLoader } from 'react-spinners'
import useTitle from "../../hooks/useTitle"

const UsersList = () => {
    useTitle('techNotes: Users List')

    const { data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = (
        <div className="page-loader" role="status" aria-label="Loading team members">
            <PulseLoader color="var(--color-primary)" />
        </div>
    )

    if (isError) content = <p className={isError ? "errmsg" : "offscreen"}>{error?.data?.message || "Error occurred"}</p>

    if (isSuccess) {

        const { ids } = users

        content = ids.length ? (
            <div className="table-wrap">
                <table className="table table--users">
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th user__username">Username</th>
                            <th scope="col" className="table__th user__roles">Roles</th>
                            <th scope="col" className="table__th user__edit">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ids.map(userId => <User key={userId} userId={userId} />)}
                    </tbody>
                </table>
            </div>
        ) : <p>No users to show.</p>
    }

    return (
        <section className="list-page">
            <header><h1>Team members</h1></header>
            {content}
        </section>
    )
}

export default UsersList
