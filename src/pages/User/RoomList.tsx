import { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { RoomService } from "../../services/room.service";
import toast from "react-hot-toast";
import Room from "../../models/Room";

function RoomList() {
    const [rooms, setRooms] = useState<Room[]>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [queryParams, setQueryParams] = useSearchParams();
    const roomNameQuery = queryParams.get("roomName") || "";
    const capacityFilter = Number(queryParams.get("capacity")) || 0;
    const privacyFilter = Boolean(queryParams.get("private")) || false;

    const { gameId } = useParams<{ gameId: string }>();
    {/*TODO Ver como listar las salas solo del juego seleccionado */}

    useEffect(() => {
        /*if (!gameId) {
            setError("Game ID is missing");
            setLoading(false);
            return;
        }*/
        setLoading(true);
        RoomService.search(Number(gameId), roomNameQuery, capacityFilter, privacyFilter)
            .then(setRooms)
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [gameId, roomNameQuery, capacityFilter, privacyFilter]);

    const handleSearchChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        const newRoomName = e.target.value;
        setQueryParams(newRoomName ? { roomName: newRoomName } : {});
    };

    const handleSearchChangeCapcity = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const capacityFilter = e.target.value;
        setQueryParams(capacityFilter ? { capacity: capacityFilter } : {});
    };

    const handleSearchChangePrivacy = (e: ChangeEvent<HTMLInputElement>) => {
        const privacyFilter = e.target.value;
        setQueryParams(privacyFilter ? { private: privacyFilter } : {});
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("¿Estás seguro que quieres borrar esta sala?")) return;
        try {
            await RoomService.delete(id);
            setRooms((prevRooms) => prevRooms?.filter((room) => room.id !== id));
            toast.success("Room succesfully deleted");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unknown error");
        }
    };

    return (
        //TODO El filtrado de capacidad y de sala privada/publica funciona mal
        <div className="flex flex-wrap p-4 text-white gap-4">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-2xl font-bold mb-4">Listado de rooms</h1>

                <Link
                    to="/rooms/new"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block"
                >
                    Añadir nueva room
                </Link>
            </div>
            <div className="w-full flex flex-wrap gap-4">
                <input
                    value={roomNameQuery}
                    onChange={handleSearchChangeName}
                    placeholder="Buscar por nombre"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline flex-grow"
                    />
                <select
                    value={capacityFilter}
                    onChange={handleSearchChangeCapcity}
                    className="shadow border rounded py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Todas las capacidades</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="privacyFilter"
                        checked={privacyFilter}
                        onChange={handleSearchChangePrivacy}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <label htmlFor="privacyFilter" className="ml-2 text-white">
                        Mostrar solo salas privadas
                    </label>
                </div>
            </div>

            {loading && <p>Loading ...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {rooms?.length === 0 && !loading && (
                <p>No hay salas disponibles</p>
            )}

            {rooms?.map((room) => (
                <div
                    key={room.id}
                    className="border rounded p-4 mb-2 flex flex-col justify-between"
                >
                    <span>Nombre: {room.roomName}</span>

                    {room.description && <span>Descripcion: {room.description}</span>}

                    <span> Capacidad:
                        {room.capacity >= 0 ? (
                            <div className="flex items-center">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <div
                                        key={index}
                                        className={`w-4 h-4 rounded-full mr-1 ${index >= 5 - room.capacity ? 'bg-green-500' : 'bg-red-500'
                                            }`}
                                    ></div>
                                ))}
                            </div>
                        ) : (
                            <div>Capacidad no disponible</div>
                        )}
                    </span>

                    {!room.private ? 
                        <span>Sala Pública</span> :
                        <span>Sala Privada</span>}

                    <div>
                        <Link
                            to={`/rooms/${room.id}`}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 inline-block"
                        >
                            Ver
                        </Link>
                        <Link
                            to={`/rooms/edit/${room.id}`}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2 inline-block"
                        >
                            Editar
                        </Link>
                        <button
                            onClick={() => handleDelete(room.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block"
                        >
                            Borrar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RoomList;
