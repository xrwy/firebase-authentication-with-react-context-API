import { Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster} from 'react-hot-toast';
import { useAuthContext} from './context/AuthProvider'
import Error404 from './pages/Error404';


function App() {

  const { user } = useAuthContext();

  return (
    <>
      <Toaster position='top-right'/>

      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" replace /> } />
        <Route path='/register' element={!user ? <Register /> : <Navigate to="/" replace /> } />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
