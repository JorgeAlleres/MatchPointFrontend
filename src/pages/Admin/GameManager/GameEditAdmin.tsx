import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GameService } from '../../../services/game.service';

function GameEdit() {
    const { id } = useParams(); // Para obtener el ID de la sala desde la URL
    const [gameName, setGameName] = useState('');
    const [genre, setGenre] = useState('');
    const [platform, setPlatform] = useState('');
    const [maxCapacity, setMaxCapacity] = useState(0);
    const navigate = useNavigate();

    // Cargar los datos de la sala al montar el componente
    useEffect(() => {
        async function call() {
            try {
                const game = await GameService.getById(Number(id));
                setGameName(game.gameName);
                setGenre(game.genre);
                setPlatform(game.platform);
                setMaxCapacity(game.maxCapacity)
            } catch (error) {
                console.error('Error al cargar los datos del game', error);
            }
        }

        call();
    }, [id]);

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
            await GameService.update(Number(id), gameData);
            navigate(`/gamesAdmin`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white pt-20">
            <div className="flex flex-col items-center">
                <div className="p-8 rounded shadow-md w-96">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Editar Game</h2>

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
                        <label htmlFor="password" className="block text-sm font-bold mb-2">
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
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleSubmit}
                        >
                            Actualizar Game
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameEdit;
