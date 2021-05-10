// import { useState } from "react";
// import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
// import Button from '@material-ui/core/Button';

export default function PlayButton(/*{isPlaying, playOrPause }*/) {

  // const url = "http://boombox.middlebury.edu:8000/";
  // const audio = new Audio(url);
  
  // const playAudio = () => {  
  //   audio.play()
  // }

  return (
    <div>
    
      {/*isPlaying ? <Button variant="link" onClick={() => playOrPause()}>
      <FaPlayCircle size={30}/>
      </Button> : <Button variant="link" onClick={() => playOrPause()}>
      <FaPauseCircle size={30}/>
      </Button>*/}
      
        <iframe src="https://onlineradiobox.com/us/wrmc/?cs=us.wrmc" 
        width="300" 
        height="155" 
        frameborder="0" 
        scrolling="no" 
        style={{padding: "10px 20px"}}></iframe>
    </div>
  );

}