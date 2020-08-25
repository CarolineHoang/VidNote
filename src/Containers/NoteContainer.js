import React from "react";
import '../Styles/page-container-styles.css';
import Note from "../Components/Note";

// Scrolling view functionality is inspired and based off of CodePen:
// Name: 'React: scrollIntoView'
// Pen Owner: 'Hirokazu Takatama'

export default class NoteContainer extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            index: 0,
            currentNoteId: 0,
            noteRefArr : []
        }
        this.handleShow = this.handleShow.bind(this);
        this.findMostRecentNoteIdx =this.findMostRecentNoteIdx.bind(this)
    }

    findMostRecentNoteIdx(){
        var currentTime = this.props.getCurrVidTime()
        var idx=0;
        var notesArr = this.props.itemList.notes
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
    handleShow(command, i, refArr ) {
        console.log("ref arrs: " ,  refArr, this.state.noteRefArr)
        if (command === "current"){
           var mRIdx = this.findMostRecentNoteIdx()
           if (mRIdx>0){
                // this.refs[mRIdx].scrollIntoView({block: 'center', behavior: 'smooth'});
                refArr[mRIdx].current.scrollIntoView({block: 'center', behavior: 'smooth'});
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
            refArr[i].current.scrollIntoView({block: 'center', behavior: 'smooth'});

            this.setState({index: i})
        }
      }

      
      
      
      render() {
        var notes = this.props.itemList !== undefined ?  this.props.itemList.notes  : null;
        console.log("ITEMMMMS", notes)

        var idx = 0;
        var newRef  = null;
        var refArr  = [];
        while (notes != null && idx <notes.length){
            newRef = React.createRef()
            refArr.push(newRef)
            idx+=1
        }
        // if ( notes.length !=this.state.noteRefArr.length){
        //     this.setState({
        //         noteRefArr : refArr
        //     })
        // }
        return(
                <div>
                    {notes != null && <div className="noteSectionVideoTitle">{this.props.itemList.videoName != null ? this.props.itemList.videoName : 'Untitled Video'}</div>}
                    {notes != null && this.props.itemList.category === 'web' ? <div className="noteSectionVideoLink">Watch Now: <a href={this.props.itemList.url}>{this.props.itemList.url}</a></div>  : <div className="noteSectionVideoLink">Uploaded File</div>}
                    {/* {this.state.index} */}
                    {/* this must be a arrow function in order to bind the this so that we can use state in the map function  */}
                    <ul>
                        {notes != null &&  notes.map((item, i) => {
                        return (
                            <div ref={refArr[i]} key={"note"+i} >
                                <Note   _ref={i} note={item} 
                                        additionalClasses={ i === this.state.index ? 'centerListItem' : ''}
                                        setCurrVidTime = {this.props.setCurrVidTime } 
                                        changeNote = {this.props.changeNote } 
                                        deleteNote = {this.props.deleteNote } 
                                        videoId = {this.props.itemList.videoId} 
                                        videoCategory = {this.props.itemList.category} 
                                        url = {this.props.itemList.url} 
                                        ytVidId = {this.props.itemList.ytVidId}  
                                        getCurrVidTime = {this.props.getCurrVidTime}
                                        // bookmarked = {this.props.bookmarked} 
                                        >
                                        
                                </Note>
                            </div>
                        ) 
                    })}
{/* 
                    { renderNoteList(notes)} */}
                  </ul>
                  <button onClick={this.handleShow.bind(this, "", 0, refArr)}>0</button>
                  <button onClick={this.handleShow.bind(this, "", 2, refArr)}>2</button>
                  <button onClick={this.handleShow.bind(this, "", 50, refArr)}>50</button>
                  <button onClick={this.handleShow.bind(this, "", 99, refArr)}>99</button>
                  <button onClick={this.handleShow.bind(this, "current", 0  , refArr)}>Current Note</button>
                  {this.state.index}
                </div>
        );
    }
}
