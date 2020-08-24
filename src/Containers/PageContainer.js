import React from "react";
// import styled from 'styled-components';
// import { theme } from "../util/GlobalStyles";
// import './App.css';

// import '../Styles/expandingCard.css'
// import '../Styles/social-media-slider-toggles.css'
// import '../Styles/navbar.css'
import '../Styles/page-container-styles.css'

import test from '../DownloadFolder/testFile.txt'
            // import testVideo  from '../Assets/testVid.mp4'
            // import testVideo1  from './testVid.mp4'
import testVideo2  from './testVid.mp4'
// import testF from '../DownloadFolder/testFolder.zip'

import JSZip from 'jszip';
import FileSaver from 'file-saver';

// import videojs from 'video.js'
import VideoPlayer from "../Components/VideoPlayer.js";

            // import YoutubeVid from 'videojs-youtube';
import NoteContainer from "./NoteContainer";
import DraggablePlaylistContainer from "./DraggablePlaylistContainer";
import Playlist from "../Components/Playlist";
import DraggableList from "../Components/DraggableList";
import DraggablePlayList from "../Components/DraggablePlaylist";
// import 'videojs-youtube';

// const https = require('https');
// const request = require('request');

                // const testGet=()=>{
                //     // https.get('/repos/:owner/:repo/actions/secrets', (resp) => {
                //     https.get('/VidNote/:CarolineHoang/:VidNote/actions/secrets', (resp) => {
                //         let data = '';
                    
                //         // A chunk of data has been recieved.
                //         resp.on('data', (chunk) => {
                //           data += chunk;
                //         });
                    
                //         // The whole response has been received. Print out the result.
                //         resp.on('end', () => {
                //         //   console.log(JSON.parse(data).explanation);
                //           console.log(data);
                //         });
                    
                //       }).on("error", (err) => {
                //         console.log("Error: " + err.message);
                //       });
                // }


// import "https://vjs.zencdn.net/7.8.4/video.js";


const testFile = test;


                // //react state values:
                // const currentNoteIndex =0;  // this is the index of the note that is currently the note that the video is on to color as the "current one"
                //                             // to start out, and be easy, we reset this to 0 and start the video from the start every time we change video in the playlist
                // const videoTime =0; //this value should update every half second and is the time that the user saves as the note time but rounded to the next second
                //                     //on each update, we check if the time is greater than the timestamp on the above indexed note
                //                     //if it's more and the index is not the max length of the note list minus 1, then we check the nextones through the list and stop at the next one before the one that is more than this number. If we get to the end, then the last one is the current note.
                //                     //if the note happens to have an end time  (and we cannot set this time to overlap with the next one's start time) then we make sure that the current time is less than that end time
                
                    
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
            ytVidId : '3WQHDUYk310',
            fileObj : null,
            bookmarkTotal: 0,
            notes: 
            [   
                {
                    noteId: 0,
                    startTime: 0, //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    noteTitle: null,
                    text: "This is a test message111",
                    bookmarked: false,
                    created : Date.now(),
                    lastUpdated : Date.now(),
                    drawn: false,
                    images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                },
                {   
                    noteId: 1,
                    startTime: 1, //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    noteTitle: null,
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
            ytVidId : 'voFRslp8d60',
            fileObj : null,
            bookmarkTotal: 0,
            // videoName: 'Dummy YouTube VideoName 2',
            notes: 
            [   
                {
                    noteId: 0,
                    startTime: 0, //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    noteTitle: null,
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
                    noteTitle: null,
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
            ytVidId : null,
            fileObj : null,
            bookmarkTotal: 0,
            notes: 
            [   
                {
                    noteId: 2,
                    startTime: 0, //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    noteTitle: null,
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
                    noteTitle: null,
                    text: "This is a test message555",
                    bookmarked: false,
                    created : Date.now(),
                    lastUpdated : Date.now(),
                    drawn: false,
                    images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                }
            ]
    
        }

    ],
    settings : {
        warnings: false,
        reverse_shift_enter_submit: false,
        show_undo: false
    }
    
}

const ACCEPTED_FILE_EXTENSIONS = {
        "txt" : { type: 'text', valid : true },

        "jpg" : { type: 'image', valid : true },

        "mp4" :  { type: 'video', valid : true }

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






const getFileExtenstion = (fileName) => {
    return fileName.substr(fileName.lastIndexOf('.') + 1); 
    // var ext = e.target.value.substr(e.target.value.lastIndexOf('.') + 1);
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
            backupMeta : null,
            info: 'asdf',
            uploadedVideos: [],
            currPlayingVid : {},
            currPlayingVidId : 0,
            fileContents: 'blah blah'
            // current
        }
        this.setVideoRef = this.setVideoRef.bind(this);
        this.getVideoRef = this.getVideoRef.bind(this);
        this.getCurrVidTime = this.getCurrVidTime.bind(this);
        this.setCurrVidTime = this.setCurrVidTime.bind(this);

        this.addNote = this.addNote.bind(this);
        this.changeNote = this.changeNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.deleteVideo = this.deleteVideo.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.acceptSpecialSymbol = this.acceptSpecialSymbol.bind(this);
        this.findMostRecentNoteIdx =this.findMostRecentNoteIdx.bind(this)
        this.findNewNoteIdx = this.findNewNoteIdx.bind(this)
        this.recursiveBinarySearch = this.recursiveBinarySearch.bind(this)
        this.YouTubeGetID = this.YouTubeGetID.bind(this);
        this.loadProject = this.loadProject.bind(this);
        this.downloadProject = this.downloadProject.bind(this);
        this.loadBackupProject = this.loadBackupProject.bind(this);


        this.testConsoleLog = this.testConsoleLog.bind(this)
        this.printPlayer = this.printPlayer.bind(this)

    }
    setVideoRef(ref){
        console.log("setting the ref")
        // ref.on('playlistchange', function() {
        //     // ref.playlist();
        //     console.log("The playlist has changed!")
        // debugger

          
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
        var metaCopy = this.state.meta;
        var currentTime  = this.getCurrVidTime()
        var notesArr = this.state.meta.noteData[this.state.currPlayingVidId].notes
        // if arrLength
        var arrLength = notesArr.length
        var index = 0
        if (arrLength  > 0){
            index = this.findNewNoteIdx(currentTime, notesArr, arrLength)
        }
        
        console.log("currentNoteIndex: ", index)
        // metaCopy.noteData[0].notes.push(
        metaCopy.noteData[this.state.currPlayingVidId].notes.splice(index+1, 0, 
            {   
                noteId: metaCopy.maxNoteId+1,

                startTime: currentTime, //this should not be a Date value but instead a count of miliseconds from the start of the video
                endTime: null,
                noteTitle: null,
                text: this.state.newNote,
                bookmarked: false,
                created : Date.now(),
                lastUpdated : Date.now(),
                drawn: false,
                images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
            }
            
            
        );
        metaCopy.maxNoteId = metaCopy.maxNoteId+1;



        this.setState({
            meta: metaCopy,
            newNote: '',
            info: this.state.newNote
        }, ()=>{console.log(this.state.meta)} )


    }
    changeNote(noteInfo, newdata , noteIdx, dataToUpdate, videoId ){
        console.log(noteInfo, newdata, videoId )


                var metaCopy = this.state.meta;

                console.log('videoId: ', videoId , 'noteIdx: ', noteIdx, metaCopy.noteData[videoId].notes[noteIdx], metaCopy.noteData[videoId].notes[noteIdx][dataToUpdate] , newdata)
                metaCopy.noteData[videoId].notes[noteIdx][dataToUpdate] = newdata
                metaCopy.noteData[videoId].notes[noteIdx].lastUpdated = Date.now()
                // metaCopy.noteData[0].notes.push(
                // metaCopy.noteData[videoId].notes[noteInfo.noteId] = {   
                //     noteId:         noteInfo.noteId,
                //     startTime:      noteInfo.startTime, //this should not be a Date value but instead a count of miliseconds from the start of the video
                //     endTime:        noteInfo.endTime,
                //     noteTitle:      noteInfo.noteTitle,
                //     text:           newdata,
                //     bookmarked:     noteInfo.bookmarked,
                //     created:        noteInfo.created,
                //     lastUpdated:    Date.now(),
                //     drawn:          noteInfo.drawn,
                //     images:         noteInfo.images //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                // }
                // // debugger;



                this.setState({
                    meta: metaCopy,
                }, ()=>{console.log(this.state.meta)} )


        
    } 
    deleteNote( noteIdx,  videoId ){
        console.log(`deleting note: ${noteIdx} ....`, noteIdx, "    video:" ,  videoId )



                var metaCopy = this.state.meta;

                // console.log('videoId: ', videoId , 'noteIdx: ', noteIdx, metaCopy.noteData[videoId].notes[noteIdx], metaCopy.noteData[videoId].notes[noteIdx][dataToUpdate] , newdata)
                metaCopy.noteData[videoId].notes.splice(noteIdx, 1);
       



                this.setState({
                    meta: metaCopy,
                }, ()=>{console.log(this.state.meta)} )


        
    }
    deleteVideo(  e, videoId ){
        console.log('deleting video: ' ,  videoId )



                var metaCopy = this.state.meta;

                // console.log('videoId: ', videoId , 'noteIdx: ', noteIdx, metaCopy.noteData[videoId].notes[noteIdx], metaCopy.noteData[videoId].notes[noteIdx][dataToUpdate] , newdata)
                var found  = false
                var idx =0
                while (!found && idx < metaCopy.noteData.length){
                    if (metaCopy.noteData[idx].videoId == videoId){
                        metaCopy.noteData.splice(idx, 1);
                        found = true;
                    }
                    idx+=1
                }
                
                console.log('new deleted meta: ' , metaCopy  )



                this.setState({
                    meta: metaCopy,
                }, ()=>{console.log(this.state.meta)} )
    }




    addToPlaylist(e, category, fileTarget ){
        // let fileName = e.target.value.split('\\').pop();

        //   console.log('fileName :', fileName, e.target.value)
        //   var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
        
        //   console.log('fileName :', fileName, e.target.value, ext)

        console.log("ADD TO PLAYLIST: " ,category ,this.state.newVideoLink)

        var type = ''
        var src = ''
        var vidName = ''
        var ytVidId = null
        var fileObj = null
        if (category === 'web'){
            type = 'video/youtube'
            src = this.state.newVideoLink
            ytVidId  =  this.YouTubeGetID(src)
            vidName = src

        }
        else if (category === 'local'){
            let fileName = e.target.value.split('\\').pop();
            // var ext = e.target.value.substr(e.target.value.lastIndexOf('.') + 1);
            var ext = getFileExtenstion(e.target.value)
            type = 'video/'+ext
            fileObj = e.target.files[0]
            // src = this.state.newVideoLink
            src = URL.createObjectURL(e.target.files[0])
            console.log("LOCAL vars: ", type,src)
            vidName = fileName
        }
        console.log(this.state.newNote)
            var metaCopy = this.state.meta;
            // var currentTime  = this.getCurrVidTime()
            metaCopy.noteData.push(
                {
                    videoId: parseInt(metaCopy.maxVideoId)+1,
                    category: category, //  web = youtube, vimero. etc, local = files
                    type: type,
                    url: src,
                    videoName: vidName,
                    ytVidId : ytVidId,
                    fileObj : fileObj,
                    bookmarkTotal: 0,
                    notes: []
                }
            )
            console.log("meta before1: ", this.state.meta , metaCopy.maxVideoId)
            metaCopy.maxVideoId = parseInt(metaCopy.maxVideoId)+1;
            console.log("meta before2: ", this.state.meta , metaCopy.maxVideoId)

            this.setState({
                meta: metaCopy,
                newVideoLink : ''
            }, ()=>{console.log( "meta after: ",  this.state.meta)} )

        console.log("video added: ", this.state.newVideoLink )

        //figure out if it's a youtube video or proper url
        //if it is a proper url, add it to the Meta playlist
        //make sure that all the video source info is included by using the youtube api to get the info
        //make sure that trickles down to the individual playlist that we see (make sure it's inhertiing from state)

    }

    
    uploadFile(e){
        console.log("UPLOADING:", e.target.value, typeof e.target.value)
        if (e.target.value !== ""){ //if a file is uploaded and user did not cancel
          // Extract file name from path
          let fileName = e.target.value.split('\\').pop();

          console.log('fileName :', fileName, e.target.value)
          //   var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
          var ext = getFileExtenstion(fileName)
        
          console.log('fileName :', fileName, e.target.value, ext)

        //   let rowNum = e.target.id.split('-').pop();
        //   let arrayBuffer = e.target.files[0].arrayBuffer();

        this.addToPlaylist(e , 'local' , e.target )
        }
    }

    handleInputChange(e, stateVal){
        // var eVal = e.target.value
        // in order to see the most current change in printing, you must include the print statment in the setState function and there must be in an anonymnous arrow function    >>> https://forum.freecodecamp.org/t/solved-this-setstate-is-updating-state-after-console-log/206985/2
        //if we use []around the property name, we can use ES6 computed property names >>> https://stackoverflow.com/questions/29280445/reactjs-setstate-with-a-dynamic-key-name
        this.setState({[stateVal]: e.target.value},  ()=>{console.log(`new ${stateVal} value: `, this.state[stateVal])} )

    }
    // generateUrlForPrint

    acceptSpecialSymbol(e, stateVal ){

        if (e.keyCode === 9){
            e.preventDefault(); //prevent tab from focusing the next dom object

        // this.setState({[stateVal]: e.target.value},  ()=>{console.log(`new ${stateVal} value: `, this.state[stateVal])} )
            this.setState({[stateVal]: this.state[stateVal]+ String.fromCharCode(9)},  ()=>{console.log(`new ${stateVal} value: `, this.state[stateVal])} )

            
        }

    }

    findMostRecentNoteIdx(){
        var currentTime = this.props.getCurrVidTime()
        var idx=0;
        var notesArr = this.state.meta.noteData[this.state.currPlayingVidId].notes
        if (notesArr.length === 0){
            return -1 //error: there are no notes
        }
        if (notesArr.length === 1){
            return 0
        }
        while (idx < notesArr.length){
            console.log("time comparisons: ", notesArr[idx].startTime,  currentTime)

            if(notesArr.length > 1 && idx < notesArr.length-1 ){
                console.log("time comparisons: ", notesArr[idx].startTime,  currentTime)
                if ( notesArr[idx].startTime <= currentTime && notesArr[idx+1].startTime > currentTime ){
                    return idx
                }
            }
            idx+=1
        }
        return notesArr.length-1
    }
    findNewNoteIdx(ct, arr, arrLength, videoId){//binary search is probably the best bet here but we will start with linear
        var currentTime = ct
        // var notesArr = this.state.meta.noteData[this.state.currPlayingVidId].notes
        var notesArr = arr
        if (arrLength=== 0){
            return -2 //error: there are no notes
        }
        if (arrLength === 1){
            if (notesArr[0].startTime < currentTime){
                return 0
            }
            else{
                return -1 //the program adds 1 to the value so this will add the note at index 0
            }
        }
        return this.recursiveBinarySearch(notesArr, currentTime, 0, arrLength-1, arrLength)

    }


    recursiveBinarySearch(arr, target,  start, end , arrLength) { 
    
        // Base Condition 
        if (start > end){ return end
            // if  (Math.abs(arr[start].startTime-target)<Math.abs(arr[end].startTime-target)) {
            //     return start
            // }
            // else{
            //     return end
            // }
        }; 
        
        // Find the middle index 
        let mid=Math.floor((start + end)/2); 
    
        // Compare mid with given key x 
        if( mid < arrLength-1 ){
            if ( arr[mid].startTime <= target && arr[mid+1].startTime > target ){
                return mid
            }
        }
        else if ( mid === arrLength-1 ){
            if ( arr[mid].startTime >= target  ){
                return mid
            }
        }
        // if (arr[mid]===comparator) return true; 
            
        // If element at mid is greater than x, 
        // search in the left half of mid 
        if(arr[mid].startTime > target)  {
            return this.recursiveBinarySearch(arr, target, start, mid-1, arrLength); 
        } 
        else{
            // If element at mid is smaller than x, 
            // search in the right half of mid 
            return this.recursiveBinarySearch(arr, target, mid+1, end, arrLength); 
        }
    
            
            
    } 
  

    YouTubeGetID(url){
        url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        // return undefined !== url[2]?url[2].split(/[^0-9a-z_\-]/i)[0]:url[0];
        return undefined !== url[2]?url[2].split(/[^0-9a-z_-]/i)[0]:url[0]; //remove the escape because React suggested that it's unnecessary
    }

    loadProject(e, val ){
        // return zip.files[filename].async('blob').then(function (fileData) {
        //     return new File([fileData], filename);
        // })
        // Object.keys(contents.files).forEach(function(filename) {
        //     zip.file(filename).async('nodebuffer').then(function(content) {
        //         var dest = path + filename;
        //         fs.writeFileSync(dest, content);
        //     });

        var fileArr = e.target.files;

        // Object.keys(e.target.files).forEach(function(filename) {
        //     zip.file(filename).async('nodebuffer').then(function(content) {
        //         var dest = path + filename;
        //         fs.writeFileSync(dest, content);
        //     });
        // })
        var i =0 ;
        var metaIdx = 0;
        while(i<fileArr.length){
            console.log("uploaded file: " , e.target.files[i].name )
            var fileName = e.target.files[i].name
            var ext = getFileExtenstion(fileName)
            var fileStatus = ACCEPTED_FILE_EXTENSIONS[ext]
            if (fileStatus !== undefined && fileStatus.valid ){
                // console.log("accepted file type: " , fileName )
                switch (fileStatus.type){
                    case 'video':
                        break;
                    case 'image':
                        break;
                    case 'text':
                        if (fileName === 'meta.txt'){
                            metaIdx= i
                        }
                        break;
                    default:
                        break;
                }
            }
            i+=1
        }
        //more reference material: ['https://www.geeksforgeeks.org/how-to-read-a-local-text-file-using-javascript/','https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText','https://developer.mozilla.org/en-US/docs/Web/API/Blob/text']
        /*Step 1:   trigger a file read with an onChange event on the input div you use to upload the files
                    the files from all the folders will be decentralized and kind of floating in an array.
                    choose the index of the file you want to read fron withibn the files property of your event.target 
                    that object is actually of type blob (at least when I console.logged it's typeof, it was)
                    It's also called a File when inspecting                                                                   */
        var fileObj = e.target.files[metaIdx] //note that there are going to be files in there like .DS_Store that you don't want 
                                        //this file happens to be the meta data

        /*  to confirm the identity of a file, you can log it's 'name' property 
            Other info you can glean (here is a real example of ```e.target.files[0]``` logged): 
                    {name: ".DS_Store", lastModified: 1597600999440, lastModifiedDate: Sun Aug 16 2020 14:03:19 GMT-0400 (Eastern Daylight Time), webkitRelativePath: "VidNotes 1597600971230/.DS_Store", size: 6148, …}  */


        var src = URL.createObjectURL(e.target.files[0]) //if you do this, the output is a string that may be used as a link
        // console.log ("PROJECT UPLOAD: ", e.target.files , fileObj, typeof fileObj, src, typeof src, e.target.files[1].name )
        

        //Step 2:   generate the FileReader object (here named fr)
        var fr=new FileReader();
       
        /*Step 3:   attach onload or onloadend eventlisteners to the new reader
                    These should fire when they detect that the file contents are done load ing and ready for viewing/accessing
                    Note: .on() events like this wont work:                                                                         */
                            // fr.on('loadend', ()=> {
                            //     this.setState({
                            //         // currPlayingVid : ref.playlist()[ref.playlist.currentIndex()],
                            //         fileContents: fr.result
                            //     },
                            //     ()=> {
                            //             console.log("hiiii", this.state.currPlayingVid)
                            //             fr.readAsText(fileObj);
                            //         }
                            //     )
        fr.onloadend=()=>{  
            var result = fr.result
            var resultJSON = JSON.parse(fr.result)
            this.setState({
                backupMeta: this.state.meta, 
                meta : resultJSON,
                fileContents: result,    //Step 4:   set up actions to take with fr.result
                                            //          When the event listener fires, fr.result is poopulated with the text from the file it was read from
                                            //          my React.js appreach to rendering this would be to set it to state and have the state variable referenced in the JSX
            },
            ()=> {
                    console.log("hiiii", this.state.fileContents)
                }
            )
        } 
        fr.readAsText(fileObj);  //Step 5   after establishing the listener, tell it to read the file we picked earlier
    }
    loadBackupProject(e, val ){
        this.setState({
            backupMeta: this.state.meta, 
            meta : this.state.backupMeta,
        })
    }
    downloadProject(gdrive = false){


        let zip = new JSZip();
        var Img = zip.folder("Images");
        var Videos = zip.folder("Videos");
        var Originals = Videos.folder("Originals");
        var Drawn = Videos.folder("Drawn");
        var Data= zip.folder("Data");
        var MetaFiles= zip.folder("Meta");

        MetaFiles.file("meta.txt", JSON.stringify(this.state.meta)  );
     
        zip.generateAsync({type: "blob"}).then(function(content) {
            const filename = 'VidNotes '+Date.now()+'.zip'
            if (gdrive){
                // return URL.createObjectURL(content)
                // var folderId = '0BwwA4oUTeiV1TGRPeTVjaWRDY1E';
                // var fileMetadata = {
                // 'name': 'photo.jpg',
                // parents: [folderId]
                // };
                // var media = {
                // mimeType: 'application/zip',
                // body: fs.createReadStream('files/photo.zip')
                // };
                // drive.files.create({
                // resource: fileMetadata,
                // media: media,
                // fields: 'id'
                // }, function (err, file) {
                // if (err) {
                //     // Handle error
                //     console.error(err);
                // } else {
                //     console.log('File Id: ', file.id);
                // }
                // });
            }
            else{
                FileSaver.saveAs(content, filename);
            }
        }); 
    }
    // gdriveSave(gdrive = false){
    //     //need Drive API to do this: https://developers.google.com/drive/api/v3/quickstart/nodejs


    //     // let zip = new JSZip();
    //     // var Img = zip.folder("Images");
    //     // var Videos = zip.folder("Videos");
    //     // var Originals = Videos.folder("Originals");
    //     // var Drawn = Videos.folder("Drawn");
    //     // var Data= zip.folder("Data");
    //     // var MetaFiles= zip.folder("Meta");

    //     // MetaFiles.file("meta.txt", JSON.stringify(this.state.meta)  );
     
    //     // zip.generateAsync({type: "blob"}).then(function(content) {
    //     //     const filename = 'VidNotes '+Date.now()+'.zip'
    //         // if (gdrive){
    //             // return URL.createObjectURL(content)
    //             var fileMetadata = {
    //                 'name': 'Invoices',
    //                 'mimeType': 'application/vnd.google-apps.folder'
    //             };
    //             drive.files.create({
    //             resource: fileMetadata,
    //             fields: 'id'
    //             }, function (err, file) {
    //             if (err) {
    //                 // Handle error
    //                 console.error(err);
    //             } else {
    //                 console.log('Folder Id: ', file.id);
    //             }
    //             });

    //             var folderId = '0BwwA4oUTeiV1TGRPeTVjaWRDY1E';
    //             var fileMetadata = {
    //             'name': 'photo.jpg',
    //             parents: [folderId]
    //             };
    //             var media = {
    //             mimeType: 'application/zip',
    //             body: fs.createReadStream('files/photo.zip')
    //             };
    //             drive.files.create({
    //             resource: fileMetadata,
    //             media: media,
    //             fields: 'id'
    //             }, function (err, file) {
    //             if (err) {
    //                 // Handle error
    //                 console.error(err);
    //             } else {
    //                 console.log('File Id: ', file.id);
    //             }
    //             });
    //         // }
    //     //     else{
    //     //         FileSaver.saveAs(content, filename);
    //     //     }
    //     // }); 
    // }

    testConsoleLog(message){
        console.log("clicked button!") 
    }
    printPlayer(){
        console.log(this.state.videoRef)
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
          
        var playlistJSON = [];
        this.state.meta.noteData.forEach((videoJSON) => {
                // if (videoJSON.category === 'web'){
                    playlistJSON.push({
                        videoId: videoJSON.videoId,
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
            }
        )
       

       
        // console.log("playlistJSON:", playlistJSON, process.env.REACT_APP_TEST_ENV_VAR)
    
        
        
       
        return(
            <div className="tripleColumnContainer" >
                <div className='videoPlayer' >
                    {/* using && conditional logic makes sure that the parent has the ref before we try to render the playlist because the playlist doesn't seem to rerender when the videoRef is updated */}
                    {/* alternatively, all the starting playlist info can be set up in the video player component but I want to make the playlist div diffinitively in charge of everything relating playlists */}
                
                    {/* {this.state.videoRef !== null && this.state.videoRef !== undefined  && <Playlist key={this.state.meta} player={this.state.videoRef} playlist={playlistJSON} test= 'this should APPEAR' />}
                    {this.state.videoRef !== null && this.state.videoRef !== undefined  && <DraggablePlayList key={this.state.meta} player={this.state.videoRef} playlist={playlistJSON} test= 'this should APPEAR' />} */}
                    {/* {this.state.videoRef !== null && this.state.videoRef !== undefined  && <Playlist player={this.state.videoRef} playlist={playlistJSON} test= 'this should APPEAR' />} */}

                    {/* {this.state.videoRef !== null && this.state.videoRef !== undefined && {playlistJSON}!== undefined && <DraggablePlayList player={this.state.videoRef} playlist={playlistJSON} test= 'this should APPEAR' currentlyPlayingId = {this.state.currPlayingVidId} deleteVideo={this.deleteVideo}/>} */}
                    {this.state.videoRef !== null && this.state.videoRef !== undefined && {playlistJSON}!== undefined && <DraggablePlaylistContainer player={this.state.videoRef} playlist={playlistJSON} test= 'this should APPEAR' currentlyPlayingId = {this.state.currPlayingVidId} deleteVideo={this.deleteVideo}/> }
                    <div className="playListInputContainer">
                        <input onChange={(e, note) => this.handleInputChange(e, 'newVideoLink')}  className='playlistInputField' value={this.state.newVideoLink}  placeholder= "video url..."></input> 
                        <button className="playlistButton" onClick={(e , type) => this.addToPlaylist(e , 'web')} type='submit' >Add to Playlist</button>
                    </div>
                    {/* <div onClick={this.printPlayer}>print Player</div> */}

                    {/* <button onClick={this.testConsoleLog}> Hellot </button>  */}
                    
                    
                    {/* <DraggablePlayList/> */}

                

                    <VideoPlayer { ...videoJsOptions } setVidRef = {this.setVideoRef}  test = "hi" />
                                        {/* <button onClick={this.getVideoRef}>getVideoRef</button>
                                        <button onClick={this.getCurrVidTime}>Get current Video Time [PC] </button>
                                        <button onClick={ () => this.setCurrVidTime(180)}>Set current Video Time to 3 min[PC] </button> */}
                </div>
                <div className='playList' >
                    {/* this is how to create an HTML a tag that will download a local app file*/}
                    {/* <a href={testFile} download="testFile.txt">{testFile}Hiii</a> */}
                    {/* <button onClick={downloadNotes}>Download Default Info </button> */}
                    <button onClick={this.downloadProject}>Download Info </button>
                    <button onClick={this.loadBackupProject}>Revert to Last Project</button>
                    {/* by including the state variable as a value for the input/textarea field, we make sure it clears out if we set the state variable to be empty because then on the rerender, it repopulates as a empty */}
                    <textarea onChange={(e, note) => this.handleInputChange(e, 'newNote')} onKeyDown={ (e, state) => this.acceptSpecialSymbol(e, 'newNote')} className='NoteInputField' value={this.state.newNote} ></textarea> <button onClick={this.addNote} type='submit' >Submit Note</button>

                    {/* <input onChange={(e, note) => this.handleInputChange(e, 'newVideoLink')}  className='playlistInputField' value={this.state.newVideoLink}  ></input>  */}




                    <button onClick={(e , type) => this.addToPlaylist(e , 'web')} type='submit' >Add to Playlist</button>
                
                    
                    {/* <input onChange='upload' type='file' accept='.wav, audio/wav'> */}
                    {/* <input  onChange={(e , type) => this.addToPlaylist(e , 'local')}  type='file' accept='.mp4, video/mp4'></input> */}
                    <input  onChange={(e , type) => this.addToPlaylist(e , 'local')}  type='file' accept='.mp4, video/mp4'></input>

                    {/* <div>Field Import:<input directory="" webkitdirectory="" mozdirectory="" type="file" /></div> */}
                    <div>Field Import:<input onChange={(e , type) => this.loadProject(e , 'local')} directory="" webkitdirectory="" mozdirectory="" type="file" /></div>
                    {/* for some reason, it does accept any file type other than directories if I choose webkitdirectory="" but it works if I only put directory  and moz directory*/}
                    {/* allowdir is something I found here: 'https://stackoverflow.com/questions/42633306/how-to-allow-the-user-to-pick-any-file-or-directory-in-an-input-type-file-ta'    But, I don't think it's needed, actually. */}
                    {/* <div>Field Import:<input onChange={(e , type) => this.loadProject(e , 'local')} type="file"  accept=".zip" directory=""/></div> */}
                    {/* <div>Field Import:<input onChange={(e , type) => this.loadProject(e , 'local')} type="file"  accept=".zip" directory="" mozdirectory="" allowdirs="" /></div> */}
                    <div    className="g-savetodrive"
                            data-src={testVideo2}
                            data-filename="My Statement.mp4"
                            data-sitename="My Company Name">
                    </div>
                                    {/* <div>Test Env String: {process.env.REACT_APP_TEST_ENV_VAR}|||{process.env.REACT_APP_TEST}</div> */}

                    {/* <div>Test Env String: %REACT_APP_TEST_ENV_VAR%</div> */}
                    {/* <div    class="g-savetodrive"
                            data-src={this.downloadProject(true)}
                            data-filename="myProject"
                            data-sitename="My Company Name">
                    </div> */}

                                    {/* <button onClick={testGet}>Test Get</button> */}

                    <pre className="testerPre" >{this.state.fileContents}</pre>

                    {/* 
                        React as of version 16 STILL has not fully accounte4d for directory imports.
                        One person (bheptinh --- commented on Dec 18, 2018 ) from this github issue has revealed that it works for them if they add empty strings to the properties, however. 
                        Source: https://github.com/facebook/react/issues/3468#issuecomment-448336672 
                    */}
                    {/* <input type="file" webkitdirectory mozdirectory /> */}





                    {/* <DraggableList/> */}
                    {/* <DraggablePlayList/> */}

                </div>
                {/* <div>
                    {this.state.info} 
                </div> */}
                    
                <div className='notes'>
                    <div>HIII{this.state.currPlayingVid !== {} && console.log('current video: ',this.state.currPlayingVid, this.state.currPlayingVid.sources)}</div>

                    {/* Wait until the currPlayingVid has been set to a non-empty name value to show a name and show it as long as it's not null. If it is null, substitute the 'Untitled Video' for null */}
                    {/* <div className="noteSectionVideoTitle">{this.state.currPlayingVid != {} && (this.state.currPlayingVid.name != null ? this.state.currPlayingVid.name : 'Untitled Video') }</div>
                    <div className="noteSectionVideoTitle">{this.state.currPlayingVid != {} &&  this.state.currPlayingVid.sources != undefined && (this.state.currPlayingVid.sources[0].type != 'video/mp4' ? this.state.currPlayingVid.sources[0].src : 'Local File') }</div> */}
                    <NoteContainer id="list" 
                    // itemList={items} 
                    // itemList = {this.state.meta.noteData[0]} 
                    itemList = {this.state.meta.noteData[this.state.currPlayingVidId]} 
                    

                    setCurrVidTime = {this.setCurrVidTime}
                    getCurrVidTime = {this.getCurrVidTime}
                    changeNote = {this.changeNote}
                    deleteNote= {this.deleteNote}
                    />

                    <form>
                        <input type='button' name='print' value="Print Page" onClick={()=>{window.print()}}/>
                    </form>

                </div>
                {/* {this.setCurrVidTime(180)} */}
               
            </div>
        
        );
    }
}
