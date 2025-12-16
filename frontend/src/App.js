import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';       // <--- Import Home
import Profile from './pages/Profile'; // <--- Import Profile

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        
        <Route path="/driver-dashboard" element={<Home />} /> 
        <Route path="/commuter-home" element={<Home />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

