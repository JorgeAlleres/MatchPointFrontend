import { useEffect, useState } from "react";
import { RoomService } from '../services/room.service';
import { useParams } from "react-router-dom";
import Room from "../models/Room";

function RoomInfo() {
  const [room, setRoom] = useState<Room>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    RoomService.getById(Number(id))
      .then(setRoom)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!room) return <div>Sala no encontrada</div>;

  return (
    // Este div asegura que el contenido esté centrado en la pantalla tanto vertical como horizontalmente
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
      <div className="flex gap-5 mb-6">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-12 h-12 border-2 border-white rounded-full"
            title={`Jugador ${i + 1}`}
          />
        ))}
      </div>
      <div className="text-lg text-center">
        <p>Código para unirse:</p>
        <p className="font-mono text-xl">{room.code}</p>
      </div>
    </div>
  );
}

export default RoomInfo;