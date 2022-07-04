import React, {useState, useEffect} from 'react';
import { Document, Page,pdfjs,  StyleSheet } from 'react-pdf';
import {useLocation, Link} from 'react-router-dom'


function BookReaderPdf(){
    const location = useLocation()
    const path = location.state.path
    const name = location.state.name
    const authors = location.state.authors
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
      function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
      }
    function nextPage(){
        if (pageNumber < numPages){
            setPageNumber(pageNumber + 1)
        }
    }
    function prevPage(){
        if (pageNumber > 1){
            setPageNumber(pageNumber - 1)
        }
    }
    
    return(
      <div>

        <div className = "reader-pdf-wrapper">
        <div className='navigation'></div>
          <button><div onClick={prevPage}>prev</div></button>
          <button><div onClick={nextPage}>next</div></button>
            <div className = "item">
            <Document  file={process.env.PUBLIC_URL + path} onLoadSuccess={onDocumentLoadSuccess}>
            <Page className = "page" pageNumber={pageNumber} />
          </Document>
          </div>
   
            

           
            
              
            
          
        </div>
        </div>
    )}

export default BookReaderPdf;