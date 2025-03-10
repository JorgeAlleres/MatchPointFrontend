import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { UserService } from '../services/user.service';

function ProfileUpdate() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams()

  const navigate = useNavigate()

  {/*TODO Como Cojo el id de mi usuario? */}

  useEffect(() => {
          async function call() {
              try {
                  const user = await UserService.getById(Number(id));
                  setUserName(user.userName ?? '');
                  setEmail(user.email ?? '');
                  setAvatar(user.avatar)
              } catch (error) {
                  setError('Error al cargar los datos del user');
              } finally {
                setLoading(false)
              }
          }
  
          call();
      }, [id]);

  const handleSubmit = async () => {
    // Validaciones básicas
    setLoading(true)
    if (!userName || !email || !oldPassword || !avatar) {
      toast.error('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (newPassword && newPassword !== repeatNewPassword) {
      toast.error('Las nuevas contraseñas no coinciden.');
      return;
    }

    // Preparar el cuerpo para la solicitud
    const newDataProfile = {
      userName,
      email,
      avatar,
      oldPassword,
      newPassword: newPassword || null,
    };

    try {
      await UserService.update(Number(id), newDataProfile)
      navigate(`/profile/${id}`);
    } catch(error) {
      setError('Error al modificar el usuario');
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-20">
      <div className="flex flex-col items-center">

        {/* Contenedor principal */}
        <div className="p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4 text-center">Actualizar Perfil</h2>
          {loading && <p>Loading ...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          <div>
            <div className="mb-4">
              <label htmlFor="userName" className="block text-sm font-bold mb-2">
                Nombre de Usuario <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="userName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-4">

              <label htmlFor="email" className="block text-sm font-bold mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="newPassword" className="block text-sm font-bold mb-2">
                Nueva Contraseña <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="newPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="repeatNewPassword" className="block text-sm font-bold mb-2">
                Repite La Nueva Contraseña <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="repeatNewPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={repeatNewPassword}
                onChange={(e) => setRepeatNewPassword(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="oldPassword" className="block text-sm font-bold mb-2">
                Antigua Contraseña <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="oldPassword"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <p className="text-sm italic text-gray-400 mb-4">* Son campos obligatorios</p>

            <div className="flex items-center justify-center">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
              >
                Cambiar Datos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdate;
