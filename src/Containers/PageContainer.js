import React from "react";
// import styled from 'styled-components';
// import { theme } from "../util/GlobalStyles";
// import './App.css';

// import '../Styles/expandingCard.css'
// import '../Styles/social-media-slider-toggles.css'
// import '../Styles/navbar.css'
import '../Styles/page-container-styles.css'

import test from '../DownloadFolder/testFile.txt'
// import testF from '../DownloadFolder/testFolder.zip'

import JSZip from 'jszip';
import FileSaver from 'file-saver';


// this is how to make a file download 
const testFile = test;
// const testFile2 = testF;
let zip = new JSZip();
var img = zip.folder("images");
zip.file("idlist.txt", `PMID:29651880\r\nPMID:29303721`);
zip.file("idlist2.txt", `PMID:29651880\r\nPMID:29303721`);
img.file("idlist2.txt", `PMID:29651880\r\nPMID:29303721`);
zip.generateAsync({type: "blob"}).then(function(content) {
  FileSaver.saveAs(content, "download.zip");
}); 
// this command will download a file right away


export default class PageContainer extends React.Component{
    
    render() {
       
        return(
            <div className="tripleColumnContainer" >
                <div className='videoPlayer' >
                    {/* this is how to create an HTML a tag that will download a local app file*/}
                    <a href={testFile} download="testFile.txt">{testFile}Hiii</a>
                    {/* <a href={testFile2} download="testFolder.zip">----Hiii2</a> */}
                </div>
                <div className='playList' >Hi</div>
                <div className='notes'>Hi</div>
               
            </div>
        
        );
    }
}
