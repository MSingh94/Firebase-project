import React from 'react'
import "./App.css"
import { Route, Routes, BrowserRouter} from "react-router-dom"
import Homepage from './pages/Homepage/Homepage'
import CategoryArticle from './pages/CategoryArticle/CategoryArticle'
import Header from './components/Header/Header'
import Auth from './pages/Auth/Auth'
import AddArticle from './pages/AddArticle/AddArticle'
import ArticleDetails from './pages/ArticleDetails/ArticleDetails'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/addarticle" element={<AddArticle/>} />
        <Route path="/category/:categoryName" element={<CategoryArticle/>} />
        <Route path="/article/:articleId" element={<ArticleDetails/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App