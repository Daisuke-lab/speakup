import React from 'react'
import '../assets/Swipe/Footer.css'
import ReplayIcon from '@material-ui/icons/Replay';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { IconButton } from '@material-ui/core';

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