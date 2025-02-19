import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/User/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ProfileUpdate from './pages/ProfileUpdate'
import AdminPanel from './pages/Admin/AdminPanel'
import RoomManager from './pages/Admin/RoomManager'
import GameList from './pages/Admin/GameManager/GameList'
import GameNew from './pages/Admin/GameManager/GameNew'
import GameEdit from './pages/Admin/GameManager/GameEdit'
import UserEdit from './pages/Admin/UserManager/UserEdit'
import UserList from './pages/Admin/UserManager/UserList'
import RoomList from './pages/RoomList'
import RoomNew from './pages/RoomNew'
import RoomEdit from './pages/RoomEdit'
import RoomInfo from './pages/RoomInfo'

function MainRoutes() {
  const location = useLocation()

  // Ocultar Navbar en login y registro
  const hideNavbarUser = ['/login', '/register'].includes(location.pathname)

  return (
    <div className="flex flex-col h-screen">
      {!hideNavbarUser && <Navbar />}
      <div className="container mx-auto flex grow justify-center items-center">
        <Routes>
          {/*Rutas Comunes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/update/:id" element={<ProfileUpdate />} />
          {/*Rutas para User */}
          <Route path="/" element={<Home />} />
          <Route path="/games/:gameId/room" element={<RoomList />} />
          <Route path="/rooms/new" element={<RoomNew />} />
          <Route path="/rooms/edit/:id" element={<RoomEdit />} />
          <Route path="/rooms/:id" element={<RoomInfo />} />
          {/*Rutas para Admins */}
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/games/new" element={<GameNew />} />
          <Route path="/games/edit/:id" element={<GameEdit />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/edit/:id" element={<UserEdit />} />
          <Route path="/roomManager" element={<RoomManager />} />
        </Routes>
      </div>
    </div>
  )
}

export default MainRoutes
