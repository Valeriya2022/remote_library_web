import React, {useState, useEffect} from 'react'
import {strings} from '../localization'
import Logo from '../Images/Icons/logo.png'
import '../Styles/About.css'


function About(){
    const [count, setCount] = useState(1);
    useEffect(()=>{
        if (localStorage.getItem("lng") !== null){
            console.log(localStorage.getItem("lng"))
            strings.setLanguage(localStorage.getItem("lng"))
            setCount(count+1)
          }   
      }, [])
    return(
      <div className="about">
          <h1 className='title'>{strings.aboutUsTitle}</h1>
          <div className="item">
                <img className="logo_img" src={Logo} alt="Logo"></img>
                <h1 className="logo">BilimHub</h1>
                <p>{strings.moto}</p>
                
            </div>
            <p className='desc'>{strings.aboutDesc}</p>
            <h1 className='title'>{strings.aboutMeet}</h1>
            <div className="flex-box">
                <div>
                <img src={process.env.PUBLIC_URL + "Valeriya.png"}></img>
                <p>{strings.nameValeriya}</p>
                <p>{strings.aboutBack}</p>
                </div>
                <div>
                <img src={process.env.PUBLIC_URL + "Elena.png"}></img>
                <p>{strings.nameLena}</p>
                <p>{strings.aboutFront}</p>
                </div>
            </div>
        </div>
    )}

export default About;