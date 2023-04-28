import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import ProtectedPage from './components/ProtectedPage';
import Spinner from './components/Spinner';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import ProductInfo from './pages/ProductInfo';

function App() {
  const {loading} = useSelector(state => state.loaders)
  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedPage>  <Home/> </ProtectedPage>}/>
        <Route path='/profile' element={<ProtectedPage>  <Profile /> </ProtectedPage>}/>
        <Route path='/product/:id' element={<ProtectedPage>  <ProductInfo /> </ProtectedPage>}/>
        <Route path='/admin' element={<ProtectedPage>  <Admin /> </ProtectedPage>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
      </BrowserRouter>rofile
    </div>
  );
}

export default App;
