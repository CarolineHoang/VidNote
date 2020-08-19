// Scrolling view functionality is inspired and based off of CodePen:
// Name: 'React: scrollIntoView'
// Pen Owner: 'Hirokazu Takatama'




import React from "react";

import '../Styles/page-container-styles.css'

import test from '../DownloadFolder/testFile.txt'
// import testVideo  from '../Assets/testVid.mp4'
// import testVideo2  from './testVid.mp4'
// import testF from '../DownloadFolder/testFolder.zip'

import JSZip from 'jszip';
import FileSaver from 'file-saver';

// import videojs from 'video.js'
import VideoPlayer from "../Components/VideoPlayer.js";

import YoutubeVid from 'videojs-youtube';
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

var items = [];
for (var i = 0; i < 100; i++) {
  items.push(i+'d');
}

export default class Note extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            editing: false,
            textarea_disabled: true,
            textareaValue: this.props.note.text,
            noteSectionVideoId : this.props.videoId
            
            // index: 0
        }
        // this.handleShow = this.handleShow.bind(this);
        this.handleToggleState = this.handleToggleState.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentDidUpdate(nextProps){
        if (nextProps.videoId != this.props.videoId){
            this.setState({textarea_disabled: true})
            console.log("updating...")
        }
        else{
            console.log("not updating...")
        }
    }
    // componentDidMount(){

    // }
    handleShow(i) {
        console.log(this.refs, i)
        console.log(this.refs[toString(i)])
        // this.setState({index: i});
        
        // this.refs[i].scrollIntoView({block: 'end', behavior: 'smooth'});
        // console.log(this.refs[i].)
        // this.refs[i].attributes.push("centerListItem")
        this.refs[i].scrollIntoView({block: 'center', behavior: 'smooth'});

        this.setState({index: i})
      }

    handleToggleState(e, state){
        this.setState(
            {
            [state]: !this.state[state]
            }, 
            ()=>{
                console.log("Toggling "+state, this.state[state])
            }
        )
    }
    handleSave(){
        // this.props.changeNote("changing note")
        this.setState({textarea_disabled: true},  ()=>{
            console.log(`textarea_disabled: `, this.state.textarea_disabled)
            this.props.changeNote(this.props.note, this.state.textareaValue , this.props.videoId )

        } )
        // this.setState({
        //     textarea_disabled: true
        // })
    }
    handleInputChange(e, stateVal){
        // var eVal = e.target.value
        // in order to see the most current change in printing, you must include the print statment in the setState function and there must be in an anonymnous arrow function    >>> https://forum.freecodecamp.org/t/solved-this-setstate-is-updating-state-after-console-log/206985/2
        //if we use []around the property name, we can use ES6 computed property names >>> https://stackoverflow.com/questions/29280445/reactjs-setstate-with-a-dynamic-key-name
        this.setState({[stateVal]: e.target.value},  ()=>{console.log(`new ${stateVal} value: `, this.state[stateVal])} )

    }
      
    render() {
        var noteInfo = this.props.note
        var ts = Math.round((noteInfo.startTime + Number.EPSILON) * 100) / 100
       
        return(
                // <div className='ListItem' >
                    <pre ref={this.props._ref} className={'ListItem '+ this.props.additionalClasses} >
                        <div onClick={() => this.props.setCurrVidTime(ts) } className="noteTitleContainer" >
                            <div className= "timestamp" >{ts}</div>
                            &nbsp;|&nbsp;
                            <div className= "noteTitle" >
                                {noteInfo.noteTitle != null ? noteInfo.noteTitle : noteInfo.text} 
                            </div> 
                            <br/>
                        </div>
                        {/* <textarea disabled={this.state.textarea_disabled} onChange={( e, state ) => this.handleInputChange( e, 'textareaValue')} value={this.state.textareaValue} className="noteContent"></textarea> */}
                        <span hidden={!this.state.textarea_disabled} >{noteInfo.text}</span> 
                        <textarea hidden={this.state.textarea_disabled} onChange={( e, state ) => this.handleInputChange( e, 'textareaValue')} value={this.state.textareaValue} className="noteContent"></textarea>
                        

                        {/* {noteInfo.text}<br/>{ts} */}
                        <button onClick={( e, state ) => this.handleToggleState( e, 'editing')}>Edit</button>
                        <button onClick={( e, state ) => this.handleToggleState( e, 'textarea_disabled')}>Toggle TextArea</button>
                        <button hidden={this.state.textarea_disabled} onClick={this.handleSave}>Save</button>

                        

                    </pre>
                  
                // </div> setCurrentTime(seconds)

        
        );
    }
}
