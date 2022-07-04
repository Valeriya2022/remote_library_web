import Header from './Header.js';
import Books from './Books.js';
import Videos from './Videos.js';
import GovernmentalResources from './GovernmentalResources.js';
import React, {useEffect} from 'react';
import {strings} from '../localization.js'
import { Link } from 'react-router-dom';


class Home extends React.Component{
    componentDidMount(){
        if (localStorage.getItem("lng") !== null){
          strings.setLanguage(localStorage.getItem("lng"))
        }        
      }
    
    render(){
        return(
            <React.Fragment>
            
            
                <Books/>
                <Videos/>
                <GovernmentalResources/>
                
            </React.Fragment>
        )
    }
}
export default Home;
