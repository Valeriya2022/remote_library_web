import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {strings} from '../localization'


function GovResource(){
    const [govResource, setGovResource] = useState([]);
    const [path, setPath] = useState("");
    let id = window.location.pathname.split("/").pop()
    useEffect(()=>{
        if (localStorage.getItem("lng") !== null){
            strings.setLanguage(localStorage.getItem("lng"))
          }
        fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/governmental-resource/${id}`, {
          method: 'GET'
    
        }).then( resp => resp.json())
        .then(response => {
            console.log(response)
            let path = response.path
            setPath(path)
        })
        .catch (error => console.log(error))
        
      }, [])
    return(
      <div>
        {path!==""&&
        <div>
        <iframe className="website" src={path}></iframe>
        </div>
        }
        
        </div>
    )}

export default GovResource;