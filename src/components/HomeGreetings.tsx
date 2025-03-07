import logo from '../assets/logo.png';

interface HomeGreetingsProps {
  children?: string;
}

function HomeGreetings({ children }: HomeGreetingsProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white text-center p-6">
      <img src={logo} alt="Logo MatchPoint" className="w-48 h-48 mb-6 drop-shadow-lg rounded-full" />
      <h1 className="text-4xl font-bold mb-4 animate-bounce">¡Bienvenido a MatchPoint!</h1>
      {children === 'Admin' && <span className="text-xl font-semibold mb-2">ADMINISTRADOR</span>}
      <p className="text-lg mb-6">La página favorita para todos los gamers</p>
      <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-100 transition-all">Explorar</button>
    </div>

  );
}

export default HomeGreetings;
