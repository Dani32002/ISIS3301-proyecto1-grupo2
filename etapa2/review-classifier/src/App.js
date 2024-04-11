import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from ',/components/Header'
import Predict from './components/Predict';
import Stats from './components/Stats';
import Landing from './components/Landing';

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Landing /> }/>
          <Route path='/predict' element={ <Predict /> }/>
          <Route path='/stats' element={ <Stats /> }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
