import React from 'react'
import '../assets/Swipe/Footer.css'
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';


interface Props {
    swipeLeft: any,
    swipeRight: any
}


function Footer(props:Props) {
    const {swipeLeft, swipeRight} = props
  return (
    <div className="footer">
      <IconButton id='swipeButtons_nope' onClick={swipeLeft}>
        <CloseIcon fontSize='large'/>
      </IconButton>
      <IconButton id='swipeButtons_repeat'>
        <ReplayIcon fontSize='large'/>
      </IconButton>
      <IconButton id='swipeButtons_like' onClick={swipeRight}>
        <FavoriteIcon fontSize='large'/>
      </IconButton>
    </div>
  );
}

export default Footer;