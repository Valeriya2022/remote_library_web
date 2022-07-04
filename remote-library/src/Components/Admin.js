import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {strings} from '../localization'
import Redirect from 'react-router-dom'


function Admin(){
    React.useEffect(() => {
        window.location.replace(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/admin/`)
      }, [])
    return(
      <div></div>
    )}

export default Admin;