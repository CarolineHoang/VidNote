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
// import testF from '../DownloadFolder/testFolder.zip'

import JSZip from 'jszip';
import FileSaver from 'file-saver';

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
                    startTime: Date(), //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    text: "This is a test message1",
                    bookmarked: false,
                    drawn: false,
                    images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                },
                {   
                    noteId: 1,
                    startTime: Date(), //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    text: "This is a test message2",
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



export default class PageContainer extends React.Component{
    
    render() {
       
        return(
            <div className="tripleColumnContainer" >
                <div className='videoPlayer' >
                
                    {/* <video src={testVideo} autoPlay="true" /> */}
                    <video
                        id="my-video"
                        class="video-js"
                        controls
                        preload="auto"
                        width="640"
                        height="264"
                        poster="MY_VIDEO_POSTER.jpg"

                        data-setup='{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "https://www.youtube.com/watch?v=xjS6SftYQaQ"}] }'
                        // data-setup="{}"
                    >
                        {/* <source src="MY_VIDEO.mp4" type="video/mp4" />
                        <source src="MY_VIDEO.webm" type="video/webm" /> */}
                        {/* <source src="../Assets/testVid.mp4" type="video/mp4" /> */}


                        <source src={testVideo} type="video/mp4" />

                        {/* <source src="../Assets/testVid.mov" type="video/webm" /> */}
                        <p class="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a
                        web browser that
                        <a href="https://videojs.com/html5-video-support/" target="_blank"
                            >supports HTML5 video</a
                        >
                        </p>
                    </video>
                    
                </div>
                <div className='playList' >
                    {/* this is how to create an HTML a tag that will download a local app file*/}
                    <a href={testFile} download="testFile.txt">{testFile}Hiii</a>
                    <button onClick={downloadNotes}> Click to Download Info </button>
                    {/* <a href={testFile2} download="testFolder.zip">----Hiii2</a> */}Hi</div>
                <div className='notes'>Hi</div>
               
            </div>
        
        );
    }
}
