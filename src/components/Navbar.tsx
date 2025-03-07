import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GameService } from '../services/game.service';
import Game from '../models/Game';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const [games, setGames] = useState<Game[]>([]);
  const [msg, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const {isAdmin} = useAuth();
  const {isAuthenticated} = useAuth()

  useEffect(() => {
    GameService.getAll()
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((error) => {
        const msg = error instanceof Error ? error.message : 'Error desconocido';
        setMessage(msg);
        setLoading(false);
      });
  }, []);

  const handleGameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGameId = event.target.value;
    if (selectedGameId) {
      navigate(`/rooms?idRoomGame=${selectedGameId}`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <nav className="bg-gray-900 text-white fixed w-full top-0 left-0 z-50 border-b border-gray-700">
      {isAuthenticated &&
        <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">

          {msg}

          <div className="flex flex-1 justify-start space-x-4">
            {isAdmin ?
              <>
                <Link to="/roomsAdmin" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Room Manager
                </Link>
                <Link to="/gamesAdmin" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Game Manager
                </Link>
                <Link to="/usersAdmin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                  User Manager
                </Link>
              </>
              :
              <select
                onChange={handleGameChange}
                className="py-2 px-3 text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 dark:text-white dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
                defaultValue=""
              >
                <option value="" disabled>Selecciona un juego</option>
                {games.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.gameName}
                  </option>
                ))}
              </select>
            }
          </div>

          {/* Sección central */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link
              to={isAdmin ? '/admin' : '/'}
              className="py-2 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isAdmin ? 'HOME ADMIN' : 'HOME'}
            </Link>
          </div>

          {/* Sección derecha */}
          <div className="flex-1 flex justify-end">
            <Link
              to="/profile"
              className="py-2 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Profile
            </Link>
          </div>
        </div>
      }
    </nav>
  );
}

export default Navbar;
