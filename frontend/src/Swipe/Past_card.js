import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../assets/Swipe/Card.css'


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


  

function OneCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    console.log('Expand!!')
    setExpanded(!expanded);
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
      <CardMedia
        className='media'
        image= {props.data.image}
        title="Nana Mori"
      />
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
        >
          <ExpandMoreIcon onClick={handleExpandClick}/>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography paragraph>{freeday()}  {time()}</Typography>
          <Typography paragraph>
            {props.intro}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}


export default OneCard