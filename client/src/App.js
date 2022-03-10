import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home.jsx';
import { ChatRoom } from './components/ChatRoom/ChatRoom.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/:roomId' element={<ChatRoom />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
