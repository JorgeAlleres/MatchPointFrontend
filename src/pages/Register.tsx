import { ChangeEvent, FormEvent, useState } from 'react'
import { AuthService } from '../services/auth.service'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Register() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
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
      password: form.password
    };

    try {
      await AuthService.registerUser(user)
      toast.success('Registro exitoso')
      navigate('/login')
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Error desconocido'
      toast.error(msg)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setForm({ ...form, [name]: value })
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="p-6 rounded-lg shadow-md w-80 text-white" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Registro</h2>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium">User Name</label>
          <input
            type="userName"
            id="userName"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">Correo electrónico</label>
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
          <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
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
          <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirmar Contraseña</label>
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
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Registrarse
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta? <a href="/login" className="text-indigo-600 hover:underline">Inicia sesión aquí</a>
        </p>
      </form>
    </div>
  )
}

export default Register