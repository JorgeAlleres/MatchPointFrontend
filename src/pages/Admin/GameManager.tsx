import { FormEvent, useEffect, useState } from "react";
import { GameService } from "../../services/game.service";
import Game from "../../models/Game";

interface GameFormProps {
  onSubmit: (e: FormEvent, name: string, genre: string, platform: string) => void;
  gameToEdit: Game | null; // Aceptamos null como valor posible
}

function GameForm({ onSubmit, gameToEdit }: GameFormProps) {
  const [name, setName] = useState(gameToEdit?.gameName || '');
  const [genre, setGenre] = useState(gameToEdit?.genre || '');
  const [platform, setPlatform] = useState(gameToEdit?.platform || '');

  useEffect(() => {
    if (gameToEdit) {
      setName(gameToEdit.gameName);
      setGenre(gameToEdit.genre);
      setPlatform(gameToEdit.platform);
    } else {
      setName('');
      setGenre('');
      setPlatform('');
    }
  }, [gameToEdit]);

  return (
    <form onSubmit={(e) => onSubmit(e, name, genre, platform)} className="text-white bg-gray-800 p-6 rounded-lg shadow-md">
      <label htmlFor="name" className="block text-lg font-medium mb-2">Nombre del juego:</label>
      <input 
        id="name" 
        name="name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Escribe el nombre del juego"
      />
      <label htmlFor="genre" className="block text-lg font-medium mb-2">Género:</label>
      <input 
        id="genre" 
        name="genre" 
        value={genre} 
        onChange={(e) => setGenre(e.target.value)} 
        className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Escribe el género del juego"
      />
      <label htmlFor="platform" className="block text-lg font-medium mb-2">Plataforma:</label>
      <input 
        id="platform" 
        name="platform" 
        value={platform} 
        onChange={(e) => setPlatform(e.target.value)} 
        className="w-full p-3 bg-gray-700 text-white rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Escribe la plataforma del juego"
      />
      <button 
        type="submit" 
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300"
      >
        {gameToEdit ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

interface GameListProps {
  games: Game[];
  onDelete: (id: number) => void;
  onEdit: (game: Game) => void;
}

function GameList({ games, onDelete, onEdit }: GameListProps) {
  return (
    <div className="text-white mt-6">
      {games.map(game =>  
        <div key={game.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg mb-4">
          <span className="text-lg">{game.gameName} - {game.genre} - {game.platform}</span>
          <div>
            <button 
              onClick={() => onEdit(game)} 
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-all duration-300 mr-2"
            >
              Editar
            </button>
            <button 
              onClick={() => onDelete(game.id)} 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
            >
              Borrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function GameManager() {
  const [games, setGames] = useState<Game[]>([]);
  const [gameToEdit, setGameToEdit] = useState<Game | null>(null);

  useEffect(() => { 
    GameService.getAll().then(setGames);
  }, []);

  const handleCreate = async (e: FormEvent, gameName: string, genre: string, platform: string) => { 
    e.preventDefault();
    const nuevoGame = await GameService.create({ gameName, genre, platform });
    setGames([...games, nuevoGame]);
  }

  const handleUpdate = async (e: FormEvent, gameName: string, genre: string, platform: string) => { 
    e.preventDefault();
    if (gameToEdit) {
      const updatedGame = await GameService.update(gameToEdit.id, { gameName, genre, platform });
      setGames(games.map(game => game.id === updatedGame.id ? updatedGame : game));
      setGameToEdit(null); // Reseteamos el estado de edición
    }
  }

  const handleDelete = (id: number) => { 
    if (!window.confirm("¿Estás seguro que quieres borrar este juego?")) return;
    GameService.delete(id);
    setGames(games?.filter((game) => game.id !== id));
  }

  const handleEdit = (game: Game) => {
    setGameToEdit(game);
  }

  return (
    <div className="container mx-auto p-8 gap-6 mt-16">
      <h1 className="text-4xl font-extrabold text-white mb-8">Gestión de Juegos</h1>
      <GameForm 
        onSubmit={gameToEdit ? handleUpdate : handleCreate} 
        gameToEdit={gameToEdit} 
      />
      <GameList games={games} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default GameManager;
