import { useEffect, useState } from 'react';
import { UserService } from '../services/user.service';
import { Link, useNavigate, useParams } from 'react-router-dom';
import avatarPorDefecto from '../assets/avatarPorDefecto.png';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(avatarPorDefecto);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const { id } = useParams();
  const {logout} = useAuth()

  const handleDelete = async () => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres borrar tu cuenta? Esta acción es irreversible.');
    if (confirmDelete) {
      await UserService.delete(Number(id))
      logout()
      navigate('/')
      alert('Cuenta borrada correctamente.');
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (!id) {
          setMessage('ID de usuario no encontrado.');
          setLoading(false);
          return;
        }
        const data = await UserService.getById(Number(id));
        setUserName(data.userName);
        setEmail(data.email);
        setAvatar(data.avatar || avatarPorDefecto);
      } catch (error) {
        const msg = error instanceof Error ? error.message : 'Error desconocido';
        setMessage(msg);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [id]);

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-md border border-gray-500 w-[500px] text-white text-center">
        <h2 className="text-2xl font-semibold mb-6">Tu Perfil</h2>

        {message && <p className="text-red-500 mb-4">{message}</p>}

        <div className="flex justify-between items-center mb-6">
          <div className="text-left">
            <p className="font-bold">Nombre de usuario:</p>
            <p className="bg-gray-800 p-2 rounded-md w-40 text-center">{userName}</p>
            <p className="font-bold mt-4">Email:</p>
            <p className="bg-gray-800 p-2 rounded-md w-40 text-center">{email}</p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full border border-gray-400"
            />
            <p className="mt-2 text-sm text-gray-400">Avatar</p>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Link
            to={`/profile/update/${id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Actualizar datos
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
          >
            ¿Borrar Cuenta?
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
