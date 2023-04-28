import { Route, Routes } from "react-router-dom";
import {Redirect} from "react";
import './App.css';
import Header from './components/Header.js'
import Articles from './components/Articles.jsx'
import SingleArticle from './components/SingleArticle.jsx'
// import { useEffect, useState } from "react";
import ErrorPage from './components/ErrorPage.jsx'


function App() {

  return (
    <div className="App">
      <Header/>
      <br/>
      <br/>
      
      <Routes>
      <Route path="/" element={<Articles/>} />
      <Route path="/articles/:article_id" element={<SingleArticle/>} />
      <Route path="/:topic/" element={<Articles/>} />
      <Route path="/404" element={<ErrorPage/>}></Route>
      <Route path= "*" element={<ErrorPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
