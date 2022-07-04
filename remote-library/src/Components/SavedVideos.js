import React from 'react'
import { Link } from "react-router-dom";
import {strings} from '../localization'


class SavedVideos extends React.Component{
  player = {}
  state={
    videos: [],
  }
    
  componentDidMount(){
    if (localStorage.getItem("lng") !== null){
      strings.setLanguage(localStorage.getItem("lng"))
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({refresh: localStorage.getItem("refresh")})
    };
    
    fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/get-saved-videos`, requestOptions)
    .then( resp => resp.json())
    .then(response => this.setState({
      videos: response
    }))
    .catch (error => console.log(error))
    
  }
  onPlayerReady(player){
    this.player = player;
}

  render() {
    
    return(
      <div>
        <h2 className="bookHeader">{strings.videoText}</h2>
        <div className = "book-wrapper book-directory">
        {this.state.videos.map(video=>{
          let author = video.author
          let name = video.name
          let path = video.path
          return(
            <div key={video.id} className="item">
              <Link to={`/video/${video.id}`} state={{id: video.id}}>
              <video src={path} type="video/mp4"></video>
                
                </Link>
              <div className="authorName"><h1>{author}</h1></div>
              <div className="bookTitle"><h1>{name}</h1></div>
              </div>
              
          )
        })}
        
                </div>
       </div>
    )}
}

export default SavedVideos;