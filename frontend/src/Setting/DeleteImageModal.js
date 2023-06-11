import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import * as image_actions from '../store/actions/image_action'
import { connect } from 'react-redux'
import '../assets/Setting/DeleteImageModal.css'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '500px',
    height: '200px',
    textAlign: 'center'
  },
}));

function DeleteImageModal(props) {
  console.log(props.deleting_image)
  console.log(props.i)
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.parent_popup(false)
  };

  const image_deleter = () => {
      setOpen(false)
      props.parent_popup(false)
      var i;
      for (i = 0; i < props.images.length; i++) {
        if (props.images[i].image === props.deleting_image) {
          props.delete_image(props.profile_id, props.images[i].id)
        }
        }
      }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h1 style={{fontSize:'30px'}}>Are you sure you want to delete this picture?</h1>
            <div className='crop_button'>
            <button className='cancel_button' onClick={handleClose} id='outline'>Cancel</button>
            <button className='upload_button' onClick={image_deleter} id='outline'>Delete</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
      }

const mapstateToProps = state => {
  return {
    images: state.image_reducer.images,
    profile_id: state.profile_reducer.profile_id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delete_image: (profile_id, image_id) => dispatch(image_actions.image_delete(profile_id, image_id))
  }
}

export default connect(mapstateToProps, mapDispatchToProps)(DeleteImageModal)