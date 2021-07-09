import React from 'react';
import { Home } from "./app/pages/Home/Home"
import { Routes , Route} from "react-router-dom";
import { ProfilePage } from './app/pages/Profile/Profile';
import { SignIn} from './app/pages/signin/signin';
import { SignUp} from './app/pages/signup/signup';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>


      <Route exact patch='/' element={<Home/>}/>

      <Route exact path='/login' element={<SignIn/>}/>
      <Route exact path='/register' element={<SignUp/>}/>

      <Route exact path='/me' element={<ProfilePage/>}/>
    </Routes>
    </div>
  );
}

export default App;
