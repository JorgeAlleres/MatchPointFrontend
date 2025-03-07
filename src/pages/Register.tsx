import { ChangeEvent, FormEvent, useState } from 'react'
import { AuthService } from '../services/auth.service'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import avatarPorDefecto from '../assets/avatarPorDefecto.png'
import avatar1 from '../assets/avatar1.png'
import avatar2 from '../assets/avatar2.png'
import avatar3 from '../assets/avatar3.png'
import avatar4 from '../assets/avatar4.png'
import avatar5 from '../assets/avatar5.png'

function Register() {

  const navigate = useNavigate()

  const avatars = [
    avatarPorDefecto,
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
  ]

  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptNotifications: false,
    avatar: ''
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }

    const user = {
      userName: form.userName,
      email: form.email,
      password: form.password,
      acceptNotifications: form.acceptNotifications,
      avatar: form.avatar
    };

    try {
      await AuthService.registerUser(user)
      toast.success('Registro exitoso')
      navigate('/')
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Error desconocido'
      toast.error(msg)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleAvatarSelect = (avatar: string) => {
    setForm({ ...form, avatar })
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="p-6 rounded-lg shadow-md w-96 text-white bg-gray-800" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Columna Izquierda */}
          <div>
            <div className="mb-4">
              <label htmlFor="userName" className="block text-sm font-medium">
                User Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Contraseña <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirmar Contraseña <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="acceptNotifications"
                name="acceptNotifications"
                checked={form.acceptNotifications}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label htmlFor="acceptNotifications" className="text-sm font-bold">
                Acepto recibir notificaciones
              </label>
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Selecciona tu avatar: <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className={`cursor-pointer rounded-full border-4
                  ${form.avatar === avatar ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => handleAvatarSelect(avatar)}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Registrarse
        </button>
        <p className="mt-4 text-center text-sm text-gray-400">
          ¿Ya tienes una cuenta? <Link to="/" className="text-indigo-400 hover:underline">Inicia sesión aquí</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
