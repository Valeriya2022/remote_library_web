import React, {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom'
import {strings} from '../localization'
import Logo from '../Images/Icons/logo.png'

function Login(){
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
    useEffect(()=>{
        if (localStorage.getItem("lng") !== null){
            strings.setLanguage(localStorage.getItem("lng"))
          }   
      }, [])
      function updateEmail(e){
          setEmail(e.target.value)
          if (email !== "" && password.length > 8){
            setDisabled(false)
          }else{
            setDisabled(true)
          }
      }
      function updatePassword(e){
          setPassword(e.target.value)
          if (email !== "" && e.target.value.length >= 8){
            setDisabled(false)
          }else{
            setDisabled(true)
          }
      }
      function signIn(){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({email: email, password: password})
      };
      
      fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/login`, requestOptions)
      .then( resp => resp.json())
      .then(response => {localStorage.setItem("refresh", response.refresh)
    navigate("/")
    window.location.reload(true)})    
      .catch (error => console.log(error))
      }
    return(
      <div className="coverPage">
          <div className="logContainer">
            <div className="item">
                <img className="logo_img" src={Logo} alt="Logo"></img>
                <h1 className="logo">BilimHub</h1>
            </div>
            <div className="desc">{strings.useAccount} </div>
            <form>
                <h2 className="subtitle">{strings.enterEmail}</h2>
                <input type="email" value={email} onChange={updateEmail} name="search-box" />
                <p>{strings.forgotEmail}</p>
                <h2 className="subtitle">{strings.enterPassword}</h2>
                <input type="password" value={password} onChange={updatePassword} name="search-box"/>
                <p>{strings.forgotPassword}</p>
            </form>
            <div className="item-2">
                <Link to="/register">
                <p className="subtitle mobile">{strings.createAccout}</p>
                </Link>
                <button disabled={disabled} onClick={signIn}>{strings.signIn}</button>

            </div>
          </div>
        </div>
    )}

export default Login;