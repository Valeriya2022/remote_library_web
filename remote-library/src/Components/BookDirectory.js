import React, {useState, useEffect} from 'react';
import { Document, Page,pdfjs,  StyleSheet } from 'react-pdf';
import {Link} from 'react-router-dom'
import { strings } from '../localization';


function BookDirectory(){
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [books, setBooks] = useState([]);
    const [displayRating, setDisplayRating] = useState(false)
    const [displayGenre, setDisplayGenre] = useState(false)
    const [displayYear, setDisplayYear] = useState(false)
    const [genres, setGenres] = useState([])
    const [category, setCategory] = useState(null)
    const [years, setYears] = useState([0, 2023])
 pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    useEffect(()=>{
      if (localStorage.getItem("lng") !== null){
        strings.setLanguage(localStorage.getItem("lng"))
      }
        fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/books`, {
          method: 'GET'
    
        }).then( resp => resp.json())
        .then(response => setBooks(response))
        .catch (error => console.log(error))
        
        fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/book-category`, {
          method: 'GET'
    
        }).then( resp => resp.json())
        .then(response => setGenres(response))
        .catch (error => console.log(error))
        
        
      }, [])
      function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
      }
      
    
    return(
      <div>
        <div className="book-directory flexbox">
          <div className='rating-container'>
          
          </div>
          <div className='rating-container'>
          <div className="button" onClick={()=>setDisplayGenre(!displayGenre)}>{strings.genre}</div>
          
            {
              displayGenre?
              <div>
                {genres.map(genre=>{
                  return <div className="button-2" onClick={()=>setCategory(genre.id)}>{genre.category}</div>
                })}
                <div className="button-2" onClick={()=>setCategory(null)}>{strings.all}</div>
          
          </div>:
          <div></div>
            }
            
          
          </div>
          <div className='rating-container' >
          <div className="button" onClick={()=>setDisplayYear(!displayYear)}>{strings.year}</div>
          {
              displayYear?
              <div>
          <div className="button-2" onClick={()=>setYears([2011, 2023])}>{"2011-2022"}</div>
          <div className="button-2" onClick={()=>setYears([1999, 2011])}>{"2000-2010"}</div>
          <div className="button-2" onClick={()=>setYears([0, 2000])}>{"<2000"}</div>
          <div className="button-2" onClick={()=>setYears([0, 2023])}>{strings.all}</div>
          </div>:
          <div></div>
            }
          </div>
        </div>
      <h2 className="bookHeader">{strings.booksText}</h2>
        <div className = "book-wrapper book-directory">
        
        { books.map(book=> {
          let path = book.path  
          let authors = "";
          book.authors.map((author, id)=>
          authors += author.first_name + " " + author.last_name)
          let ext =  path.split('.').pop();
          console.log(ext)
          console.log(book.category)
          if ((category=== null || category == book.book_category) && (years[0] < book.publish_year && years[1] > book.publish_year)){
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
             
          }
          
           
          }
          )}
        </div>
        </div>
    )}

export default BookDirectory;