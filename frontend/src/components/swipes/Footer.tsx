import React from 'react'
import styles from "../../../styles/Swipe.module.css"
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import ProfileType from '../../../types/ProfileType';
import { useAppSelector } from '../../../store/hooks';


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
      <IconButton className={styles.swipeButtonNope} onClick={() => onClick("left")}>
        <CloseIcon fontSize='large'/>
      </IconButton>
      <IconButton className={styles.swipeButtonRepeat}>
        <ReplayIcon fontSize='large'/>
      </IconButton>
      <IconButton className={styles.swipeButtonLike} onClick={() => onClick("right")}>
        <FavoriteIcon fontSize='large'/>
      </IconButton>
    </div>
  );
}

export default Footer;