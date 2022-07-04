import React from 'react'
import VideoPlayer from 'react-video-js-player';
import { Link } from "react-router-dom";
import {strings} from '../localization'


class VideosDetails extends React.Component{
    constructor(props) {
        super(props);
        
      }
  player = {}
  state={
    video: {},
    path: "",
    author: "",
    name: "",
    upload_date: "",
    views: "",
    source: "",
    saved: false

  }
  
    
  componentDidMount(){
    if (localStorage.getItem("lng") !== null){
      strings.setLanguage(localStorage.getItem("lng"))
    }
    console.log(window.location.pathname)
    let id = window.location.pathname.split("/")
    fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/videos/${id[2]}`, {
      method: 'GET'

    }).then( resp => resp.json())
    .then(response => {
        console.log(response)
        let author = response.author
        let name = response.name
        let path = response.path
        let upload_date = response.upload_date_time
        let date_time = upload_date.split('T')
        let time = date_time[1].split(".")[0]
        let date = date_time[0]
        this.setState({
            video: response,
            author: author,
            name: name,
            path: path,
            upload_date: date + " " + time,
            views: response.views_counter,
            source: response.source
        }
    )
    })
    .catch (error => console.log(error))
    if (localStorage.getItem("refresh")!==null){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"video_id": parseInt(id[2]), "refresh": localStorage.getItem("refresh")})
    };
    
    fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/verify-saved-video`, requestOptions)
    .then( resp => resp.json())
    .then(response => {
      console.log(response)
      if (response.saved === 1){
        this.setState({saved:true});
      }else{
        this.setState({saved:false});
      }
    })    
    .catch (error => console.log(error))
    }
    
  }
  saveBook(){
    let id = window.location.pathname.split("/")
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({"video_id": parseInt(id[2]), "refresh": localStorage.getItem("refresh")})
  };
  
  fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/save-video`, requestOptions)
  .then( resp => resp.json())
  .then(response => {
    console.log(response)
    window.location.reload(true)
  })    
  .catch (error => console.log(error))
  }


  render() {
    return(
      <div>
        <h2 className="bookHeader">{strings.videoText}</h2>
        <div className = "video-detail-wrapper">
        
            <div key={this.state.video.id} className="item">
                <video controls  disablepictureinpicture='false' src={this.state.path} type="video/mp4">
                {/* controlsList='nodownload' */}
                </video>
              <div className="video-info"><h1>{this.state.name}</h1></div>
              <div className="video-info"><h1>{this.state.views} {strings.viwsText}</h1></div>
              <div className="video-info"><h1>{strings.uploadDateText} {this.state.upload_date}</h1></div>
              <div className="video-info"><h1>{strings.sourceText}: {this.state.source}</h1></div>
              <div className="book-buttons">
              {/* <Link to={this.state.path + "?dl=1"} target="_blank" download><div className="button">{strings.downloadText}</div></Link> */}
                    
              {
                      this.state.saved?
                      <div className="button save">{strings.savedText}</div>
                      :
                      <div className="button save" onClick={this.saveBook}>{strings.saveText}</div>
                    }
                </div>
              </div>
        
                </div>
       </div>
    )}
}

export default VideosDetails;