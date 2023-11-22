import './App.css';
import Signup from './pages/signup/signup';
import Signin from './pages/signin/signin';
import Budget from './pages/budget/Budget';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Signup/>}></Route>
      <Route path='/Signin' element={<Signin/>}></Route>
      <Route path='/home' element={<Budget/>}></Route>
    </Routes>
    </>
  );
}

export default App;
