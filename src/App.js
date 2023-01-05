import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './screens/Users';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Users" element={<Users />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
