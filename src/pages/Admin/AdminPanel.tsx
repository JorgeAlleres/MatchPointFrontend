import { Link } from 'react-router-dom';
import HomeGreetings from '../../components/HomeGreetings';

function AdminPanel() {
  return (
    <div className='pt-32 flex flex-col items-center'>
      <div className='space-x-4 mb-8'>
        <Link
          to="/userManager"
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300'
        >
          USERS
        </Link>
        <Link
          to="/roomManager"
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300'
        >
          ROOMS
        </Link>
        <Link
          to="/gameManager"
          className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300'
        >
          GAMES
        </Link>
      </div>
      <HomeGreetings>
        {'Admin'}
      </HomeGreetings>
    </div>
  );
}

export default AdminPanel;
