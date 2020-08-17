import React from 'react';
import videojs from 'video.js';
import YoutubeVid from 'videojs-youtube';

import '../Styles/videoStyles.css'


//  const getTime = ()=>{
//     console.log(this.player , this.videoNode , this.player.currentTime())
//   }
export default class VideoPlayer extends React.Component {
    constructor(props){
        super(props);
        this.state= { currentTime: 0}
        this.getTime = this.getTime.bind(this);
        // this.testFunc = this.testFunc.bind(this);
    }
 

//   testFunc(){
//       console.log("lol")
//   }
  getTime = ()=>{
    // this.props.setVidRef(this.player)
    console.log(this.player , this.videoNode , this.player.currentTime())
    console.log("player ref from button:", this.player, "    .... end")
    // this.setState({currentTime: this.player.currentTime()})
  }
  componentDidMount(props) {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
    //   console.log('onPlayerReady', this, this.props.test)
      console.log('onPlayerReady', this)
    //   this.getTime()
    
    //   this.props.setVidRef(this.player)
    });
    // this.testFunc()
    this.props.setVidRef(this.player)
  }

   // destroy player on unmount
   componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    // this.player.destroy()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    // this.props.setVidRef(this.player)
    // console.log("player ref:", this.player)
    
    return (
      <div>	
        <div data-vjs-player>
          <video ref={ node => this.videoNode = node } className="video-js mainVideo"></video>
        </div>
        <button onClick={this.getTime}>Get Current Time:</button><span>Time:{this.state.currentTime}</span>
        {/* {this.props.setVidRef(this.player)} */}
        {/* {this.props.test} */}
      </div>
    )
  }
}