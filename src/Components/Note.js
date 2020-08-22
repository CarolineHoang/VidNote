import React from "react";
import '../Styles/page-container-styles.css'
// import VideoPlayer from "../Components/VideoPlayer.js";
// import YoutubeVid from 'videojs-youtube';

// Scrolling view functionality is inspired and based off of CodePen:
// Name: 'React: scrollIntoView'
// Pen Owner: 'Hirokazu Takatama'


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
            lastEnabled:  { state : null, saved: true } ,
            videoCategory : this.props.videoCategory
        }
        this.handleToggleState = this.handleToggleState.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.acceptSpecialSymbol = this.acceptSpecialSymbol.bind(this);
        this.convertDisableStatusToValue = this.convertDisableStatusToValue.bind(this);
        this.updateTimeStamp = this.updateTimeStamp.bind(this);
        this.formatTimeStamp = this.formatTimeStamp.bind(this);
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
            console.log(`text_disabled: `, this.state[noteEditProperty], noteEditProperty , overrideObj )
            this.props.changeNote(  this.props.note, 
                                    overrideObj !== null && overrideObj !== undefined ? overrideObj.data : this.state[noteEditProperty] , 
                                    this.props._ref , 
                                    overrideObj !== null && overrideObj !== undefined ? overrideObj.value : noteEditProperty  , 
                                    this.props.videoId)


        } )
        // this.props.changeNote(this.props.note, this.state[noteEditProperty] , this.props.videoId, noteEditProperty  )



        // this.setState({
        //     text_disabled: true
        // })
    }
    handleInputChange(e, stateVal){
        // var eVal = e.target.value
        // in order to see the most current change in printing, you must include the print statment in the setState function and there must be in an anonymnous arrow function    >>> https://forum.freecodecamp.org/t/solved-this-setstate-is-updating-state-after-console-log/206985/2
        // if we use [] around the property name, we can use ES6 computed property names >>> https://stackoverflow.com/questions/29280445/reactjs-setstate-with-a-dynamic-key-name
        this.setState({[stateVal]: e.target.value},  ()=>{console.log(`new ${stateVal} value: `, this.state[stateVal])} )

    }
    acceptSpecialSymbol(e, commands, stateVal){

        if (e.keyCode == 9 && commands["include_tabs"] ){
            e.preventDefault(); //prevent tab from focusing the next dom object

        // this.setState({[stateVal]: e.target.value},  ()=>{console.log(`new ${stateVal} value: `, this.state[stateVal])} )
            this.setState({[stateVal]: this.state[stateVal]+ String.fromCharCode(9)},  ()=>{console.log(`new ${stateVal} value: `, this.state[stateVal])} )
        }
        if (e.keyCode == 13 && e.shiftKey && commands["SE_submit"] ){ // reference for 'e.shiftKey: http://jsfiddle.net/McH8q/28/#save
            // this.handleSave(e, this.state.lastEnabled );
            this.handleSave(e);
        }
        if (e.keyCode == 13 && commands["E_submit"] ){
            // this.handleSave(e, this.state.lastEnabled );
            this.handleSave(e);

        }

    }

    updateTimeStamp(e, getCurrVidTime){
        this.handleSave( e, {value: "startTime" , data: getCurrVidTime() }) 
    }

    formatTimeStamp(totalSecs, noteInfo){
        var hr = 0
        var min = 0 
        var sec = 0
        if (totalSecs < 60){ //if it's under a minute
            sec = Math.trunc(totalSecs)
            return <div><div className={this.props.videoCategory == "web"  ?  "timestamp": ""}>0:{sec < 10 ? '0' : ''}{sec}</div>{ (this.props.videoCategory == "web"  ?    <a href={`https://youtu.be/${this.props.ytVidId}?t=${sec}`} className="printOnlyTimeStamp"  >0:{sec < 10 ? '0' : ''}{sec}</a> : "" )}</div>
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

        if (this.props.videoCategory != this.state.videoCategory){
            this.setState({
                videoCategory : this.props.videoCategory
            })
        }

        var noteInfo = this.props.note
        var formattedTS = this.formatTimeStamp(noteInfo.startTime, noteInfo)
        // var ts = Math.round((noteInfo.startTime + Number.EPSILON) * 100) / 100

        // const date = new Date('2010-08-05')
        const date = noteInfo.lastUpdated
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' , hour: 'numeric', minute: 'numeric', second: 'numeric',  } ) 
        const [{ value: month },,{ value: day },,{ value: year },,{value : hour},, { value : minute},, {value : second}] = dateTimeFormat .formatToParts(date ) 

        console.log(`${day}-${month}-${year }`)
        console.log(`${day}👠${month}👢${year}`) // just for fun
       
        return(
                    <div className={'ListItem '+ this.props.additionalClasses} >
                        <div onClick={() => this.props.setCurrVidTime(noteInfo.startTime) } className="noteTitleContainer" title={this.state.noteTitle}>
                            <div hidden={!this.state.noteTitle_disabled} className= {this.state.noteTitle_disabled ? "seekText titleDiv" : ''}  >Go to:</div>

                            <div className= "titleDiv" >{formattedTS}</div>
                            <div className="  titleDiv" >&nbsp;|&nbsp;</div>
                            <input  hidden={this.state.noteTitle_disabled} 
                                    onChange={( e, state ) => this.handleInputChange( e, 'noteTitle')} 
                                    onKeyDown={ (e, state) => this.acceptSpecialSymbol(e, { "E_submit" : true } , null)} 
                                    value={this.state.noteTitle}  
                                    className= {!this.state.noteTitle_disabled ? "noteTitleEditor titleDiv"  : ''}   >
                            </input>
                            <div    hidden ={!this.state.noteTitle_disabled} 
                                    onDoubleClick={this.state.lastEnabled.saved  ? ( e, state ) => this.handleToggleState( e, 'noteTitle_disabled') : null } 
                                    className= {this.state.noteTitle_disabled ? "noteTitleDisplay titleDiv"  : ''} >
                                        {this.state.noteTitle}
                            </div> 
                            <br/>
                        </div>
                        <pre    hidden={!this.state.text_disabled} 
                                onDoubleClick={this.state.lastEnabled.saved  ? ( e, state ) => this.handleToggleState( e, 'text_disabled') : null} 
                                className="noteMsgDisplay" >
                                    {noteInfo.text}
                        </pre> 
                        {/* the className must be conditional because display flex undos this hidden attribute */}
                        <div    hidden={this.state.text_disabled } 
                                className= {!this.state.text_disabled ? "noteMsgEditorContainer" : ''} >
                                    <textarea   onChange={( e, state ) => this.handleInputChange( e, 'text')} 
                                                onKeyDown={ (e, state) => this.acceptSpecialSymbol(e, {'include_tabs' : true , "SE_submit" : true }, 'text')} 
                                                value={this.state.text} 
                                                className="noteMsgEditor">
                                    </textarea>
                        </div>


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
                                    onClick={this.handleSave}>
                                        Save
                        </button>
                        <div>Last Edited: {`${month} ${day}, ${year } at ${hour}:${minute}:${second }`}</div>
                        <div>{this.state.videoCategory != null && this.state.videoCategory != undefined && this.state.videoCategory & "hello"}</div>
                        
                        {/* <select>
                            <option value="grapefruit">Grapefruit</option>
                            <option value="lime">Lime</option>
                            <option selected value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select> */}
                    </div>
        );
    }
}
