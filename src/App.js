import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import Detail from './routes/Detail';
import Cart from './routes/Cart';
import MyPage from './routes/MyPage';

function App() { 
  
  return (
    <>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/detail/:id' element={<Detail/>}/>
          <Route path='/cart' element={<Cart/>} />
          <Route path='/myPage' element={<MyPage/>}/>
        </Routes>
        <Footer/>
    </>
  );
}

export default App;
