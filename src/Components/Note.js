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
            text_disabled: true,
            noteTitle_disabled: true,
            text: this.props.note.text,
            noteTitle: this.props.note.noteTitle != null ? this.props.note.noteTitle : this.props.note.text ,
            noteSectionVideoId : this.props.videoId,
            lastEnabled:  { state : null, saved: true } 
            
            // index: 0
        }
        // this.handleShow = this.handleShow.bind(this);
        this.handleToggleState = this.handleToggleState.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.acceptSpecialSymbol = this.acceptSpecialSymbol.bind(this);
        this.convertDisableStatusToValue = this.convertDisableStatusToValue.bind(this);
        this.updateTimeStamp = this.updateTimeStamp.bind(this);
    }
    componentDidUpdate(nextProps){
        //if the section rendered is different from the last (we changed videos or we're loading a different set of notes) then update all disabled states to close them all
        if (nextProps.videoId != this.props.videoId){
            this.setState({
                              text_disabled: true,
                              noteTitle_disabled : true
                          })
            console.log("updating...")
        }
        else{
            // debugger;
            console.log("not updating...", )
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

    handleToggleState(e, stateVal){
        // var value = '' 
       
        this.setState(
            {
            [stateVal]: !this.state[stateVal],
            // lastEnabled: this.state[stateVal] ? { state : stateVal, saved: true } : { state : stateVal, saved: false } 
            lastEnabled: { state : stateVal, saved: false } 
            }, 
            ()=>{
                console.log("Toggling ", stateVal, this.state[stateVal])
            }
        )
    }
    convertDisableStatusToValue(dType){
        
        switch( dType ){
            case 'text_disabled':
                return 'text'
                // debugger;
                // break;
            case 'noteTitle_disabled':
                return 'noteTitle'
                // break;
            default:
                break;
        }
    }
    handleSave( e, overrideObj = null  ){
        //note, lastEnabledData is a object with properties 'state' and 'saved' in the same fashion as the 

        var lastEnabled = this.state.lastEnabled


        // this.props.changeNote("changing note")
        console.log("saving....", lastEnabled, lastEnabled.state ,this.state[lastEnabled.state] , this.state.text)
        var noteEditProperty =  this.convertDisableStatusToValue(lastEnabled.state)
        // switch( stateVal ){
        //     case 'text':
        //         noteEditProperty = 'text'
        //         var test = this.state[stateVal]
        //         // debugger;
        //         break;
        //     case 'noteTitle':
        //         noteEditProperty = 'noteTitle'
        //         break;
        //     default:
        //         break;
        // }
        // debugger
        var setStateOpts = {
                                [lastEnabled.state]: !this.state[lastEnabled.state], 
                                lastEnabled : {
                                                    state: this.state.lastEnabled.state, 
                                                    saved: true
                                                } 
                            }

        // this.handleToggleState(e, lastEnabled.state)
        this.setState( setStateOpts ,  ()=>{
            console.log(`text_disabled: `, this.state[noteEditProperty], noteEditProperty )
            this.props.changeNote(this.props.note, overrideObj !== null ? overrideObj.data : this.state[noteEditProperty] , this.props.videoId, overrideObj !== null ? overrideObj.value : noteEditProperty  )


        } )



        // this.setState({
        //     text_disabled: true
        // })
    }
    handleInputChange(e, stateVal){
        // var eVal = e.target.value
        // in order to see the most current change in printing, you must include the print statment in the setState function and there must be in an anonymnous arrow function    >>> https://forum.freecodecamp.org/t/solved-this-setstate-is-updating-state-after-console-log/206985/2
        //if we use []around the property name, we can use ES6 computed property names >>> https://stackoverflow.com/questions/29280445/reactjs-setstate-with-a-dynamic-key-name
        this.setState({[stateVal]: e.target.value},  ()=>{console.log(`new ${stateVal} value: `, this.state[stateVal])} )

    }
    acceptSpecialSymbol(e, commands, stateVal){

        if (e.keyCode == 9 && commands["include_tabs"] ){
            e.preventDefault(); //prevent tab from focusing the next dom object

        // this.setState({[stateVal]: e.target.value},  ()=>{console.log(`new ${stateVal} value: `, this.state[stateVal])} )
            this.setState({[stateVal]: this.state[stateVal]+ String.fromCharCode(9)},  ()=>{console.log(`new ${stateVal} value: `, this.state[stateVal])} )
        }
        if (e.keyCode == 13 && e.shiftKey && commands["SE_submit"] ){ // reference for 'e.shiftKey: http://jsfiddle.net/McH8q/28/#save
            this.handleSave(e, this.state.lastEnabled );
        }
        if (e.keyCode == 13 && commands["E_submit"] ){
            this.handleSave(e, this.state.lastEnabled );
        }

    }

    updateTimeStamp(e, getCurrVidTime){
        this.handleSave( e, {value: "startTime" , data: getCurrVidTime() }) 
    }
      
    render() {
        var noteInfo = this.props.note
        var ts = Math.round((noteInfo.startTime + Number.EPSILON) * 100) / 100
       
        return(
               
                    <div ref={this.props._ref} className={'ListItem '+ this.props.additionalClasses} >
                        <div onClick={() => this.props.setCurrVidTime(ts) } className="noteTitleContainer" title={this.state.noteTitle}>
                            <div hidden={!this.state.noteTitle_disabled} className= {this.state.noteTitle_disabled ? "seekText titleDiv" : ''}  >Go to:</div>

                            <div className= "timestamp titleDiv" >{ts}</div>
                            <div className="  titleDiv" >&nbsp;|&nbsp;</div>
                            <input  hidden={this.state.noteTitle_disabled} 
                                    onChange={( e, state ) => this.handleInputChange( e, 'noteTitle')} 
                                    onKeyDown={ (e, state) => this.acceptSpecialSymbol(e, { "E_submit" : true } , null)} 
                                    value={this.state.noteTitle}  
                                    className= {!this.state.noteTitle_disabled ? "noteTitleEditor titleDiv"  : ''}   >
                            </input>
                            {/* {()=>{debugger}} */}
                            
                            <div    hidden ={!this.state.noteTitle_disabled} 
                                    onDoubleClick={this.state.lastEnabled.saved  ? ( e, state ) => this.handleToggleState( e, 'noteTitle_disabled') : null } 
                                    className= {this.state.noteTitle_disabled ? "noteTitleDisplay titleDiv"  : ''} >
                                        {this.state.noteTitle}
                                {/* {noteInfo.noteTitle != null ? noteInfo.noteTitle : noteInfo.text}  */}
                            </div> 
                            {/* <div className= "noteTitle titleDiv" >
                                {noteInfo.noteTitle != null ? noteInfo.noteTitle : noteInfo.text} 
                            </div>  */}
                            <br/>
                        </div>
                        {/* <textarea disabled={this.state.text_disabled} onChange={( e, state ) => this.handleInputChange( e, 'text')} value={this.state.text} className="noteContent"></textarea> */}
                        <pre    hidden={!this.state.text_disabled} 
                                onDoubleClick={this.state.lastEnabled.saved  ? ( e, state ) => this.handleToggleState( e, 'text_disabled') : null} 
                                className="noteMsgDisplay" >
                                    {noteInfo.text}
                        </pre> 
                        {/* <div hidden={this.state.text_disabled} className= {!this.state.text_disabled ? "noteMsgEditorContainer" : ''}> test</div> */}
                        
                        {/* the className must be conditional because display flex undos this hidden attribute */}
                        <div    hidden={this.state.text_disabled } 
                                className= {!this.state.text_disabled ? "noteMsgEditorContainer" : ''} >
                                    <textarea   onChange={( e, state ) => this.handleInputChange( e, 'text')} 
                                                onKeyDown={ (e, state) => this.acceptSpecialSymbol(e, {'include_tabs' : true , "SE_submit" : true }, 'text')} 
                                                value={this.state.text} 
                                                className="noteMsgEditor">
                                    </textarea>
                        </div>
                        
                
                        {/* {noteInfo.text}<br/>{ts} */}
                        {/* <button onClick={( e, state ) => this.handleToggleState( e, 'editing')}>Edit</button> */}

                        {/* <button onClick={( e, state ) => this.handleToggleState( e, 'text_disabled')}>Toggle TextArea</button>
                        <button onClick={( e, state ) => this.handleToggleState( e, 'noteTitle_disabled')}>Toggle Title</button>
                        <button hidden={this.state.lastEnabled.state == null || this.state.lastEnabled.saved} onClick={(e, state)=>this.handleSave(e, this.state.lastEnabled )}>Save</button> */}
                        


                        <button onClick={(e, updateTimeFunc )=>this.updateTimeStamp(e , this.props.getCurrVidTime)} >Update Timestamp</button>

                        <button     hidden={!this.state.lastEnabled.saved} 
                                    onClick={( e, state ) => this.handleToggleState( e, 'text_disabled')}>
                                        Toggle TextArea
                        </button>
                        <button     hidden={!this.state.lastEnabled.saved} 
                                    onClick={( e, state ) => this.handleToggleState( e, 'noteTitle_disabled')}>
                                        Toggle Title
                        </button>
                        <button     hidden={this.state.lastEnabled.state == null || this.state.lastEnabled.saved} 
                                    onClick={(e, state)=>this.handleSave(e, this.state.lastEnabled )}>
                                        Save
                        </button>

                        
                        {/* <button onClick={( e, state ) => this.handleToggleState( e, 'show ')}>Toggle TextArea</button> */}

                        <select>
                            <option value="grapefruit">Grapefruit</option>
                            <option value="lime">Lime</option>
                            <option selected value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select>

                        

                    </div>
                  


        
        );
    }
}
