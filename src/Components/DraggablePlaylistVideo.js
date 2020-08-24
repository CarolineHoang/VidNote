import React from 'react';
import videojs from 'video.js';
import YoutubeVid from 'videojs-youtube';
import playlistJS from 'videojs-playlist';
import "../Styles/draggable-playlist-video-style.css"

var exampleData = {
    videoId: 'videoJSON.videoId',
    name: 'videoJSON.videoName',
    sources: [{
        src: 'videoJSON.url',
        type: 'videoJSON.type'
    }],
    poster: 'http://media.w3.org/2010/05/sintel/poster.png',
    thumbnail: [
        {
          srcset: 'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search-v2_297x176.jpg',
          type: 'image/jpeg',
          media: '(min-width: 400px;)'
        //   media: 'max-width: 40px;'
        },
        {
          src: 'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search-v2_297x176.jpg'
        }
      ]
}



export default class DraggablePlayListVideo extends React.Component {
    constructor(props){
        super(props);
        this.state= { 
        }
        this.testConsoleLog = this.testConsoleLog.bind(this)
        this.changeCurrentVideo = this.changeCurrentVideo.bind(this)
    }
  
    testConsoleLog(message){
        console.log("clicked button!") 
      }

    changeCurrentVideo(e, player, video){
        // this.props.player.playlist.currentItem(player.playlist.nextIndex())
        player.playlist.currentItem(video.videoId)
        // player.currentItem(2)
        // console.log(player, player.playlist(), video)
    }
  render() {
      var video = this.props.videoInfo
      var player = this.props.player
    return (
        <div className="videoInfoContainerInner" onClick={(e, player , video )=>this.changeCurrentVideo(e, this.props.player, this.props.videoInfo)} >
            <img  className="thumbnail" src= {video.thumbnail[0].srcset}></img>
            <div className="titleContainer">
                <div hidden={this.props.currentlyPlayingId !==  video.videoId} className="now-playing">
                    Now Playing
                </div>
                <div className="videoTitle">
                    {video.name !== null ? video.name : "Untitled Video"}
                </div>
            </div>
            
            
        </div>	
    )
  }
}