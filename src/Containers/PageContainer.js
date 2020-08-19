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
import testVideo1  from './testVid.mp4'
import testVideo2  from './testVid.mp4'
// import testF from '../DownloadFolder/testFolder.zip'

import JSZip from 'jszip';
import FileSaver from 'file-saver';

// import videojs from 'video.js'
import VideoPlayer from "../Components/VideoPlayer.js";

import YoutubeVid from 'videojs-youtube';
import NoteContainer from "./NoteContainer";
import Playlist from "../Components/Playlist";
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
    maxVideoId: 3,
    maxNoteId:  3,
    noteData:[
        {
            videoId: 0,
            category: 'web', //  web = youtube, vimero. etc, local = files
            type: 'video/youtube',
            url: 'https://www.youtube.com/watch?v=3WQHDUYk310&feature=emb_rel_pause',
            // videoName: null,
            videoName: 'Dummy YouTube VideoName 1',
            notes: 
            [   
                {
                    noteId: 0,
                    startTime: 0, //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    text: "This is a test message111",
                    bookmarked: false,
                    created : Date.now(),
                    lastUpdated : Date.now(),
                    drawn: false,
                    images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                },
                {   
                    noteId: 1,
                    startTime: 0, //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    text: "This is a test message222",
                    bookmarked: false,
                    created : Date.now(),
                    lastUpdated : Date.now(),
                    drawn: false,
                    images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                }
            ]
            
    
        },
        {
            videoId: 1,
            category: 'web', //  web = youtube, vimero. etc, local = files
            type: 'video/youtube',
            url: 'https://www.youtube.com/watch?v=voFRslp8d60&t=17s',
            videoName: null,
            // videoName: 'Dummy YouTube VideoName 2',
            notes: 
            [   
                {
                    noteId: 0,
                    startTime: 0, //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    text: "This is a test message333",
                    bookmarked: false,
                    created : Date.now(),
                    lastUpdated : Date.now(),
                    drawn: false,
                    images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                },
                {   
                    noteId: 1,
                    startTime: 0, //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    text: "This is a test message444",
                    bookmarked: false,
                    created : Date.now(),
                    lastUpdated : Date.now(),
                    drawn: false,
                    images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                }
            ]
            
    
        },
        {
            videoId: 2,
            category: 'local', //  web = youtube, vimero. etc, local = files
            type: 'video/mp4',
            url: testVideo2,
            videoName: "testVid.mp4",
            notes: 
            [   
                {
                    noteId: 2,
                    startTime: 0, //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    text: "This is a test message444",
                    bookmarked: false,
                    created : Date.now(),
                    lastUpdated : Date.now(),
                    drawn: false,
                    images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                },
                {   
                    noteId: 3,
                    startTime: 0, //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    text: "This is a test message555",
                    bookmarked: false,
                    created : Date.now(),
                    lastUpdated : Date.now(),
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
            info: 'asdf',
            uploadedVideos: [],
            currPlayingVid : {},
            currPlayingVidId : 0
            // current
        }
        this.setVideoRef = this.setVideoRef.bind(this);
        this.getVideoRef = this.getVideoRef.bind(this);
        this.getCurrVidTime = this.getCurrVidTime.bind(this);
        this.setCurrVidTime = this.setCurrVidTime.bind(this);

        this.addNote = this.addNote.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.addToPlaylist = this.addToPlaylist.bind(this);
        // this.handleNoteInputChange = this.handleNoteInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

    }
    // shouldComponentUpdate(){
    //     return false
    // }
    setVideoRef(ref){
        console.log("setting the ref")
        // ref.on('playlistchange', function() {
        //     // ref.playlist();
        //     console.log("The playlist has changed!")
          
        // });
        ref.on('playlistitem', ()=> {
            // ref.playlist();
            console.log("Playing next video!", ref.playlist()[ref.playlist.currentIndex()])
            var currIndex = ref.playlist.currentIndex()
            this.setState({
                // currPlayingVid : ref.playlist()[ref.playlist.currentIndex()],
                currPlayingVid : ref.playlist()[currIndex],
                currPlayingVidId : currIndex
            },
            ()=> {console.log("hiiii", this.state.currPlayingVid)}
            )
          
        });
        // playlistitem
        this.setState({
            videoRef : ref
        }
        // , 
        // ()=>{
        //     ref.on('playlistchange', function() {
        //         // ref.playlist();
        //         console.log("The playlist has changed!")
              
        //     });
        // }
        )
    }
    getVideoRef(){
        console.log(this.state.videoRef)
        return this.state.videoRef
    }
    getCurrVidTime(data){
        // console.log(data)
        var currentTime = this.state.videoRef.currentTime()
        console.log("bhaisdbfalifba" , currentTime)
        console.log("Current Video Info" , this.state.currPlayingVid)
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
        // metaCopy.noteData[0].notes.push(
        metaCopy.noteData[this.state.currPlayingVidId].notes.push(
            {   
                noteId: Meta.maxNoteId+1,
                startTime: currentTime, //this should not be a Date value but instead a count of miliseconds from the start of the video
                endTime: null,
                text: this.state.newNote,
                bookmarked: false,
                created : Date.now(),
                lastUpdated : Date.now(),
                drawn: false,
                images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
            }
        )
        metaCopy.maxNoteId = metaCopy.maxNoteId+1;



        this.setState({
            meta: metaCopy,
            newNote: '',
            info: this.state.newNote
        }, ()=>{console.log(this.state.meta)} )

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


// {
//             videoId: 0,
//             category: 'web', //  web = youtube, vimero. etc, local = files
//             type: 'video/youtube',
//             url: 'https://www.youtube.com/watch?v=3WQHDUYk310&feature=emb_rel_pause',
//             fileName: null,
//             notes: 
//             [   
//                 {
//                     noteId: 0,
//                     startTime: 0, //this should not be a Date value but instead a count of miliseconds from the start of the video
//                     endTime: null,
//                     text: "This is a test message111",
//                     bookmarked: false,
//                     drawn: false,
//                     images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
//                 },
//                 {   
//                     noteId: 1,
//                     startTime: 0, //this should not be a Date value but instead a count of miliseconds from the start of the video
//                     endTime: null,
//                     text: "This is a test message222",
//                     bookmarked: false,
//                     drawn: false,
//                     images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
//                 }
//             ]
            
    
//         },

    addToPlaylist(e, category, fileTarget ){


        // let fileName = e.target.value.split('\\').pop();

        //   console.log('fileName :', fileName, e.target.value)
        //   var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
        
        //   console.log('fileName :', fileName, e.target.value, ext)

        console.log("ADD TO PLAYLIST: " ,category ,this.state.newVideoLink)

        var type = ''
        var src = ''
        var vidName = ''
        if (category == 'web'){
            type = 'video/youtube'
            src = this.state.newVideoLink
            vidName = src

        }
        else if (category == 'local'){
            let fileName = e.target.value.split('\\').pop();
            var ext = e.target.value.substr(e.target.value.lastIndexOf('.') + 1);
            type = 'video/'+ext
            // src = this.state.newVideoLink

            src = URL.createObjectURL(e.target.files[0])
            console.log("LOCAL vars: ", type,src)
            vidName = fileName

            // src = e.target.files[0]
        }
    
        // else if (category == 'local'){
        //     // let fileName = fileTarget.value.split('\\').pop();
        //     var ext = fileTarget.value.substr(fileTarget.value.lastIndexOf('.') + 1);
        //     type = 'video/'+ext
        //     src = this.state.newVideoLink

        //     // src = URL.createObjectURL(fileTarget.files[0])
        //     console.log("LOCAL vars: ", type,src)

        //     // src = e.target.files[0]
        // }
        console.log(this.state.newNote)
        //     maxVideoId: 1,
        // maxNoteId:  3,
            // this.state
            var metaCopy = this.state.meta;
            var currentTime  = this.getCurrVidTime()
            metaCopy.noteData.push(
                {
                    videoId: parseInt(metaCopy.videoId)+1,
                    category: category, //  web = youtube, vimero. etc, local = files
                    type: type,
                    url: src,
                    videoName: vidName,
                    notes: []
                }

                // {
                //     videoId: parseInt(metaCopy.videoId)+1,
                //     category: 'web', //  web = youtube, vimero. etc, local = files
                //     type: 'video/youtube',
                //     url: this.state.newVideoLink,
                //     fileName: null,
                //     notes: []
                // }

                // {   
                //     noteId: Meta.maxNoteId+1,
                //     startTime: currentTime, //this should not be a Date value but instead a count of miliseconds from the start of the video
                //     endTime: null,
                //     text: this.state.newNote,
                //     bookmarked: false,
                //     drawn: false,
                //     images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                // }
            )
            metaCopy.videoId = parseInt(metaCopy.videoId)+1;
    
    
    
            this.setState({
                meta: metaCopy,
                newVideoLink : ''
            }, ()=>{console.log(this.state.meta)} )

            

        console.log("video added: ", this.state.newVideoLink )
        // this.setState({
        //     newVideoLink : ''
        // } )
        

        //figure out if it's a youtube video or proper url
        //if it is a proper url, add it to the Meta playlist
        //make sure that all the video source info is included by using the youtube api to get the info
        //make sure that trickles down to the individual playlist that we see (make sure it's inhertiing from state)

    }
    // handleNoteInputChange(e){
    //     this.setState({newNote: e.target.value})
    // }

    // handlePlaylistInputChange(){

    // }
    
    uploadFile(e){
        console.log("heeeeeelllllooo")
        console.log("UPLOADING:", e.target.value, typeof e.target.value)
        if (e.target.value !== ""){ //if a file is uploaded and user did not cancel
          // Extract file name from path
          let fileName = e.target.value.split('\\').pop();

          console.log('fileName :', fileName, e.target.value)
          var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
        
          console.log('fileName :', fileName, e.target.value, ext)

          let rowNum = e.target.id.split('-').pop();
          
          // Get row num from end of id to select this row's label to for filename
        //   let labelTxt = document.querySelector(`[for="uploader-${rowNum}"] > .filePreview`);
        //   labelTxt.innerHTML = fileName;
          // Get track data for processing
          let arrayBuffer = e.target.files[0].arrayBuffer();

        this.addToPlaylist(e , 'local' , e.target )
        //   var currentVideos = this.state.uploadedVideos
        //   currentVideos.push(e.target.files[0])
        //   this.setState({ uploadedVideos: currentVideos }, this.addToPlaylist(e , 'local' , e.target ))

          
        //   console.log(e.target.files)

        //   URL.createObjectURL(uploadedFiles[0])
          
        //   let ctx = this.$store.state.mixer.master.ctx;
        //   let vue = this;
          
          // decode array buffer
        //   arrayBuffer.then(function(buffer) {
        //     ctx.decodeAudioData(buffer, function(decodedData) {
        //       // add sound to store
        //       vue.$store.dispatch('addSound', {
        //         index: rowNum,
        //         sound: decodedData,
        //         fileName: fileName
        //       });
        //     });
        //   });
        }
    }

    handleInputChange(e, stateVal){
        // var eVal = e.target.value
        // in order to see the most current change in printing, you must include the print statment in the setState function and there must be in an anonymnous arrow function    >>> https://forum.freecodecamp.org/t/solved-this-setstate-is-updating-state-after-console-log/206985/2
        //if we use []around the property name, we can use ES6 computed property names >>> https://stackoverflow.com/questions/29280445/reactjs-setstate-with-a-dynamic-key-name
        this.setState({[stateVal]: e.target.value},  ()=>{console.log(`new ${stateVal} value: `, this.state[stateVal])} )

    }
    // generateUrlForPrint
      
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
          
        var playlistJSON = [];
        this.state.meta.noteData.forEach((videoJSON) => {
                // if (videoJSON.category === 'web'){
                    console.log("web index: ", i)
                    playlistJSON.push({
                        name: videoJSON.videoName,
                        sources: [{
                            src: videoJSON.url,
                            type: videoJSON.type
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
                        //   thumbnail: [
                        //     {
                        //       srcset: 'test/example/oceans.jpg',
                        //       type: 'image/jpeg',
                        //       media: '(min-width: 400px;)'
                        //     },
                        //     {
                        //       src: 'test/example/oceans-low.jpg'
                        //     }
                        //   ]
                          
                          
                    
                    })
                // }
                // else if (videoJSON.category === 'local')
            }
        )
       

        // playlistJSON  = this.state.meta.noteData.reduce((videoJSON, i) => {
        //     if (videoJSON.category === 'web'){
        //         console.log("web index: ", i)
        //         return({
  
        //             sources: [{
        //                 src: videoJSON.url,
        //                 type: videoJSON.type
        //             }],
        //             poster: 'http://media.w3.org/2010/05/sintel/poster.png'
                
                
        //         })
        //     }
           
              
        // })

        console.log("playlistJSON:", playlistJSON)
        // this.state.meta.noteData.forEach( videoJSON , i){
        //     if (videoJSON.category === 'web'){
        //         playlistJSON.push({
  
        //             sources: [{
        //                 src: videoJSON.url,
        //                 type: videoJSON.type
        //             }],
        //             poster: 'http://media.w3.org/2010/05/sintel/poster.png'
                
                
        //         })
        //     }
           
        // };
        //   const playlistJSON = [{
        //     // sources: [{
        //     //   src: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
        //     //   type: 'video/mp4'
        //     // }],
        //     sources: [{
        //         src: 'https://www.youtube.com/watch?v=3WQHDUYk310&feature=emb_rel_pause',
        //         type: 'video/youtube'
        //     }],
        //     poster: 'http://media.w3.org/2010/05/sintel/poster.png' //this is the image that shows while it loads I think
        //   }, 
        //   {
            
        //     sources: [{
        //         src: 'https://www.youtube.com/watch?v=voFRslp8d60&t=17s',
        //         type: 'video/youtube'
        //     }],
        //     poster: 'http://media.w3.org/2010/05/sintel/poster.png'
        //   }]
        
          
       
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

                    {/* by including the state variable as a value for the input/textarea field, we make sure it clears out if we set the state variable to be empty because then on the rerender, it repopulates as a empty */}
                    <textarea onChange={(e, note) => this.handleInputChange(e, 'newNote')} className='NoteInputField' value={this.state.newNote} ></textarea> <button onClick={this.addNote} type='submit' >Submit Note</button>
                    <input onChange={(e, note) => this.handleInputChange(e, 'newVideoLink')}  className='playlistInputField' value={this.state.newVideoLink}  ></input> <button onClick={(e , type) => this.addToPlaylist(e , 'web')} type='submit' >Add to Playlist</button>
                
                    {/* using && conditional logic makes sure that the parent has the ref before we try to render the playlist because the playlist doesn't seem to rerender when the videoRef is updated */}
                    {/* alternatively, all the starting playlist info can be set up in the video player component but I want to make the playlist div diffinitively in charge of everything relating playlists */}
                    {this.state.videoRef !== null && this.state.videoRef !== undefined  && <Playlist key={this.state.meta} player={this.state.videoRef} playlist={playlistJSON} test= 'this should APPEAR' />}

                    {/* <input onChange='upload' type='file' accept='.wav, audio/wav'> */}
                    <input  onChange={(e , type) => this.addToPlaylist(e , 'local')}  type='file' accept='.mp4, video/mp4'></input>

                </div>
                {/* <div>
                    {this.state.info} 
                </div> */}
                    
                <div className='notes'>
                    <div>HIII{this.state.currPlayingVid != {} && console.log('current video: ',this.state.currPlayingVid, this.state.currPlayingVid.sources)}</div>

                    {/* Wait until the currPlayingVid has been set to a non-empty name value to show a name and show it as long as it's not null. If it is null, substitute the 'Untitled Video' for null */}
                    {/* <div className="noteSectionVideoTitle">{this.state.currPlayingVid != {} && (this.state.currPlayingVid.name != null ? this.state.currPlayingVid.name : 'Untitled Video') }</div>
                    <div className="noteSectionVideoTitle">{this.state.currPlayingVid != {} &&  this.state.currPlayingVid.sources != undefined && (this.state.currPlayingVid.sources[0].type != 'video/mp4' ? this.state.currPlayingVid.sources[0].src : 'Local File') }</div> */}
                    <NoteContainer id="list" 
                    // itemList={items} 
                    // itemList = {this.state.meta.noteData[0]} 
                    itemList = {this.state.meta.noteData[this.state.currPlayingVidId]} 
                    

                    setCurrVidTime = {this.setCurrVidTime}
                    />

                    Hi
                    <form>
                        <input type='button' name='print' value="Print Page" onClick={()=>{window.print()}}/>
                    </form>

                </div>
                {/* {this.setCurrVidTime(180)} */}
               
            </div>
        
        );
    }
}
