import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatPage from './Components/ChatPage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
