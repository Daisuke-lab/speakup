import React from 'react'
import '../assets/Swipe/Footer.css'
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import ProfileType from '../../../types/ProfileType';
import { useAppSelector } from '../../utils/hooks';


interface Props {
    onSwipe: (direction: string, profile: ProfileType) => void,
    disabled: boolean
}


function Footer(props:Props) {
    const {onSwipe, disabled} = props
    const currentProfile = useAppSelector(state => state.swipes.currentProfile)

    const onClick = (direction:string) => {
      if (currentProfile !== null) {
          onSwipe(direction, currentProfile)
      }
    }
  return (
    <div className="footer">
      <IconButton id='swipeButtons_nope' onClick={() => onClick("left")}>
        <CloseIcon fontSize='large'/>
      </IconButton>
      <IconButton id='swipeButtons_repeat'>
        <ReplayIcon fontSize='large'/>
      </IconButton>
      <IconButton id='swipeButtons_like' onClick={() => onClick("right")}>
        <FavoriteIcon fontSize='large'/>
      </IconButton>
    </div>
  );
}

export default Footer;