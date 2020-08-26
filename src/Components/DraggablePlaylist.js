import React, { Component } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DraggablePlayListVideo from "./DraggablePlaylistVideo";
import "../Styles/draggable-playlist-style.css"


// // fake data generator
// const getItems = (count) =>
//   Array.from({ length: count }, (v, k) => k).map((k) => ({
//     id: `item-${k}`,
//     // content: `item- ${k}`
//     content: { text: `item- ${k}`, text2: "....hello" }
//   }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  console.log(endIndex)

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer

  // styles we need to apply on draggables
  ...draggableStyle
});
const getItemClass= (isDragging, draggableStyle) => {
  // some basic styles to make the items look a bit nicer
  return (isDragging ? "video-dragging-state" : "video-not-dragging-state")
};



// const getItemStyle = (isDragging, draggableStyle) => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   // padding: grid * 2,
//   // margin: `0 0 ${grid}px 0`,
//   padding: (grid * 2) ,
//   margin: `1rem 0`,
//   whiteSpace: "wrap",
//   flexWrap: "wrap",
//   wordWrap: "break-word",

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "grey",

//   // styles we need to apply on draggables
//   ...draggableStyle
// });

// const getListStyle = (isDraggingOver) => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   // width: 250
//   // width: '100%',
//   // maxHeight: '10vw',
//   maxHeight: '20vw',
//   overflowX: 'hidden',
//   overflowY: 'scroll'
// });


const getListStyle = (isDraggingOver) => {
  console.log ("isDraggingOver: " , isDraggingOver, isDraggingOver ? "dragging" : "not-dragging" )
  return (isDraggingOver ? "dragging-state" : "not-dragging-state")
};




export default class DraggablePlayList extends React.Component {
    constructor(props){
        super(props);
        this.state= { 
            loaderStyle: 'block',
            contentStyle: 'none',
            playerRef : null,
            currentPlaylist : this.props.playlist,
            // items: this.props.playlist != undefined ? this.getItems(this.props.playlist) : []
            // items: this.getItems() 
            items: null
            // items: this.getItems(5, this.state.currentPlaylist !=  null ? this.state.currentPlaylist : this.props.playlist ) 

        }
        this.onDragEnd = this.onDragEnd.bind(this);
        this.getItems = this.getItems.bind(this);
        this.changeListEntries = this.changeListEntries.bind(this);
        this.addListEntry = this.addListEntry.bind(this);
        this.removeListEntry = this.removeListEntry.bind(this);

        this.testConsoleLog = this.testConsoleLog.bind(this)

    }
    componentDidUpdate(prevProps) {
      // if(prevProps.playlist  !== this.props.playlist ) {
      //   this.setState({currentPlaylist : this.props.playlist }, ()=> {
            this.props.player.playlist(this.props.playlist, this.props.player.playlist.currentItem()); //this second parameter must be set or the playlist will jump to start once updated (default for the second parameter [index of first video to play] is 0 )
            this.props.player.currentTime(this.props.currentTime)
            console.log("draggable is updating!4" , this.props.player.currentTime() , this.props.currentTime ,this.state.items, this.props.playlist, this.getItems(3, this.props.playlist))
            if ( this.state.items == undefined){
              // this.changeListEntries(this.state.items,  this.props.playlist)
              console.log("draggable is updating!5")
              this.setState(
                {items: this.getItems(3, this.props.playlist)}, 
                ()=>{console.log("draggable is updating!5", this.state.items)}
                )

            }
              // this.setState({
        
              //   currentPlaylist : this.props.playlist,
              //   items: this.getItems(5, this.props.playlist ) 
              // })
            
            if ( this.state.currentPlaylist.length != this.props.playlist.length){
              this.changeListEntries(this.state.items,  this.props.playlist)
              this.setState({loaderStyle: 'none', contentStyle: 'block'})
              // this.setState({
        
              //   currentPlaylist : this.props.playlist,
              //   items: this.getItems(5, this.props.playlist ) 
              // })
            }
            
            // if ( this.state.currentPlaylist != this.getItems(5, this.props.playlist) ){
            //   this.changeListEntries(this.state.items,  this.props.playlist)
            //   // this.setState({
        
            //   //   currentPlaylist : this.props.playlist,
            //   //   items: this.getItems(5, this.props.playlist ) 
            //   // })
            // }
      //   });
      // }
    }
  componentDidMount(){
      console.log("hit!!")
      console.log("The Current Playlist:", this.props.playlist)

      console.log("player: ", this.props.player, this.props.test)
      if (this.props.player !== undefined && this.props.player != null){

          // this.props.player.playlist([]);
          this.props.player.playlist(this.props.playlist);

          console.log("the playlist2: " ,this.props.player.playlist())
            // Play through the playlist automatically.
            this.props.player.playlist.autoadvance(0);
            // this.props.player.playlistUi();
            
            if (this.state.items == undefined){

              console.log("state is undefined:", this.state.items,  this.props.playlist)
              this.setState({loaderStyle: 'none', contentStyle: 'block'})
            }
            // if (this.state.items == undefined){

            //   console.log("state is undefined:", this.state.items,  this.props.playlist)
            //   this.setState({
        
            //     currentPlaylist : this.props.playlist,
            //     items: this.getItems(5, this.props.playlist ) 
            //   })
            // }
      }
      
  }
    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          this.state.items,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
          items
        });
    }


    getItems = (count= 0, playlist) =>{
      if (playlist != undefined){
        return playlist.map(( video , k)=>{
          console.log(video)
          return {
            id: `item-${k}`,
            content: { videoInfo:video, text: `item- ${k}`, text2: "....hello"
            }
          }
        })
      }
      // else{
      //   return [{
      //     id: `item-0`,
      //     content: { videoInfo:video, text: `item- 0`, text2: "....hello"
      //     }
      //   }]
      // }
      
  }
  //
    // getItems = (playlist) =>{
    //     var formattedPlaylist = playlist.map(( video , k)=>{
    //     console.log(video)
    //     return {
    //       id: `item-${k}`,
    //       content: { value:video, text: `item- ${k}`, text2: "....hello"
    //       }
    //     }
    //   })
    // }

    //   getItems = (count = 3) =>
    //   Array.from({ length: count }, (v, k) => k).map((k) => ({
    //   id: `item-${k}`,
    //   // content: `item- ${k}`
    //   content: { text: `item- ${k}`, text2: "....hello" }
    // }));



    //   getItems = (count = 3, playlist) =>
    // {
    //   console.log("get playlist rms:", playlist)
    //   return Array.from({ length: count }, (v, k) => k).map((k) => ({
    //   id: `item-${k}`,
    //   // content: `item- ${k}`
    //   content: { text: `item- ${k}`, text2: "....hello" }
    // }))
// }

    
    



    //   Array.from({ length: count }, (v, k) => k).map((k) => ({
    //   id: `item-${k}`,
    //   // content: `item- ${k}`
    //   content: { 
    //             // videoData: 
    //             text: `item- ${k}`, text2: "....hello", 
    //   }
    // }
    // ));
 
    changeListEntries = (sPlaylist, pPlaylist) =>{
        

        var newPlaylist  = []
        if (sPlaylist == undefined){
            newPlaylist = newPlaylist
        }
        else if (pPlaylist.length > sPlaylist.length){
            newPlaylist = this.addListEntry(sPlaylist, pPlaylist)
            console.log("newPlaylist: " , newPlaylist, [...sPlaylist], [...sPlaylist][0], [...sPlaylist].push({ text: `item- ${sPlaylist.length}`, text2: "....hello"}))
        }
        else{
            newPlaylist = this.removeListEntry(sPlaylist, pPlaylist)
        }
        // newPlaylist = pPlaylist
        this.setState({

          currentPlaylist : this.props.playlist,
          items: this.getItems(5, newPlaylist ) 
        })
  }
  addListEntry = (sPlaylist, pPlaylist) =>{
      var newPlaylist =  sPlaylist.map((video , idx)=>{return video.content.videoInfo})
      newPlaylist.push(pPlaylist[pPlaylist.length-1])
      // var newPlaylist =  [...sPlaylist]
      // newPlaylist.push({
      // id: `item-${sPlaylist.length}`,
      // content: { videoInfo:pPlaylist[pPlaylist.length-1], text: `item- ${sPlaylist.length}`, text2: "....hello"
      // }})
      return newPlaylist
      // pPlaylist[pPlaylist.length-1])
  }
removeListEntry = (sPlaylist, pPlaylist) =>{
  var videoIndexObj = {}
  pPlaylist.forEach(video => {
    videoIndexObj[video.videoId] = true
  });
  console.log("videoIndexObj: ", videoIndexObj)
  // sPlaylist.forEach(video => {
  //   videoIndexObj[video.videoId] = true
  // });
  var idx = 0;
  var found = false;
  while (idx < sPlaylist.length && !found){
    if (pPlaylist[sPlaylist[idx].content.videoInfo.videoId] === true ){
      found = true
      var newPlaylist =  sPlaylist.map((video , idx)=>{return video.content.videoInfo})
      // return [...sPlaylist].split(idx, 0)
      console.log("newPlaylistRemove ", newPlaylist, newPlaylist[0] )
      return newPlaylist.split(idx, 1)
    }
    idx+=1
  }
  return
  // var pVideoIds = pPlaylist.map((video, idx)=>{ return video.videoId })
  // Object.fromEntries(
  //   Object.entries(obj).map(
  //     ([k, v], i) => [k, v => 2 * v  ]
  //   )
  // )
  // console.log(pVideoIds )
  // return pPlaylist
}

  
testConsoleLog(message){
  console.log("clicked button!") 
}
   
   
      // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    // if (this.state.items != undefined && this.state.currentPlaylist != this.getItems(5, this.props.playlist) ){
    //   this.changeListEntries(this.state.items,  this.props.playlist)
    //   // this.setState({

    //   //   currentPlaylist : this.props.playlist,
    //   //   items: this.getItems(5, this.props.playlist ) 
    //   // })
    // }
    // else if (this.state.items != undefined){

    //   console.log("state is undefined:", this.state.items,  this.props.playlist)
    //   this.setState({

    //     currentPlaylist : this.props.playlist,
    //     items: this.getItems(5, this.props.playlist ) 
    //   })
    // }
    console.log("state is not undefined:", this.state.items,  this.props.playlist, this.getItems(5, this.props.playlist))

    
    return (
      <div>
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`playlistContainer ${getListStyle(snapshot.isDraggingOver)}`}
            >
              {this.state.items !=null && this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index} 
                >
                  {(provided, snapshot) => (
                    <div  
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                      className={`videoContainer ${getItemClass(snapshot.isDragging)}`}
                      onClick={console.log("clicked!")}
                    >
                      <div className="handle" {...provided.dragHandleProps} > = </div>
                      {/* <button onClick={this.testConsoleLog}> Hello </button> 
                      <button  onMouseDown={e => e.stopPropagation()} onClick={this.testConsoleLog} onFocus={console.log("clicked!") }>Hello2</button> */}
                      {/* <input onClick={console.log("clicked input!") } onChange={console.log("clicked!") } ></input> */}
                      <DraggablePlayListVideo  className="videoInfoContainerOuter" videoInfo = {item.content.videoInfo} onMouseDown={e => e.stopPropagation()} onClick={this.testConsoleLog}  player= {this.props.player}  currentlyPlayingId = {this.props.currentlyPlayingId} videoIdxPos ={index}></DraggablePlayListVideo>
                      {/* <DraggablePlayListVideo contenteditable videoInfo = {item.content.videoInfo} onMouseDown={e => e.stopPropagation()} onClick={this.testConsoleLog}  ></DraggablePlayListVideo> */}
                      {/* <div className="delete" onClick={(e, delFunc, videoId)=>this.handleDelete(e, this.props.deleteVideo, item.content.videoInfo.videoId )}> X </div> */}
                      <div className="delete" onClick={(e, videoId)=>this.props.deleteVideo(e, item.content.videoInfo.videoId )}> X </div>
                    </div>
                  )}
                  {/* <div > Hello </div> */}
                  {/* </div> */}
                  
                </Draggable>
              ))}
              {provided.placeholder}
              {/* <button onClick={console.log("clicked button!") }> Hello </button>  */}
            </div>
          )}
        </Droppable>
       
      </DragDropContext>
       {/* <button onClick={console.log("clicked button!") }> Hello </button>  */}
      </div>
    );
  }
}




