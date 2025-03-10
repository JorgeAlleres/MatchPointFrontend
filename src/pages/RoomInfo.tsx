import { useEffect, useState } from "react";
import { RoomService } from '../services/room.service';
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Room from "../models/Room";
import { GameService } from "../services/game.service";
import Game from "../models/Game";
import toast from "react-hot-toast";

function RoomInfo() {
  const [room, setRoom] = useState<Room | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [joined, setJoined] = useState(false)
  const navigate = useNavigate()

  const { id } = useParams();
  const [queryParams] = useSearchParams();
  const idRoomGame = queryParams.get('idRoomGame');

  // Cargar la información de la sala y el juego
  useEffect(() => {
    setLoading(true);
    const getRoomInfo = async () => {
      try {
        const room = await RoomService.getById(Number(id));
        setRoom(room);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    const getGameInfo = async () => {
      try {
        const game = await GameService.getById(Number(idRoomGame));
        setGame(game);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    // Llamar a la api y sacar los usuario que pertenecen a la sala por roomId
    // Recorrer el array que recoja los users para comprobar si pertenece a la sala
    // Si pertenece que pueda salirse, si no pertenece que pueda unirse
    // Contar los users y guardarlo en variable para generar bolas en rojo
    getRoomInfo();
    getGameInfo();
  }, [id, idRoomGame, room?.capacity]);

  const handleJoin = async () => {
    if (room && room.capacity > 0) {
      try {
        // LLamar al backend e insertar el join de userId, roomId

        // Disminuir la capacidad y actualizar la sala
        const updatedRoom = { ...room, capacity: room.capacity - 1 };
        const result = await RoomService.update(Number(id), updatedRoom);
        toast('Te has unido a la sala correctamente ✔️')
        setJoined(true)

        // Actualizar el estado con la sala actualizada
        setRoom(result);
        setShowCode(true); // Mostrar el código después de unirse
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      }
    }
  };

  const handleLeave = async () => {
    if (room && game && room.capacity < game?.maxCapacity) {
      try {
        // Llamar al backend (leave) y borrar el dato del user asociado a esta sala

        // Aumentar la capacidad y actualizar la sala
        const updatedRoom = { ...room, capacity: room.capacity + 1 };
        const result = await RoomService.update(Number(id), updatedRoom);
        toast('Te has ido de la sala correctamente ✔️')
        setJoined(false)

        // Actualizar el estado con la sala actualizada
        setRoom(result);
        setShowCode(false); // Esconder el código después de salirse
      } catch (error) {
        setError(error instanceof Error ? error.message : "Error desconocido");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!room || !game) return <div>Sala no encontrada</div>;

  return (
    <div className="text-white flex flex-col items-center justify-center h-screen font-sans">
      <h1 className="text-2xl font-bold mb-8">{room.roomName}</h1>
      <p>{room.description}</p>
      <div className="mb-4">
        {room.private ? (
          <span className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full">
            🔒 Privada
          </span>
        ) : (
          <span className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded-full">
            🔓 Pública
          </span>
        )}
      </div>
      <span>
        {/* Cambiar la logica, debe ser maxCapacity(total de bolas), capacidad(bolas en verde), totalUsers(bolas en rojo) */}
        {
          room.capacity >= 0 && game?.maxCapacity && game.maxCapacity > 0 ? (
            <div className="flex items-center">
              {Array.from({ length: game.maxCapacity }, (_, index) => (
                <div
                  key={index}
                  className={`w-12 h-12 rounded-full mr-2 ${index < room.capacity ? 'bg-green-500' : 'bg-red-500'}`}
                ></div>
              ))}
            </div>
          ) : (
            <div>Capacidad no disponible</div>
          )
        }
      </span>
      {showCode && (
        <div className="text-lg text-center">
          <p>Código para unirse:</p>
          <p className="font-mono text-xl">{room.code}</p>
        </div>
      )}
      <div className="text-lg text-center mt-4">
        {!joined?
          <button
            onClick={handleJoin}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition ease-in-out duration-300">
            Unirse
          </button>
          :
          <button
            onClick={handleLeave}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-300">
            Irse
          </button>
        }
      </div>
      <button
        onClick={() => navigate(`/rooms?idRoomGame=${idRoomGame}`)}
        className="mt-6 px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition ease-in-out duration-300">
        Volver
      </button>
    </div>
  );
}

export default RoomInfo;
