import { useEffect, useState } from "react";
import { RoomService } from '../services/room.service';
import { UserRoomService } from "../services/user_room.service";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Room from "../models/Room";
import Game from "../models/Game";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { GameService } from "../services/game.service";
import User from "../models/User";

function RoomInfo() {
  const [room, setRoom] = useState<Room | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [userCount, setUserCount] = useState<number>(0);
  const [joined, setJoined] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const navigate = useNavigate()

  const { id } = useParams();
  const [queryParams] = useSearchParams();
  const idRoomGame = queryParams.get('idRoomGame');
  const { user } = useAuth()
  const userId = user?.id

  // Cargar la información de la sala y el juego
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const room = await RoomService.getById(Number(id));
        setRoom(room);

        const game = await GameService.getById(Number(idRoomGame));
        setGame(game);

        const countUsers = await UserRoomService.getRoomUserCount(Number(id));
        setUserCount(countUsers.count)

        const users = await UserRoomService.getRoomUsers(Number(id));
        setJoined(users.some((user: User) => {
          return user.id === userId;
        }));
      } catch (error) {
        setError("Error al obtener la información");
        setError(error instanceof Error ? error.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, idRoomGame]);


  const handleJoin = async () => {
    if (game && userCount < game.maxCapacity) {
      try {
        await UserRoomService.joinRoom(Number(userId), Number(id), "player");
        toast.success("Te has unido a la sala correctamente ✔️");
        setJoined(true);
        setUserCount((prev) => prev + 1);
        setShowCode(true);
      } catch (error) {
        toast.error("Error al unirse a la sala");
        console.error(error)
      }
    } else {
      toast.error("La sala está llena");
    }
  };

  const handleLeave = async () => {
    try {
      await UserRoomService.leaveRoom(Number(userId), Number(id));
      toast.success("Has salido de la sala correctamente ✔️");
      setJoined(false);
      setUserCount((prev) => prev - 1);
      setShowCode(false);
    } catch (error) {
      toast.error("Error al salir de la sala");
      console.error(error)
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!room || !game) return <div>Sala no encontrada</div>;

  return (
    <div className="text-white flex flex-col items-center justify-center h-screen font-sans">
      <h1 className="text-2xl font-bold mb-8">{room.roomName}</h1>
      <p>Descripción: {room.description}</p>
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
      <div className="flex items-center">
        {Array.from({ length: game.maxCapacity }, (_, index) => (
          <div
            key={index}
            className={`w-12 h-12 rounded-full mr-2 ${index < userCount + room.capacity ? "bg-red-500" : "bg-green-500"
              }`}
          ></div>
        ))}
      </div>
      {showCode && (
        <div className="text-lg text-center">
          <p>Código para unirse:</p>
          <p className="font-mono text-xl">{room.code}</p>
        </div>
      )}
      <div className="text-lg text-center mt-4">
        {!joined ? (
          <button
            onClick={handleJoin}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition ease-in-out duration-300"
          >
            Unirse
          </button>
        ) : (
          <button
            onClick={handleLeave}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition ease-in-out duration-300"
          >
            Irse
          </button>
        )}
      </div>
      <button
        onClick={() => navigate(`/rooms?idRoomGame=${idRoomGame}`)}
        className="mt-6 px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition ease-in-out duration-300"
      >
        Volver
      </button>
    </div>
  );
}

export default RoomInfo;
