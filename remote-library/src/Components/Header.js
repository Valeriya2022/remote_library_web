import React, {useEffect, useState} from 'react';
import Logo from '../Images/Icons/logo.png'
import Menu from '../Images/Icons/menu.png'
import Notification from '../Images/Icons/notification.png'
import Login from '../Images/Icons/login.png'
import Logout from '../Images/Icons/logout.png'
import Theme from '../Images/Icons/theme.png'
import { Link } from "react-router-dom";
import {strings} from '../localization.js'

function Header(){
    const [menuState, setMenuState] = React.useState(false);
    const [searchState, setSearchState] = React.useState(false);
    const [lng, setLng] = React.useState("")
    const [searchValue, setSearchValue] = React.useState("");
    const [govResources, setGovResources] = useState([]);
    const [books, setBooks] = useState([]);
    const [videos, setVideos] = useState([]);
    const [relatedMaterials, setRelatedMaterials] = React.useState([]);
    useEffect(()=>{
        if (localStorage.getItem("lng") !== null){
            strings.setLanguage(localStorage.getItem("lng"))
          }
        fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/governmental-resource`, {
          method: 'GET'
    
        }).then( resp => resp.json())
        .then(response => setGovResources(response))
        .catch (error => console.log(error))

        fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/books`, {
          method: 'GET'
    
        }).then( resp => resp.json())
        .then(response => setBooks(response))
        .catch (error => console.log(error))

        fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/videos`, {
          method: 'GET'
    
        }).then( resp => resp.json())
        .then(response => setVideos(response))
        .catch (error => console.log(error))
        
      }, [])

    function searchOnline(){
        let query = searchValue;
        setSearchState(false)
        setRelatedMaterials([])
        setSearchValue("")
        alert(strings.globalSearchMessage)
        console.log("query", query)
        let category = "all"
        let loc = window.location.pathname
        console.log(loc)
        if (loc.includes("book")){
            category = "book"
        }else if (loc.includes("video")){
            category = "video"
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"data": [{"query":query,"category":category}]})
        };
        
        fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/searched-materials`, requestOptions)
        .then( resp => resp.json())
        .then(response => console.log(response))
        .catch (error => console.log(error))
    }
    
    const handleChange = (e) => {
        setSearchValue(e.target.value);
        console.log(searchValue)
        if (e.target.value.length > 2){
            displayRelatedMaterials(e.target.value)
        }else{
            setRelatedMaterials([])
        }
      };
    function displayRelatedMaterials(query){
        console.log(govResources)
        let new_rel_materials = []
        govResources.map((gov)=>{
            if (gov.source.toLowerCase().includes(query.toLowerCase())){
                new_rel_materials.push({type: "gov", id: gov.id, name: gov.source, author: ""})
            }
        })
        books.map((book)=>{
            let author_name = ""
            book.authors.map(author=>{
                author_name+= author.first_name + " "
                author_name+= author.last_name
            })
            if (book.name.toLowerCase().includes(query.toLowerCase())){
                new_rel_materials.push({type: "book", id: book.id, name: book.name, author: author_name})
            }else if (author_name.toLowerCase().includes(query.toLowerCase())){
                
                new_rel_materials.push({type: "book", id: book.id, name: book.name, author: author_name})
            }
        })
        videos.map((video)=>{
            if (video.name.toLowerCase().includes(query.toLowerCase())){
                new_rel_materials.push({type: "video", id: video.id, name: video.name, author: video.author})
            }else if (video.author.toLowerCase().includes(query.toLowerCase())){
                
                new_rel_materials.push({type: "video", id: video.id, name: video.name, author: video.author})
            }
        })
        new_rel_materials.push({type: "global", name: strings.notFound})
        setRelatedMaterials(new_rel_materials)
    }
    function reset(){
        setSearchState(false)
        setRelatedMaterials([])
        setSearchValue("")
    }
    function logout(){
        let refresh = localStorage.getItem("refresh")
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({refresh: refresh})
        };
        fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/logout`, requestOptions)
        .then( resp => resp.json())
        .then(response => {
      localStorage.removeItem("refresh")
      window.location.reload(true)})    
        .catch (error => console.log(error))
        }
    
    function changeLng(){
        if (strings.getLanguage() === "ru"){
            localStorage.setItem("lng", "kg")
            strings.setLanguage("kg")
            setLng("КЫРГ")
            window.location.reload(true)
        }else if (strings.getLanguage()==="kg"){
            localStorage.setItem("lng", "en")
            strings.setLanguage("en")
            setLng("EN")
            window.location.reload(true)
        }else if (strings.getLanguage()==="en"){
            localStorage.setItem("lng", "tj")
            strings.setLanguage("tj")
            setLng("TJ")
            window.location.reload(true)
        }
        else if (strings.getLanguage()==="tj"){
            localStorage.setItem("lng", "ru")
            strings.setLanguage("ru")
            setLng("РУС")
            window.location.reload(true)
        }
    }
    useEffect(()=>{
        let lgn_dict = {"en": "EN", "ru": "РУС", "kg": "КЫРГ", "tj": "TJ"}
        if (localStorage.getItem("lng") !== null){
            strings.setLanguage(localStorage.getItem("lng"))
            setLng(lgn_dict[localStorage.getItem("lng")])
        }
        else if (strings.getLanguage() === "ru"){
            setLng("РУС")
        }else if(strings.getLanguage() === "kg"){
            setLng("КЫРГ")
        }else if(strings.getLanguage() === "en"){
            setLng("EN")
        }
        else if(strings.getLanguage() === "tj"){
            setLng("TJ")
        }
    }, [])

 
    return(
        <React.Fragment>
            {menuState &&(
                <div>
                <div className="menu-items">
                    <Link to="/book-directory" onClick={()=>setMenuState(false)} replace={true}>
                    <h1 className="menu-item">{strings.booksText}</h1>
                    </Link>
                    <hr/>
                    <Link to="/video-directory" onClick={()=>setMenuState(false)} replace={true}>
                    <h1 className="menu-item">{strings.videoText}</h1>
                    </Link>
                    <hr/>
                    <Link to="/gov-directory" onClick={()=>setMenuState(false)} replace={true}>
                    <h1 className="menu-item">{strings.govResourcesText}</h1>
                    </Link>
                    {localStorage.getItem("refresh")?
                    <div>
                        <hr/>
                    <Link to="/saved-books" onClick={()=>setMenuState(false)} replace={true}>
                    <h1 className="menu-item">{strings.savedBooks}</h1>
                    </Link>
                    <hr/>
                    <Link to="/saved-videos" onClick={()=>setMenuState(false)} replace={true}>
                    <h1 className="menu-item">{strings.savedVideos}</h1>
                    </Link>
                    </div>
                    :
                    <div></div>
                    }

                </div>
                <div onClick={()=>setMenuState(!menuState)} className="light-cover"></div>
                </div>
            )}
            {searchState &&(
                <div>
                <div onClick={()=>setSearchState(!searchState)} className="light-cover"></div>
                </div>
            )}
        <div className = "header-wrapper">
            <div className="grid">
            <Link to="/">
            <div className="item">
                <img className="logo_img" src={Logo} alt="Logo"></img>
                </div>
                </Link>
                <div className="item">
                <Link to="/">  
                <h1 className="logo">BilimHub</h1>
                </Link>
                </div>
                <div className="item">
                <div className="header-input-web">
                    <form  onClick={()=>setSearchState(!searchState)}>
                        <input autoComplete="off" type="text" name="search-box" value = {searchValue} onChange={handleChange} placeholder={strings.searchPlaceholder}/>
                    </form>
                    <div className='searchContainer'>
                    {relatedMaterials.map(material => 
                    {
                        if (material.type === "book"){
                            return (
                            <div>
                                <Link to={"/book/" + material.id} onClick={reset}>
                                <div className="searchMaterial">{material.name} {material.author}</div>
                                </Link>
                            </div>
                                )                            
                        }
                        else if (material.type === "video"){
                            return (
                            <div>
                                <Link to={"/video/" + material.id} onClick={reset}>
                                <div className="searchMaterial">{material.name} {material.author}</div>
                                </Link>
                            </div>
                                )                            
                        }else if (material.type === "gov"){
                            return (
                            <div>
                                <Link to={"gov-resource/" + material.id} onClick={reset}>
                                <div className="searchMaterial">{material.name}</div>
                                </Link>
                            </div>
                            )
                        }else if (material.type === "global"){
                            return (
                                <div onClick={()=>{
                                    searchOnline()}}>
                                        
                                <div className="searchMaterial">{material.name}</div>
                                
                            </div>
                            )
                        }
                        
                    })
                    }
                    </div>
                </div>
                </div>
                <div className="item">
                {/* <img className="notification_img" src={Notification} alt="notification"></img> */}
                </div>
               
                
                <div className="item">
                {/* <img className="theme" src={Theme} alt="theme"></img> */}
                </div>
                <div className="item">
                    {localStorage.getItem("refresh")===null?
                        <Link to="/login">
                        <img className="login" src={Login} alt="login"></img>
                        </Link>
                        :
                        <div onClick={logout}>
                            <img className="login" src={Logout} alt="logout"></img>
                        </div>
                        

                    }
                
                </div>
                <div className="item">
                <h3 onClick={changeLng} className='language_change'>{lng}</h3>
                </div>
                <div className="item" onClick={()=>setMenuState(!menuState)}>
                <img className="menu_img" src={Menu} alt="menu"></img>
                </div>
                
            </div>
            <div className="header-input-phone"> 
                    <form  onClick={()=>setSearchState(!searchState)}>
                        <input autoComplete="off" type="text" name="search-box" value = {searchValue} onChange={handleChange} placeholder={strings.searchPlaceholder}/>
                    </form>
                <div className='searchContainer'>
                    {relatedMaterials.map(material => 
                    {
                        if (material.type === "book"){
                            return (
                            <div>
                                <Link to={"/book/" + material.id} onClick={reset}>
                                <div className="searchMaterial">{material.name} {material.author}</div>
                                </Link>
                            </div>
                                )                            
                        }
                        else if (material.type === "video"){
                            return (
                            <div>
                                <Link to={"/video/" + material.id} onClick={reset}>
                                <div className="searchMaterial">{material.name} {material.author}</div>
                                </Link>
                            </div>
                                )                            
                        }else if (material.type === "gov"){
                            return (
                            <div>
                                <Link to={"gov-resource/" + material.id} onClick={reset}>
                                <div className="searchMaterial">{material.name}</div>
                                </Link>
                            </div>
                            )
                        }else if (material.type === "global"){
                            return (
                                <div onClick={()=>{
                                    searchOnline()}}>
                                        
                                <div className="searchMaterial">{material.name}</div>
                                
                            </div>
                            )
                        }
                        
                        
                    })
                    }
                    </div>
            </div>
            
        </div>
        </React.Fragment>
    )}

export default Header;