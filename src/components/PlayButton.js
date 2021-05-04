
import { useState } from "react";
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import Button from '@material-ui/core/Button';

export default function PlayButton({ isPlaying, playOrPause }) {

  const url = "http://boombox.middlebury.edu:8000/";
  // const audio = new Audio(url);
  
  const playAudio = () => {  
    audio.play()
  }

  return (
    <div>
    
      {isPlaying ? <Button variant="link" onClick={() => playOrPause()}>
      <FaPauseCircle size={30}/>
      </Button> : <Button variant="link" onClick={() => playOrPause()}>
      <FaPlayCircle size={30}/>
      </Button>}
      
      

      <audio className="audio-element">
        <source src="http://boombox.middlebury.edu:8000/" type="audio/mpeg">
        </source>
      </audio>
    </div>
  );

}