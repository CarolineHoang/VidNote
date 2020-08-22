import React from 'react';
import videojs from 'video.js';
import YoutubeVid from 'videojs-youtube';
import playlistJS from 'videojs-playlist';
import playlistUI from 'videojs-playlist-ui';
import '../Styles/videoStyles.css';

// import '../../node_modules/videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css';
// import '../../node_modules/videojs-playlist-ui/dist/videojs-playlist-ui.css';
import '../Styles/custom-playlist-styles.css'



//  const getTime = ()=>{
//     console.log(this.props.player , this.videoNode , this.props.player.currentTime())
//   }
export default class Playlist extends React.Component {
    constructor(props){
        super(props);
        this.state= { 
            playerRef : null,
            currentPlaylist : []
        }
        // this.testFunc = this.testFunc.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState){
        //originally wrote this to prevent rerender because I thought this was what kept resetting the playlist to the start
        // that is false, it was the lack of a second parameter in the componentDidUpdate this.props.player.playlist() function
        // I am still leaving this however as to make runtime more optimized, but if there is an issue, I should come back here and delete this:
        console.log("compare it2:", nextProps.playlist , this.props.playlist , nextProps.playlist.length  != this.props.playlist.length)
        return (nextProps.playlist.length  != this.props.playlist.length)
        // if (this.state.currentPlaylist != this.nextState.currentPlaylist ){
        //     console.log("Component Updating", this.state.currentPlaylist, nextState.currentPlaylist)
        //     return true
        // }
        // else{
            // return false
        // }
        
    }
    componentDidUpdate(prevProps) {
        if(prevProps.playlist  !== this.props.playlist ) {
          this.setState({currentPlaylist : this.props.playlist }, ()=> {
              console.log("The Current Playlist UPDATED:", this.props.playlist)
              this.props.player.playlist(this.props.playlist, this.props.player.playlist.currentItem()); //this second parameter must be set or the playlist will jump to start once updated (default for the second parameter [index of first video to play] is 0 )

            });
        }
      }
    componentDidMount(){
        // if (this.state.playerRef !== this.props.player || this.state.playerRef == null ){
        //     this.setState ({ playerRef : this.props.player})
        // }
        // if (this.state.currentPlaylist !== this.props.playlist ){
        //     this.setState({
        //         currentPlaylist : this.props.playlist 
        //     })
            
        // }
        console.log("hit!!")
        console.log("The Current Playlist:", this.props.playlist)

        console.log("player: ", this.props.player, this.props.test)
        if (this.props.player != undefined && this.props.player != null){

            // this.props.player.playlist([]);
            this.props.player.playlist(this.props.playlist);

            // console.log("the playlist1: " ,this.props.player.playlist())
            // var currentPlaylist =  this.props.player.playlist()
            // var currentPlaylist =  this.state.currentPlaylist
            // currentPlaylist.push( {
            //     sources: [{
            //       src: 'https://www.youtube.com/watch?v=U9DyHthJ6LA&feature=emb_rel_pause',
            //       type: 'video/youtube'
            //     }],
            //     poster: 'http://media.w3.org/2010/05/bunny/poster.png'
            //   }
            // )
            // this.props.player.playlist(currentPlaylist)
            console.log("the playlist2: " ,this.props.player.playlist())
        
            // this.props.player.playlist(currentPlaylist)
        
               
              // Play through the playlist automatically.
              this.props.player.playlist.autoadvance(0);
              this.props.player.playlistUi();
        }
        
    }
    
  

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    // this.props.setVidRef(this.props.player)
    // console.log("player ref:", this.props.player)
    // if (this.state.playerRef !== this.props.player || this.state.playerRef == null ){
    //     this.setState ({ playerRef : this.props.player})
    // }
    
    return (
      <div>	
        <div className="vjs-playlist"></div>
      </div>
    )
  }
}