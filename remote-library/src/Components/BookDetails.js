import React, {useState, useEffect} from 'react';
import { Document, Page,pdfjs,  StyleSheet } from 'react-pdf';
import {useLocation, Link} from 'react-router-dom'
import { strings } from '../localization';


function BookDetails(){
    const location = useLocation()
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [book, setBook] = useState([]);
    const [path, setPath] = useState("")
    const [author, setAuthor] = useState("")
    const [saved, setSaved] = useState(false)
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    useEffect(()=>{
      if (localStorage.getItem("lng") !== null){
        strings.setLanguage(localStorage.getItem("lng"))
      }
        let id = window.location.pathname.split("/").pop()
        let authors = "";
        fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/books/${id}`, {
          method: 'GET'
    
        }).then( resp => resp.json())
        .then(response => {
            console.log(response)
            setBook(response)
            setPath(response.path)
            response.authors.map((author, id)=>
                authors += author.first_name + " " + author.last_name)
            setAuthor(authors)
            

            
        })
        .catch (error => console.log(error))
        
        if (localStorage.getItem("refresh")!==null){
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"book_id": id, "refresh": localStorage.getItem("refresh")})
        };
        
        fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/verify-saved-book`, requestOptions)
        .then( resp => resp.json())
        .then(response => {
          console.log(response)
          if (response.saved === 1){
            setSaved(true);
          }else{
            setSaved(false)
          }
        })    
        .catch (error => console.log(error))
        }
        
      }, [])
      function saveBook(){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({"book_id": book.id, "refresh": localStorage.getItem("refresh")})
      };
      
      fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/save-book`, requestOptions)
      .then( resp => resp.json())
      .then(response => {
        console.log(response)
        setSaved(true)
      })    
      .catch (error => console.log(error))
      }
      function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
      }
    
    return(
      <div>
        <div className = "book-detail-wrapper">
            {path.split('.').at(-1)==="pdf" &&
            <div key={book.id} className = "item">
            <Document  file={{url: path}} onLoadSuccess={onDocumentLoadSuccess}>
            <Page className = "page" pageNumber={pageNumber} />
          </Document>
          </div>
            }     
            {path.split('.').at(-1) ==="epub" && 
            <div key={book.id} className = "item">
                <img className="book-cover-img" src="/default_book_cover.png" alt="book cover" />
            </div>
            }

            <div className="book-info">
                <div className = "book-info-text">{strings.nameText}: {book.name}</div>
                <div className = "book-info-text">{strings.authorText}: {author}</div>
                <div className = "book-info-text">{strings.sourceText}: {book.source}</div>
                <div className = "book-info-text">{strings.publishYearText}: {book.publish_year}</div>
                <div className="book-buttons">
                    {path.split('.').at(-1)==="pdf" &&
                    <Link to="book-reader-pdf" state={{
                        path: path,
                        authors: author,
                        name: book.name
                    }}><div className="button">{strings.readText}</div></Link>
                    }
                    {path.split('.').at(-1)==="epub" &&
                    <Link to="book-reader-epub" state={{
                        path: path,
                        authors: author,
                        name: book.name
                    }}>
                    <div className="button">{strings.readText}</div>
                    </Link>
                    }
                    
                    <a href={path} download target="_blank"><div className="button">{strings.downloadText}</div></a>
                    {
                      saved?
                      <div className="button">{strings.savedText}</div>
                      :
                      <div className="button" onClick={saveBook}>{strings.saveText}</div>
                    }
                    
                </div>
                <div className="descriptionTitle">{strings.descriptionText}</div>
                <div className="description">{book.description}</div>
            </div>             
        </div>
        </div>
    )}

export default BookDetails;