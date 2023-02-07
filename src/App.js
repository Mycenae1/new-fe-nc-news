import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from './components/Header.js'
import Home from './components/Home.jsx'
import Articles from './components/Articles.jsx'


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<Articles/>} />
      </Routes>
    </div>
  );
}

export default App;
