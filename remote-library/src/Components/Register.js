import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {strings} from '../localization'
import Logo from '../Images/Icons/logo.png'


function Register(){
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate()
  function updateEmail(e){
    setEmail(e.target.value)
    if (email !== "" && password.length > 8 && password === e.target.value){
      setDisabled(false)
    }else{
      setDisabled(true)
    }
    }
    function updatePassword(e){
      setPassword(e.target.value)
      if (email !== "" && password.length > 8 && password === e.target.value){
        setDisabled(false)
      }else{
        setDisabled(true)
      }
  }
    function updatePassword2(e){
        setPassword2(e.target.value)
        if (email !== "" && password.length > 8 && password === e.target.value){
          setDisabled(false)
        }else{
          setDisabled(true)
        }
    }
    function signUp(){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: email, password: password})
    };
    
    fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/register`, requestOptions)
    .then( resp => resp.json())
    .then(response => {
      fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/login`, requestOptions)
      .then( resp => resp.json())
      .then(response => {localStorage.setItem("refresh", response.refresh)
    navigate("/")
    window.location.reload(true)})    
      .catch (error => console.log(error))
      
    })    
    .catch (error => console.log(error))
    }
    useEffect(()=>{
        if (localStorage.getItem("lng") !== null){
            strings.setLanguage(localStorage.getItem("lng"))
          }
        
      }, [])
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
                <input value={email} onChange={updateEmail} type="email" name="search-box" />
                <h2 className="subtitle">{strings.enterPassword}</h2>
                <input value={password} onChange={updatePassword} type="password" name="search-box"/>
                <h2 className="subtitle">{strings.repeatPassword}</h2>
                <input value={password2} onChange={updatePassword2} type="password" name="search-box"/>
            </form>
            <div className="item-2">
            <Link to="/login">
                <p className="subtitle mobile">{strings.alreadyHave}</p>
                </Link>
                <button disabled={disabled} onClick={signUp}>  {strings.signUp}</button>

            </div>
          </div>
        </div>
    )}

export default Register;