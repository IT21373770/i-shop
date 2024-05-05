import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
// import Dashboard from './Pages/Dasboard/Dashboard';
import Stocks from './Pages/Stocks/Stocks';
import Category from './Pages/Category/Category';
import AddCategory from './Pages/Category/AddCategory';
import AddStock from './Pages/Stocks/AddStock';
import DeleteStock from './Pages/Stocks/DeleteStock';

function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Stocks />} />
          <Route path="/Dashboard" element={<Stocks />}/>

          <Route path="/Stocks" element={<Stocks />}/>
          <Route path='/Stocks/AddStock' element={<AddStock/>}/>
          <Route path='/Stocks/DeleteStock' element={<DeleteStock/>}/>

          <Route path="/Category" element={<Category />}/>
          <Route path="/Category/AddCategory" element={<AddCategory />}/>

          <Route path='/somewhere' render={() => <h2>You Are Somewhere</h2>} />
        </Routes>
      </Sidebar>
    </BrowserRouter>

  );
}

export default App;
