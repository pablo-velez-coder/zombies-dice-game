import { LoginPage } from './pages/login';
import { useGame } from './context';
import './App.css';
import { Game } from './pages/game';

function App() {

  const {userName} = useGame()

  return (
    <div className="App">
     {userName ?  <Game /> : <LoginPage />}
    </div>
  );
}

export default App;
