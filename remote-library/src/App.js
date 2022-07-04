import './Styles/App.css'
import './Styles/Header.css'
import './Styles/main.css'
import './Styles/About.css'
import React from 'react'
import Home from './Components/Home'
import Header from './Components/Header'
import VideosDetails from './Components/VideoDetails'
import BookDetails from './Components/BookDetails'
import BookDirectory from './Components/BookDirectory'
import VideoDirectory from './Components/VideoDirectory'
import BookReaderPdf from './Components/BookReaderPdf'
import BookReaderEpub from './Components/BookReaderEpub'
import GovResource from './Components/GovResource'
import GovResourcesDirectory from './Components/GovResourcesDirectory'
import Login from './Components/Login'
import Register from './Components/Register'
import About from './Components/About'
import Admin from './Components/Admin'
import SavedBooks from './Components/SavedBooks'
import SavedVideos from './Components/SavedVideos'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"

class App extends React.Component {
  render(){
    return (
      <div className="App">
      
      <Router>
      <header className="App-header">
            <Header/>
        </header>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/video/:id" element={<VideosDetails/>}/>
          <Route exact path="/book/:id" element={<BookDetails/>}/>
          <Route exact path="/book-directory/book/:id" element={<BookDetails/>}/>
          <Route exact path="book-directory" element={<BookDirectory/>}/>
          <Route exact path="video-directory/video/:id" element={<VideosDetails/>}/>
          <Route exact path="gov-directory/gov-resource/:id" element={<GovResource/>}/>
          <Route exact path="gov-resource/:id" element={<GovResource/>}/>
          <Route exact path="gov-directory/gov-resource/:id" element={<GovResource/>}/>
          <Route exact path="gov-directory" element={<GovResourcesDirectory/>}/>
          <Route exact path="/video-directory" element={<VideoDirectory/>}/>
          <Route path="book/:id/book-reader-pdf" element={<BookReaderPdf/>}/>
          <Route path="/book-directory/book/:id/book-reader-pdf" element={<BookReaderPdf/>}/>
          <Route path="book/:id/book-reader-epub" element={<BookReaderEpub/>}/>
          <Route path="book-directory/book/:id/book-reader-epub" element={<BookReaderEpub/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/admin" element={<Admin/>}/>
          <Route exact path="/saved-books" element={<SavedBooks/>}/>
          <Route exact path="/saved-videos" element={<SavedVideos/>}/>
          </Routes>
      </Router>
      </div>
    );
  }
}
export default App;
