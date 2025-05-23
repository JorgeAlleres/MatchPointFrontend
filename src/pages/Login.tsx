import { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState(
    {
      email: '',
      password: ''
    }
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    // mensaje por post al api del backend
    try {
      //await AuthService.loginUser(form.email, form.password)
      await login(form.email, form.password) // llamada al contexto
      toast('✅ Login Successful')
      navigate('/home')
      {/*TODO Detectar si el usuario es admin y enviarlo al home para admins*/ }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown Error'
      toast(msg)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setForm({ ...form, [name]: value, })
  }


  return (
    <div className="flex items-center justify-center h-screen">
      <form className="p-6 rounded-lg shadow-md w-80 text-white bg-gray-800" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
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
        {/*TODO Implementar las burbujas para acceder con google, github, ...*/}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Iniciar Sesión
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes cuenta? <Link to="/register" className="text-indigo-600 hover:underline">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  )
}

export default Login