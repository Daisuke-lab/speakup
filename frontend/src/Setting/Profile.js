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
import '../assets/Setting/Profile.css'
import OneCard from '../Swipe/Card'
import { connect } from 'react-redux'


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
  

function Profile(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function time() {
    props.time_start || props.time_end ?
    (<>{props.time_start}~{props.time_end}</>)
    : (<></>)
  }
  console.log(props.person)

  function freeday() {
    var freeday = null
    props.data.freeday != null ?
    freeday = <>freeday: {props.data.freeday}</>
    :
    freeday = null
    return freeday
  }
  

  return (
    <OneCard data={props.person}/>
  );
}

const mapstateToProps = state => {
  return {
    person: state.profile_reducer,
    name: state.profile_reducer.name,
    gender: state.profile_reducer.gender,
    age: state.profile_reducer.age,
    native_lan: state.profile_reducer.native_lan,
    foreign_lan: state.profile_reducer.foreign_lan,
    image: state.profile_reducer.image,
    location: state.profile_reducer.location,
    time_start: state.profile_reducer.time_start,
    time_end: state.profile_reducer.time_end,
    intro: state.profile_reducer.intro,
    freeday: state.profile_reducer.freeday

  }
}

export default connect(mapstateToProps, null)(Profile)

{/* <Card id='profile_root'>
<CardMedia
  className='media'
  image= {props.image}
  title= {props.name}
/>
<CardContent>
  <Typography variant="body2" color="textSecondary" component="p">
    {props.name}
  </Typography>
</CardContent>
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
    <ExpandMoreIcon />
  </IconButton>
</CardActions>
<Collapse in={expanded} timeout="auto" unmountOnExit>
  <CardContent>
    <Typography>My native language: {props.native_lan}<br/>
          I want to learn: {props.foreign_lan}<br/><br/>
    </Typography>
  <Typography paragraph>{freeday} {time}</Typography>
    <Typography paragraph>
      {props.intro}
    </Typography>
  </CardContent>
</Collapse>
</Card> */}