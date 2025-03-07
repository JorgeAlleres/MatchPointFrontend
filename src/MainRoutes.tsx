import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/User/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ProfileUpdate from './pages/ProfileUpdate'
import AdminPanel from './pages/Admin/AdminPanel'
import GameList from './pages/Admin/GameManager/GameListAdmin'
import GameNew from './pages/Admin/GameManager/GameNew'
import GameEdit from './pages/Admin/GameManager/GameEditAdmin'
import UserEdit from './pages/Admin/UserManager/UserEdit'
import UserList from './pages/Admin/UserManager/UserListAdmin'
import RoomListAdmin from './pages/Admin/RoomManager/RoomListAdmin'
import RoomList from './pages/RoomList'
import RoomNew from './pages/RoomNew'
import RoomEdit from './pages/RoomEdit'
import RoomInfo from './pages/RoomInfo'
import RoomEditAdmin from './pages/Admin/RoomManager/RoomEditAdmin'

function MainRoutes() {
  const location = useLocation()

  // Ocultar Navbar en login y registro
  const hideNavbarUser = ['/', '/register'].includes(location.pathname)

  return (
    <div className="flex flex-col h-screen">
      {!hideNavbarUser && <Navbar />}
      <div className="container mx-auto flex grow justify-center items-center">
        <Routes>
          {/*Rutas Comunes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/update/:id" element={<ProfileUpdate />} />
          {/*Rutas para User */}
          <Route path="/home" element={<Home />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/rooms/new" element={<RoomNew />} />
          <Route path="/rooms/edit/:id" element={<RoomEdit />} />
          <Route path="/rooms/:id" element={<RoomInfo />} />
          {/*Rutas para Admins */}
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/gamesAdmin" element={<GameList />} />
          <Route path="/gamesAdmin/new" element={<GameNew />} />
          <Route path="/gamesAdmin/edit/:id" element={<GameEdit />} />
          <Route path="/usersAdmin" element={<UserList />} />
          <Route path="/usersAdmin/edit/:id" element={<UserEdit />} />
          <Route path="/roomsAdmin" element={<RoomListAdmin />} />
          <Route path="/roomsAdmin/edit/:id" element={<RoomEditAdmin/>} />
        </Routes>
      </div>
    </div>
  )
}

export default MainRoutes
