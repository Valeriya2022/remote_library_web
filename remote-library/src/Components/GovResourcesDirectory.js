import { upload } from '@testing-library/user-event/dist/upload';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {strings} from '../localization'


function GovResourcesDirectory(){
    const [govResources, setGovResources] = useState([]);
    useEffect(()=>{
        if (localStorage.getItem("lng") !== null){
            strings.setLanguage(localStorage.getItem("lng"))
          }
        fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/governmental-resource`, {
          method: 'GET'
    
        }).then( resp => resp.json())
        .then(response => setGovResources(response))
        .catch (error => console.log(error))
        
      }, [])
    return(
      <div>
      <h2 className="bookHeader">{strings.govResourcesText}</h2>
        <div className = "book-wrapper book-directory gov-sources">
        
        { govResources.map(govResource=> {
            console.log(govResource.update_date)
          let path = govResource.path
            return (
                <Link to={`gov-resource/${govResource.id}`}>
              <div key={govResource.id} className = "govResource item">
                <div>{govResource.update_date} {govResource.source}</div>
           </div>
           </Link>
            )
           
          })}
        </div>
        </div>
    )}

export default GovResourcesDirectory;