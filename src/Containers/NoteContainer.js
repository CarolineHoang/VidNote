// Scrolling view functionality is inspired and based off of CodePen:
// Name: 'React: scrollIntoView'
// Pen Owner: 'Hirokazu Takatama'




import React from "react";

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
import Note from "../Components/Note";
// import 'videojs-youtube';

// import "https://vjs.zencdn.net/7.8.4/video.js";


// this is how to make a file download 
const testFile = test;
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
                    text: "This is a test message111",
                    bookmarked: false,
                    drawn: false,
                    images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                },
                {   
                    noteId: 1,
                    startTime: Date(), //this should not be a Date value but instead a count of miliseconds from the start of the video
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
                    text: "This is a test message3",
                    bookmarked: false,
                    drawn: false,
                    images: [] //this is an array of image refrences to include in this note, including if the video screen is drawn on// might separate later
                },
                {   
                    noteId: 3,
                    startTime: Date(), //this should not be a Date value but instead a count of miliseconds from the start of the video
                    endTime: null,
                    text: "This is a test message4",
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

// var items = [];
// for (var i = 0; i < 100; i++) {
//   items.push(i+'d');
// }

export default class NoteContainer extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            index: 0,
            currentNoteId: 0

            // notes:
        }
        this.handleShow = this.handleShow.bind(this);
        this.findMostRecentNoteIdx =this.findMostRecentNoteIdx.bind(this)
 
    }

    findMostRecentNoteIdx(){
        var currentTime = this.props.getCurrVidTime()
        var idx=0;
        var notesArr = this.props.itemList.notes
        if (notesArr.length == 0){
            return -1 //error: there are no notes
        }
        if (notesArr.length == 1){
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
    handleShow(command, i) {
        if (command == "current"){
           var mRIdx = this.findMostRecentNoteIdx()
           if (mRIdx>0){
                this.refs[mRIdx].scrollIntoView({block: 'center', behavior: 'smooth'});
                console.log('mRIdx: ', mRIdx)
                this.setState({index: mRIdx})
           }
        }
        else{
            console.log(this.refs, i)
            console.log(this.refs[toString(i)])
            // this.setState({index: i});
            
            // this.refs[i].scrollIntoView({block: 'end', behavior: 'smooth'});
            // console.log(this.refs[i].)
            // this.refs[i].attributes.push("centerListItem")
            console.log('the refs: ', this.refs, this.refs[1] )
            this.refs[i].scrollIntoView({block: 'center', behavior: 'smooth'});

            this.setState({index: i})
        }
      }

      
    render() {
      
        // props = this.props

        // (itemss) = this.props
        // let { id, itemss } =  this.props;
        // console.log("ITEMMMMS", itemss)
        // console.log("ITEMMMMS2", this.props)
        var notes = this.props.itemList.notes
        console.log("ITEMMMMS", notes)
        // var videoLink = this.props.itemList.category == 'web' ? 
        //                         <a className="noteSectionVideoTitle" src={this.props.itemList.url} >{this.props.itemList.url}</a>      : <div className="noteSectionVideoTitle">Uploaded File</div>
        // var videoLink = this.props.itemList.category == 'web' ? this.props.itemList.url     : <div className="noteSectionVideoTitle">Uploaded File</div>
        return(
                <div>
                    {/* <div className="noteSectionVideoTitle">{this.state.currPlayingVid != {} && (this.state.currPlayingVid.name != null ? this.state.currPlayingVid.name : 'Untitled Video') }</div> */}
                    <div className="noteSectionVideoTitle">{this.props.itemList.videoName != null ? this.props.itemList.videoName : 'Untitled Video'}</div>
                    {/* <div className="noteSectionVideoTitle">{this.props.itemList.category == 'web' ? this.props.itemList.url: 'Uploaded File'}</div> */}
                    {this.props.itemList.category == 'web' ? <div className="noteSectionVideoLink">Watch Now: <a href={this.props.itemList.url}>{this.props.itemList.url}</a></div>  : <div className="noteSectionVideoLink">Uploaded File</div>}
                    {this.state.index}
                    {/* this must be a arrow function in order to bind the this so that we can use state in the map function  */}
                  <ul>{notes.map((item, i) => {
                    //   if (i == this.state.index){}
                      if (i == this.state.index){
                        return (
                            // <li ref={i} className='centerListItem' >{item.text}</li>
                            // <Note _ref={i} item={item} additionalClasses='centerListItem' ></Note>
                            // <pre ref={i} className='ListItem centerListItem' >{item.text}<br/>{item.startTime}</pre>
                            <div ref={i}>
                                <Note _ref={i} note={item} additionalClasses='centerListItem' setCurrVidTime = {this.props.setCurrVidTime } changeNote = {this.props.changeNote } videoId = {this.props.itemList.videoId} videoCategory = {this.props.itemList.category} url = {this.props.itemList.url} ytVidId = {this.props.itemList.ytVidId}  getCurrVidTime = {this.props.getCurrVidTime}></Note>
                                {/* <pre className='ListItem centerListItem' >{item.text}<br/>{item.startTime}</pre> */}
                            </div>
                        )
                      }
                      else{
                        return (
                            // <li ref={i}>{item.text}</li>
                            // <Note _ref={i} item={item} ></Note>
                            // <pre ref={i} className='ListItem' >{item.text}<br/>{item.startTime}</pre>
                            <div ref={i}>
                                <Note _ref={i} note={item} additionalClasses='' setCurrVidTime = {this.props.setCurrVidTime }  changeNote = {this.props.changeNote } videoId = {this.props.itemList.videoId}  videoCategory = {this.props.itemList.category}  url = {this.props.itemList.url}  ytVidId = {this.props.itemList.ytVidId} getCurrVidTime = {this.props.getCurrVidTime}></Note>
                                {/* <pre className='ListItem' >{item.text}<br/>{item.startTime}</pre> */}
                            </div>


                          )
                      }
                      
                    })}
                  </ul>
                  <button onClick={this.handleShow.bind(this, "", 0)}>0</button>
                  <button onClick={this.handleShow.bind(this, "", 2)}>2</button>
                  <button onClick={this.handleShow.bind(this, "", 50)}>50</button>
                  <button onClick={this.handleShow.bind(this, "", 99)}>99</button>
                  <button onClick={this.handleShow.bind(this, "current", 0  )}>Current Note</button>

                  {this.state.index}
                </div>
        
        );
    }
}
