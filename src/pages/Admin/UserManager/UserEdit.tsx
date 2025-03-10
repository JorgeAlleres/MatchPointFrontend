import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserService } from '../../../services/user.service';

function UserEdit() {
    const { id } = useParams(); // Para obtener el ID de la sala desde la URL
    const [userName, setUserName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [active, setActive] = useState<boolean>(false);
    const [acceptNotifications, setAcceptNotifications] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Cargar los datos de la sala al montar el componente
    useEffect(() => {
        async function call() {
            try {
                const user = await UserService.getById(Number(id));
                setUserName(user.userName ?? '');
                setEmail(user.email ?? '');
                setRole(user.role ?? '');
                setActive(user.active ?? false)
                setAcceptNotifications(user.acceptNotifications ?? false)
            } catch (error) {
                setError('Error al cargar los datos del user');
            } finally {
                setLoading(false)
            }
        }

        call();
    }, [id]);

    const handleSubmit = async () => {
        if (!userName || !email) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        const userData = {
            userName,
            email,
            role,
            active,
            acceptNotifications
        };

        try {
            await UserService.update(Number(id), userData);
            navigate('/usersAdmin');
        } catch (error) {
            setError('Error al modificar el usuario"');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-20">
            <div className="flex flex-col items-center">
                <div className="p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Editar User</h2>
                    {loading && <p>Loading ...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}

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
                            type="text"
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-bold mb-2">
                            Rol
                        </label>
                        <input
                            type="text"
                            id="role"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                        <label htmlFor="active" className="text-sm font-bold">
                            Activo
                        </label>
                        <input
                            type="checkbox"
                            id="active"
                            checked={active ? true : false}
                            onChange={(e) => setActive(e.target.checked)}
                        />
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                        <label htmlFor="acceptNotifications" className="text-sm font-bold">
                            Acepta Notificaciones
                        </label>
                        <input
                            type="checkbox"
                            id="acceptNotifications"
                            checked={acceptNotifications ? true : false}
                            onChange={(e) => setAcceptNotifications(e.target.checked)}
                        />
                    </div>

                    <p className="text-sm italic text-gray-400 mb-4">* Son campos obligatorios</p>

                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleSubmit}
                        >
                            Actualizar user
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => navigate(`/usersAdmin`)}
                    className="mt-6 px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition ease-in-out duration-300">
                    Volver
                </button>
            </div>
        </div>
    );
}

export default UserEdit;
