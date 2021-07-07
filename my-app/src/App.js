import React from 'react';
import { Home } from "./app/pages/Home/Home"
import { Routes , Route} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>


      
      <Route exact path='/' element={<Home/>}/>
    </Routes>
    </div>
  );
}

export default App;
