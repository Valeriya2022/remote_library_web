import React from 'react'
import VideoPlayer from 'react-video-js-player';
import { Link } from "react-router-dom";
import {strings} from '../localization'


class VideoDirectory extends React.Component{
  player = {}
  state={
    videos: [],
    displayGenre: false,
    displayYear: false,
    genres: [],
    category: null,
    years: [0, 2023]
  }
    
  componentDidMount(){
    if (localStorage.getItem("lng") !== null){
      strings.setLanguage(localStorage.getItem("lng"))
    }
    
    fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/videos`, {
      method: 'GET'

    }).then( resp => resp.json())
    .then(response => this.setState({
      videos: response
    }))
    .catch (error => console.log(error))

    fetch(`http://${process.env.REACT_APP_IP_ADDRESS}:8000/video-category`, {
          method: 'GET'
    
        }).then( resp => resp.json())
        .then(response => this.setState({genres:response}))
        .catch (error => console.log(error))
    
  }
  onPlayerReady(player){
    this.player = player;
}

  render() {
    
    return(
      <div>
        <div className="book-directory flexbox">
          <div className='rating-container'>
          
          </div>
          <div className='rating-container'>
          <div className="button" onClick={()=>this.setState({displayGenre:!this.state.displayGenre})}>{strings.genre}</div>
          
            {
              this.state.displayGenre?
              <div>
                {this.state.genres.map(genre=>{
                  return <div className="button-2" onClick={()=>this.setState({category:genre.id})}>{genre.category}</div>
                })}
                <div className="button-2" onClick={()=>this.setState({category:null})}>{strings.all}</div>
          
          </div>:
          <div></div>
            }
            
          
          </div>
          <div className='rating-container' >
          <div className="button" onClick={()=>this.setState({displayYear:!this.state.displayYear})}>{strings.year}</div>
          {
              this.state.displayYear?
              <div>
          <div className="button-2" onClick={()=>this.setState({years: [2019, 2023]})}>{"2020-2022"}</div>
          <div className="button-2" onClick={()=>this.setState({years: [2014, 2020]})}>{"2015-2019"}</div>
          <div className="button-2" onClick={()=>this.setState({years: [0, 2015]})}>{"<2015"}</div>
          <div className="button-2" onClick={()=>this.setState({years: [0, 2023]})}>{strings.all}</div>
          </div>:
          <div></div>
            }
          </div>
        </div>
        <h2 className="bookHeader">{strings.videoText}</h2>
        <div className = "book-wrapper book-directory">
        {this.state.videos.map(video=>{
          let author = video.author
          let name = video.name
          let path = video.path
          if ((this.state.category=== null || this.state.category == video.video_category) && (this.state.years[0] < video.publish_date && this.state.years[1] > video.publish_date)){
          return(
            <div key={video.id} className="item">
              <Link to={`/video/${video.id}`} state={{id: video.id}}>
              <video src={path} type="video/mp4"></video>
                
                </Link>
              <div className="authorName"><h1>{author}</h1></div>
              <div className="bookTitle"><h1>{name}</h1></div>
              </div>
              
          )
          }
        })}
        
                </div>
       </div>
    )}
}

export default VideoDirectory;