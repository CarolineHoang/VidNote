import React from 'react';
import videojs from 'video.js';
import YoutubeVid from 'videojs-youtube';
import playlistJS from 'videojs-playlist';
import playlistUI from 'videojs-playlist-ui';
import '../Styles/draggable-playlist-container-styles.css';



// Code for the addition of custom buttons to the video control bar are adaped from Gino's CodePen: 'Videojs - Playlist 5.16.0'
// It can be found here: https://codepen.io/onigetoc/pen/wJRyvZ   
// I changed it to be more modular and executable from a method.      
// I found it under this issue on GitHub: https://github.com/videojs/video.js/issues/3473#issuecomment-291667994






// import '../../node_modules/videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css';
import DraggablePlayList from '../Components/DraggablePlaylist';


//  const getTime = ()=>{
//     console.log(this.player , this.videoNode , this.player.currentTime())
//   }
export default class DraggablePlaylistContainer extends React.Component {
    constructor(props){
        super(props);
        this.state= { 
            open: true
        }
        this.togglePlaylistVisibility = this.togglePlaylistVisibility.bind(this)

        // this.testFunc = this.testFunc.bind(this);
    }
    togglePlaylistVisibility(){
        this.setState({open: !this.state.open})
    }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    // this.props.setVidRef(this.player)
    // console.log("player ref:", this.player)

    console.log("player3: ", this.player)
    
    return (
    //   <div className={`playlistContainerMaster ${!this.state.open ? ' closed ' : ' open '}`}>	
      <div className={`playlistContainerMaster ${!this.state.open ? ' open ':' closed '}`}>	
        <div className="playlistBar" onClick={this.togglePlaylistVisibility} > Playlist </div>
        
        {/* <div hidden={!this.state.open} className="playlistBarBlock" > </div> */}

        {/* <div  className="playlistBarBlock" > </div> */}

        {/* <DraggablePlayList /> */}
        <DraggablePlayList player={this.props.player} playlist={this.props.playlist} test= {this.props.test} currentlyPlayingId = {this.props.currentlyPlayingId} deleteVideo={this.props.deleteVideo} currentTime={this.props.currentTime}/>
      </div>
    )
  }
}