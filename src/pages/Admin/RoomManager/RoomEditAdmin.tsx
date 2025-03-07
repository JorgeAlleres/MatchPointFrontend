import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoomService } from '../../../services/room.service';
import { GameService } from '../../../services/game.service';
import Game from '../../../models/Game';

function RoomEditAdmin() {
    const { id } = useParams(); // Para obtener el ID de la sala desde la URL
    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [code, setCode] = useState('');
    const [privateRoom, setPrivateRoom] = useState(false);
    const [games, setGames] = useState<Game[]>([]);
    const [selectedGameId, setSelectedGameId] = useState<number | null>(null);
    const navigate = useNavigate();

    // Cargar los datos de la sala al montar el componente
    useEffect(() => {
        async function call() {
            try {
                const room = await RoomService.getById(Number(id));
                setRoomName(room.roomName);
                setDescription(room.description)
                setCapacity(room.capacity);
                setCode(room.code)
                setPrivateRoom(room.private);
                setSelectedGameId(room.idRoomGame);
            } catch (error) {
                console.error('Error al cargar los datos de la room', error);
            }
        }

        async function getGames() {
            try {
                const gameList = await GameService.getAll();
                setGames(gameList);
            } catch (error) {
                console.error("Error al cargar los juegos", error);
            }
        }

        call();
        getGames()
    }, [id]);

    const handleSubmit = async () => {
        if (!roomName || !capacity || !code || !selectedGameId) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        const selectedGame = games.find(game => game.id === selectedGameId);
        if (selectedGame && capacity > selectedGame.maxCapacity) {
            alert("La capacidad de la sala no puede ser mayor que la capacidad máxima del juego seleccionado.");
            return;
        }

        const roomData = {
            roomName,
            description,
            capacity,
            code,
            private: privateRoom,
            idRoomGame: selectedGameId
        };

        try {
            await RoomService.update(Number(id), roomData);
            navigate(`/roomsAdmin`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-20">
            <div className="flex flex-col items-center">
                <div className="p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Editar Game</h2>

                    <div className="mb-4">
                        <label htmlFor="roomName" className="block text-sm font-bold mb-2">
                            Nombre de la Sala <span className="text-red-500">*</span>
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
                            onChange={(e) => setCapacity(Number(e.target.value))}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="code" className="block text-sm font-bold mb-2">
                            Código <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="code"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="gameSelect" className="block text-sm font-bold mb-2">
                            Juego <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="gameSelect"
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedGameId ?? ""}
                            onChange={(e) => setSelectedGameId(Number(e.target.value))}
                        >
                            <option value="" disabled>Selecciona un juego</option>
                            {games.map((game) => (
                                <option key={game.id} value={game.id}>
                                    {game.gameName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                        <label htmlFor="privateRoom" className="text-sm font-bold">
                            ¿Sala Privada? <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="checkbox"
                            id="privateRoom"
                            checked={privateRoom ? true : false}
                            onChange={(e) => setPrivateRoom(e.target.checked)}
                        />
                    </div>

                    <p className="text-sm italic text-gray-400 mb-4">* Son campos obligatorios</p>

                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleSubmit}
                        >
                            Actualizar Room
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoomEditAdmin;
