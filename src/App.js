import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import About from './screens/About';
import Projects from './screens/Projects';
import Questions from './screens/Questions';
import ReactDoc from './screens/ReactDoc';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Questions" element={<Questions />} />
        <Route path="/ReactDoc" element={<ReactDoc />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
