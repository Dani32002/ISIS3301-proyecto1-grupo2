import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Predict from './components/Predict';
import Stats from './components/Stats';
import Landing from './components/Landing';
import Retrain from './components/Retrain';
import Upload from './components/upload';
import Footer from './components/Footer';
import Metrics from './components/Metrics'

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/predict' element={<Predict />} />
          <Route path='/stats' element={<Stats />} />
          <Route path='/retrain' element={<Retrain />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/metrics' element={<Metrics />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
