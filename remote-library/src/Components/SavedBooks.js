import React, {useState, useEffect} from 'react';
import { Document, Page,pdfjs,  StyleSheet } from 'react-pdf';
import {Link} from 'react-router-dom'
import { strings } from '../localization';


function SavedBooks(){
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [books, setBooks] = useState([]);
 pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    useEffect(()=>{
      if (localStorage.getItem("lng") !== null){
        strings.setLanguage(localStorage.getItem("lng"))
      }
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({refresh: localStorage.getItem("refresh")})
    };
    
        fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/get-saved-books`, requestOptions)
        .then( resp => resp.json())
        .then(response => setBooks(response))
        .catch (error => console.log(error))
        
      }, [])
      function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
      }
    
    return(
      <div>
      <h2 className="bookHeader">{strings.booksText}</h2>
        <div className = "book-wrapper book-directory">
        
        { books.map(book=> {
          let path = book.path  
          let authors = "";
          book.authors.map((author, id)=>
          authors += author.first_name + " " + author.last_name)
          let ext =  path.split('.').pop();
          console.log(ext)
          if (ext == "pdf"){
            return (
            
              <div key={book.id} className = "item">
                <Link to={`book/${book.id}`} state={{type: "pdf"}}>
                  <Document  file={{url: path}} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page className = "page" pageNumber={pageNumber} />
                </Document>
              </Link>
           <div className="authorName"><h1>{authors}</h1></div>
           <div className="bookTitle"><h1>{book.name}</h1></div>
           </div>
            )
          }else if (ext === "epub"){
            return(
            <div key={book.id} className = "item">
              <Link to={`book/${book.id}`} state={{type: "epub"}}>
              <img className="book-cover-img" src={process.env.PUBLIC_URL + "default_book_cover.png"} alt="book cover" />
              </Link>
           <div className="authorName"><h1>{authors}</h1></div>
           <div className="bookTitle"><h1>{book.name}</h1></div>
           </div>
            )
          }
           
           
          })}
        </div>
        </div>
    )}

export default SavedBooks;