import toast from "react-hot-toast";
import Game from "../../../models/Game";
import { GameService } from "../../../services/game.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GameList() {
    const [games, setGames] = useState<Game[]>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        GameService.getAll()
            .then(setGames)
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm("¿Estás seguro que quieres borrar este juego?")) return;
        try {
            await GameService.delete(id);
            setGames((prevGames) => prevGames?.filter((game) => game.id !== id));
            toast.success("Game succesfully deleted");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Unknown error");
        }
    };

    return (
        <div className="relative overflow-x-auto">
            {loading && <div className="text-black font-bold mb-4">{loading}</div>}
            {error && <div className="text-red-500 font-bold mb-4">{error}</div>}
            <div className="flex justify-between items-center w-full text-white">
                <h1 className="text-2xl font-bold mb-4">Listado de Games</h1>

                <Link
                    to="/games/new"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block"
                >
                    Añadir nuevo game
                </Link>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Género</th>
                        <th className="px-4 py-2">Plataforma</th>
                        <th className="px-4 py-2">Gestionar</th>
                    </tr>
                </thead>
                <tbody>
                    {games?.map(game => (
                        <tr key={game.id} className="border-b">
                            <td className="px-4 py-2">{game.id}</td>
                            <td className="px-4 py-2">{game.gameName}</td>
                            <td className="px-4 py-2">{game.genre}</td>
                            <td className="px-4 py-2">{game.platform}</td>
                            <td className="px-4 py-2">
                                <div className="p-1">
                                    <Link
                                        className="text-yellow-500 font-bold m-2"
                                        to={`./edit/${game.id}`}>
                                            Editar
                                    </Link>
                                    <button onClick={() => handleDelete(game.id)} className="text-red-500 font-bold">
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

export default GameList;
