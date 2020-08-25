import React from "react";
import '../Styles/page-container-styles.css'
// import VideoPlayer from "../Components/VideoPlayer.js";
// import YoutubeVid from 'videojs-youtube';

// Scrolling view functionality is inspired and based off of CodePen:
// Name: 'React: scrollIntoView'
// Pen Owner: 'Hirokazu Takatama'


export default class NoteTaker extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            editing: false,
            currentNoteTime: null,
            createdTime: null,
            // text_disabled: true,
            // noteTitle_disabled: true,
            text: '',
            noteTitle: '',
            bookmarked:false,
            // noteSectionVideoId : this.props.videoId,
            lastEnabled:  { state : null, saved: true } ,
            videoCategory : this.props.videoCategory,
            videoId: this.props.videoId,
            saved: false
            // bookmarked : this.props.note.bookmarked
        }
        this.handleSave = this.handleSave.bind(this);
        this.acceptSpecialSymbol = this.acceptSpecialSymbol.bind(this);
        this.updateTimeStamp = this.updateTimeStamp.bind(this);
        this.formatTimeStamp = this.formatTimeStamp.bind(this);
    }
    componentDidUpdate(nextProps){
        //if the section rendered is different from the last (we changed videos or we're loading a different set of notes) then update all disabled states to close them all
        if (this.state.saved || (this.state.text === '' && this.state.noteTitle === '' && this.state.currentNoteTime!== null)){ //if we've just saved or we just cleared out both input fields
            this.setState({
                saved: false,
                text: '',
                noteTitle: '',
                bookmarked:false,
                currentNoteTime: null

            })
        }
        if (nextProps.videoId !== this.props.videoId){
            console.log("updating videoId...", nextProps.videoId ,this.props.videoId)
            this.setState({
                            videoId : this.props.videoId
                          })
            
        }
        else{
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


    handleSave( e, overrideObj = null  ,  toggleEditingFeild = true ){
        //note, lastEnabledData is a object with properties 'state' and 'saved' in the same fashion as the 

        //         addNote(e , newStartTime, newNoteTitle = null, newText, newBookmarked=false , newDrawn, newImages){
        
        // this.props.addNote( e, this.state.videoId, this.state.currentNoteTime, this.state.noteTitle, this.state.text, this.state.bookmarked, 
        //     {   noteTitle: '',
        //         title: '',
        //         currentNoteTime: null,
        //         // lastSave: 


        //         bookmarked: false})
        
        // var lastEnabled = this.state.lastEnabled
        this.setState({
            saved: true
        }
        , ()=>{this.props.addNote( e, this.state.videoId, this.state.currentNoteTime, this.state.noteTitle, this.state.text, this.state.bookmarked)}
        )
        
        // this.setState({
        //     noteTitle: '',
        //     title: '',
        //     currentNoteTime: null,
        //     lastSave: 


        //     bookmarked: false
        // }
        // // , ()=>{this.props.addNote( e, this.state.videoId, this.state.currentNoteTime, this.state.noteTitle, this.state.text, this.state.bookmarked)}
        // )

        // // this.props.changeNote("changing note")
        // console.log("saving....", lastEnabled, lastEnabled.state ,this.state[lastEnabled.state] , this.state.text)
        // var noteEditProperty =  this.convertDisableStatusToValue(lastEnabled.state)
    
        // var setStateOpts = {}
        // if (toggleEditingFeild){
        //     setStateOpts = {
        //         [lastEnabled.state]: !this.state[lastEnabled.state], 
        //         lastEnabled : {
        //                             state: this.state.lastEnabled.state, 
        //                             saved: true
        //                         } 
        //     }
        // }
        

        // // this.handleToggleState(e, lastEnabled.state)
        // this.setState( setStateOpts ,  ()=>{
        //     console.log(`text_disabled: `, this.state[noteEditProperty], noteEditProperty , overrideObj )
        //     this.props.changeNote(  /* noteInfo     */  this.props.note, 
        //                             /* newdata      */  overrideObj !== null && overrideObj !== undefined ? overrideObj.data : this.state[noteEditProperty] , 
        //                             /* noteIdx      */  this.props._ref , 
        //                             /* dataToUpdate */  overrideObj !== null && overrideObj !== undefined ? overrideObj.value : noteEditProperty  , 
        //                             /* videoId      */  this.props.videoId)


        // } )
    }
    handleInputChange(e, stateVal){
        // var eVal = e.target.value
        // in order to see the most current change in printing, you must include the print statment in the setState function and there must be in an anonymnous arrow function    >>> https://forum.freecodecamp.org/t/solved-this-setstate-is-updating-state-after-console-log/206985/2
        // if we use [] around the property name, we can use ES6 computed property names >>> https://stackoverflow.com/questions/29280445/reactjs-setstate-with-a-dynamic-key-name
        var newState = {[stateVal]: e.target.value}
        if (this.state.currentNoteTime === null){
            newState.currentNoteTime = this.props.getCurrVidTime()
        }
        this.setState(newState,  ()=>{console.log(`new ${stateVal} value: `, this.state[stateVal])} )

    }
    handleBookmark( e , overrideObj = null){
        // console.log("bookmark: " , this.props.note.bookmarked)
        this.setState({bookmarked: !this.state.bookmarked})

        // this.handleSave( e, {value: "bookmarked" , data: !this.props.note.bookmarked }, false ) 
        
            // this.props.changeNote(  /* noteInfo     */  this.props.note, 
            //                         /* newdata      */  overrideObj !== null && overrideObj !== undefined ? overrideObj.data : this.state[noteEditProperty] , 
            //                         /* noteIdx      */  this.props._ref , 
            //                         /* dataToUpdate */  overrideObj !== null && overrideObj !== undefined ? overrideObj.value : noteEditProperty  , 
            //                         /* videoId      */  this.props.videoId)


    }
    acceptSpecialSymbol(e, commands, stateVal){

        if (e.keyCode === 9 && commands["include_tabs"] ){
            e.preventDefault(); //prevent tab from focusing the next dom object

        // this.setState({[stateVal]: e.target.value},  ()=>{console.log(`new ${stateVal} value: `, this.state[stateVal])} )
            this.setState({[stateVal]: this.state[stateVal]+ String.fromCharCode(9)},  ()=>{console.log(`new ${stateVal} value: `, this.state[stateVal])} )
        }
        if (e.keyCode === 13 && e.shiftKey && commands["SE_submit"] ){ // reference for 'e.shiftKey: http://jsfiddle.net/McH8q/28/#save
            // this.handleSave(e, this.state.lastEnabled );
            this.handleSave(e);
        }
        if (e.keyCode === 13 && commands["E_submit"] ){
            // this.handleSave(e, this.state.lastEnabled );
            this.handleSave(e);

        }

    }

    updateTimeStamp(e, getCurrVidTime){
        this.setState({ currentNoteTime : getCurrVidTime() })
        // this.handleSave( e, {value: "startTime" , data: getCurrVidTime() }, false ) 
    }

    formatTimeStamp(totalSecs, noteInfo){
        var hr = 0
        var min = 0 
        var sec = 0
        if (totalSecs < 60){ //if it's under a minute
            sec = Math.trunc(totalSecs)
            return <div className={this.props.videoCategory === "web"  ?  "timestamp": ""}>0:{sec < 10 ? '0' : ''}{sec}</div>
        }
        else if (totalSecs < 60*60){ //if it's under an hour
            min = Math.trunc(totalSecs/60)
            sec = Math.trunc(totalSecs - (min*60))
            return <div>{min}:{sec < 10 ? '0' : ''}{sec}</div>
        }
        else if (totalSecs < 60*60*24){//if it's under a day
            hr =  Math.trunc(totalSecs/60/60)
            min = Math.trunc((totalSecs - (hr*60*60))/60)
            sec = Math.trunc(totalSecs - (hr*60*60) - (min*60))
            return <div>{hr}:{min < 10 ? '0' : ''}{min}:{sec < 10 ? '0' : ''}{sec}</div>
        }
        else{//if it's been a day and no video should be that long
            return <div>Error: MAX_VIDEO_LENGTH EXCEEDED</div>
        }
    }
    //TODO: different update time formats depending on how long it's been
    formatUpdate(sec){
        if (sec < 60){ //if it's under a minute

        }
        else if (sec < 60*60){ //if it's under an hour

        }
        else if (sec < 60*60*24){//if it's under a day

        }
        else{//if it's been a day

        }
        return
    }
    
    render() {

        if (this.props.videoCategory !== this.state.videoCategory){
            this.setState({
                videoCategory : this.props.videoCategory
            })
        }

        var noteInfo = this.props.note
        var formattedTS = this.formatTimeStamp(this.state.currentNoteTime, noteInfo)   

        // const date = new Date('2010-08-05')
        const date = Date.now()
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' , hour: 'numeric', minute: 'numeric', second: 'numeric',  } ) 
        const [{ value: month },,{ value: day },,{ value: year },,{value : hour},, { value : minute},, {value : second}] = dateTimeFormat.formatToParts(date ) 

        console.log(`${day}-${month}-${year }`)
        console.log(`${day}👠${month}👢${year}`) // just for fun
       
        return(
                    <div className={'ListItem '+ this.props.additionalClasses} >
                        <div onClick={() => this.props.setCurrVidTime(this.state.currentNoteTime) } className="noteTitleContainer" title={this.state.noteTitle}>
                            <div  className=  "seekText titleDiv"   >Go to:</div>

                            <div className= "titleDiv" >{formattedTS}</div>
                            <div className="  titleDiv" >&nbsp;|&nbsp;</div>
                            <input  onChange={( e, state ) => this.handleInputChange( e, 'noteTitle')} 
                                    onKeyDown={ (e, state) => this.acceptSpecialSymbol(e, { "E_submit" : true } , null)} 
                                    value={this.state.noteTitle}  
                                    className= "noteTitleEditor titleDiv"   placeholder={this.state.text} >
                            </input>
        
                            <br/>
                        </div>
                        {/* the className must be conditional because display flex undos this hidden attribute */}
                        <div    className= "noteMsgEditorContainer"  >
                                    <textarea   onChange={( e, state ) => this.handleInputChange( e, 'text')} 
                                                onKeyDown={ (e, state) => this.acceptSpecialSymbol(e, {'include_tabs' : true , "SE_submit" : true }, 'text')} 
                                                value={this.state.text} 
                                                className="noteMsgEditor">
                                    </textarea>
                        </div>


                        <button onClick={(e, updateTimeFunc )=>this.updateTimeStamp(e , this.props.getCurrVidTime)} >Update Timestamp</button>
                        <button     onClick={( e, state ) => this.handleBookmark( e, '')}>
                                        Bookmark Note <div hidden={!this.state.bookmarked}><i className="fas fa-bookmark"></i> </div> <div hidden={this.state.bookmarked}><i className="far fa-bookmark"></i></div>
                        </button>
                        <button     onClick={this.handleSave}>
                                        Save
                        </button>
                        {/* <div>Created: {`${month} ${day}, ${year } at ${hour}:${minute}:${second }`}</div> */}
                        
                       
                    </div>
        );
    }
}
