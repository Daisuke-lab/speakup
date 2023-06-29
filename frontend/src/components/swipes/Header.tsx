import React from 'react'
import '../assets/Swipe/Header.css'
import PersonIcon from '@mui/icons-material/Person';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SpaIcon from '@mui/icons-material/Spa';
import IconButton from '@mui/material/IconButton';


// there is two Header so far in App.js. the one is without variable and the other is with a variable
// the first one is backButton is null so you can get PersonIcon
// the second one is backButton is '/' and you can get ArrowbackIosIcon. if you click the icon. you can back to '/' which is backButton
function Header() {
  return (
    <div className="header">

      <IconButton id='header_icon'>
      <PersonIcon fontSize='large'/>
      </IconButton>


      <IconButton id='header_logo'>
      <SpaIcon style={{ fontSize: 50 }}/>
      </IconButton>

      <IconButton id='header_icon'>
      <QuestionAnswerIcon fontSize='large'/>
      </IconButton>

    </div>
  );
}

export default Header;