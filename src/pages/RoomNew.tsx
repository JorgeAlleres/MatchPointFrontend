import { useEffect, useState } from 'react';
import { RoomService } from '../services/room.service';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GameService } from '../services/game.service';
import Game from '../models/Game';
import { UserRoomService } from '../services/user_room.service';
import { useAuth } from '../contexts/AuthContext';

function RoomNew() {
  const [queryParams] = useSearchParams();
  const idRoomGame = queryParams.get('idRoomGame');
  const [game, setGame] = useState<Game>();
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [code, setCode] = useState('');
  const [privateCheck, setPrivateCheck] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const { user } = useAuth()
  const userId = user?.id

  const handleSubmit = async () => {
    //TODO Enviar datos al backend para crear la nueva sala
    if (!idRoomGame || !roomName || !capacity || !code) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }
    if(game?.maxCapacity && Number(capacity) > game.maxCapacity) {
      alert("La capacidad introducida es mayor a la máxima del juego");
      return;
    }
    const roomData = {
      idRoomGame: Number(idRoomGame),
      roomName: roomName,
      description,
      capacity: Number(capacity),
      code,
      private: privateCheck
    };
    try {
      const room = await RoomService.create(roomData)
      const idRoom = room.newRoom.id

      UserRoomService.joinRoom(Number(userId), idRoom, "admin")

      navigate(`/rooms?idRoomGame=${idRoomGame}`)
    } catch (error) {
      setError('Error al crear la sala')
    }
  };

  useEffect(() => {
    // Cargar juegos y mapearlos
    GameService.getById(Number(idRoomGame))
      .then(setGame)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [idRoomGame]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-20">
      <div className="flex flex-col items-center">
        {/* Contenedor principal */}
        <div className="p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4 text-center">Crear Sala para</h2>
          {loading && <p>Loading ...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          <h2 className="text-2xl font-semibold mb-4 text-center">Juego: {game?.gameName}</h2>
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
              Description
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
            <label htmlFor="private" className="block text-sm font-bold mb-2">
              Privada
            </label>
            <input
              type="checkbox"
              id="private"
              className="mr-2 leading-tight"
              checked={privateCheck}
              onChange={() => setPrivateCheck(!privateCheck)}
            />
          </div>

          <p className="text-sm italic text-gray-400 mb-4">* Son campos obligatorios</p>

          <div className="flex items-center justify-center">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Crear Sala
            </button>
          </div>
        </div>
        <button
        onClick={() => navigate(`/rooms?idRoomGame=${idRoomGame}`)}
        className="mt-6 px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition ease-in-out duration-300">
        Volver
      </button>
      </div>
    </div>
  );
}

export default RoomNew;
