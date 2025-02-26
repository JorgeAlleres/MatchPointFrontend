import { ChangeEvent, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { RoomService } from '../services/room.service';
import toast from "react-hot-toast";
import Room from "../models/Room";
import { GameService } from "../services/game.service";

function RoomList() {
    const [rooms, setRooms] = useState<(Room & { gameMaxCapacity?: number })[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [queryParams, setQueryParams] = useSearchParams();
    const idRoomGame = queryParams.get('idRoomGame');
    const roomNameQuery = queryParams.get("roomName") || "";
    const capacityFilter = queryParams.get("capacity") || "";
    const privacityFilter = queryParams.get("privacity") === "false";  // Convertir "true" o "false"

    useEffect(() => {
        setLoading(true);
        RoomService.search(queryParams)
            .then(async (fetchedRooms) => {
                const roomsWithGameInfo = await Promise.all(fetchedRooms.map(async (room: Room) => {
                    const gameInfo = await GameService.getById(room.idRoomGame);
                    return { ...room, gameMaxCapacity: gameInfo.maxCapacity };
                }));
                setRooms(roomsWithGameInfo);
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, [queryParams]);


    const handleSearchChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        const newRoomName = e.target.value;
        const newParams = new URLSearchParams(queryParams); // Mantener los parámetros actuales
        if (idRoomGame) newParams.set("idRoomGame", idRoomGame);
        if (newRoomName) newParams.set("roomName", newRoomName);
        else newParams.delete("roomName"); // Eliminar si está vacío

        setQueryParams(newParams);
    };

    const handleSearchChangeCapacity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const capacity = e.target.value;
        const newParams = new URLSearchParams(queryParams); // Mantener los parámetros actuales
        if (capacity) newParams.set("capacity", capacity);
        else newParams.delete("capacity"); // Eliminar si no se selecciona

        setQueryParams(newParams);
    };

    const handleSearchChangePrivacity = (e: ChangeEvent<HTMLInputElement>) => {
        const privacity = e.target.checked; // Cambiado para simplemente usar el valor booleano
        const newParams = new URLSearchParams(queryParams); // Mantener los parámetros actuales

        if (privacity) {
            newParams.set("privacity", "false"); // Establecer a "false" para solo salas públicas
        } else {
            newParams.delete("privacity"); // Eliminar si no se quiere filtro
        }

        setQueryParams(newParams);
    };



    const handleDelete = async (id: number) => {
        if (!window.confirm("¿Estás seguro que quieres borrar esta sala?")) return;
        try {
            await RoomService.delete(id);
            setRooms((prevRooms) => prevRooms?.filter((room) => room.id !== id));
            toast.success("Room successfully deleted");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unknown error");
        }
    };

    return (
        <div className="flex flex-wrap p-4 text-white gap-4 pt-20">
            <div className="flex justify-between items-center w-full">
                <h1 className="text-2xl font-bold mb-4">Listado de rooms</h1>

                <Link
                    to={`/rooms/new?idRoomGame=${idRoomGame}`}
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
                    onChange={handleSearchChangeCapacity}
                    className="shadow border rounded py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Todas las capacidades</option>
                    <option value="1">&gt; 1</option>
                    <option value="2">&gt; 2</option>
                    <option value="3">&gt; 3</option>
                    <option value="4">&gt; 4</option>
                    <option value="5">&gt; 5</option>
                </select>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="privacityFilter"
                        checked={privacityFilter}
                        onChange={handleSearchChangePrivacity}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <label htmlFor="privacityFilter" className="ml-2 text-white">
                        Mostrar solo salas públicas
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

                    <span>Capacidad:
                        {
                            room.capacity >= 0 && room.gameMaxCapacity && room.gameMaxCapacity > 0 ? (
                                <div className="flex items-center">
                                    {Array.from({ length: room.gameMaxCapacity ?? 0}, (_, index) => (
                                        <div
                                            key={index}
                                            className={`w-4 h-4 rounded-full mr-1 ${index < room.capacity ? 'bg-green-500' : 'bg-red-500'
                                                }`}
                                        ></div>
                                    ))}
                                    <span className="ml-2">
                                        ({room.capacity}/{room.gameMaxCapacity})
                                    </span>
                                </div>
                            ) : (
                                <div>Capacidad no disponible</div>
                            )
                        }
                    </span>


                    {!room.private ? (
                        <span>Sala Pública</span>
                    ) : (
                        <span>Sala Privada</span>
                    )}

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
