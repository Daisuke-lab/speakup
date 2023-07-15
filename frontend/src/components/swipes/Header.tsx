import React from 'react'
import styles from "../../../styles/Swipe.module.css"
import PersonIcon from '@mui/icons-material/Person';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SpaIcon from '@mui/icons-material/Spa';
import IconButton from '@mui/material/IconButton';


// there is two Header so far in App.js. the one is without variable and the other is with a variable
// the first one is backButton is null so you can get PersonIcon
// the second one is backButton is '/' and you can get ArrowbackIosIcon. if you click the icon. you can back to '/' which is backButton
function Header() {
  return (
    <div className={styles.header}>

      <IconButton className={styles.headerIcon}>
      <PersonIcon fontSize='large'/>
      </IconButton>


      <IconButton className={styles.headerLogo}>
      <SpaIcon style={{ fontSize: 50 }}/>
      </IconButton>

      <IconButton className={styles.headerIcon}>
      <QuestionAnswerIcon fontSize='large'/>
      </IconButton>

    </div>
  );
}

export default Header;