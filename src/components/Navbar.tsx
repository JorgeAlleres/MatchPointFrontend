import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GameService } from '../services/game.service';
import Game from '../models/Game';

function Navbar() {
  const [games, setGames] = useState<Game[]>([]);
  const [msg, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const isAdmin = true;
  {/* TODO: Implementar si el usuario es Admin o no */ }
  const isAuthenticate = true
  {/* TODO: Implementar si el usuario esta Autenticado o no */ }

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
      navigate(`/games/${selectedGameId}/room`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 top-0 left-0 start-0 border-b border-gray-200 dark:border-gray-600">
      {isAuthenticate &&
        <div className="max-w-screen-xl flex items-center justify-center mx-auto p-4">
          {msg}

          <div className="flex items-center justify-center space-x-4 w-full">
            {/* Select dinámico para juegos */}
            {isAdmin ?
              <Link
                to={'/roomAdmin'}
                className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300'
                >
                Room Manager
              </Link>
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

            {/* Insertar un enlace al GameManager solo para ADMIN */}
            {isAdmin &&
              <Link
                to={'/gameAdmin'}
                className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300'
                >
                Game Manager
              </Link>
            }

            {/* Insertar un enlace al UserManager solo para ADMIN */}
            {isAdmin &&
              <Link
                to={'/userAdmin'}
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300'              >
                User Manager
              </Link>
            }

            {/* Insertar un enlace al home o al home admin */}
            <Link
              to={isAdmin ? '/admin' : '/'}
              className='py-2 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors'
            >
              {isAdmin ? 'HOME ADMIN' : 'HOME'}
            </Link>

            {/* Link del perfil */}
            <Link
              to="/profile" //TODO No se como abrir el id de mi usuario
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
