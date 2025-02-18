import { useEffect, useState } from 'react';
import { UserService } from '../services/user.service';
import { Link, useParams } from 'react-router-dom';

function Profile() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const handleDelete = () => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres borrar tu cuenta? Esta acción es irreversible.');
    if (confirmDelete) {
      alert('Cuenta borrada correctamente.');
      //TODO Enviar delete al backend
    }
  };
  const {id} = useParams()

  const getData = async () => {
    try {
      const data = await UserService.getById(Number(id));
      setUserName(data.userName);
      setEmail(data.email);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Error desconocido'
      setMessage(msg)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [id]);

  if(loading)    return <div className='text-white'>Loading...</div>

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-md w-96 text-white">
        <h2 className="text-2xl font-semibold mb-4 text-center ">Tu Perfil</h2>
        {message}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-bold mb-2">Nombre de usuario:</label>
          <p>{userName}</p> {/*  Mostrar userName aquí */}
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-bold mb-2">Email:</label>
          <p>{email}</p> {/* Mostrar email aquí */}
        </div>

        <div className="flex items-center justify-between mb-6">
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            to={`/profile/update/${id}`}  // Redirige a la página de actualización con el ID
          >
            Actualizar datos
          </Link>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleDelete}
          >
            Borrar Cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile
