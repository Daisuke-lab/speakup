import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import '../assets/Swipe/Card.css'
import '../assets/Swipe/Match.css'

const images = ['https://i.pinimg.com/originals/1f/bb/51/1fbb51e234949b8154b0f80fcff7efe3.jpg', 'https://static.billboard.com/files/media/cobie-smulders-2019-vf-u-billboard-1548-compressed.jpg']
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 475,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    marginRight: 'auto',
    outline: 'none',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

function OneCard(props) {
  //props.onClose(false)
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.data.images !== undefined && props.data.images.length >0? props.data.images.length: 1

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  function time() {
    var time_range = null
    props.data.time_start != null || props.data.time_end != null ?
    time_range = <>{props.data.time_start}~{props.data.time_end}</>
    :  time_range = (<></>)
    return time_range
}

  function freeday() {
    var freeday = null
    props.data.freeday != null ?
    freeday = <>freeday: {props.data.freeday}</>
    :
    freeday = null
    return freeday
  }

  return (
      <Card id='card_root'>
        <div id='card_imagebox'>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {props.images === undefined?props.data.images.map((step, index) => (
                <div key={props.data.name}>
                  {Math.abs(activeStep - index) <= 2?(
                    <img className={classes.img} src={step}/>
                  ) :null }
                </div>)):props.images.map((step, index) => (
                <div key={props.id}>
                  {Math.abs(activeStep - index) <= 2?(
                    <img className={classes.img} src={step.image}/>
                  ) :null }
                </div>))}
              </SwipeableViews>

              <IconButton id='match_icon' onHover={() => props.onClose(false)}>
                <ClearIcon style={{fontSize: 'large'}} onHover={() => console.log('clicked')} />
              </IconButton>

              <div id='card_stepper'>
                  <MobileStepper
                  variant="dots"
                  steps={maxSteps>1? maxSteps: 0 }
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1} id='outline'>
                      {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                  }
                  backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0} id='outline'>
                      {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    </Button>
                  }
                  />
              </div>
        </div>

      <IconButton id='match_icon' onClick={() => props.onClose(false)}>
        <ClearIcon style={{fontSize: 'large'}}/>
      </IconButton>
      
    <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.data.name}
        </Typography>
      </CardContent>
      <Typography style={{marginLeft: '10px'}}>native language: {props.data.native_lan}<br/>
                 want to learn: {props.data.foreign_lan}<br/><br/>
      </Typography>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          id='outline'
        >
          <ExpandMoreIcon onClick={handleExpandClick} id='outline'/>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography paragraph>{freeday}  {time}</Typography>
          <Typography className='card_intro'  paragraph>
            {props.intro}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default OneCard;
