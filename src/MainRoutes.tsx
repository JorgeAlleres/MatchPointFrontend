import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/User/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UserManager from './pages/Admin/UserManager'
import RoomList from './pages/User/RoomList'
import ProfileUpdate from './pages/ProfileUpdate'
import RoomNew from './pages/User/RoomNew'
import RoomInfo from './pages/User/RoomInfo'
import RoomEdit from './pages/User/RoomEdit'
import AdminPanel from './pages/Admin/AdminPanel'
import GameManager from './pages/Admin/GameManager'
import RoomManager from './pages/Admin/RoomManager'

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
          <Route path="/gameManager" element={<GameManager />} />
          <Route path="/userManager" element={<UserManager />} />
          <Route path="/roomManager" element={<RoomManager />} />
        </Routes>
      </div>
    </div>
  )
}

export default MainRoutes
