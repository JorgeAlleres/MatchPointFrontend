import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Room from "../../../models/Room";
import { RoomService } from "../../../services/room.service";

function RoomListAdmin() {
    const [rooms, setRooms] = useState<Room[]>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        RoomService.getAll()
            .then(setRooms)
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, []);

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
        <div className="relative overflow-x-auto">
            {loading && <div className="text-black font-bold mb-4">{loading}</div>}
            {error && <div className="text-red-500 font-bold mb-4">{error}</div>}
            <div className="flex justify-between items-center w-full text-white">
                <h1 className="text-2xl font-bold mb-4">Listado de Rooms</h1>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Descripcion</th>
                        <th className="px-4 py-2">Capacidad</th>
                        <th className="px-4 py-2">Codigo</th>
                        <th className="px-4 py-2">Privada</th>
                        <th className="px-4 py-2">ID Juego</th>
                        <th className="px-4 py-2">Gestionar</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms?.map(room => (
                        <tr key={room.id} className="border-b">
                            <td className="px-4 py-2">{room.id}</td>
                            <td className="px-4 py-2">{room.roomName}</td>
                            <td className="px-4 py-2">{room.description?room.description:'No tiene descripcion'}</td>
                            <td className="px-4 py-2">{room.capacity}</td>
                            <td className="px-4 py-2">{room.code}</td>
                            <td className="px-4 py-2">{room.private?<p>✅</p>:<p>❌</p>}</td>
                            <td className="px-4 py-2">{room.idGame}</td>
                            <td className="px-4 py-2">
                                <div className="p-1">
                                    <Link
                                        className="text-yellow-500 font-bold m-2"
                                        to={`./edit/${room.id}`}>
                                            Editar
                                    </Link>
                                    <button onClick={() => handleDelete(room.id)} className="text-red-500 font-bold">
                                        Borrar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default RoomListAdmin;
