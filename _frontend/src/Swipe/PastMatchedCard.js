import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import '../assets/Swipe/Match.css'

const images = ['https://i.pinimg.com/736x/0f/22/d3/0f22d30524b90896dae496590a550c3a.jpg']

const useStyles = makeStyles((theme) => ({
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
  

export default function MatchedCard(props) {
  console.log('props2:', props)
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function time() {
    var time_range = null
    props.time_start !== null || props.time_end !== null ?
    time_range = <>{props.time_start}~{props.time_end}</>
    :  time_range = (<></>)
    return time_range
}


  return (
    <Card id='match_card'>

        <CardMedia
            className='media'
            image= {images[0]}
            title="Nana Mori"
            id='match_image'>
        </CardMedia>

        <IconButton id='match_icon' onClick={props.handleClose}>
            <ClearIcon style={{fontSize: 'large'}}/>
        </IconButton>

        <h1>New Match!</h1>

        <CardActions disableSpacing>
            <IconButton
            className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            style={{outline: 'none', marginTop:'10px'}}>
                <ExpandMoreIcon />
            </IconButton>
      </CardActions>


      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        <p1>{props.data.name}</p1>
        </Typography>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit >
        <CardContent>
        <Typography paragraph>freeday: {props.freeday}  {time()}</Typography>
          <Typography paragraph>
            {props.intro}
          </Typography>
        </CardContent>
      </Collapse>
      <form className='match_form'>
          <input type='text' placeholder='write the first message!' className='match_input'/>
          <button className='match_submit'>SEND</button>
      </form>
    </Card>
  );
}




