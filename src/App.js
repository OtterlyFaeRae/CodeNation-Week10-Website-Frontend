import {useState,useEffect} from 'react';
import './App.css';
import SignUp from './components/SignUp';
import Main from './components/Main';
import Login from './components/Login'
import Account from './components/Account'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


const App = () => {
  const [user, setUser] = useState('')
  return (
    <BrowserRouter>
      <nav>
        <div>
          <Link to='/main'>Main</Link>
        </div>
        <div>
          {user ? <Link to='/account'>Account</Link> : <Link to='/login'>Login</Link>}
        </div>
        <div>
          {user ? null : <Link to='/signUp'>Sign Up</Link>}
        </div>
      </nav>
      <Routes>
        <Route path='/main' element={<Main uName={user.uName} setUser={setUser}/>}/>
        <Route path='/signUp' element={<SignUp user={user} setUser={setUser}/>}/>
        <Route path='/account' element={<Account user={user} setUser={setUser}/>}/>
        <Route path='/login' element={<Login user={user} setUser={setUser}/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;