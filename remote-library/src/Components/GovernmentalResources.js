import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {strings} from '../localization'


function GovernmentalResources(){
    const [govResources, setGovResources] = useState([]);
    useEffect(()=>{
        if (localStorage.getItem("lng") !== null){
            strings.setLanguage(localStorage.getItem("lng"))
          }
        fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/governmental-resource-popular`, {
          method: 'GET'
    
        }).then( resp => resp.json())
        .then(response => setGovResources(response))
        .catch (error => console.log(error))
        
      }, [])
    return(
      <div>
      <h2 className="bookHeader">{strings.govResourcesText}</h2>
        <div className = "book-wrapper">
        
        { govResources.map(govResources=> {
          let path = govResources.path
            return (
                <Link to={`gov-resource/${govResources.id}`}>
              <div key={govResources.id} className = "item">
                <div>{govResources.source}</div>
           </div>
           </Link>
            )
           
          })}
        </div>
        <div className='footer'>
                    <Link to='/about'>
                      <p>
                      {strings.aboutUsTitle}
                      </p>
                      </Link>
                </div>
        </div>
    )}

export default GovernmentalResources;