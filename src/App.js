import React from 'react';
import Todo from './components/Todo'
import Login from './components/Login'
import {BrowserRouter as Router,Route,Link, Routes} from "react-router-dom";
import './App.css'

function App() {
  return (
    <div className="container-fluid">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} exact/>
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
