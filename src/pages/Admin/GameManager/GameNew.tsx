import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameService } from '../../../services/game.service';

function GameNew() {
    const [gameName, setGameName] = useState('');
    const [genre, setGenre] = useState('');
    const [platform, setPlatform] = useState('');
    const [maxCapacity, setMaxCapacity] = useState(0);
    const navigate = useNavigate()

    const handleSubmit = async () => {
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
            console.error(error)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-20">
            <div className="flex flex-col items-center">
                {/* Contenedor principal */}
                <div className="p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Crear Game</h2>
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
            </div>
        </div>
    );
}

export default GameNew;
