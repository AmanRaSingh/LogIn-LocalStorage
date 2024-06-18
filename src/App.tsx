import Registration from './Components/Registration_page/Registration';
import Login from './Components/Login-Page/Login';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Forget from './Components/Forget-Page/Forget';

function App() {
  return (
    <>
      <BrowserRouter>
        <div style={{display:"flex" ,gap:"5rem"}}>
          <p><Link to={'/'}> Registration</Link></p>
          <p><Link to={'/login'}>Login</Link></p>
          <p><Link to={"/forget"}>Forget</Link></p>
        </div>
        <Routes>
          <Route path='/' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forget' element={<Forget/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
