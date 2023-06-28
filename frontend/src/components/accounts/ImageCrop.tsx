import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import '../assets/Setting/Crop.css'
import * as image_actions from '../store/actions/image_action';
import { connect } from 'react-redux'
import { orderBy } from 'lodash';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: '700px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Crop(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(props.open);
  const [originalSize, setOriginalSize] = useState({ 'width':0, 'height':0 })

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    var img  = new Image()
    img.src = props.url
    img.onload = () => {
      setOriginalSize({'width': img.width, 'height': img.height})
    }
  }, [])

  const handleClose = () => {
    props.parent_popup(false)
    setOpen(false);
  };

  const image_uploader = () => {
    props.parent_popup(false)
    props.order.current.push(props.order.current.length)
    console.log()
    //props.order.current = props.order.current.push(props.order.length) 
    let real_x =  crop.x
    let real_y = crop.y
    let real_width = crop.width
    let real_height = crop.height
    if (originalSize.height > 600) {
      real_x = crop.x * (originalSize.height / 600)
      real_y = crop.y * (originalSize.height / 600)
      real_width = crop.width * (originalSize.height / 600)
      real_height = crop.height * (originalSize.height / 600)
    } else if (originalSize.weight > 700) {
      real_x = crop.x * (originalSize.height / 700)
      real_y = crop.y * (originalSize.height / 700)
      real_width = crop.width * (originalSize.height / 700)
      real_height = crop.height * (originalSize.height / 700)
    }
    props.image_create(props.id, props.profile_id, props.image, real_x, real_y, real_width, real_height)
    setOpen(false)
  }

  const [crop, setCrop] = useState({ aspect: 14 / 19 });
  return (
    <div className='crop'>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <ReactCrop src={props.url} crop={crop} onChange={newCrop => setCrop(newCrop)} />
          <div className='crop_button'>
          <button className='cancel_button' onClick={handleClose} id='outline'>Cancel</button>
          <button className='upload_button' onClick={image_uploader} id='outline'>Upload</button>
          </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapstateToProps = state => {
  return {
    id: state.auth_reducer.id,
    profile_id: state.profile_reducer.profile_id,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    image_create: (id, profile_id, image, x, y, width, height) => 
    dispatch(image_actions.image_create(id, profile_id, image, x, y, width, height))
  }
}

export default connect(mapstateToProps, mapDispatchToProps)(Crop)