import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@/App.css';
import Home from './pages/Home';
import Salary from './pages/Salary';
import Rules from './pages/Rules';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/salary" element={<Salary />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
