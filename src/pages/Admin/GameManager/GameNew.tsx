import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameService } from '../../../services/game.service';

function GameNew() {
    const [gameName, setGameName] = useState('');
    const [genre, setGenre] = useState('');
    const [platform, setPlatform] = useState('');
    const [maxCapacity, setMaxCapacity] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async () => {
        setLoading(true)
        if (!gameName || !genre || !platform || !maxCapacity) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }
        const gameData = {
            gameName,
            genre,
            platform,
            maxCapacity
        };
        try {
            await GameService.create(gameData)
            navigate('/gamesAdmin')
        } catch (error) {
            setError('Error al crear el juego')
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-20">
            <div className="flex flex-col items-center">
                {/* Contenedor principal */}
                <div className="p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Crear Game</h2>
                    {loading && <p>Loading ...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    <div className="mb-4">
                        <label htmlFor="gameName" className="block text-sm font-bold mb-2">
                            Nombre del Game <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="gameName"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={gameName}
                            onChange={(e) => setGameName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="genre" className="block text-sm font-bold mb-2">
                            Género <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="genre"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="platform" className="block text-sm font-bold mb-2">
                            Plataforma <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="platform"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="maxCapacity" className="block text-sm font-bold mb-2">
                            Capacidad Maxima <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            id="maxCapacity"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={maxCapacity}
                            onChange={(e) => setMaxCapacity(Number(e.target.value))}
                        />
                    </div>

                    <p className="text-sm italic text-gray-400 mb-4">* Son campos obligatorios</p>

                    <div className="flex items-center justify-center">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleSubmit}
                        >
                            Crear Game
                        </button>
                    </div>
                </div>
                <button
                    onClick={() => navigate(`/gamesAdmin`)}
                    className="mt-6 px-6 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition ease-in-out duration-300">
                    Volver
                </button>
            </div>
        </div>
    );
}

export default GameNew;
