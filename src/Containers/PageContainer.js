import React from "react";
// import styled from 'styled-components';
// import { theme } from "../util/GlobalStyles";
// import './App.css';

// import '../Styles/expandingCard.css'
// import '../Styles/social-media-slider-toggles.css'
// import '../Styles/navbar.css'
import '../Styles/page-container-styles.css'

import test from '../DownloadFolder/testFile.txt'
import testVideo  from '../Assets/testVid.mp4'
import testVideo2  from './testVid.mp4'
// import testF from '../DownloadFolder/testFolder.zip'

import JSZip from 'jszip';
import FileSaver from 'file-saver';

// import videojs from 'video.js'
import VideoPlayer from "../Components/VideoPlayer.js";

import YoutubeVid from 'videojs-youtube';
import NoteContainer from "./NoteContainer";
// import 'videojs-youtube';

// import "https://vjs.zencdn.net/7.8.4/video.js";


// this is how to make a file download 
const testFile = test;
// const testFile2 = testF;
// let zip = new JSZip();
// var img = zip.folder("images");
// zip.file("idlist.txt", `PMID:29651880\r\nPMID:29303721`);
// zip.file("idlist2.txt", `PMID:29651880\r\nPMID:29303721`);
// img.file("idlist2.txt", `PMID:29651880\r\nPMID:29303721`);
// zip.generateAsync({type: "blob"}).then(function(content) {
//   FileSaver.saveAs(content, "download.zip");
// }); 
// this command will download a file right away

//react state values:
const currentNoteIndex =0;  // this is the index of the note that is currently the note that the video is on to color as the "current one"
                            // to start out, and be easy, we reset this to 0 and start the video from the start every time we change video in the playlist
const videoTime =0; //this value should update every half second and is the time that the user saves as the note time but rounded to the next second
                    //on each update, we check if the time is greater than the timestamp on the above indexed note
                    //if it's more and the index is not the max length of the note list minus 1, then we check the nextones through the list and stop at the next one before the one that is more than this number. If we get to the end, then the last one is the current note.
                    //if the note happens to have an end time  (and we cannot set this time to overlap with the next one's start time) then we make sure that the current time is less than that end time


                    
const Meta = {
    // fileNames: [],  //this will be an array in the order of the playlist
    //                 // every Youtube video will have the 
    maxVideoId: 1,
    maxNoteId:  3,
    noteData:[
        {
            videoId: 0,
            type: 'web', //  web = youtube, vimero. etc, local = files
            source: 'YouTube',
            url: '',
            fileName: null,
            notes: 
            [   
                {
                    noteId: 0,
                    startTime: 0, //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    text: "This is a test message111",
                    bookmarked: false,
                    drawn: false,
                    images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                },
                {   
                    noteId: 1,
                    startTime: 0, //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    text: "This is a test message222",
                    bookmarked: false,
                    drawn: false,
                    images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                }
            ]
            
    
        },
        {
            videoId: 1,
            type: 'local', //  web = youtube, vimero. etc, local = files
            source: null,
            url: null,
            fileName: "testVid.mp4",
            notes: 
            [   
                {
                    noteId: 2,
                    startTime: Date(), //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    text: "This is a test message1",
                    bookmarked: false,
                    drawn: false,
                    images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                },
                {   
                    noteId: 3,
                    startTime: Date(), //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    text: "This is a test message2",
                    bookmarked: false,
                    drawn: false,
                    images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                }
            ]
    
        }

    ]
    
}

let zip = new JSZip();
var Img = zip.folder("Images");
var Videos = zip.folder("Videos");
var Originals = Videos.folder("Originals");
var Drawn = Videos.folder("Drawn");
var Data= zip.folder("Data");
var MetaFiles= zip.folder("Meta");

MetaFiles.file("meta.txt", JSON.stringify(Meta)  );
// var Meta = zip.folder("meta");



// var img = zip.folder("images");
// zip.file("idlist.txt", `PMID:29651880\r\nPMID:29303721`);
// zip.file("idlist2.txt", `PMID:29651880\r\nPMID:29303721`);
// img.file("idlist2.txt", `PMID:29651880\r\nPMID:29303721`);

const downloadNotes = () =>{
    zip.generateAsync({type: "blob"}).then(function(content) {
        const filename = 'VidNotes '+Date.now()+'.zip'
        FileSaver.saveAs(content, filename);
    }); 
}

var items = [];
for (var i = 0; i < 100; i++) {
  items.push(i+'d');
}


export default class PageContainer extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            videoRef : null,
            videoInfo: {},
            newNote: '',
            newVideoLink: '',
            meta: Meta,
            info: 'asdf'
        }
        this.setVideoRef = this.setVideoRef.bind(this);
        this.getVideoRef = this.getVideoRef.bind(this);
        this.getCurrVidTime = this.getCurrVidTime.bind(this);
        this.setCurrVidTime = this.setCurrVidTime.bind(this);

        this.addNote = this.addNote.bind(this);
        // this.handleNoteInputChange = this.handleNoteInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }
    // shouldComponentUpdate(){
    //     return false
    // }
    setVideoRef(ref){
        this.setState({
            videoRef : ref
        })
    }
    getVideoRef(){
        console.log(this.state.videoRef)
    }
    getCurrVidTime(data){
        // console.log(data)
        var currentTime = this.state.videoRef.currentTime()
        console.log("bhaisdbfalifba" , currentTime)
        return currentTime
        // console.log("bhaisdbfalifba" )
    }
    setCurrVidTime(secs){
        console.log(secs )
        // this.setState
        if (this.state.videoRef != null){
            this.state.videoRef.currentTime(secs)
        }
        
        // console.log("bhaisdbfalifba" , currentTime)
        // return currentTime
        // console.log("bhaisdbfalifba" )
    }

    addNote(e){
        console.log(this.state.newNote)
    //     maxVideoId: 1,
    // maxNoteId:  3,
        // this.state
        var metaCopy = this.state.meta;
        var currentTime  = this.getCurrVidTime()
        metaCopy.noteData[0].notes.push(
            {   
                noteId: Meta.maxNoteId+1,
                startTime: currentTime, //this should not be a Date value but instead a count of miliseconds from the start of the video
                endTime: null,
                text: this.state.newNote,
                bookmarked: false,
                drawn: false,
                images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
            }
        )
        metaCopy.maxNoteId = metaCopy.maxNoteId+1;



        this.setState({
            meta: metaCopy,
            info: this.state.newNote
        }, console.log(this.state.meta) )

        // this.state.meta.noteData[0].notes.push(
        //     {   
        //         noteId: Meta.maxNoteId+1,
        //         startTime: Date(), //this should not be a Date value but instead a count of miliseconds from the start of the video
        //         endTime: null,
        //         text: this.state.newNote,
        //         bookmarked: false,
        //         drawn: false,
        //         images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
        //     }
        // )
        // Meta.maxNoteId = Meta.maxNoteId+1;

        // console.log(e.target)
    }
    // handleNoteInputChange(e){
    //     this.setState({newNote: e.target.value})
    // }

    // handlePlaylistInputChange(){

    // }

    handleInputChange(e, stateVal){
        // var eVal = e.target.value
        // in order to see the most current change in printing, you must include the print statment in the setState function and there must be in an anonymnous arrow function    >>> https://forum.freecodecamp.org/t/solved-this-setstate-is-updating-state-after-console-log/206985/2
        //if we use []around the property name, we can use ES6 computed property names >>> https://stackoverflow.com/questions/29280445/reactjs-setstate-with-a-dynamic-key-name
        this.setState({[stateVal]: e.target.value},  ()=>{console.log(`new ${stateVal} value: `, this.state[stateVal])} )

    }
      
    render() {
        const videoJsOptions = {
            autoplay: true,
            controls: true,
            //
       
                // techOrder: ['youtube'],
                // sources: [
                //   {
                //     type: 'video/youtube',
                //     src: 'https://www.youtube.com/watch?v=TeccAtqd5K8' //note that there will be a benign Youtube server side error saying that the host don't match but there is supposedly nothing to worry about this according to stack overflow: https://stackoverflow.com/questions/47833687/youtube-api-failed-to-execute-postmessage-on-domwindow
                //     // src: 'https://www.youtube.com/embed/HIbAz29L-FA?modestbranding=1&playsinline=0&showinfo=0&enablejsapi=1&origin=http://localhost:3000&widgetid=1',
                //     // enablejsapi:1,
                //     // origin:'https://www.youtube.com'
                //   }
                // ]
          }

        
          
       
        return(
            <div className="tripleColumnContainer" >
                <div className='videoPlayer' >
                    {/* <video
                        id="my-video"
                        className="video-js"
                        controls
                        preload="auto"
                        width="640"
                        height="264"
                        poster="MY_VIDEO_POSTER.jpg"
                    >
                        <source src={testVideo} type="video/mp4" />

                    </video> */}
                     {/* <div data-vjs-player>
                        <video id="example_video_1" 
                            className="video-js " 
                            controls
                            preload="auto" 
                            width="640"
                            height="264"
                            poster="http://ec2-54-227-116-247.compute-1.amazonaws.com/models/site-templates/images/cover_img/ted_cover.jpg" 
                            data-setup='{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=xjS6SftYQaQ"}] }'
                        >
                        </video>
                    </div> */}
                    {/* <VideoPlayer { ...videoJsOptions } setVidRef = {this.setVideoRef}  test = "hi" /> */}
                    <VideoPlayer { ...videoJsOptions } setVidRef = {this.setVideoRef}  test = "hi" />
                    <button onClick={this.getVideoRef}>getVideoRef</button>
                    <button onClick={this.getCurrVidTime}>Get current Video Time [PC] </button>
                    <button onClick={ () => this.setCurrVidTime(180)}>Set current Video Time to 3 min[PC] </button>
                   
                        jhvj
                    {/* </div> */}
                    {/* <video src={testVideo} autoPlay="true" /> */}


                    {/* <video id="example_video_1" 
  class="video-js vjs-default-skin" 
  controls
  preload="auto" 
  width="640"
  height="264"
  poster="http://ec2-54-227-116-247.compute-1.amazonaws.com/models/site-templates/images/cover_img/ted_cover.jpg" 
  data-setup='{"techOrder":["youtube"], "src":"http://www.youtube.com/watch?v=xYemnKEKx0c"}'></video> */}
                    
                </div>
                <div className='playList' >
                    {/* this is how to create an HTML a tag that will download a local app file*/}
                    <a href={testFile} download="testFile.txt">{testFile}Hiii</a>
                    <button onClick={downloadNotes}> Click to Download Info </button>
                    {/* <a href={testFile2} download="testFolder.zip">----Hiii2</a> */}Hi
                    {/* <textarea onChange={this.handleNoteInputChange} className='NoteInputField' ></textarea> <button onClick={this.addNote} type='submit' >Submit Note</button> */}
                    <textarea onChange={(e, note) => this.handleInputChange(e, 'newNote')} className='NoteInputField' ></textarea> <button onClick={this.addNote} type='submit' >Submit Note</button>
                    <textarea onChange={(e, note) => this.handleInputChange(e, 'newVideoLink')}  className='playlistInputField' ></textarea> <button onClick={this.addToPlaylist} type='submit' >Add to Playlist</button>
                </div>
                <div>
                    {this.state.info} 
                </div>
                    
                <div className='notes'>
                    <NoteContainer id="list" 
                    // itemList={items} 
                    itemList = {this.state.meta.noteData[0]} 

                    setCurrVidTime = {this.setCurrVidTime}
                    />
                    Hi
                </div>
                {/* {this.setCurrVidTime(180)} */}
               
            </div>
        
        );
    }
}
