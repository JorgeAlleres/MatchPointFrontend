import { useState, useEffect } from 'react';
import { RoomService } from '../services/room.service';
import { useNavigate, useParams } from 'react-router-dom';

function RoomEdit() {
    const { id } = useParams(); // Para obtener el ID de la sala desde la URL
    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState('');
    const [password, setPassword] = useState('');
    const [privateCheck, setPrivateCheck] = useState(false);
    const navigate = useNavigate();

    // Cargar los datos de la sala al montar el componente
    useEffect(() => {
        async function call() {
            try {
                const room = await RoomService.getById(Number(id));
                setRoomName(room.roomName);
                setDescription(room.description);
                setCapacity(room.capacity);
                setPassword(room.password || '');
                setPrivateCheck(room.private);
            } catch (error) {
                console.error('Error al cargar los datos de la sala', error);
            }
        }

        call();
    }, [id]);

    const handleSubmit = async () => {
        if (!roomName || !capacity) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        const roomData = {
            roomName,
            description,
            capacity: Number(capacity),
            password,
            private: privateCheck,
        };

        try {
            await RoomService.update(Number(id), roomData);
            navigate(`/games/1/room/`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-20">
            <div className="flex flex-col items-center">
                <div className="p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Editar Sala</h2>

                    <div className="mb-4">
                        <label htmlFor="roomName" className="block text-sm font-bold mb-2">
                            Nombre de la sala <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="roomName"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-bold mb-2">
                            Descripción
                        </label>
                        <input
                            type="text"
                            id="description"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="capacity" className="block text-sm font-bold mb-2">
                            Capacidad <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="capacity"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-bold mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-4 flex items-center">
                        <label htmlFor="private" className="text-sm font-bold mr-2">
                            Privada
                        </label>
                        <input
                            type="checkbox"
                            id="private"
                            className="leading-tight"
                            checked={privateCheck}
                            onChange={() => setPrivateCheck(!privateCheck)}
                        />
                    </div>

                    <p className="text-sm italic text-gray-400 mb-4">* Son campos obligatorios</p>

                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleSubmit}
                        >
                            Actualizar Sala
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomEdit;
