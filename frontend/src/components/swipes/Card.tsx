import React from 'react';
import clsx from 'clsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Button, Card, CardActions, CardContent, Collapse, IconButton, MobileStepper, Typography, makeStyles } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProfileType from '../../../types/ProfileType';
import styles from "../../../styles/Card.module.css"
import Image from "next"
import CardImageStepper from './CardImageStepper';



interface Props {
  profile: ProfileType
}
function ProfileCard(props:Props) {
  const {profile} = props
  const [expanded, setExpanded] = React.useState(false);


  const handleExpandClick = () => {
    setExpanded(!expanded); 
  }


  



  return (
      <Card id='card_root'>
        <CardImageStepper profile={profile}/>

    <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {profile.name}
        </Typography>
      </CardContent>
      <Typography style={{marginLeft: '10px'}}>
        native language: {profile.native_language.name}
      </Typography>
      <Typography style={{marginLeft: '10px'}}>
        foreign language: {profile.foreign_language.name}
      </Typography>
      <CardActions disableSpacing>
        <IconButton
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
          <Typography className='card_intro'  paragraph>
            {profile.intro}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}


export default ProfileCard;

