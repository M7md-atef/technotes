import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Public from './components/Public.jsx'
import Login from './features/auth/Login.jsx'
import DashLayout from './components/DashLayout.jsx'
import Welcome from './features/auth/Welcome.jsx'
import NotesList from './features/notes/NotesList.jsx'
import UsersList from './features/users/UsersList.jsx'
import EditUser from './features/users/EditUser.jsx'
import NewUserForm from './features/users/NewUserForm.jsx'
import EditNote from './features/notes/EditNote.jsx'
import NewNote from './features/notes/NewNote.jsx'
import Prefetch from './features/auth/Prefetch.jsx'
import PersistLogin from './features/auth/PersistLogin.jsx'
import { ROLES } from './config/roles.js'
import RequireAuth from './features/auth/RequireAuth.jsx'
import useTitle from './hooks/useTitle.js'

export default function App() {
  useTitle('TechNotes | Service Desk')

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<Welcome />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path=":id" element={<EditNote />} />
                  <Route path="new" element={<NewNote />} />
                </Route>

              </Route>
            </Route>
          </Route>
        </Route>
        {/* end of protected routes */}

      </Route>
    </Routes>
  )
}