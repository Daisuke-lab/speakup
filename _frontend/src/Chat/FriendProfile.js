import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FriendCard from './FriendCard'
import '../assets/Swipe/Match.css'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    boxShadow: theme.shadows[5],
    //padding: theme.spacing(2, 4, 3),
  },
}));

export default function FriendProfile(props) {
  const classes = useStyles();

  const [friendData, setFriendData] = useState()
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/profile/friend/${props.friend_profile_id}/`)
    .then(res => {
        setFriendData(res.data)})
    }, [])

  

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.popup}
        // onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={props.popup}>
          <div className={classes.paper}>
          <FriendCard data={friendData} onClose={props.onClose}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}