import React from 'react';
import videojs from 'video.js';
import YoutubeVid from 'videojs-youtube';
import playlistJS from 'videojs-playlist';
import playlistUI from 'videojs-playlist-ui';
import '../Styles/videoStyles.css';


// Code for the addition of custom buttons to the video control bar are adaped from Gino's CodePen: 'Videojs - Playlist 5.16.0'
// It can be found here: https://codepen.io/onigetoc/pen/wJRyvZ   
// I changed it to be more modular and executable from a method.      
// I found it under this issue on GitHub: https://github.com/videojs/video.js/issues/3473#issuecomment-291667994






// import '../../node_modules/videojs-playlist-ui/dist/videojs-playlist-ui.vertical.css';
import Playlist from './Playlist';


//  const getTime = ()=>{
//     console.log(this.player , this.videoNode , this.player.currentTime())
//   }
export default class VideoPlayer extends React.Component {
    constructor(props){
        super(props);
        this.state= { 
            currentTime: 0,
            videoRef : null
        }
        this.getTime = this.getTime.bind(this);
        this.generateControlButton = this.generateControlButton.bind(this)

        // this.testFunc = this.testFunc.bind(this);
    }
 

//   testFunc(){
//       console.log("lol")
//   }
shouldComponentUpdate(){
    return false
}
  getTime = ()=>{
    // this.props.setVidRef(this.player)
    console.log(this.player , this.videoNode , this.player.currentTime())
    console.log("player ref from button:", this.player, "    .... end")
    this.setState({currentTime: this.player.currentTime()})
  }
//   getCurrentTime = ()=>{
//     // this.props.setVidRef(this.player)
//     console.log(this.player , this.videoNode , this.player.currentTime())
//     console.log("player ref from button:", this.player, "    .... end")
//     this.setState({currentTime: this.player.currentTime()})
//   }
  componentDidMount(props) {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
    //   console.log('onPlayerReady', this, this.props.test)
      console.log('onPlayerReady', this)
    //   this.getTime()
    
    //   this.props.setVidRef(this.player)

  
    });

    //create a player variable that can be referenced in the button generators
    var playerObj = this.player

    // ADDING CUSTOM BUTTONS TO THE CONTROL BAR (credits at top):
    // parameters: playerObj, buttonName, buttonClass, controlText , barPositionIndex
    /* ADD PREVIOUS */
    this.generateControlButton(playerObj, 'previous', 'PrevButton', 'icon-angle-left', "Previous", 0 )
    /* ADD NEXT */
    this.generateControlButton(playerObj, 'next', 'NextButton', 'icon-angle-right', "Next" , 2)
    //
        // var Button = videojs.getComponent('Button');
        // var PrevButton = videojs.extend(Button, {
        //     //constructor: function(player, options) {
        //     constructor: function() {
        //     Button.apply(this, arguments);
        //     //this.addClass('vjs-chapters-button');
        //     this.addClass('icon-angle-left');
        //     this.controlText("Previous");
        //     },
        
        //     handleClick: function() {
        //     // console.log('click', playerObj,  this.player.playlist());
        //     console.log('click', playerObj);
        //     // this.player.playlist.previous();
        //     playerObj.playlist.previous();
        //     }
        // });
        // videojs.registerComponent('PrevButton', PrevButton);
        // this.player.getChild('controlBar').addChild('PrevButton', {}, 0);

    //
        // var NextButton = videojs.extend(Button, {
        // //constructor: function(player, options) {
        // constructor: function() {
        //     Button.apply(this, arguments);
        //     //this.addClass('vjs-chapters-button');
        //     this.addClass('icon-angle-right');
        //     this.controlText("Next");
        // },
        
        //     handleClick: function() {
        //     // console.log('click', playerObj,  this.player.playlist());
        //     console.log('click', playerObj);
        //     // this.player.playlist.previous();
        //     playerObj.playlist.next();
        //     }
        // });
        // videojs.registerComponent('NextButton', NextButton);
        // this.player.getChild('controlBar').addChild('NextButton', {}, 2);


                            //
                                // // this.testFunc()
                                // this.player.playlist([{
                                //     // sources: [{
                                //     //   src: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
                                //     //   type: 'video/mp4'
                                //     // }],
                                //     sources: [{
                                //         src: 'https://www.youtube.com/watch?v=3WQHDUYk310&feature=emb_rel_pause',
                                //         type: 'video/youtube'
                                //     }],
                                //     poster: 'http://media.w3.org/2010/05/sintel/poster.png' //this is the image that shows while it loads I think
                                // }, 
                                // {
                                    
                                //     sources: [{
                                //         src: 'https://www.youtube.com/watch?v=voFRslp8d60&t=17s',
                                //         type: 'video/youtube'
                                //     }],
                                //     poster: 'http://media.w3.org/2010/05/sintel/poster.png'
                                // }, 
                                // //   {
                                // //     sources: [{
                                // //       src: 'https://www.youtube.com/watch?v=U9DyHthJ6LA&feature=emb_rel_pause',
                                // //       type: 'video/youtube'
                                // //     }],
                                // //     poster: 'http://media.w3.org/2010/05/bunny/poster.png'
                                // //   }, 
                                // ]);
                                // console.log("the playlist1: " ,this.player.playlist())
                                // var currentPlaylist =  this.player.playlist()
                                // currentPlaylist.push( {
                                //     sources: [{
                                //     src: 'https://www.youtube.com/watch?v=U9DyHthJ6LA&feature=emb_rel_pause',
                                //     type: 'video/youtube'
                                //     }],
                                //     poster: 'http://media.w3.org/2010/05/bunny/poster.png'
                                // }
                                // )
                                // this.player.playlist(currentPlaylist)
                                // console.log("the playlist2: " ,this.player.playlist())

                                // // this.player.playlist(currentPlaylist)

                                
                                // // Play through the playlist automatically.
                                // this.player.playlist.autoadvance(0);
                                // this.player.playlistUi();
    // this.setState({videoRef: this.player }, ())
    this.props.setVidRef(this.player)
    console.log("player2: ", this.player)
  }

   // destroy player on unmount
   componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    // this.player.destroy()
    }
  }
  generateControlButton(playerObj, actionFunction, buttonName, buttonClass, controlText , position){
    
    var Button = videojs.getComponent('Button');
    // Extend default control button
    var newButton = videojs.extend(Button, {
        constructor: function() {
        Button.apply(this, arguments);
        this.addClass(buttonClass);
        this.controlText(controlText);
        },
    
        handleClick: function() {
            // console.log('click', playerObj,  this.player.playlist());
            console.log('click', playerObj);
            // change the video
            playerObj.playlist[actionFunction]();
        }
    });
    // Register the new component
    videojs.registerComponent(buttonName, newButton);
    this.player.getChild('controlBar').addChild(buttonName, {}, position);
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    // this.props.setVidRef(this.player)
    // console.log("player ref:", this.player)

    console.log("player3: ", this.player)
    
    return (
      <div>	
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js mainVideo"></video>
        </div>
        {/* <div class="vjs-playlist"></div> */}
        {/* <Playlist player={this.player} test= 'this should APPEAR' /> */}
        {/* <button onClick={this.getTime}>Get Current Time:</button><span>Time:{this.state.currentTime}</span> */}
        {/* {this.props.setVidRef(this.player)} */}
        {/* {this.props.test} */}
      </div>
    )
  }
}